import AuthForm from '@/components/auth/AuthForm';
import Image from 'next/image';

const AuthPage = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image src="/images/logo.png" alt="logo" height={48} width={48} className="mx-auto w-auto" />
      <AuthForm />
    </div>
  );
};

export default AuthPage;
