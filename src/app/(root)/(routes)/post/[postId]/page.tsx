import { Suspense } from 'react';
import PostWrapper from '@/components/post/post-wrapper';
import { Loader2 } from 'lucide-react';
import { BoxLoading, ListLoading } from '@/components/ui/list-loading';

export interface PostProps {
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
  return (
    <Suspense fallback={<PostLoading />}>
      <PostWrapper params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default PostPage;
