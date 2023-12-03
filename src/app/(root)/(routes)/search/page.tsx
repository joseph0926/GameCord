import { redirect } from 'next/navigation';
import PostsWrapper from '@/components/post/posts-wrapper';
import { getSearchPosts } from '@/actions/post';
import { Suspense } from 'react';
import { ListLoading } from '@/components/ui/list-loading';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;
  if (!term) {
    redirect('/');
  }

  return (
    <Suspense fallback={<ListLoading num={5} />}>
      <PostsWrapper fetchData={() => getSearchPosts(term)} />
    </Suspense>
  );
}
