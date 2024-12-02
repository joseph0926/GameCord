'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useDeferredValue, useState } from 'react';
import { ErrorBoundary } from '@/components/error/error-boundary';
import { PostList } from '@/components/home/post-list';
import { queryKeys } from '@/lib/query-keys';
import { api } from '@/services/api';
import { APIResponse } from '@/types/api.type';
import { PostType } from '@/types/post.type';
import { QueryErrorBoundary } from '../error/query-error';
import { HomeFilter } from './home-filter';
import { LocalSearch } from './local-search';

const filterPosts = (
  posts: PostType[] | undefined,
  query: string,
  filter: string
) => {
  return posts?.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter
      ? post.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });
};

interface SearchContainerProps {
  initialQuery: string;
  initialFilter: string;
}

export function SearchContainer({
  initialQuery,
  initialFilter,
}: SearchContainerProps) {
  const [filters, setFilters] = useState({
    search: initialQuery,
    filter: initialFilter,
  });
  const deferredFilters = useDeferredValue(filters);

  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.POSTS.DEFAULT,
    queryFn: api.posts.getAll,
    staleTime: 3 * 60 * 1000,
    select: useCallback(
      (data: APIResponse<PostType[]>) => {
        return filterPosts(
          data.data,
          deferredFilters.search,
          deferredFilters.filter
        );
      },
      [deferredFilters]
    ),
  });

  const isFiltering = filters !== deferredFilters;

  return (
    <ErrorBoundary
      fallback={<div>문제가 발생했습니다. 다시 시도해주세요.</div>}
    >
      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="검색"
          otherClasses="flex-1"
          onSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
        />
      </section>

      <HomeFilter
        onFilter={(filter) => setFilters((prev) => ({ ...prev, filter }))}
      />

      <QueryErrorBoundary>
        <PostList posts={posts || []} isFiltering={isFiltering} />
      </QueryErrorBoundary>
    </ErrorBoundary>
  );
}
