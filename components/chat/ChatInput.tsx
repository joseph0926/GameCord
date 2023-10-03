'use client';

import { chatFormSchema } from '@/lib/validations/chat';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Plus, Smile } from 'lucide-react';
import { Input } from '../ui/input';
import qs from 'query-string';

type ChatInputProps = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
};

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      content: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof chatFormSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query
      });

      await customAxios.post(url, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-zinc-500 p-1 transition-all hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
                  >
                    <Plus className="text-white dark:text-[#31333]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                  />
                  <div className="absolute right-8 top-7">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
