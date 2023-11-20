'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FilterProps = {
  containerClassName?: string;
  otherClassName?: string;
  filters: {
    name: string;
    value: string;
  }[];
};

const Filter = ({ containerClassName, otherClassName, filters }: FilterProps) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <Select>
        <SelectTrigger
          className={`${otherClassName} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select filter,,," />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
