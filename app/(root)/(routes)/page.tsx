import { getPosts } from '@/actions/post';
import Filter from '@/components/home/Filter';
import HomeFilters from '@/components/home/HomeFilters';
import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import LocalSearchbar from '@/components/layout/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/lib/filters';
import Link from 'next/link';

const MainPage = async () => {
  const { posts } = await getPosts({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-col sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Posts</h1>
        <Link href="/create-post" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">게시글 작성</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar route="/" iconPosition="left" imgSrc="/assets/icons/search.svg" placeholder="search,,," otherClassName="flex-1" />
        <Filter filters={HomePageFilters} otherClassName="min-h-[56px] sm:min-w-[170px]" containerClassName="hidden max-md:flex" />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((q) => (
            <PostCard
              key={q.id}
              id={q.id}
              title={q.title}
              tags={q.tags}
              author={q.author}
              comments={[]}
              upvotes={12}
              views={q.views}
              createdAt={q.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="해당 게시글을 찾을 수 없습니다,,,"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
            href="/create-post"
            linkTitle="게시글 작성하러가기"
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
