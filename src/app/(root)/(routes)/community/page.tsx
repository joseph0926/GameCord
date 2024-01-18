import Filter from '@/components/home/Filter';
import { GameFilters } from '@/lib/filters';
import React from 'react';

const CommunityPage = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-col sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Games</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Filter filters={GameFilters} otherClassName="min-h-[56px] sm:min-w-[170px]" containerClassName="hidden max-md:flex" />
      </div>
      <section className="mt-12 flex flex-wrap gap-4"></section>
    </>
  );
};

export default CommunityPage;
