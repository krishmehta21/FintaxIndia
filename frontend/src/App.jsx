import React, { useEffect, Suspense } from 'react';
import { Spinner } from './components/Spinner';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Services = React.lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.ServiceDetail })));
const QA = React.lazy(() => import('./pages/QA').then(m => ({ default: m.QA })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Admin Pages
const Login = React.lazy(() => import('./pages/admin/Login').then(m => ({ default: m.Login })));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const AdminQA = React.lazy(() => import('./pages/admin/AdminQA').then(m => ({ default: m.AdminQA })));
const AdminServices = React.lazy(() => import('./pages/admin/AdminServices').then(m => ({ default: m.AdminServices })));
const AdminTestimonials = React.lazy(() => import('./pages/admin/AdminTestimonials').then(m => ({ default: m.AdminTestimonials })));
const AdminContacts = React.lazy(() => import('./pages/admin/AdminContacts').then(m => ({ default: m.AdminContacts })));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetail />} />
              <Route path="qa" element={<QA />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="qa" element={<AdminQA />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="contact-submissions" element={<AdminContacts />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
