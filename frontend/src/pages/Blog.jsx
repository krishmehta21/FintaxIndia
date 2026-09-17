import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';

const CATEGORIES = [
  "All",
  "GST Updates",
  "ITR Filing",
  "Tax Saving Tips",
  "Compliance Alerts",
  "Corporate Advisory",
  "General Finance"
];

// Rough word count estimator
const getReadTime = (text) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const catParam = activeCategory === "All" ? '' : activeCategory;
        const data = await api.getBlogPosts(catParam);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeCategory]);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Insights & <span className="text-accent">Updates</span>
          </h1>
          <p className="text-lg text-gray-600">
            Expert analysis, compliance alerts, and tax saving strategies from the FinTax India team.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat 
                  ? 'bg-accent text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={40} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-400">No articles found in this category.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {post.cover_image_url ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.cover_image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-primary/5 flex items-center justify-center">
                    <span className="text-primary/20 text-4xl font-bold">FinTax India</span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-sm">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {getReadTime(post.excerpt)} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-sm font-medium text-gray-900">{post.author}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
