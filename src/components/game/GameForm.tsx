'use client';

import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { gameSchema } from '@/lib/validations/gmae';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { createGame } from '@/actions/game';
import { useRouter } from 'next/navigation';
import { useOrigin } from '@/hooks/useOrigin';

const GameForm = () => {
  const router = useRouter();
  const origin = useOrigin();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof gameSchema>>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      jjal: '',
      link: '',
      publisher: '',
      releaseDate: new Date(),
      path: `${origin}/`
    }
  });

  const submitHandler = async (values: z.infer<typeof gameSchema>) => {
    setIsLoading(true);

    try {
      await createGame(values);
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-4">
        <div className="flex gap-4 max-sm:flex-col">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent placeholder="select category,,," className="bg-white dark:bg-black">
                    <SelectItem value="rpg">RPG</SelectItem>
                    <SelectItem value="fps">FPS</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-3.5 flex gap-4 max-sm:flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Release Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'yyyy-MM-dd') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto bg-white p-0 dark:bg-black" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUpload isGame={true} endpoint="serverImage" value={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="primary-gradient mt-6 w-full !text-light-900">
          Create Game
        </Button>
      </form>
    </Form>
  );
};

export default GameForm;
