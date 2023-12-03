import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import { getGamePost } from '@/actions/post';

export default async function GamePostsWrapper({ gameId }: { gameId: string }) {
  const gamePosts = await getGamePost({ gameId });

  if (!gamePosts) {
    return (
      <NoResults
        title="해당 게시글을 찾을 수 없습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/create-post"
        linkTitle="게시글 작성하러가기"
      />
    );
  }
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        {gamePosts.map((q) => (
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
        ))}
      </div>
    </>
  );
}
