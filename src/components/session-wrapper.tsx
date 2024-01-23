// This allows us to get client session data without having to convert everything to 'use client'

'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface SessionWrapperProps {
  children: ReactNode;
}
export const SessionWrapper: FC<SessionWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};