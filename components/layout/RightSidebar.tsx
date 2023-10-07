import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTag from '@/components/home/RenderTag';
// import { getHotPosts } from '@/lib/actions/post.action';
// import { getTopPopularTags } from '@/lib/actions/tag.actions';

const RightSidebar = async () => {
  // const hotPosts = await getHotPosts();
  // const popularTags = await getTopPopularTags();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">인기글 Top10</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {/* {hotPosts.map((post) => (
            <Link
              href={`/post/${post._id}`}
              key={post._id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p className="body-medium text-dark500_light700">{post.title}</p>
              <Image 
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))} */}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">인기 키워드</h3>
        <div className="mt-7 flex flex-col gap-4">
          {/* {popularTags.map((tag) => (
              <RenderTag 
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalPosts={tag.numberOfPosts}
                showCount
              />
            ))} */}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
