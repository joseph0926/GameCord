import { Suspense } from 'react';
import PostWrapper from '@/components/post/post-wrapper';
import { Loader2 } from 'lucide-react';
import { BoxLoading, ListLoading } from '@/components/ui/list-loading';
import { PostsWithData, getPost } from '@/actions/post';
import Comments from '@/components/post/Comments';
import CommentForm from '@/components/post/CommentForm';
import NoResults from '@/components/home/NoResults';

export interface PostProps {
  post?: PostsWithData | null;
  params: { postId: string };
  searchParams: { [key: string]: string | undefined };
}

function PostLoading() {
  return (
    <div className="flex flex-col">
      <Loader2 className="float-left mb-10 h-6 w-6 animate-spin" />
      <div className="mb-6">
        <ListLoading num={1} />
      </div>
      <BoxLoading />
    </div>
  );
}

const PostPage = async ({ params, searchParams }: PostProps) => {
  const post = await getPost({ postId: params.postId });
  if (!post) {
    return (
      <NoResults
        title="게시글이 존재하지 않습니다,,,"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
        href="/"
        linkTitle="홈으로 돌아가기"
        isShowImage={true}
      />
    );
  }

  return (
    <Suspense fallback={<PostLoading />}>
      <PostWrapper params={params} searchParams={searchParams} post={post} />
      <Comments postId={post.id} totalComments={post.comments.length} page={searchParams?.page} filter={searchParams?.filter} />
      <CommentForm postId={post.id} />
    </Suspense>
  );
};

export default PostPage;
