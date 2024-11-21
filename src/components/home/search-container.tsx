'use client';

import { useDeferredValue, useMemo,useState } from 'react';
import { PostList } from '@/components/home/post-list';
import type { PostType } from '@/types/post.type';
import { HomeFilter } from './home-filter';
import { LocalSearch } from './local-search';

interface SearchContainerProps {
  initialPosts: PostType[];
  initialFilteredPosts: PostType[];
  initialQuery: string;
  initialFilter: string;
}

export function SearchContainer({
  initialPosts,
  initialFilteredPosts,
  initialQuery,
  initialFilter,
}: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterQuery, setFilterQuery] = useState(initialFilter);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredFilterQuery = useDeferredValue(filterQuery);

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
          placeholder="Search posts..."
          otherClasses="flex-1"
          onSearch={setSearchQuery}
        />
      </section>
      <HomeFilter onFilter={setFilterQuery} />
      <PostList posts={filteredPosts} isFiltering={isFiltering} />
    </>
  );
}
