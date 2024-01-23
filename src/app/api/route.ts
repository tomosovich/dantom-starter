import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Server-side route handler for getting the current session
export const GET = async (req: Request) => {
  // Get the current session
  const session = await getServerSession(authOptions);
  // return the session, in boolean form
  return NextResponse.json({ authenticated: !!session });
};