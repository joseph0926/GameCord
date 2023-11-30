import { getPosts } from '@/actions/post';
import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const Posts = async () => {
  return (
    <Suspense
      fallback={
        <div className="mt-10 flex w-full flex-col gap-6">
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[50px] w-full" />
        </div>
      }
    >
      <PostsWrapper />
    </Suspense>
  );
};

const PostsWrapper = async () => {
  const { posts } = await getPosts({});

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {posts.length > 0 ? (
        posts.map((q) => (
          <PostCard
            key={q.id}
            id={q.id}
            title={q.title}
            tags={q.tags}
            author={q.author}
            comments={q.comments}
            upvotes={0}
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
  );
};

export default Posts;
