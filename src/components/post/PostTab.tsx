import React from 'react';
import Pagination from '@/components/layout/Pagination';
import { getUserPosts } from '@/actions/post';
import PostCard from '@/components/home/PostCard';
import NoResults from '../home/NoResults';

type PostTabProps = {
  searchParams: { [key: string]: string | undefined };
  profileId: string;
  clerkId: string;
};

const PostTab = async ({ searchParams, profileId, clerkId }: PostTabProps) => {
  const result = await getUserPosts({
    profileId,
    page: searchParams.page ? +searchParams.page : 1
  });

  return (
    <>
      {result.posts.length === 0 && (
        <NoResults
          title="작성된 글 0개"
          description="작성하신 게시글이 존재하지 않습니다."
          href="/create-post"
          linkTitle="게시글 작성하러가기"
        />
      )}
      {result.posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          profileId={clerkId}
          title={post.title}
          tags={post.tags}
          author={post.author}
          upvotes={0}
          views={post.views}
          comments={[]}
          createdAt={post.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result.isNextPosts} />
      </div>
    </>
  );
};

export default PostTab;
