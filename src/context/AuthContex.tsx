import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type User = {
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  _id?: string;
  id?: string;
  photo?: string;
  verification?: {
    email: boolean;
    telephone: boolean;
    identity: boolean;
  };
  identityStatus: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  token: string | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  deleteMyAccount: (id: string) => Promise<void>;
  reportAnnouncement: (
    announceId: string,
    reason: string,
    details: string
  ) => Promise<any>;
  updateProfilePhoto: (formData: FormData) => Promise<any>;
  deleteProfilePhoto: (id: string) => Promise<any>;
  updateUser: (userData: User) => Promise<void>;
  setUser: (userData: User) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN_KEY = 'refreshToken';

// Helper functions for token storage using localStorage
const storage = {
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleTokenError = async () => {
    storage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setToken(null);
    setAuthHeader(null);
    router.push('/login');
  };

  const loadUser = async () => {
    setLoading(true);
    try {
      const refreshToken = storage.getItem(AUTH_TOKEN_KEY);
      if (!refreshToken) {
        console.log('No refresh token found');
        router.push('/login');
        return;
      }
      const response = await axios.post(
        `${API_URL}/users/refresh-token`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
      } = response.data;
      console.log('newToken', newToken);
      setUser(user);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setAuthHeader(newToken);
      storage.setItem(AUTH_TOKEN_KEY, newRefreshToken);
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        console.log('Refresh token invalid or expired');
        await handleTokenError();
      } else {
        console.error('Error refreshing token:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Only run on client side
  useEffect(() => {
    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await axios.post(
      `${API_URL}/users/login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { token, user, refreshToken } = response.data;
    storage.setItem(AUTH_TOKEN_KEY, refreshToken);
    setAuthHeader(token);
    setUser(user);
    setToken(token);
  };

  const updateProfilePhoto = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/${user?.id}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.user) {
        setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating profile photo:', error);
      throw error;
    }
  };

  const deleteProfilePhoto = async (id: string) => {
    try {
      return await axios.delete(`${API_URL}/users/${id}/photo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting profile photo:', error);
      throw error;
    }
  };

  const signUp = async (userData: User) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token, user, refreshToken } = response.data;
      storage.setItem(AUTH_TOKEN_KEY, refreshToken);
      setAuthHeader(token);
      setUser(user);
      setToken(token);
      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      storage.removeItem(AUTH_TOKEN_KEY);
      setUser(null);
      setToken(null);
      setAuthHeader(null);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const deleteMyAccount = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reportAnnouncement = async (
    announceId: string,
    reason: string,
    details: string
  ) => {
    try {
      return await axios.post(
        `${API_URL}/annonces/${announceId}/reports`,
        { reason, details },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error reporting announcement:', error);
      throw error;
    }
  };

  const updateUser = async (userData: User) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${userData.id}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      token,
      loading,
      setLoading,
      deleteMyAccount,
      reportAnnouncement,
      updateProfilePhoto,
      deleteProfilePhoto,
      updateUser,
      setUser,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
