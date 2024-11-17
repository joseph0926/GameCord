import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '@/constants/routes';
import { hotPosts, popularTags } from '@/constants/layout';
import { TagCard } from '../card/tag-card';

export const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">인기 게시글</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotPosts.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
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
