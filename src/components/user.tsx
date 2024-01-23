// uses the useSession hook from nextAuth to access
// session data from the client and display it in a pre tag.
// primarily for debugging purposes.

'use client';

import { useSession } from 'next-auth/react';

export const User = () => {
  const { data: session } = useSession();

  return <pre>{JSON.stringify(session)}</pre>;
};