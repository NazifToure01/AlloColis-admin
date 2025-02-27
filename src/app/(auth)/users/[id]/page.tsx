'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContex';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  verification: {
    email: boolean;
    telephone: boolean;
    identity: boolean;
  };
  photo: string | null;
}

export default function UserPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { token } = useAuth();
  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    if (!token) return;
    try {
      const data = await api.users.getById(id, token);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await api.users.update(id, token, user);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!user) return;
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non trouvé</div>;

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>
          Détails de l'utilisateur - {user.fullName}
        </h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
      </div>

      <form onSubmit={handleUpdate} className='space-y-6'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <Label>Nom complet</Label>
              <Input
                name='fullName'
                value={user.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name='email'
                type='email'
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>

            <div>
              <Label>Téléphone</Label>
              <Input
                name='phone'
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>

            <div>
              <Label>Rôle</Label>
              <select
                name='role'
                value={user.role}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='w-full mt-1 border rounded-md p-2'
              >
                <option value='user'>Utilisateur</option>
                <option value='admin'>Administrateur</option>
              </select>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <Label>Vérifications</Label>
              <div className='mt-2 space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Email:</span>
                  <span
                    className={
                      user.verification.email
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {user.verification.email ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Téléphone:</span>
                  <span
                    className={
                      user.verification.telephone
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {user.verification.telephone ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>Identité:</span>
                  <span
                    className={
                      user.verification.identity
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {user.verification.identity ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className='flex justify-end gap-4'>
            <Button type='submit' className='bg-primary'>
              Enregistrer
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
