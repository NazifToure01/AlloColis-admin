import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  onDownloadClick?: () => void;
}

export default function Footer({ onDownloadClick }: FooterProps) {
  const handleDownloadClick = () => {
    if (onDownloadClick) {
      onDownloadClick();
    }
  };

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <span className='ml-2 text-xl font-bold text-white'>AlloColis</span>
            </div>
            <p className='text-sm'>
              La solution innovante pour l'envoi de colis
            </p>
            <div className='flex space-x-4'>
              <Link href='#' className='hover:text-blue-500'>
                <Facebook className='h-5 w-5' />
              </Link>
              <Link href='#' className='hover:text-blue-500'>
                <Twitter className='h-5 w-5' />
              </Link>
              <Link href='#' className='hover:text-blue-500'>
                <Instagram className='h-5 w-5' />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Services</h3>
            <ul className='space-y-2'>
              <li>Envoyer un colis</li>
              <li>Devenir voyageur</li>
            </ul>
          </div>

          <div>
            <h3 className='text-white font-semibold mb-4'>Entreprise</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/contact' className='hover:text-blue-500'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-white font-semibold mb-4'>Support</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/faq' className='hover:text-blue-500'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='hover:text-blue-500'>
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8 text-sm text-center'>
          <p>
            &copy; {new Date().getFullYear()} AlloColis. Tous droits réservés.
          </p>
        </div>

        <button
          onClick={handleDownloadClick}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
        >
          Télécharger l'application
        </button>
      </div>
    </footer>
  );
}
