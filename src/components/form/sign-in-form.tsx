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
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is Required.').email('Invalid Email.'), // uses zod's built-in email validation
  password: z
    .string()
    .min(1, 'Password is Required')
    .min(8, 'Password must be at least 8 characters.'),
  // TODO: add more robust validation on password.
});

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: 'Whoops! Something went wrong.',
        description: 'Please check your email and password and try again.',
        variant: 'destructive',
      });
    } else {
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className={'space-y-2'}>
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
        </div>

        <Button type='submit' className={'w-full mt-6'}>
          Sign In
        </Button>
      </form>
      <div
        className={
          'mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'
        }
      >
        or
      </div>
      <GoogleSignInButton>Sign Up With Google</GoogleSignInButton>
      <p className={'text-center text-sm text-gray-600 mt-2'}>
        If you don&apos;t have an account, please&nbsp;
        <Link href={'/sign-up'} className={'text-blue-500 hover:underline'}>
          Sign Up
        </Link>
      </p>
    </Form>
  );
}