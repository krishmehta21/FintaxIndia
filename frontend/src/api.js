const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  getServices: async () => {
    const res = await fetch(`${BASE_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },
  getService: async (slug) => {
    const res = await fetch(`${BASE_URL}/services/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return res.json();
  },
  getQA: async (category = '') => {
    const url = category ? `${BASE_URL}/qa?category=${encodeURIComponent(category)}` : `${BASE_URL}/qa`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch Q&A');
    return res.json();
  },
  submitQA: async (data) => {
    const res = await fetch(`${BASE_URL}/qa/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit question');
    return res.json();
  },
  getTestimonials: async () => {
    const res = await fetch(`${BASE_URL}/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },
  submitContact: async (data) => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit contact form');
    return res.json();
  },
  getBlogPosts: async (category = '', page = 1) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (page) params.append('page', page);
    const queryString = params.toString() ? '?' + params.toString() : '';
    
    const res = await fetch(`${BASE_URL}/blog${queryString}`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },
  getBlogPost: async (slug) => {
    const res = await fetch(`${BASE_URL}/blog/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch blog post');
    return res.json();
  },
  getFeaturedBlogPosts: async () => {
    const res = await fetch(`${BASE_URL}/blog/featured/top`);
    if (!res.ok) throw new Error('Failed to fetch featured posts');
    return res.json();
  },
  incrementBlogView: async (slug) => {
    const res = await fetch(`${BASE_URL}/blog/${slug}/view`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to increment view count');
    return res.json();
  },
  voteBlogPost: async (slug, is_helpful) => {
    const res = await fetch(`${BASE_URL}/blog/${slug}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_helpful })
    });
    if (!res.ok) throw new Error('Failed to vote');
    return res.json();
  }
};