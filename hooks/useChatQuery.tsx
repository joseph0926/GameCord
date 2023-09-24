import qs from 'query-string';
import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSocket } from '@/providers/socket-provider';

type ChatQueryProps = {
  queryKey: string;
  apiUrl: string;
  paramKey: 'channelId' | 'groupMessageId';
  paramValue: string;
};

export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const params = useParams();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue
        }
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getPreviousPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
