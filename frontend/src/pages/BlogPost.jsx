import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft } from 'lucide-react';

const getReadTime = (text) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await api.getBlogPost(slug);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Article not found or is no longer available.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size={50} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <button onClick={() => navigate('/blog')} className="btn btn-primary">
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-accent transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-accent/10 border border-accent/30 text-primary text-sm font-bold uppercase tracking-wider rounded-md">
              {post.category}
            </span>
            <span className="text-sm text-gray-400 font-medium">
              {getReadTime(post.content)} min read
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{post.author}</span>
            <span>•</span>
            <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
            <img 
              src={post.cover_image_url} 
              alt={post.title} 
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="prose prose-lg prose-navy max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

      </div>
    </div>
  );
};
