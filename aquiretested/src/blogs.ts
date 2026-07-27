export interface Blog {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
    category: string;
    content: string;
}

export const blogs: Blog[] = [
    {
        id: 1,
        slug: 'mumbai-sra-policy-2026',
        title: 'Mumbai SRA Policy 2026',
        description: 'Latest updates on Mumbai SRA redevelopment policy and implementation.',
        image: '/images/hero-poster.jpg',
        author: 'A&M Advisory',
        date: '22 July 2026',
        category: 'SRA',
        content: `
      <h2>Mumbai SRA Policy 2026</h2>

      <p>
      This is the first sample blog article.
      </p>

      <p>
      Later this content will come from Supabase automatically.
      </p>
    `,
    },
];
