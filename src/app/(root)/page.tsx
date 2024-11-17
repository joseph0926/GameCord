import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { posts } from '@/constants/layout';
import { ROUTES } from '@/constants/routes';
import { PostCard } from '@/components/card/post-card';
import { HomeFilter } from '@/components/home/home-filter';
import { LocalSearch } from '@/components/home/local-search';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query = '', filter = '' } = await searchParams;

  const filteredPosts = posts.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter
      ? post.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Posts
        </h1>
        <Button
          variant="default"
          className="primary-gradient min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.CREATE_POST}>Create Post</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="Search posts..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
