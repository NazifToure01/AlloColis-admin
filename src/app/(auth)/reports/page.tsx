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
import { api } from '@/services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Report {
  _id: string;
  count: number;
  announce: {
    _id: string;
    title: string;
    departure_country: string;
    arrival_country: string;
    created: string;
  };
  lastReport: {
    reason: string;
    details: string;
    createdAt: string;
  };
}

const ReportSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
    <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
  </TableRow>
);

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.reports.getAll();
      if (response.success) {
        setReports(response.data);
      } else {
        setError('Erreur lors du chargement des signalements');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Erreur lors du chargement des signalements');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getSeverityColor = (count: number) => {
    if (count >= 5) return 'bg-red-100 text-red-800';
    if (count >= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-red-600">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <Button onClick={fetchReports} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-bold'>Signalements d'annonces</h1>
        <Button onClick={fetchReports} variant="outline" size="sm">
          Actualiser
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Annonce</TableHead>
              <TableHead>Trajet</TableHead>
              <TableHead>Signalements</TableHead>
              <TableHead>Dernier motif</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => <ReportSkeleton key={index} />)
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun signalement trouvé
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow
                  key={report._id}
                  className='hover:bg-gray-50'
                >
                  <TableCell className="font-medium">{report.announce.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center">
                      {report.announce.departure_country}
                      <span className="mx-2">→</span>
                      {report.announce.arrival_country}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(report.count)}>
                      {report.count}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={report.lastReport.reason}>
                    {report.lastReport.reason}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(report.lastReport.createdAt), 'Pp', {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => router.push(`/announces/${report.announce._id}`)}
                    >
                      Voir l'annonce
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
