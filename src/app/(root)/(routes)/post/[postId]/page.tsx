import { getPost } from '@/actions/post';
import { getCurrentUser } from '@/actions/user';
import Metric from '@/components/home/Metric';
import RenderTag from '@/components/home/RenderTag';
import CommentForm from '@/components/post/CommentForm';
import Comments from '@/components/post/Comments';
import ParseHTML from '@/components/post/ParseHTML';
import { paths } from '@/lib/paths';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: { postId: string } }) => {
  const post = await getPost({ postId: params.postId });
  return {
    title: `${post?.title}`
  };
};

const PostPage = async ({ params, searchParams }: { params: { postId: string }; searchParams: { [key: string]: string | undefined } }) => {
  const profile = await getCurrentUser();
  if (!profile || profile === 'null') {
    redirect(paths.auth('IN'));
  }

  const post = await getPost({ postId: params.postId });
  if (!post) {
    redirect(paths.home());
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={paths.profile('USER', post.author.id)} className="flex items-center justify-start gap-1">
            <Image src={post.author.imageUrl} className="rounded-full" width={22} height={22} alt="profile" />
            <p className="paragraph-semibold text-dark300_light700">{post.author.name}</p>
          </Link>
          <div className="flex justify-end"></div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{post.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` posted ${getTimestamp(post.createdAt)}`}
          title=" Posted"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(post.comments.length)}
          title=" Comments"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(post.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={post.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag: any) => (
          <RenderTag key={tag.id} id={tag.id} name={tag.name} showCount={false} />
        ))}
      </div>
      <Comments postId={post.id} totalComments={post.comments.length} page={searchParams?.page} filter={searchParams?.filter} />
      <CommentForm postId={post.id} />
    </>
  );
};

export default PostPage;
