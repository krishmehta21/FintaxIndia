import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { ServicesShowcase } from '../components/ServicesShowcase';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { StatsBand } from '../components/StatsBand';
import { Spinner } from '../components/Spinner';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const mv = useMotionVariants();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testData] = await Promise.all([
          api.getServices(),
          api.getTestimonials()
        ]);
        setServices(servicesData);
        setTestimonials(testData);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>;
  }

  return (
    <div>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Full-bleed background image */}
        <motion.div 
          className="absolute inset-0 z-0"
          variants={mv.imageScaleFade}
          initial="hidden"
          whileInView="visible"
          viewport={mv.viewportConfig}
        >
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional financial desk" 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        </motion.div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Strategic Advisory <br/>For Modern Business
            </motion.h1>
            <motion.p 
              className="text-gray-200 text-xl md:text-2xl mb-10 font-normal leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Empowering corporate growth with rigorous compliance, precision tax planning, and visionary financial strategy.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              <Link to="/contact" className="btn btn-primary" style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)'}}>
                Schedule Consultation
              </Link>
              <Link to="/services" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                Explore Expertise
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <StatsBand />

      {/* Services Showcase */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              className="section-title text-primary"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our Expertise
            </motion.h2>
            <motion.p 
              className="section-subtitle mx-auto"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Comprehensive financial solutions designed to protect and accelerate your enterprise.
            </motion.p>
          </div>
          
          <ServicesShowcase services={services} />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section bg-gray-50 overflow-hidden">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                className="section-title text-primary"
                variants={mv.headingRise}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                Client Trust
              </motion.h2>
              <motion.p 
                className="section-subtitle mx-auto"
                variants={mv.textFadeDelay}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                Endorsements from corporate partners who rely on our rigorous standards.
              </motion.p>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Ready to Elevate Your Strategy?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Partner with FinTax India for uncompromising financial integrity and growth-oriented tax planning.
          </motion.p>
          <motion.div
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <Link to="/contact" className="btn btn-primary inverse text-lg px-8 py-4">
              Initiate Contact Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
