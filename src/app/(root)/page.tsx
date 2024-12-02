import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';
import { Suspense } from 'react';
import { SearchContainer } from '@/components/home/search-container';
import { HomeWidgets } from '@/components/layouts/home-widgets';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { queryKeys } from '@/lib/query-keys';
import { api } from '@/services/api';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query = '', filter = '' } = await searchParams;

  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
  queryClient.prefetchQuery({
    queryKey: queryKeys.POSTS.DEFAULT,
    queryFn: api.posts.getAll,
    staleTime: 10 * 1000,
  });

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <div className="flex-1">
        <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            게임 피드
          </h1>
          <Button
            variant="default"
            className="primary-gradient min-h-[46px] px-4 py-3"
            asChild
          >
            <Link href={ROUTES.CREATE_POST}>새 게시물 작성</Link>
          </Button>
        </section>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={null}>
            <SearchContainer initialQuery={query} initialFilter={filter} />
          </Suspense>
        </HydrationBoundary>
      </div>

      <HomeWidgets />
    </div>
  );
}
