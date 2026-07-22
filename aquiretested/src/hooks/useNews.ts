import { useInfiniteQuery } from '@tanstack/react-query';
import { getNews } from '../services/newsApi';

export function useNews() {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam, signal }) => getNews(pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchInterval: 900000,
    retry: 2,
  });
}
