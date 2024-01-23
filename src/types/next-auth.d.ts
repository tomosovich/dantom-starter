import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // Define additional types for user.username and user.email
  interface User {
    username: string | null;
    email: string | null;
  }

  interface Session {
    // Types for session.user.username and session.user.name
    user: {
      username: string;
      name: string | null;
    };
    // types for session.token.username
    token: {
      username: string;
    };
  }
}