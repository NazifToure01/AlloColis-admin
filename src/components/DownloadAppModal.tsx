import { toast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
}: DownloadAppModalProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.contact.subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Vous êtes inscrit à la liste d'attente",
        description:
          "Vous recevrez une notification dès que l'application sera disponible",
      });
      onClose();
    } catch (error: any) {
      if (error.status === 400) {
        toast({
          title: 'Erreur',
          description: 'Cette adresse email est déjà inscrite',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erreur',
          description: "Une erreur est survenue lors de l'inscription",
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
          variants={overlayVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          onClick={onClose}
        >
          <motion.div
            className='bg-white rounded-2xl p-8 max-w-md w-full relative'
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors'
            >
              <IoClose size={24} />
            </button>

            <div className='text-center mb-8'>
              <motion.img
                src='/images/Logo.svg'
                alt='Allo Colis App'
                className='w-48 mx-auto mb-4'
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Rejoignez la liste d'attente
              </h2>
              <p className='text-gray-600'>
                Soyez informé dès le lancement de l'application !
              </p>
            </div>

            {isSubscribed ? (
              <motion.div
                className='text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-xl font-bold text-green-600 mb-4'>
                  Merci pour votre inscription !
                </h3>
                <p className='text-gray-600'>
                  Nous vous tiendrons informé dès que l'application sera
                  disponible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='relative'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Entrez votre adresse e-mail'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <motion.button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-4 rounded-xl font-semibold'
                  variants={buttonVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  Rejoindre la liste d'attente
                </motion.button>
              </form>
            )}

            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>
                En vous inscrivant, vous acceptez de recevoir des mises à jour
                sur Allo Colis.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
