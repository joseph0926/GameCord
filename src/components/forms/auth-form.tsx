"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { register } from "@/actions/auth.action";
import { signInSchema, signUpSchema } from "@/schemas/auth.schema";

type SignInFormValues = z.infer<typeof signInSchema>;

type SignUpFormValues = z.infer<typeof signUpSchema>;

type FormValues = SignInFormValues | SignUpFormValues;

interface AuthFormProps {
  formType: "SIGN_IN" | "SIGN_UP";
}

export const AuthForm = ({ formType }: AuthFormProps) => {
  const router = useRouter();

  const schema = formType === "SIGN_IN" ? signInSchema : signUpSchema;
  const defaultValues =
    formType === "SIGN_IN"
      ? ({
          email: "",
          password: "",
        } as SignInFormValues)
      : ({
          email: "",
          password: "",
          name: "",
          username: "",
        } as SignUpFormValues);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      if (formType === "SIGN_UP") {
        const response = await register(data as SignUpFormValues);

        if (!response.success) {
          throw new Error(
            response.error?.message || "회원가입에 실패했습니다."
          );
        }

        toast.success("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
        router.push(ROUTES.SIGN_IN);
      } else {
        const result = await signIn("credentials", {
          email: (data as SignInFormValues).email,
          password: (data as SignInFormValues).password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        toast.success("로그인되었습니다.");
        router.push(ROUTES.HOME);
        router.refresh();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "오류가 발생했습니다."
      );
    }
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
              name={field as Path<FormValues>}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {getFieldLabel(field.name)}
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

function getFieldLabel(fieldName: string): string {
  const labels: Record<string, string> = {
    email: "이메일 주소",
    password: "비밀번호",
    name: "이름",
    username: "사용자 이름",
  };
  return labels[fieldName] || fieldName;
}
