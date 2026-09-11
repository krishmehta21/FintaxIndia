import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const mv = useMotionVariants();

  const [services, setServices] = useState([]);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
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
      setFormData({ name: '', email: '', phone: '', service_interest: '', message: '' });
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
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"></div>
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

      <section className="section pb-24 -mt-10">
        <div className="container max-w-6xl grid lg:grid-cols-5 gap-8">
          
          {/* Contact Info Panel */}
          <motion.div 
            className="lg:col-span-2 bg-primary text-white p-10 shadow-xl z-10 relative"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Direct Communication</h3>
            
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-accent uppercase text-xs font-bold tracking-widest mb-2">Email</p>
                <a href="mailto:contact@fintaxindia.com" className="text-lg hover:text-accent transition-colors text-white outline-none focus-visible:ring-2 focus-visible:ring-accent inline-block">
                  contact@fintaxindia.com
                </a>
              </div>
              
              <div>
                <p className="text-accent uppercase text-xs font-bold tracking-widest mb-2">Office</p>
                <p className="text-lg text-gray-200">New Delhi, India</p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-400 italic">
                * Consultations by prior appointment only.
              </p>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div 
            className="lg:col-span-3 bg-white p-10 shadow-xl z-10 relative"
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
                  className="alert alert-success text-center mb-8 font-semibold"
                >
                  Your inquiry has been successfully submitted. We will be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && <div className="alert alert-error mb-8 text-center">{submitError}</div>}

            <form onSubmit={handleFormSubmit} className={`transition-opacity duration-300 ${submitSuccess ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
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
                  <label htmlFor="email" className="form-label">Email Address *</label>
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
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Contact Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    className="form-control" 
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service_interest" className="form-label">Service Required</label>
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

              <div className="form-group mb-8">
                <label htmlFor="message" className="form-label">Detailed Requirements *</label>
                <textarea 
                  id="message"
                  name="message"
                  required 
                  rows="5" 
                  className="form-control resize-y"
                  value={formData.message}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full py-4 text-lg" disabled={submitting}>
                {submitting ? 'Transmitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
