import ServerCard from '@/components/home/ServerCard';

const HomePage = () => {
  return (
    <section className="mb-16 flex w-full flex-col justify-start p-4">
      <h1>Category</h1>
      <div className="flex items-center gap-2">
        <ServerCard />
        <ServerCard />
        <ServerCard />
        <ServerCard />
      </div>
      <h1>LoadMore</h1>
    </section>
  );
};

export default HomePage;
