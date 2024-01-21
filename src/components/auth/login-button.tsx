"use client";

import { useRouter } from "next/navigation";

type LoginButtonProps = React.PropsWithChildren<{
  mode?: "modal" | "redirect";
  asChild?: boolean;
}>;

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const loginButtonHandler = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span></span>;
  }

  return (
    <span onClick={loginButtonHandler} className="cursor-pointer">
      {children}
    </span>
  );
}
