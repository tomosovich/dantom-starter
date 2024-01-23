// Initialization. See https://next-auth.js.org/configuration/initialization#route-handlers-app
// You'll follow the documentation for app router (app/)
import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };