import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onDownloadClick?: () => void;
}

export default function Header({ onDownloadClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const handleDownloadClick = () => {
    if (onDownloadClick) {
      onDownloadClick();
    }
  };

  return (
    <header className='bg-gradient-to-r from-blue-300 to-blue-700 shadow-sm py-5'>
      <nav className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link href='/'>
              <Image
                src='/images/Logo.svg'
                alt='AlloColis Logo'
                width={200}
                height={200}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link href='/' className='text-white hover:text-blue-100'>
              Accueil
            </Link>
            <Link
              href='/#how-it-works'
              className='text-white hover:text-blue-100'
            >
              Comment ça marche
            </Link>
            <Link href='/contact' className='text-white hover:text-blue-100'>
              Contact
            </Link>
            <button
              onClick={handleDownloadClick}
              className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 hover:scale-105 transition duration-200'
            >
              Télécharger
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white hover:text-blue-100'
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='md:hidden overflow-hidden'
              initial='closed'
              animate='open'
              exit='closed'
              variants={menuVariants}
            >
              <div className='px-2 pt-2 pb-3 space-y-1'>
                <motion.div variants={menuItemVariants} custom={0}>
                  <Link
                    href='/'
                    className='block px-3 py-2 text-white hover:text-blue-100'
                  >
                    Accueil
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} custom={1}>
                  <Link
                    href='#how-it-works'
                    className='block px-3 py-2 text-white hover:text-blue-100'
                  >
                    Comment ça marche
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} custom={2}>
                  <Link
                    href='/contact'
                    className='block px-3 py-2 text-white hover:text-blue-100'
                  >
                    Contact
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} custom={3}>
                  <button
                    onClick={handleDownloadClick}
                    className='w-full text-left px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200 hover:scale-105'
                  >
                    Télécharger
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
