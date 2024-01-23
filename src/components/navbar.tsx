// A very generic navbar with a dynamic button that updates based on session

import { Button, buttonVariants } from '@/components/ui/button';
import { DynamicButton } from '@/components/ui/dynamic-button';
import { authOptions } from '@/lib/auth';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div
      className={
        'bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'
      }
    >
      <div className='container flex items-center justify-between'>
        <Link href={'/'}>
          <HandMetal />
        </Link>
        {session?.user ? (
          <DynamicButton />
        ) : (
          <Link href={'/sign-in'} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}