import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const getImageForService = (id) => {
  const images = [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200'
  ];
  return images[id % images.length];
};

export const ServiceCard = ({ service, index = 0 }) => {
  const isEven = index % 2 === 0;
  const shouldReduceMotion = useReducedMotion();
  const MotionLink = motion(Link);
  
  const magneticProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden bg-white shadow-lg border border-gray-100 rounded-lg group hover:shadow-xl transition-shadow duration-300">
      
      {/* Image Side */}
      <div className={`relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <img 
          src={getImageForService(index)} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      
      {/* Content Side */}
      <div className={`w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-3xl font-bold text-primary mb-4">{service.title}</h3>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          {service.short_description}
        </p>
        <div>
          <MotionLink 
            to={`/services/${service.slug}`} 
            className="inline-flex items-center font-bold text-accent hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            {...magneticProps}
          >
            Explore Expertise <ArrowRight className="ml-2" size={20} />
          </MotionLink>
        </div>
      </div>

    </div>
  );
};
