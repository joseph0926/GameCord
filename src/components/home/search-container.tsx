'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { PostList } from '@/components/home/post-list';
import type { PostType } from '@/types/post.type';
import { HomeFilter } from './home-filter';
import { LocalSearch } from './local-search';
import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

interface SearchContainerProps {
  initialQuery: string;
  initialFilter: string;
}

export function SearchContainer({
  initialQuery,
  initialFilter,
}: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterQuery, setFilterQuery] = useState(initialFilter);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredFilterQuery = useDeferredValue(filterQuery);

  const { data: posts } = useSuspenseQuery({
    queryKey: ['repoData'],
    queryFn: api.posts.getAll,
    staleTime: 10 * 1000,
    select: (data) =>
  })


  const initialFilteredPosts = posts.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter
      ? post.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  const filteredPosts = useMemo(() => {
    if (
      deferredSearchQuery === initialQuery &&
      deferredFilterQuery === initialFilter
    ) {
      return initialFilteredPosts;
    }

    return initialPosts.filter((post) => {
      const matchesQuery = post.title
        .toLowerCase()
        .includes(deferredSearchQuery.toLowerCase());
      const matchesFilter = deferredFilterQuery
        ? post.tags[0].name.toLowerCase() === deferredFilterQuery.toLowerCase()
        : true;
      return matchesQuery && matchesFilter;
    });
  }, [
    deferredSearchQuery,
    deferredFilterQuery,
    initialPosts,
    initialFilteredPosts,
    initialQuery,
    initialFilter,
  ]);

  const isFiltering =
    searchQuery !== deferredSearchQuery || filterQuery !== deferredFilterQuery;

  return (
    <>
      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="검색"
          otherClasses="flex-1"
          onSearch={setSearchQuery}
        />
      </section>
      <HomeFilter onFilter={setFilterQuery} />
      <PostList posts={filteredPosts} isFiltering={isFiltering} />
    </>
  );
}
