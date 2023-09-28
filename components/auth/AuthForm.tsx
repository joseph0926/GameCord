'use client';

import { authFormSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type AuthType = 'signin' | 'signup';

const AuthForm = () => {
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('signin');

  const authToggle = useCallback(() => {
    if (authType === 'signin') {
      setAuthType('signup');
    } else {
      setAuthType('signin');
    }
  }, [authType]);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof authFormSchema>) => {
    if (authType === 'signup') {
      await axios
        .post('/api/signup', values)
        .catch(() => toast.error('회원가입에 실패하였습니다.'))
        .finally(() => {
          form.reset();
          toast.success('회원가입 완료');
        });
    }

    if (authType === 'signin') {
      setIsSignInLoading(true);
      signIn('credentials', {
        ...values,
        redirect: false
      })
        .then((cb) => {
          if (cb?.error) {
            toast.error('로그인에 실패하였습니다.');
          }
          if (cb?.ok && !cb?.error) {
            toast.success('로그인 성공');
          }
        })
        .finally(() => {
          setIsSignInLoading(false);
          form.reset();
        });
    }
  };

  const socialAction = (action: string) => {};

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-zinc-300 px-4 py-8 shadow dark:bg-zinc-700 sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={isLoading} placeholder="email,,," className="bg-transparent" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={isLoading} placeholder="password,,," className="bg-transparent" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {authType === 'signup' && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isLoading} placeholder="닉네임,,," className="bg-transparent" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" disabled={isLoading || isSignInLoading} variant="primary" className="w-full py-2">
              {authType === 'signin' ? '로그인' : '회원가입'}
            </Button>
          </form>
        </Form>
        <div className="flex items-center py-4">
          <Separator className="h-0.5 flex-1 bg-zinc-600 dark:bg-zinc-400" />
          <span className="flex-1 text-center">OR</span>
          <Separator className="h-0.5 flex-1 bg-zinc-600 dark:bg-zinc-400" />
        </div>
        <div className="flex gap-2">
          <AuthSocialButton image="/images/kakao.png" onClick={() => {}} />
          <AuthSocialButton image="/images/naver.png" onClick={() => {}} />
          <AuthSocialButton image="/images/google.png" onClick={() => {}} />
        </div>
        <div className="mt-6 flex justify-center gap-2 px-2 text-sm">
          <div onClick={authToggle} className="cursor-pointer underline">
            {authType === 'signin' ? '회원가입으로 이동' : '로그인으로 이동'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
