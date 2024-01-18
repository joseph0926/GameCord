import { Skeleton } from '@/components/ui/skeleton';

export function ListLoading({ num }: { num: number }) {
  return (
    <div className="m-4">
      {Array(num)
        .fill(null)
        .map((n, idx) => (
          <Skeleton key={idx} className="mb-8 h-12 w-full" />
        ))}
    </div>
  );
}

export function BoxLoading() {
  return (
    <div className="m-4">
      <Skeleton className="h-52 w-full" />
    </div>
  );
}
