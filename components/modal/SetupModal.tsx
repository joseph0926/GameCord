'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverFormSchema } from '@/lib/validations/server';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../ui/file-upload';
import { createServer } from '@/lib/actions/server/mutateActions';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { useOrigin } from '@/hooks/useOrigin';
import { useClerk } from '@clerk/nextjs';

const SetupServerModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const { signOut } = useClerk();

  const origin = useOrigin();

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof serverFormSchema>) => {
    await createServer({ data: { ...values, path: `` } });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="overflow-y-scroll bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="mb-2 text-center text-3xl">Create Your Server</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            여행의 시작은 함께하는 대화로부터, TripCord에서 당신만의 서버를 생성하고 친구들과의 여행 계획을 시작하세요
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-between">
                <Separator className="h-0.5 w-[40%] bg-zinc-500" />
                <span className="text-zinc-500">또는</span>
                <Separator className="h-0.5 w-[40%] bg-zinc-500" />
              </div>
            </div>
            <div className="space-y-2 px-6">
              <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">초대 코드</Label>
              <div className="flex items-center space-x-4">
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="button"
                  onClick={() => router.push(`/invite/${inviteCode.replace(`${origin}/invite/`, '')}`)}
                  disabled={inviteCode === ''}
                  variant="secondary"
                  className="h-full w-[15%] py-2.5"
                >
                  입장
                </Button>
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <Button type="button" disabled={isLoading} onClick={() => signOut()} variant="secondary">
                  로그아웃
                </Button>
                <Button disabled={isLoading} variant="primary">
                  생성
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SetupServerModal;
