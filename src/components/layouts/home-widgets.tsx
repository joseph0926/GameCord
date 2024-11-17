import { hotPosts, popularTags } from '@/constants/layout';
import { ROUTES } from '@/constants/routes';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HomeWidgets() {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-[300px]">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
            인기 게시글
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-500"
            asChild
          >
            <Link href="/hot">더보기</Link>
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {hotPosts.map(({ _id, title }, index) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="group flex items-start gap-3 rounded-md px-1 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                {index + 1}
              </span>
              <p className="line-clamp-2 flex-1 text-sm text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
                {title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
            인기 태그
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-500"
            asChild
          >
            <Link href="/tags">더보기</Link>
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularTags.map(({ _id, name, posts }) => (
            <Link
              key={_id}
              href={`/tags/${name}`}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              #{name}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                {posts}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-50">
          커뮤니티 통계
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              전체 게시글
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              1,234
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">전체 댓글</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              5,678
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">전체 회원</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              890
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
