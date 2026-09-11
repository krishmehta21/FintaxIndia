import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, MessageCircleQuestion, Briefcase, Quote, Mail, LogOut, Landmark } from 'lucide-react';

export const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-inverse flex flex-col" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-accent" style={{color: 'var(--color-accent)'}}>
            <Landmark size={24} /> FinTax Admin
          </Link>
        </div>
        
        <nav className="flex-grow flex flex-col gap-2 px-4 mt-6">
          <NavLink to="/admin" end className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/qa" className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}>
            <MessageCircleQuestion size={20} /> Q&A
          </NavLink>
          <NavLink to="/admin/services" className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}>
            <Briefcase size={20} /> Services
          </NavLink>
          <NavLink to="/admin/testimonials" className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}>
            <Quote size={20} /> Testimonials
          </NavLink>
          <NavLink to="/admin/contact-submissions" className={({isActive}) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}>
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
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm flex justify-between items-center" style={{borderColor: 'var(--color-border)'}}>
          <h2 className="text-xl font-semibold text-primary">Admin Portal</h2>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">View Live Site</a>
        </header>
        <div className="flex-grow p-8 overflow-y-auto" style={{backgroundColor: 'var(--color-bg-alt)'}}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
