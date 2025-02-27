const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const token = localStorage.getItem('token') || '';
import { Announce, User } from '@/lib/types';


export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/users/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
      }
      
      return response.json();
    },
  },
  contact: {
    sendMessage: async (data: { name: string; email: string; message: string }) => {
      const response = await fetch(`${API_URL}/contact/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    subscribeNewsletter: async (email: string) => {
      const response = await fetch(`${API_URL}/contact/newsletters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return response.json();
    },

    logInUser: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    },

    //get All Announces 

  },
  announces: {
    getAll: async (page: number = 1, limit: number = 10) => {
      const response = await fetch(
        `${API_URL}/annonces/admin?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch announces');
      }

      return response.json();
    },

    deleteAnnounce: async (id: string) => {
      const response = await fetch(`${API_URL}/annonces/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete announce');
      }

      return response.json();
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/annonces/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch announce');
      }

      return response.json();
    },

    update: async (id: string, data: Partial<Announce>) => {
      const response = await fetch(`${API_URL}/annonces/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update announce');
      }

      return response.json();
    },
  },
  location: {
    search: async (address: string) => {
      const response = await fetch(`${API_URL}/location/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to search places');
      }

      return response.json();
    },

    getDetails: async (placeId: string) => {
      const response = await fetch(`${API_URL}/location/getLocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ address: placeId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to get place details');
      }

      return response.json();
    },
  },
  users: {
    getAll: async (page: number = 1, limit: number = 10) => {
      const response = await fetch(
        `${API_URL}/users?_start=${(page - 1) * limit}&_end=${page * limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
      }

      const total = response.headers.get('x-total-count');
      const data = await response.json();

      return {
        data,
        total: parseInt(total || '0'),
      };
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user');
      }

      return response.json();
    },

    update: async (id: string, data: Partial<User>) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
      }

      return response.json();
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
      }

      return response.json();
    },
  },
  verifications: {
    getAll: async (page: number = 1, limit: number = 10) => {
      console.log('token localk', localStorage.getItem('token'));
      const response = await fetch(
        `${API_URL}/users/admin/verifications?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch verifications');
      }

      return response.json();
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/users/admin/verifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch verification');
      }

      return response.json();
    },

    approve: async (verificationId: string, adminComment?: string) => {
      const response = await fetch(
        `${API_URL}/users/admin/verify-identity-documents`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            verificationId,
            status: 'approved',
            adminComment,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve verification');
      }

      return response.json();
    },

    reject: async (verificationId: string, adminComment: string) => {
      const response = await fetch(
        `${API_URL}/users/admin/verify-identity-documents`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            verificationId,
            status: 'rejected',
            adminComment,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reject verification');
      }

      return response.json();
    },
  },
  reports: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/annonces/all-reports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },  
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch reports');
      }
      return response.json();
    },
  },
};
