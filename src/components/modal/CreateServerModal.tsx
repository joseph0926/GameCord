'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverFormSchema } from '@/lib/validations/server';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import { createServer, joinServer } from '@/actions/server';
import { useOrigin } from '@/hooks/useOrigin';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';

const CreateServerModal = () => {
  const router = useRouter();
  const origin = useOrigin();
  const { isOpen, onClose, type, data } = useModal();

  const { servers, games } = data;

  const isMoadlOpen = isOpen && type === 'createServer';

  const form = useForm<z.infer<typeof serverFormSchema>>({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      gameId: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof serverFormSchema>) => {
    try {
      const server = await createServer({ data: { ...values, path: `${origin}/server` } });
      form.reset();
      onClose();
      router.push(`/server/${server?.id}`);
    } catch (error) {
      console.log('[CREATE_SERVER_ERROR]: ', error);
      toast.error('서버 생성에 실패하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const joinServerHandler = async (serverId: string) => {
    await joinServer(serverId);
    onClose();
  };

  const closeHandler = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isMoadlOpen} onOpenChange={closeHandler}>
      <DialogContent className="overflow-y-hidden max-md:h-[50%] max-md:overflow-y-scroll">
        <Tabs defaultValue="list">
          <TabsList className="w-full">
            <TabsTrigger value="list" className="w-full text-center">
              Gema Server List
            </TabsTrigger>
            <TabsTrigger value="create" className="w-full text-center">
              Gema Server Create
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <ScrollArea className="h-[90%] py-4">
              {servers && servers.length !== 0 ? (
                servers.map((server) => (
                  <Link
                    onClick={() => joinServerHandler(server.id)}
                    href={`/server/${server.id}`}
                    key={server.id}
                    className="mb-4 flex items-center gap-4 py-2"
                  >
                    <div className="group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]">
                      <Image src={server.imageUrl} width={48} height={48} className="h-full w-full" alt="server" />
                    </div>
                    <div>{server.name}</div>
                  </Link>
                ))
              ) : (
                <p className="text-red-500">게임 서버가 존재하지 않습니다. 탭을 전환하여 서버를 생성해주세요.</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="create">
            <DialogHeader className="px-6 py-4">
              <DialogTitle className="text-center text-2xl">Create Game Server</DialogTitle>
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
                        <FormLabel className="text-xs font-bold uppercase">Server Name</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="gameId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Game</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent placeholder="select game,,," className="bg-white dark:bg-black">
                            {games ? (
                              games.map((game) => (
                                <SelectItem key={game.id} value={game.id}>
                                  {game.title}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none">게임을 찾을 수 없습니다.</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="flex-row gap-2 px-6 py-4 max-md:flex-col md:items-center">
                  <Button type="button" onClick={closeHandler} disabled={isLoading} variant="secondary">
                    Close
                  </Button>
                  <Button type="submit" disabled={isLoading} variant="primary">
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
