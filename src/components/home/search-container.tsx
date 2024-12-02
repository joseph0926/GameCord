'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useDeferredValue, useMemo, useState } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error/error-boundary';
import { PostList } from '@/components/home/post-list';
import { queryKeys } from '@/lib/query-keys';
import { api } from '@/services/api';
import { PostType } from '@/types/post.type';
import { QueryErrorBoundary } from '../error/query-error';
import { PostSkeleton } from '../loading/post.loading';
import { HomeFilter } from './home-filter';
import { LocalSearch } from './local-search';

interface SearchContainerProps {
  initialQuery: string;
  initialFilter: string;
}

function SearchResults({
  searchQuery,
  filterQuery,
  initialQuery,
  initialFilter,
}: {
  searchQuery: string;
  filterQuery: string;
  initialQuery: string;
  initialFilter: string;
}) {
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredFilterQuery = useDeferredValue(filterQuery);

  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.POSTS.DEFAULT,
    queryFn: api.posts.getAll,
    staleTime: 10 * 1000,
    select: (data) => data.data,
  });

  const filterPosts = (
    posts: PostType[] | undefined,
    query: string,
    filter: string
  ) => {
    return posts?.filter((post) => {
      const matchesQuery = post.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter = filter
        ? post.tags[0].name.toLowerCase() === filter.toLowerCase()
        : true;
      return matchesQuery && matchesFilter;
    });
  };

  const initialFilteredPosts = useMemo(
    () => filterPosts(posts, initialQuery, initialFilter),
    [posts, initialQuery, initialFilter]
  );

  const filteredPosts = useMemo(() => {
    if (
      deferredSearchQuery === initialQuery &&
      deferredFilterQuery === initialFilter
    ) {
      return initialFilteredPosts;
    }

    return filterPosts(posts, deferredSearchQuery, deferredFilterQuery);
  }, [
    posts,
    deferredSearchQuery,
    deferredFilterQuery,
    initialFilteredPosts,
    initialQuery,
    initialFilter,
  ]);

  const isFiltering =
    searchQuery !== deferredSearchQuery || filterQuery !== deferredFilterQuery;

  return <PostList posts={filteredPosts || []} isFiltering={isFiltering} />;
}

export function SearchContainer({
  initialQuery,
  initialFilter,
}: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterQuery, setFilterQuery] = useState(initialFilter);

  return (
    <ErrorBoundary
      fallback={<div>문제가 발생했습니다. 다시 시도해주세요.</div>}
    >
      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="검색"
          otherClasses="flex-1"
          onSearch={setSearchQuery}
        />
      </section>

      <HomeFilter onFilter={setFilterQuery} />

      <QueryErrorBoundary>
        <Suspense fallback={<PostSkeleton count={5} />}>
          <SearchResults
            searchQuery={searchQuery}
            filterQuery={filterQuery}
            initialQuery={initialQuery}
            initialFilter={initialFilter}
          />
        </Suspense>
      </QueryErrorBoundary>
    </ErrorBoundary>
  );
}
