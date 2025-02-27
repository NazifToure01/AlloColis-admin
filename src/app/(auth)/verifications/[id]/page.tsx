'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Verification {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  documentType: string;
  files: {
    passport?: string;
    idFront?: string;
    idBack?: string;
    video?: string;
  };
  status: string;
  adminComment?: string;
  createdAt: string;
}

export default function VerificationPage({
  params,
}: {
  params: { id: string };
}) {
  //@ts-ignore
  const id = React.use(params).id;
  const [verification, setVerification] = useState<Verification | null>(null);
  const [adminComment, setAdminComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVerification();
    }
  }, [id]);

  const fetchVerification = async () => {
    try {
      const data = await api.verifications.getById(id);
      setVerification(data);
      setAdminComment(data.adminComment || '');
    } catch (error) {
      console.error('Error fetching verification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await api.verifications.approve(id, adminComment);
      toast({
        title: 'Vérification approuvée',
        description: 'La vérification a été approuvée avec succès',
      });
      router.push('/verifications');
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async () => {
    if (!adminComment) {
      toast({
        title: 'Commentaire requis',
        description: 'Veuillez fournir un commentaire pour le rejet',
        variant: 'destructive',
      });
      return;
    }

    try {
      await api.verifications.reject(id, adminComment);
      toast({
        title: 'Vérification rejetée',
        description: 'La vérification a été rejetée avec succès',
      });
      router.push('/verifications');
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (!verification) return <div>Vérification non trouvée</div>;

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>
          Vérification d'identité - {verification.user.fullName}
        </h1>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div>
            <Label>Utilisateur</Label>
            <Input
              value={verification.user.fullName}
              disabled
              className='mt-1'
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input value={verification.user.email} disabled className='mt-1' />
          </div>

          <div>
            <Label>Téléphone</Label>
            <Input value={verification.user.phone} disabled className='mt-1' />
          </div>

          <div>
            <Label>Type de document</Label>
            <Input
              value={
                verification.documentType === 'passport'
                  ? 'Passeport'
                  : "Carte d'identité"
              }
              disabled
              className='mt-1'
            />
          </div>

          <div>
            <Label>Date de demande</Label>
            <Input
              value={format(new Date(verification.createdAt), 'Pp', {
                locale: fr,
              })}
              disabled
              className='mt-1'
            />
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <Label>Documents</Label>
            <div className='mt-2 space-y-2'>
              {verification.files.passport && (
                <div>
                  <a
                    href={verification.files.passport}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Voir le passeport
                  </a>
                </div>
              )}
              {verification.files.idFront && (
                <div>
                  <a
                    href={verification.files.idFront}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Voir la carte d'identité (recto)
                  </a>
                </div>
              )}
              {verification.files.idBack && (
                <div>
                  <a
                    href={verification.files.idBack}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Voir la carte d'identité (verso)
                  </a>
                </div>
              )}
              {verification.files.video && (
                <div>
                  <a
                    href={verification.files.video}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Voir la vidéo
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Commentaire administrateur</Label>
            <Textarea
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              className='mt-1'
              placeholder='Ajoutez un commentaire...'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-4 mt-6'>
        <Button
          variant='destructive'
          onClick={handleReject}
          disabled={verification.status !== 'inVerification'}
        >
          Rejeter
        </Button>
        <Button
          onClick={handleApprove}
          disabled={verification.status !== 'inVerification'}
        >
          Approuver
        </Button>
      </div>
    </div>
  );
}
