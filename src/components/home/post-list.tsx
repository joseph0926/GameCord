import { PostCard } from '@/components/card/post-card';
import { cn } from '@/lib/utils';
import type { PostType } from '@/types/post.type';

interface PostListProps {
  posts: PostType[];
  isFiltering: boolean;
}

export function PostList({ posts, isFiltering }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-2">
        <p className="text-gray-600 dark:text-gray-400">No posts found</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Try different search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mt-10 flex w-full flex-col gap-6 transition-opacity duration-300',
        isFiltering ? 'opacity-60' : 'opacity-100'
      )}
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
