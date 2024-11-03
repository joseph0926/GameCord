"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/auth.action";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import ROUTES from "@/constants/routes";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verificationState, setVerificationState] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setVerificationState("error");
        setError("유효하지 않은 토큰입니다.");
        return;
      }

      try {
        const response = await verifyEmail(token);
        if (response.success) {
          setVerificationState("success");
          toast.success("이메일이 성공적으로 인증되었습니다.");
        } else {
          setVerificationState("error");
          setError(response.error?.message || "인증에 실패했습니다.");
        }
      } catch (err) {
        console.error(err);
        setVerificationState("error");
        setError("인증 처리 중 오류가 발생했습니다.");
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-full max-w-md p-6 space-y-4">
      <div className="text-center space-y-2">
        {verificationState === "loading" && (
          <>
            <Loader2 className="w-10 h-10 mx-auto animate-spin text-blue-500" />
            <h2 className="text-xl font-semibold">이메일 인증 중...</h2>
            <p className="text-slate-600 dark:text-slate-400">
              잠시만 기다려주세요.
            </p>
          </>
        )}

        {verificationState === "success" && (
          <>
            <svg
              className="w-12 h-12 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-xl font-semibold text-green-600">
              이메일이 성공적으로 인증되었습니다!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              이제 로그인하실 수 있습니다.
            </p>
            <Button
              className="mt-4"
              onClick={() => router.push(ROUTES.SIGN_IN)}
            >
              로그인하기
            </Button>
          </>
        )}

        {verificationState === "error" && (
          <>
            <svg
              className="w-12 h-12 mx-auto text-rose-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-xl font-semibold text-rose-600">
              이메일 인증 실패
            </h2>
            <p className="text-slate-600 dark:text-slate-400">{error}</p>
            <div className="space-y-2 mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(ROUTES.SIGN_IN)}
              >
                로그인 페이지로 이동
              </Button>
              <Link href={ROUTES.HOME} className="block">
                <Button variant="ghost" className="w-full">
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
