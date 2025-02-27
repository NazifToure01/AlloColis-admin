import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlloColis - Mise en relation expéditeurs et voyageurs',
  description:
    "AlloColis est une application innovante qui met en relation expéditeurs et voyageurs ayant de l'espace dans leurs bagages pour faciliter l'envoi de colis. Notre plateforme permet une mise en relation directe et économique entre particuliers pour le transport de colis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className='font-rubik antialiased'>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
