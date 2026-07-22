import type { NewsResponse } from '../types/news';

export async function getNews(page = 1, signal?: AbortSignal): Promise<NewsResponse> {
  const response = await fetch(`/api/news?page=${page}`, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json() as Promise<NewsResponse>;
}
