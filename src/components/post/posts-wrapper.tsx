import { PostsWithData } from '@/actions/post';
import PostCard from '../home/PostCard';
import NoResults from '../home/NoResults';

interface PostsProps {
  fetchData: () => Promise<PostsWithData[] | null>;
  isShowImage?: boolean;
}

export default async function PostsWrapper({ fetchData, isShowImage }: PostsProps) {
  const posts = await fetchData();

  if (!posts || posts.length === 0) {
    return (
      <NoResults
        title="해당 게시글을 찾을 수 없습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/create-post"
        linkTitle="게시글 작성하러가기"
        isShowImage={isShowImage}
      />
    );
  }
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {posts.map((q) => (
        <PostCard
          key={q.id}
          id={q.id}
          title={q.title}
          tags={q.tags}
          author={q.author}
          comments={q.comments}
          votes={q.votes}
          views={q.views}
          createdAt={q.createdAt}
        />
      ))}
    </div>
  );
}
