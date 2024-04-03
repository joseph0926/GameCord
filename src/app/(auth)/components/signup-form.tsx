import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validations/sign.schema';
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
import { register } from '@/service/actions/auth.service';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { FormError } from '@/components/ui/form-error';
import { FormSuccess } from '@/components/ui/form-success';

export default function SignupForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const submitHandler = (values: z.infer<typeof signupSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data.success);
          }
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const hasEmailError = form.formState.errors.email != undefined;
  const hasPasswordError = form.formState.errors.password != undefined;
  const hasNameError = form.formState.errors.name != undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex w-full flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    'font-medium',
                    hasNameError ? 'text-destructive' : 'text-gray-100'
                  )}
                >
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="test01"
                    type="text"
                    className={cn(
                      'bg-transparent text-gray-200 placeholder:text-gray-400',
                      hasNameError ? 'border-destructive' : 'border-gray-200'
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="bg-transparent font-semibold text-gray-100"
          disabled={
            hasEmailError || hasPasswordError || hasNameError || isPending
          }
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Signup'}
        </Button>
      </form>
    </Form>
  );
}
