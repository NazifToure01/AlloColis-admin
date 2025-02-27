'use client';
import { SideBar } from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { AuthProvider } from '@/context/AuthContex';
import { useState } from 'react';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AuthProvider>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className='flex flex-col'>
        <div className='w-full px-8 fixed mb-24'>
          <Button onClick={() => setIsOpen(true)}>Menu</Button>
        </div>
        {children}
      </div>
    </AuthProvider>
  );
}
