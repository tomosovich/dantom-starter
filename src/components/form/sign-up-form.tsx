'use client';

import { GoogleSignInButton } from '@/components/google-sign-in-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast, useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Create Zod validation schema
const FormSchema = z
  .object({
    email: z.string().min(1, 'Email is Required.').email('Invalid Email.'), // uses zod's built-in email validation
    password: z
      .string()
      .min(1, 'Password is Required')
      .min(8, 'Password must be at least 8 characters.'),
    // TODO: add more robust validation on password.
    username: z
      .string()
      .min(1, 'Username is Required.')
      .max(32, 'Username must be less than 32 characters.'),
    confirmPassword: z.string().min(1, 'Confirm Password is Required.'),
  })
  // Make sure the password and confirmPassword fields match
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.',
  });

export function SignUpForm() {
  // Allows redirects after submission
  const router = useRouter();
  // Allows us to show toasts (see shadcn docs)
  const { toast } = useToast();
  // use the schema to validate the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // Submit POST request to API
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the form data to the API
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    // If the response is OK, redirect to sign-in page
    if (response.ok) {
      router.push('/sign-in');
      // If the response is not OK, show the error and toast
    } else {
      toast({
        title: 'Sign Up Failed',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>
        ),
      });
    }
    // Show a toast to let the user know they signed up successfully
    toast({
      title: 'Sign Up Successful',
      description: 'You can now sign in to your account.',
      variant: 'default',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className={'space-y-2'}>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username' type={'username'} {...field} />
                </FormControl>
                {/*<FormDescription>This is your email address</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='email@example.com'
                    type={'email'}
                    {...field}
                  />
                </FormControl>
                {/*<FormDescription>This is your email address</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={'password'}
                    placeholder='enter your password'
                    {...field}
                  />
                </FormControl>
                {/*<FormDescription>This is your password.</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter Your Password</FormLabel>
                <FormControl>
                  <Input
                    type={'password'}
                    placeholder='Confirm your password'
                    {...field}
                  />
                </FormControl>
                {/*<FormDescription>This is your password.</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className={'w-full mt-6'}>
          Sign Up
        </Button>
      </form>
      <div
        className={
          'mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'
        }
      >
        or
      </div>
      {/* Pulls in the Google button*/}
      <GoogleSignInButton>Sign Up With Google</GoogleSignInButton>
      <p className={'text-center text-sm text-gray-600 mt-2'}>
        {/*If the user has an account, they can sign in. If not, they can sign up.*/}
        Already have an account?&nbsp;
        <Link href={'/sign-in'} className={'text-blue-500 hover:underline'}>
          Sign In
        </Link>
      </p>
    </Form>
  );
}