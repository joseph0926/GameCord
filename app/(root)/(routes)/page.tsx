import { getCurrentUser } from '@/actions/user';
import Filter from '@/components/home/Filter';
import HomeFilters from '@/components/home/HomeFilters';
import NoResults from '@/components/home/NoResults';
import PostCard from '@/components/home/PostCard';
import LocalSearchbar from '@/components/layout/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { HomePageFilters } from '@/lib/filters';
import Link from 'next/link';

const DUMMY_QUE = [
  {
    _id: '1',
    title: 'qweqwe axchjzkchzxjc jkadkajskdaljsk qweqwe axchjzkchzxjc jkadkajskdaljsk qweqwe axchjzkchzxjc jkadkajskdaljsk',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' }
    ],
    author: 'Kim',
    upvotes: 10,
    views: 200,
    comments: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z')
  },
  {
    _id: '2',
    title: 'askjdalksjdlkasjflkasjflkasfasfasf',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' }
    ],
    author: 'Kim',
    upvotes: 10,
    views: 200,
    comments: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z')
  }
];

const MainPage = async () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-col sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Posts</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">게시글 작성</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="search,,," 
          otherClassName="flex-1"
        />
        <Filter filters={HomePageFilters} otherClassName="min-h-[56px] sm:min-w-[170px]" containerClassName="hidden max-md:flex" />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {DUMMY_QUE.length > 0 ? (
          DUMMY_QUE.map((q) => (
            <PostCard
              key={q._id}
              _id={q._id}
              title={q.title}
              tags={q.tags}
              author={q.author}
              comments={q.comments}
              upvotes={q.upvotes}
              views={q.views}
              createdAt={q.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="해당 게시글을 찾을 수 없습니다,,,"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deleniti doloribus fugiat aspernatur"
            href="/"
            linkTitle="게시글 작성하러가기"
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
