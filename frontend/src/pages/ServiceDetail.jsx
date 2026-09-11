import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

const getImageForService = (id) => {
  const images = [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000'
  ];
  return images[id % images.length];
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mv = useMotionVariants();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.getService(slug);
        setService(data);
      } catch (err) {
        setError('Service record not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>;
  }

  if (error || !service) {
    return (
      <div className="section container text-center pt-32">
        <div className="alert alert-error max-w-2xl mx-auto mb-6">{error}</div>
        <button onClick={() => navigate('/services')} className="btn btn-outline">
          Return to Expertise
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16">
        <motion.div 
          className="absolute inset-0 z-0"
          variants={mv.imageScaleFade}
          initial="hidden"
          whileInView="visible"
          viewport={mv.viewportConfig}
        >
          <img 
            src={getImageForService(service.id)} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors font-bold uppercase text-xs tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              <ArrowLeft size={16} /> All Expertise
            </Link>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {service.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl leading-relaxed"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {service.short_description}
          </motion.p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <motion.div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16" 
            style={{whiteSpace: 'pre-line'}}
            variants={mv.textFade}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {service.full_description}
          </motion.div>
            
          <motion.div 
            className="bg-gray-50 p-10 md:p-16 border border-gray-200 text-center rounded-lg shadow-sm"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <h3 className="text-3xl font-bold text-primary mb-4">Require Action on This Service?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Lodge a formal inquiry with our experts to discuss how this specific protocol applies to your organization.
            </p>
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn btn-primary px-8 py-4">
              Initiate Inquiry
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
