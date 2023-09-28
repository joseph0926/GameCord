import Gradient from '@/components/home/Gradient';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center max-md:flex-col max-md:gap-8">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 max-md:mt-8">
        <Gradient />
        <h1 className="animate-text-gradient text-5xl font-bold fill-mode-forwards md:text-6xl">TripCord</h1>
        <p className="text-zinc-400">여행의 모든 순간을 라이브로 공유하고, 동행자와의 소중한 추억을 여기서 만들어보세요.</p>
      </div>
      <div className="mb-8 flex-1 md:mb-0">{children}</div>
    </div>
  );
};

export default AuthLayout;
