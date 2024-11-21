'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence,motion } from 'framer-motion';
import Link from 'next/link';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z, ZodType } from 'zod';
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
import { ROUTES } from '@/constants/routes';

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: 'SIGN_IN' | 'SIGN_UP';
}

export const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === 'SIGN_IN' ? '로그인' : '회원가입';

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence>
          {Object.keys(defaultValues).map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2.5">
                    <FormLabel className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                      {field.name === 'email'
                        ? '이메일'
                        : field.name === 'password'
                          ? '비밀번호'
                          : field.name === 'username'
                            ? '사용자명'
                            : field.name === 'name'
                              ? '이름'
                              : field.name.charAt(0).toUpperCase() +
                                field.name.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          required
                          type={field.name === 'password' ? 'password' : 'text'}
                          {...field}
                          className="min-h-12 rounded-md border border-zinc-200 bg-zinc-50/50 text-base text-zinc-700 backdrop-blur-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                        />
                        <div className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-blue-600/10 to-violet-600/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            disabled={form.formState.isSubmitting}
            className="min-h-12 w-full rounded-md bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-900/30 dark:hover:shadow-blue-900/40"
          >
            {form.formState.isSubmitting
              ? buttonText === '로그인'
                ? '로그인 중...'
                : '가입 중...'
              : buttonText}
          </Button>
        </motion.div>

        <motion.p
          className="text-zinc-600 dark:text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {formType === 'SIGN_IN' ? (
            <>
              계정이 없으신가요?{' '}
              <Link
                href={ROUTES.SIGN_UP}
                className="relative inline-block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text font-semibold text-transparent transition-all hover:from-blue-500 hover:to-violet-500"
              >
                회원가입
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 transition-all hover:opacity-100" />
              </Link>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <Link
                href={ROUTES.SIGN_IN}
                className="relative inline-block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text font-semibold text-transparent transition-all hover:from-blue-500 hover:to-violet-500"
              >
                로그인
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 transition-all hover:opacity-100" />
              </Link>
            </>
          )}
        </motion.p>
      </motion.form>
    </Form>
  );
};
