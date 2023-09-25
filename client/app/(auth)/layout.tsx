import Gradient from '@/components/home/Gradient';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center max-md:flex-col">
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <Gradient />
        <h1 className="animate-text-gradient text-5xl font-bold fill-mode-forwards md:text-6xl">TripCord</h1>
      </div>
      <div className="mb-8 flex-1 md:mb-0">{children}</div>
    </div>
  );
};

export default AuthLayout;
