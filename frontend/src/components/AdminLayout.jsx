import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, MessageCircleQuestion, Briefcase, Quote, Mail, LogOut, Menu, X, FileText } from 'lucide-react';
import { CustomLogo } from './Logo';

export const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  const navLinkClass = ({isActive}) => 
    `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-primary text-white flex flex-col transform transition-transform duration-200 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/admin" className="inline-block mt-2">
            <CustomLogo dark={true} />
          </Link>
          <button className="md:hidden text-white p-1" onClick={closeSidebar} aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-grow flex flex-col gap-2 px-4 mt-6">
          <NavLink to="/admin" end className={navLinkClass} onClick={closeSidebar}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/blog" className={navLinkClass} onClick={closeSidebar}>
            <FileText size={20} /> Blog Posts
          </NavLink>
          <NavLink to="/admin/qa" className={navLinkClass} onClick={closeSidebar}>
            <MessageCircleQuestion size={20} /> Q&A
          </NavLink>
          <NavLink to="/admin/services" className={navLinkClass} onClick={closeSidebar}>
            <Briefcase size={20} /> Services
          </NavLink>
          <NavLink to="/admin/testimonials" className={navLinkClass} onClick={closeSidebar}>
            <Quote size={20} /> Testimonials
          </NavLink>
          <NavLink to="/admin/contact-submissions" className={navLinkClass} onClick={closeSidebar}>
            <Mail size={20} /> Contacts
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-4 truncate">{user?.email}</p>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full p-2 text-sm text-gray-300 hover:text-white transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 text-primary hover:bg-gray-100 rounded-md" 
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-primary">Admin Portal</h2>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">View Live Site</a>
        </header>
        <div className="flex-grow p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
