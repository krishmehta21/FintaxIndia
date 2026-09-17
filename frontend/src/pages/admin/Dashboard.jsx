import React, { useEffect, useState } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';
import { MessageCircleQuestion, Mail, Briefcase, Quote, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    pendingQa: 0,
    recentContacts: 0,
    publishedServices: 0,
    publishedTestimonials: 0,
    publishedBlogPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [qa, contacts, services, testimonials, blogs] = await Promise.all([
          adminApi.getQA('pending'),
          adminApi.getContactSubmissions(),
          adminApi.getServices(),
          adminApi.getTestimonials(),
          adminApi.getBlogPosts()
        ]);

        const recentContactsCount = contacts.filter(c => {
          const date = new Date(c.created_at);
          const now = new Date();
          const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        }).length;

        setStats({
          pendingQa: qa.length,
          recentContacts: recentContactsCount,
          publishedServices: services.filter(s => s.is_published).length,
          publishedTestimonials: testimonials.filter(t => t.is_published).length,
          publishedBlogPosts: blogs.filter(b => b.status === 'published').length
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner size={40} className="mt-20" />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending QA */}
        <Link to="/admin/qa" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Pending Q&A</h3>
            <div className={`p-3 rounded-full ${stats.pendingQa > 0 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
              <MessageCircleQuestion size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">{stats.pendingQa}</p>
          <p className="text-sm text-gray-500 mt-2">Requires your attention</p>
        </Link>

        {/* Recent Contacts */}
        <Link to="/admin/contact-submissions" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Recent Contacts</h3>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Mail size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">{stats.recentContacts}</p>
          <p className="text-sm text-gray-500 mt-2">In the last 7 days</p>
        </Link>

        {/* Services */}
        <Link to="/admin/services" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Published Services</h3>
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <Briefcase size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">{stats.publishedServices}</p>
          <p className="text-sm text-gray-500 mt-2">Active on website</p>
        </Link>

        {/* Testimonials */}
        <Link to="/admin/testimonials" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Published Testimonials</h3>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <Quote size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">{stats.publishedTestimonials}</p>
          <p className="text-sm text-gray-500 mt-2">Active on website</p>
        </Link>

        {/* Blog Posts */}
        <Link to="/admin/blog" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Published Articles</h3>
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
              <FileText size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">{stats.publishedBlogPosts}</p>
          <p className="text-sm text-gray-500 mt-2">Active on website</p>
        </Link>
      </div>
    </div>
  );
};
