import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { ServiceCard } from '../components/ServiceCard';
import { Spinner } from '../components/Spinner';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMotionVariants } from '../utils/motion';

const LOCAL_SERVICES_LIST = [
  {
    id: 1,
    title: 'Income Tax Filing',
    slug: 'income-tax-filing',
    short_description: 'Enjoy stress-free and accurate income tax filing options with us.',
  },
  {
    id: 2,
    title: 'Financial Services',
    slug: 'financial-services',
    short_description: 'We provide complete financial planning and management services.',
  },
  {
    id: 3,
    title: 'GST Filing',
    slug: 'gst-filing',
    short_description: 'Effective GST filing to keep your business compliant.',
  },
  {
    id: 4,
    title: 'Loan Services',
    slug: 'loan-services',
    short_description: 'Professional guidance in securing the correct loan as per your needs.',
  },
  {
    id: 5,
    title: 'Insurance Services',
    slug: 'insurance-services',
    short_description: 'Personalised insurance plans for a secured future.',
  },
  {
    id: 6,
    title: 'Corporate Services',
    slug: 'corporate-services',
    short_description: 'We are experts at offering end-to-end corporate solutions for your business.',
  },
  {
    id: 7,
    title: 'Market Analysis',
    slug: 'market-analysis',
    short_description: 'In-depth market research to help you make informed decisions.',
  },
  {
    id: 8,
    title: 'Quality Resourcing',
    slug: 'quality-resourcing',
    short_description: 'Connecting you with top-tier talent and essential resources.',
  },
  {
    id: 9,
    title: 'Talented Consultants',
    slug: 'talented-consultants',
    short_description: 'Expert guidance from industry-leading professionals.',
  }
];

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const orbAnimation1 = shouldReduceMotion ? {} : {
    animate: { y: [0, -50, 0], x: [0, 30, 0] },
    transition: { duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
  };
  
  const orbAnimation2 = shouldReduceMotion ? {} : {
    animate: { y: [0, 60, 0], x: [0, -40, 0] },
    transition: { duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServices(LOCAL_SERVICES_LIST);
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
      <section ref={heroRef} className="bg-primary text-white py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-top"
          style={{ y: shouldReduceMotion ? 0 : y }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"></div>
        </motion.div>
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

      <section className="section relative overflow-hidden">
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 fixed">
          <motion.div 
            className="absolute top-[10%] -left-40 w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply blur-[100px] opacity-[0.05]"
            {...orbAnimation1}
          />
          <motion.div 
            className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply blur-[100px] opacity-[0.05]"
            {...orbAnimation2}
          />
        </div>
        <div className="container max-w-6xl relative z-10">
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
