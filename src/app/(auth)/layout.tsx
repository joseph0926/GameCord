const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-tl from-green-100 to-indigo-800 lg:h-screen lg:!flex-row lg:overflow-y-hidden">
      {children}
    </div>
  );
};

export default AuthLayout;
