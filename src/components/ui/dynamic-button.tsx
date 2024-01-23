'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

export const DynamicButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant={'destructive'}
    >
      Sign Out
    </Button>
  );
};