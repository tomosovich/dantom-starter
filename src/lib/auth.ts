import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// JWT secret is used to encrypt/decrypt the JWT token and prevent
// malicious users from reading the contents of the token by using
// a secret key that is only known to the server.
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // Replace the default signin page with a custom signin page
  pages: {
    signIn: '/sign-in',
  },
  // Add one or more authentication providers
  // Here, we've added Google and Credentials providers
  providers: [
    // Add future providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Using ! to tell TypeScript that we know this exists in the .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Using ! to tell TypeScript that we know this exists in the .env file
    }),
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: 'Email and Password',
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // add null as a possibility to the type of credentials in types/next-auth.d.ts
      // username: string | null;
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // TODO: add a type for findUnique or research how to do this better
        // - this is a hack to get around the fact that PrismaAdapter doesn't have a type for findUnique
        // @ts-ignore
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          const passWordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passWordMatch) {
            return null;
          }
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    // Add JWT token to the user object
    async jwt({ token, user }: { token: any; user: any }) {
      console.log(token, user);
      // Add the user id to the token payload.
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      // Return previous token if the callback doesn't change it
      return token;
    },
    // Adds the username to the session object
    async session({ session, token }: { session: any; token: any }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};