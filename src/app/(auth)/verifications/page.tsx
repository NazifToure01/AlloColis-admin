'use client';
import { Button } from '@/components/ui/button';
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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Verification {
  _id: string;
  user: {
    fullName: string;
    email: string;
  };
  documentType: string;
  status: string;
  createdAt: string;
}

export default function VerificationsList() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const router = useRouter();

  const fetchVerifications = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await api.verifications.getAll(page);
      setVerifications(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error('Error fetching verifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchVerifications(currentPage);
    }
  }, [currentPage, token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'inVerification':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      case 'inVerification':
        return 'En vérification';
      default:
        return 'En attente';
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Vérifications d'identité</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type de document</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de demande</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verifications.map((verification) => (
            <TableRow
              key={verification._id}
              className='cursor-pointer hover:bg-gray-50'
              onClick={() => router.push(`/verifications/${verification._id}`)}
            >
              <TableCell>{verification.user.fullName}</TableCell>
              <TableCell>{verification.user.email}</TableCell>
              <TableCell>
                {verification.documentType === 'passport'
                  ? 'Passeport'
                  : "Carte d'identité"}
              </TableCell>
              <TableCell>
                <span className={getStatusColor(verification.status)}>
                  {getStatusText(verification.status)}
                </span>
              </TableCell>
              <TableCell>
                {format(new Date(verification.createdAt), 'Pp', {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/verifications/${verification._id}`);
                  }}
                >
                  Examiner
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex justify-center gap-2 mt-4'>
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span className='py-2 px-4'>
          Page {currentPage} sur {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
