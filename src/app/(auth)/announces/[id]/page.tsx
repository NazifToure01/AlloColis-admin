'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Announce } from '@/lib/types';
import { api } from '@/services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-10 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-10 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function AnnouncePage({ params }: { params: { id: string } }) {
  //@ts-ignore
  const id = React.use(params).id;
  const [announce, setAnnounce] = useState<Announce | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchAnnounce();
    }
  }, [id]);

  const fetchAnnounce = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.announces.getById(id);
      setAnnounce(data);
    } catch (error) {
      console.error('Error fetching announce:', error);
      setError('Erreur lors du chargement de l\'annonce');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announce) return;

    try {
      setIsSaving(true);
      await api.announces.update(id, announce);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating announce:', error);
      setError('Erreur lors de la mise à jour de l\'annonce');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!announce) return;
    setAnnounce({
      ...announce,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusColor = (status: string) => {
    const variants: Record<string, string> = {
      'Validé': 'bg-green-100 text-green-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
      'Annulé': 'bg-red-100 text-red-800',
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-red-600">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <Button onClick={fetchAnnounce} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className='p-8 max-w-7xl mx-auto'>
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Button>

      <div className='flex justify-between items-center mb-6'>
        <div className="space-y-1">
          <h1 className='text-2xl font-bold'>
            {isLoading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              <>
                Détails de l'annonce #{announce?.tracking_number}
                <Badge className={`ml-3 ${getStatusColor(announce?.status || '')}`}>
                  {announce?.status}
                </Badge>
              </>
            )}
          </h1>
          {!isLoading && announce && (
            <p className="text-gray-500">
              Créée le {format(new Date(announce?.created || ''), 'Pp', { locale: fr })}
            </p>
          )}
        </div>
        {!isLoading && (
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
        )}
      </div>

      {isLoading ? (
        <FormSkeleton />
      ) : !announce ? (
        <div className="text-center py-12 text-gray-500">
          Annonce non trouvée
        </div>
      ) : (
        <form onSubmit={handleUpdate} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            {/* Informations de base */}
            <div className='space-y-4'>
              <div>
                <Label>Numéro de suivi</Label>
                <Input
                  disabled
                  value={announce.tracking_number}
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Annonceur</Label>
                <Input disabled value={announce.announcer} className='mt-1' />
              </div>

              <div>
                <Label>Contact</Label>
                <Input
                  name='contact'
                  value={announce.contact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Prix</Label>
                <Input
                  type='number'
                  name='price'
                  value={announce.price}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>
            </div>

            {/* Dates et lieux */}
            <div className='space-y-4'>
              <div>
                <Label>Pays de départ</Label>
                <Input
                  name='departure_country'
                  value={announce.departure_country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Ville de départ</Label>
                <Input
                  name='departure_city'
                  value={announce.departure_city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Pays d'arrivée</Label>
                <Input
                  name='arrival_country'
                  value={announce.arrival_country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Ville d'arrivée</Label>
                <Input
                  name='arrival_city'
                  value={announce.arrival_city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className='mt-1'
                />
              </div>
            </div>
          </div>

          {/* Ticket de voyage */}
          <div className='space-y-4'>
            <Label>Ticket de voyage</Label>
            {announce.travel_tiket ? (
              <div className='flex flex-row items-center gap-4 mt-1 p-4 bg-gray-50 rounded-lg border'>
                <div className="flex-1 truncate">{announce.travel_tiket}</div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href={announce.travel_tiket}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Voir le ticket
                  </a>
                </Button>
              </div>
            ) : (
              <div className='mt-1 p-4 bg-gray-50 rounded-lg border text-gray-500'>
                Aucun ticket disponible
              </div>
            )}
          </div>

          {/* Dates */}
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <Label>Date de départ</Label>
              <Input
                type='datetime-local'
                name='departure_date'
                value={
                  announce.departure_date
                    ? new Date(announce.departure_date).toISOString().slice(0, 16)
                    : ''
                }
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>

            <div>
              <Label>Date d'arrivée</Label>
              <Input
                type='datetime-local'
                name='arrival_date'
                value={
                  announce.arrival_date
                    ? new Date(announce.arrival_date).toISOString().slice(0, 16)
                    : ''
                }
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>
          </div>

          {/* Statut et disponibilité */}
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <Label>Statut</Label>
              <select
                name='status'
                value={announce.status}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='w-full mt-1 border rounded-md p-2'
              >
                <option value='Validé'>Validé</option>
                <option value='En attente'>En attente</option>
                <option value='Annulé'>Annulé</option>
              </select>
            </div>

            <div>
              <Label>Disponibilité</Label>
              <Input
                type='number'
                name='availability'
                value={announce.availability}
                onChange={handleInputChange}
                disabled={!isEditing}
                className='mt-1'
              />
            </div>
          </div>

          {isEditing && (
            <div className='flex justify-end gap-4'>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Annuler
              </Button>
              <Button 
                type='submit' 
                disabled={isSaving}
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
