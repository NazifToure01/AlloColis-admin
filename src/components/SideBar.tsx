import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Link from 'next/link';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideBar({ isOpen, onClose }: SideBarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='left' className='w-[300px]'>
        <SheetHeader>
          <SheetTitle>AlloColis Admin</SheetTitle>
        </SheetHeader>

        <nav className='mt-8'>
          <div className='flex flex-col space-y-2'>
            <Link
              onClick={onClose}
              href='/users'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Utilisateurs
            </Link>

            <Link
              onClick={onClose}
              href='/announces'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Annonces
            </Link>

            <Link
              onClick={onClose}
              href='/messages'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Messages
            </Link>

            <Link
              onClick={onClose}
              href='/newsletters'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Newsletters
            </Link>

            <Link
              onClick={onClose}
              href='/verifications'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Vérifications
            </Link>

            <Link
              onClick={onClose}
              href='/requests'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Requêtes
            </Link>

            <Link
              onClick={onClose}
              href='/reports'
              className='p-3 hover:bg-gray-100 rounded-lg transition-colors'
            >
              Signalements
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
