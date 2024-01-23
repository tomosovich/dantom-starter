import { PrismaClient } from '@prisma/client';

// Creates prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
// Checks if prisma client instance exists
const prisma = globalForPrisma.prisma ?? new PrismaClient();
// if yes, connect to that instance, if not, create a new one
if (process.env.NODE_ENV !== 'production') {
  // check current node environment, if not production
  // assign the prisma client instance to the global scope
  globalForPrisma.prisma = prisma;
}

export const db = prisma;