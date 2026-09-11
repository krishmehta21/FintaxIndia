import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { ServiceCard } from '../components/ServiceCard';
import { Spinner } from '../components/Spinner';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mv = useMotionVariants();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"></div>
        <div className="container relative z-10 max-w-4xl text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Our Expertise
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            A comprehensive suite of financial, taxation, and advisory solutions tailored to propel your business forward with absolute regulatory compliance.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-6xl">
          {loading ? (
            <div className="flex justify-center py-12"><Spinner size={40} /></div>
          ) : error ? (
            <div className="alert alert-error text-center">{error}</div>
          ) : (
            <motion.div 
              className="flex flex-col gap-12"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              {services.map((service, index) => (
                <motion.div key={service.id} variants={mv.staggerItem}>
                  <ServiceCard service={service} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
