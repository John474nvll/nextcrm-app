'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function LoginComponent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [loading, setLoading] = useState(false);
    const defaultValues = {
      email: 'demo@gmail.com',
      password: '123456'
    };
  
    const form = useForm<UserFormValue>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
  


    const onSubmit = async (data: UserFormValue) => {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? process.env.NEXT_PUBLIC_APP_URL!,
      });
    };
  
      const [isLoading, setIsLoading] = useState<boolean>(false);
    
      const loginWithGoogle = async () => {
          setIsLoading(true);
          try {
            await signIn('google', {
              callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
            });
          } catch (error) {
            console.log(error, 'error');
            toast({
              variant: 'destructive',
              description: 'Something went wrong while logging with your Google account.',
            });
          } finally {
            setIsLoading(false);
          }
        };
      
        const loginWithGitHub = async () => {
          setIsLoading(true);
          try {
            await signIn('github', {
              callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
            });
          } catch (error) {
            console.log(error, 'error');
            toast({
              variant: 'destructive',
              description: 'Something went wrong while logging with your GitHub account.',
            });
          } finally {
            setIsLoading(false);
          }
        };
  
    return (
      <div className={cn('grid gap-6')}>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={isLoading} onClick={loginWithGitHub}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.github className="mr-2 h-4 w-4" />
            )}{' '}
            Github
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} onClick={loginWithGoogle}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{' '}
            Google
          </Button>
        </div>
  
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
  
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <Button disabled={loading} className="ml-auto w-full" type="submit">
              Continue With Email
            </Button>
          </form>
        </Form>
  
      </div>
    );
  }