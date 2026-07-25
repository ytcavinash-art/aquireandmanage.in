export interface ApiBlogPost {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  isAutomated: boolean;
}

const BLOG_API_URL = import.meta.env.VITE_BLOG_API_URL
  || 'https://aquiretested-2.onrender.com/api/blogs';

export async function fetchBlogPosts(signal?: AbortSignal): Promise<ApiBlogPost[]> {
  const response = await fetch(`${BLOG_API_URL}?limit=20`, { signal });
  if (!response.ok) throw new Error('Live blog updates are temporarily unavailable.');
  const data = await response.json();
  return Array.isArray(data.posts) ? data.posts : [];
}
