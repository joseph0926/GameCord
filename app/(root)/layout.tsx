import MainNavbar from '@/components/layout/MainNavbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainNavbar />
      {children}
      Footer
    </div>
  );
};

export default MainLayout;
