import { ReactNode } from "react";
import { AuthWrapper } from "@/components/auth/auth.wrapper";
import { AuthBg } from "@/components/auth/auth-bg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <AuthBg />
      <AuthWrapper>{children}</AuthWrapper>
    </main>
  );
};

export default AuthLayout;
