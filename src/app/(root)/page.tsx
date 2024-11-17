import Link from 'next/link';
import { Button } from '@/components/ui/button';
import handleError from '@/lib/error-handler';
import { ValidationError } from '@/lib/http-errors';
import { posts } from '@/constants/layout';
import { ROUTES } from '@/constants/routes';
import { PostCard } from '@/components/card/post-card';
import { HomeFilter } from '@/components/home/home-filter';
import { LocalSearch } from '@/components/home/local-search';

const test = async () => {
  try {
    throw new ValidationError({
      title: ['Required'],
      tags: ['"JavaScript" is not a valid tag.'],
    });
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  await test();

  const { query = '', filter = '' } = await searchParams;

  const filteredQuestions = posts.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter
      ? post.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Posts</h1>

        <Button
          className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Post</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search posts..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
