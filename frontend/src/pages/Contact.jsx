import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';
import { useSEO } from '../hooks/useSEO';

export const Contact = () => {
  useSEO({
    title: 'Contact Us | FinTax India',
    description: 'Get in touch with FinTax India for expert financial and tax advisory. Book a consultation or inquire about our corporate services today.'
  });

  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();
  
  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const magneticProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const [services, setServices] = useState([]);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    service_interest: preselectedService, 
    message: '' 
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services");
      }
    };
    fetchServices();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await api.submitContact(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', service_interest: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Failed to transmit contact form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section ref={heroRef} className="bg-primary text-white py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-top"
          style={{ y: shouldReduceMotion ? 0 : y }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"></div>
        </motion.div>
        <div className="container relative z-10 max-w-4xl text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Initiate Contact
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Submit your requirements below. Our advisory team will review and respond promptly.
          </motion.p>
        </div>
      </section>

      <section className="section -mt-10 relative z-20">
        <div className="container max-w-6xl grid lg:grid-cols-5 gap-8">
          
          {/* Contact Info Panel */}
          <motion.div 
            className="lg:col-span-2 bg-primary text-white p-6 md:p-12 rounded-2xl shadow-xl z-10 relative"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Direct Communication</h3>
            
            <div className="flex flex-col gap-6 md:gap-8">
              <div>
                <p className="text-accent uppercase text-xs font-bold tracking-widest mb-2">Email</p>
                <a href="mailto:contact@fintaxindia.com" className="text-base md:text-lg hover:text-accent transition-colors text-white outline-none focus-visible:ring-2 focus-visible:ring-accent inline-block">
                  contact@fintaxindia.com
                </a>
              </div>
            </div>

            <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/20">
              <p className="text-xs md:text-sm text-gray-400 italic">
                * Consultations by prior appointment only.
              </p>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div 
            className="lg:col-span-3 bg-white p-6 md:p-12 rounded-2xl shadow-xl z-10 relative"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
            transition={{ delay: 0.2 }}
          >
            
            <AnimatePresence>
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="alert alert-success text-center mb-6 md:mb-8 font-semibold"
                >
                  Your inquiry has been successfully submitted. We will be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && <div className="alert alert-error mb-6 md:mb-8 text-center">{submitError}</div>}

            <form onSubmit={handleFormSubmit} className={`transition-opacity duration-300 ${submitSuccess ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label text-sm md:text-base">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required 
                    className="form-control" 
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label text-sm md:text-base">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="form-control" 
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-0">
                <div className="form-group">
                  <label htmlFor="service_interest" className="form-label text-sm md:text-base">Service Required</label>
                  <select 
                    id="service_interest"
                    name="service_interest"
                    className="form-control"
                    value={formData.service_interest}
                    onChange={handleFormChange}
                  >
                    <option value="">General Inquiry</option>
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mb-6 md:mb-8 mt-4 md:mt-0">
                <label htmlFor="message" className="form-label text-sm md:text-base">Detailed Requirements *</label>
                <textarea 
                  id="message"
                  name="message"
                  required 
                  rows="4" 
                  className="form-control resize-y"
                  value={formData.message}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
              <div className="mt-6 md:mt-8">
                <motion.button 
                  type="submit" 
                  className="btn btn-accent w-full text-base md:text-lg py-3 md:py-4"
                  disabled={submitting}
                  {...magneticProps}
                >
                  {submitting ? 'Transmitting...' : 'Submit Inquiry'}
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
