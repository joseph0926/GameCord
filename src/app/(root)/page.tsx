import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SearchContainer } from '@/components/home/search-container';
import { posts } from '@/constants/layout';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query = '', filter = '' } = await searchParams;

  const initialFilteredPosts = posts.filter((post) => {
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

      <SearchContainer
        initialPosts={posts}
        initialFilteredPosts={initialFilteredPosts}
        initialQuery={query}
        initialFilter={filter}
      />
    </>
  );
}
