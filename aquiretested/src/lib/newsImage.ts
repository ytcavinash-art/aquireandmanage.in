import type { SyntheticEvent } from 'react';

export const DEFAULT_NEWS_IMAGE_URL =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';

const ERROR_NEWS_IMAGE_URL =
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop';

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
  event.currentTarget.src = ERROR_NEWS_IMAGE_URL;
}
