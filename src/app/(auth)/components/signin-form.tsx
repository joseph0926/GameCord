import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema } from '@/lib/validations/sign.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { login } from '@/service/actions/auth.service';
import { useSearchParams } from 'next/navigation';

export default function SigninForm() {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const callbackUrl = searchParams?.get('callbackUrl');

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const submitHandler = (values: z.infer<typeof signinSchema>) => {
    setError('');

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  const hasEmailError = form.formState.errors.email != undefined;
  const hasPasswordError = form.formState.errors.password != undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex w-full flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    'font-medium',
                    hasEmailError ? 'text-destructive' : 'text-gray-100'
                  )}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="test@example.com"
                    type="text"
                    className={cn(
                      'bg-transparent text-gray-200 placeholder:text-gray-400',
                      hasEmailError ? 'border-destructive' : 'border-gray-200'
                    )}
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
                <FormLabel
                  className={cn(
                    'font-medium',
                    hasPasswordError ? 'text-destructive' : 'text-gray-100'
                  )}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    className={cn(
                      'bg-transparent text-gray-200 placeholder:text-gray-400',
                      hasPasswordError
                        ? 'border-destructive'
                        : 'border-gray-200'
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="bg-transparent font-semibold text-gray-100"
          disabled={hasEmailError || hasPasswordError}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
