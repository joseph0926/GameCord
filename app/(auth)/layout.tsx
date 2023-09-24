import Gradient from '@/components/home/Gradient';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center md:flex-row">
      <Gradient />
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <h1 className="animate-text-gradient text-5xl font-bold fill-mode-forwards md:text-6xl">TripCord</h1>
      </div>
      <div className="mb-8 flex-1 md:mb-0">{children}</div>
    </div>
  );
};

export default AuthLayout;
