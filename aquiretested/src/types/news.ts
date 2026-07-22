export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  nextPage?: number;
}
