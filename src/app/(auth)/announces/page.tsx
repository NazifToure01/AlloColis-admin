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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Announce {
  _id: string;
  title: string;
  departure_country: string;
  arrival_country: string;
  departure_date: string;
  arrival_date: string;
  price: number;
  status: string;
  verified: boolean;
}

const AnnounceSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
    <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
  </TableRow>
);

export default function AnnouncesList() {
  const [announces, setAnnounces] = useState<Announce[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const fetchAnnounces = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.announces.getAll(page);
      setAnnounces(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error('Error fetching announces:', error);
      setError('Erreur lors du chargement des annonces');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAnnounces(currentPage);
    }
  }, [currentPage, token]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await api.announces.deleteAnnounce(id);
        fetchAnnounces(currentPage);
      } catch (error) {
        console.error('Error deleting announce:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'en_cours': 'bg-blue-100 text-blue-800',
      'terminé': 'bg-green-100 text-green-800',
      'annulé': 'bg-red-100 text-red-800',
    };
    return variants[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-red-600">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <Button onClick={() => fetchAnnounces(currentPage)} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-bold'>Liste des Annonces</h1>
        <Button 
          onClick={() => fetchAnnounces(currentPage)} 
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
              <TableHead>Départ</TableHead>
              <TableHead>Arrivée</TableHead>
              <TableHead>Date départ</TableHead>
              <TableHead>Date arrivée</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Vérifié</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => <AnnounceSkeleton key={index} />)
            ) : announces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Aucune annonce trouvée
                </TableCell>
              </TableRow>
            ) : (
              announces.map((announce) => (
                <TableRow
                  key={announce._id}
                  className='cursor-pointer hover:bg-gray-50'
                  onClick={() => router.push(`/announces/${announce._id}`)}
                >
                  <TableCell className="font-medium">{announce.departure_country}</TableCell>
                  <TableCell className="font-medium">{announce.arrival_country}</TableCell>
                  <TableCell>
                    {format(new Date(announce.departure_date), 'Pp', {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(announce.arrival_date), 'Pp', { locale: fr })}
                  </TableCell>
                  <TableCell className="font-semibold">{announce.price}€</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(announce.status)}>
                      {announce.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={announce.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {announce.verified ? 'Oui' : 'Non'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(announce._id);
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
