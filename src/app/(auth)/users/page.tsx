'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/context/AuthContex';
import { api } from '@/services/api';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
}

const UserSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
    <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
  </TableRow>
);

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const fetchUsers = async (page: number) => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.users.getAll(page);
      setUsers(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers(currentPage);
    }
  }, [currentPage, token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')
    ) {
      try {
        await api.users.delete(id, token);
        fetchUsers(currentPage);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const variants: Record<string, string> = {
      'admin': 'bg-purple-100 text-purple-800',
      'user': 'bg-blue-100 text-blue-800',
      'moderator': 'bg-green-100 text-green-800',
    };
    return variants[role.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500">Non vérifié</Badge>
    );
  };

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-red-600">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <Button onClick={() => fetchUsers(currentPage)} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-bold'>Liste des Utilisateurs</h1>
        <Button 
          onClick={() => fetchUsers(currentPage)} 
          variant="outline" 
          size="sm"
        >
          Actualiser
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom complet</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Identité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => <UserSkeleton key={index} />)
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className='cursor-pointer hover:bg-gray-50'
                  onClick={() => router.push(`/users/${user.id}`)}
                >
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getVerificationBadge(user.verification.email)}</TableCell>
                  <TableCell>{getVerificationBadge(user.verification.telephone)}</TableCell>
                  <TableCell>{getVerificationBadge(user.verification.identity)}</TableCell>
                  <TableCell>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-center gap-2 mt-4'>
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
        >
          Précédent
        </Button>
        <span className='py-2 px-4'>
          Page {currentPage} sur {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
