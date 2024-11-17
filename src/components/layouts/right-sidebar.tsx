import Link from 'next/link';
import React from 'react';
import { ROUTES } from '@/constants/routes';
import { hotPosts, popularTags } from '@/constants/layout';
import { TagCard } from '../card/tag-card';
import { ChevronRight } from 'lucide-react';

export const RightSidebar = () => {
  return (
    <section className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l border-gray-200 bg-white p-6 pt-36 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
          인기 게시글
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotPosts.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                {title}
              </p>

              <ChevronRight
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
          Popular Tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, posts }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              posts={posts}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};
