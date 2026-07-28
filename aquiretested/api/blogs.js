import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  // CORS & Header settings
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const jsonPath = join(process.cwd(), 'data', 'blogs.json');
    const fileData = readFileSync(jsonPath, 'utf8');
    let blogs = JSON.parse(fileData);

    const { category, query, id } = req.query || {};

    if (id) {
      const singleBlog = blogs.find(b => b.id === id || b.slug === id);
      if (!singleBlog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      return res.status(200).json({ blog: singleBlog });
    }

    if (category && category !== 'All') {
      blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      blogs = blogs.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs API:', error);
    return res.status(500).json({ error: 'Failed to fetch blogs data' });
  }
}
