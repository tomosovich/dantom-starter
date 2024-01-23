import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import { Navbar } from '@/components/navbar';
import { SessionWrapper } from '@/components/session-wrapper';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DanTom Starter',
  description: 'Starter Kit for My Apps',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/*SessionWrapper allows us to use next-auth in our app
      without converting everything to 'use client'*/}
        <SessionWrapper>
          <main
            className={'h-screen flex flex-col justify-center items-center'}
          >
            <Navbar />
            {children}
          </main>
          {/*This is where toasts will show (see shadcn docs)*/}
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}