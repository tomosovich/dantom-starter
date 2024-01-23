// Here we are defining the route for the user API
// This is where we will handle all user related POSTs to the API

import { db } from '@/lib/db';
import { hash } from 'bcrypt';
import email from 'next-auth/providers/email';
import { NextResponse } from 'next/server';
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
  username: z.string().min(1, 'Username is required').max(32),
  email: z.string().min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email is already in use
    // We are using Prisma to query the database, and the ignore comment is to
    // ignore the error that Prisma throws when we use the findUnique method. Prisma doesn't
    // have a type definition for this method, so we have to ignore the error.
    // @ts-ignore
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'Email already in use' },
        { status: 409 }
      );
    }
    // check if username is already in use
    // ignore comment is because prisma doesn't have a type definition for findUnique
    // @ts-ignore
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'Username already in use' },
        { status: 409 }
      );
    }
    // Hash password - 10 is default salt rounds
    // https://www.npmjs.com/package/bcrypt#usage---async
    const hashedPassword = await hash(password, 10);

    // webstorm throws an error here, but it's fine
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from response for security
    const { password: newUserPassword, ...rest } = newUser;
    // return the user and a message with status of 201
    return NextResponse.json(
      { user: rest, message: 'User created' },
      { status: 201 }
    );
    // Catch any errors and return a generic error message and status 500
    // In production I would enhance this to return a more specific error message
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
    });
  }
}