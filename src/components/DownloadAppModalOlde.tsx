import { AnimatePresence, motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
}: DownloadAppModalProps) {
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
                Téléchargez Allo Colis
              </h2>
              <p className='text-gray-600'>
                Disponible sur App Store et Google Play
              </p>
            </div>

            <div className='space-y-4'>
              <motion.a
                href='#' // Remplacez par le lien App Store
                className='flex items-center justify-center gap-3 w-full bg-black text-white py-4 rounded-xl font-semibold'
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'
              >
                <FaApple size={24} />
                <div className='text-left'>
                  <div className='text-xs'>Télécharger sur</div>
                  <div className='text-lg'>App Store</div>
                </div>
              </motion.a>

              <motion.a
                href='#' // Remplacez par le lien Play Store
                className='flex items-center justify-center gap-3 w-full bg-black text-white py-4 rounded-xl font-semibold'
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'
              >
                <FaGooglePlay size={22} />
                <div className='text-left'>
                  <div className='text-xs'>Télécharger sur</div>
                  <div className='text-lg'>Google Play</div>
                </div>
              </motion.a>
            </div>

            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Scannez le QR code ou cliquez sur les boutons ci-dessus</p>
              <motion.div
                className='mt-4 w-32 h-32 mx-auto bg-gray-100 rounded-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Ajoutez votre QR code ici */}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
