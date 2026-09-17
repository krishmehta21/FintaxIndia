import { supabase } from './lib/supabase';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No active session');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`
  };
};

export const adminApi = {
  // Services
  getServices: async () => {
    const res = await fetch(`${BASE_URL}/admin/services`, { headers: await getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },
  createService: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/services`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  },
  updateService: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/services/${id}`, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },
  deleteService: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/services/${id}`, {
      method: 'DELETE',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return true;
  },

  // Q&A
  getQA: async (status = '', category = '') => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    const res = await fetch(`${BASE_URL}/admin/qa${queryString}`, { headers: await getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch Q&A');
    return res.json();
  },
  updateQA: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/qa/${id}`, {
      method: 'PATCH',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update Q&A');
    return res.json();
  },
  createQA: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/qa`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create Q&A');
    return res.json();
  },
  deleteQA: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/qa/${id}`, {
      method: 'DELETE',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete Q&A');
    return true;
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${BASE_URL}/admin/testimonials`, { headers: await getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },
  createTestimonial: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/testimonials`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return res.json();
  },
  updateTestimonial: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update testimonial');
    return res.json();
  },
  deleteTestimonial: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    return true;
  },

  // Contact Submissions
  getContactSubmissions: async () => {
    const res = await fetch(`${BASE_URL}/admin/contact-submissions`, { headers: await getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch contact submissions');
    return res.json();
  },

  // Blog
  getBlogPosts: async () => {
    const res = await fetch(`${BASE_URL}/admin/blog`, { headers: await getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },
  createBlogPost: async (data) => {
    const res = await fetch(`${BASE_URL}/admin/blog`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create blog post');
    return res.json();
  },
  updateBlogPost: async (id, data) => {
    const res = await fetch(`${BASE_URL}/admin/blog/${id}`, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update blog post');
    return res.json();
  },
  deleteBlogPost: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete blog post');
    return true;
  },
  uploadBlogImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const headers = await getAuthHeaders();
    delete headers['Content-Type']; // Let browser set multipart boundary
    
    const res = await fetch(`${BASE_URL}/admin/blog/upload-image`, {
      method: 'POST',
      headers,
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  }
};
