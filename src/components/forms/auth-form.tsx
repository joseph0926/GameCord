"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { formVariants, inputVariants } from "@/constants/animation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
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

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log(data);
  };

  const buttonText = formType === "SIGN_IN" ? "로그인" : "회원가입";

  return (
    <Form {...form}>
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-8 space-y-5"
      >
        {Object.keys(defaultValues).map((field, index) => (
          <motion.div
            key={field}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <FormField
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {field.name === "email"
                      ? "이메일 주소"
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full py-3 rounded-lg bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {form.formState.isSubmitting
              ? formType === "SIGN_IN"
                ? "로그인 중..."
                : "회원가입 중..."
              : buttonText}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4"
        >
          {formType === "SIGN_IN" ? (
            <>
              계정이 없으신가요?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              >
                로그인
              </Link>
            </>
          )}
        </motion.p>
      </motion.form>
    </Form>
  );
};
