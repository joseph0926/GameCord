import { LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/auth/login-button';

export default function AuthPage() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="flex items-center justify-center gap-4 text-6xl font-semibold text-white drop-shadow-md">
        <LockKeyhole className="h-16 w-16 text-sky-300" /> Auth
      </h1>
      <p className="text-lg text-white">회원가입 또는 로그인을 진행해주세요!</p>
      <div>
        <LoginButton>
          <Button variant="secondary" size="lg">
            로그인
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
