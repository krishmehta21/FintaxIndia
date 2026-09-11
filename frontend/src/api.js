const BASE_URL = 'http://localhost:8000';

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
};
