import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Eye, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.3 } }
};

const CATEGORIES = [
  'All',
  'GST Updates',
  'ITR Filing',
  'Tax Saving Tips',
  'Compliance Alerts',
  'Corporate Advisory',
  'General Finance'
];

const getReadTime = (text) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const Blog = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Posts (Grid + Featured if needed)
  useEffect(() => {
    let active = true;
    const loadContent = async () => {
      setLoading(true);
      try {
        let excludeIds = [];
        let featured = featuredPosts;
        
        // Fetch featured on 'All' category if we haven't yet
        if (activeCategory === 'All' && featuredPosts.length === 0) {
           featured = await api.getFeaturedBlogPosts();
           if (active) setFeaturedPosts(featured);
        }
        
        if (activeCategory === 'All' && featured.length >= 3) {
           excludeIds = featured.map(p => p.id);
        }

        const catParam = activeCategory === 'All' ? '' : activeCategory;
        const data = await api.getBlogPosts(catParam, 1, excludeIds);
        
        if (active) {
          setPosts(data);
          setPage(1);
          setHasMore(data.length === 6);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadContent();
    return () => { active = false; };
  }, [activeCategory]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const catParam = activeCategory === 'All' ? '' : activeCategory;
      let excludeIds = [];
      if (activeCategory === 'All' && featuredPosts.length >= 3) {
         excludeIds = featuredPosts.map(p => p.id);
      }
      const data = await api.getBlogPosts(catParam, nextPage, excludeIds);
      setPosts(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === 6);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderCard = (post, isFeatured = false) => (
    <motion.div key={post.id} variants={itemVariants} className={isFeatured ? '' : 'h-full'}>
      <Link to={`/blog/${post.slug}`} className={`group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full ${isFeatured ? 'md:flex-row md:h-auto' : ''}`}>
        {post.cover_image_url ? (
          <div className={`overflow-hidden shrink-0 ${isFeatured ? 'md:w-5/12 h-64 md:h-auto' : 'h-48'}`}>
            <img 
              src={post.cover_image_url} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        ) : (
          <div className={`bg-primary/5 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 shrink-0 ${isFeatured ? 'md:w-5/12 h-64 md:h-auto' : 'h-48'}`}>
            <span className="text-primary/20 text-4xl font-bold">FinTax</span>
          </div>
        )}
        <div className={`flex flex-col flex-grow ${isFeatured ? 'p-8 md:p-10 lg:p-12 justify-center' : 'p-6'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/30 text-primary text-xs font-bold uppercase tracking-wider rounded-md">
              {post.category}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {getReadTime(post.excerpt)} min read
            </span>
          </div>
          <h2 className={`${isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'} font-bold text-primary group-hover:text-accent transition-colors line-clamp-2`}>
            {post.title}
          </h2>
          <p className={`text-gray-600 ${isFeatured ? 'text-base md:text-lg line-clamp-3 mb-8' : 'text-sm line-clamp-3 mb-6'} flex-grow`}>
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="text-sm font-medium text-gray-900">{post.author}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye size={14} /> {post.view_count || 0}
              </span>
              <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          {isFeatured && (
             <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:text-primary transition-colors">
               Read Article <ArrowRight size={16} />
             </div>
          )}
        </div>
      </Link>
    </motion.div>
  );

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

        {/* Featured Section */}
        {activeCategory === 'All' && featuredPosts.length >= 3 && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 flex items-center gap-3">
              <Sparkles className="text-accent" size={28} /> 
              Top Reads
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </h2>
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
              {/* Top Featured Post */}
              {renderCard(featuredPosts[0], true)}
              {/* Next 2 Featured Posts side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.slice(1, 3).map(post => renderCard(post, false))}
              </div>
            </motion.div>
          </div>
        )}

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
          <>
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map(post => renderCard(post, false))}
            </motion.div>
            
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={loadMore} 
                  disabled={loadingMore}
                  className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-primary hover:border-gray-400 px-8 disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
