import type { SyntheticEvent } from 'react';

export const DEFAULT_NEWS_IMAGE_URL =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';

export function getNewsImageUrl(imageUrl?: string) {
  if (!imageUrl) return DEFAULT_NEWS_IMAGE_URL;

  const normalizedUrl = imageUrl.trim();

  if (normalizedUrl.startsWith('http://')) {
    return normalizedUrl.replace(/^http:\/\//, 'https://');
  }

  if (normalizedUrl.startsWith('https://') || normalizedUrl.startsWith('/')) {
    return normalizedUrl;
  }

  return DEFAULT_NEWS_IMAGE_URL;
}

export function useNewsImageFallback(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_NEWS_IMAGE_URL;
}
