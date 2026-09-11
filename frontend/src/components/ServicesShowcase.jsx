import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Tasteful stock photography mapped by generic keywords (for the demo)
const getImageForService = (index) => {
  const images = [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200', // Calculator/Desk
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200', // Tax/Documents
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200', // Handshake/Meeting
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200'  // Business
  ];
  return images[index % images.length];
};

export const ServicesShowcase = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!services || services.length === 0) return null;

  const activeService = services[activeIndex];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs */}
      <div 
        className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-4 border-b border-gray-200"
        role="tablist"
        aria-label="Service Categories"
      >
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={service.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${service.id}`}
              id={`tab-${service.id}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  setActiveIndex((index + 1) % services.length);
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setActiveIndex((index - 1 + services.length) % services.length);
                }
              }}
              className={`relative px-6 py-3 text-sm md:text-base font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive ? 'text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute left-0 right-0 bottom-0 h-1 bg-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {service.title}
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <div className="relative min-h-[400px] md:min-h-[500px] overflow-hidden rounded-md bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col md:flex-row"
          >
            {/* Image Side */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
              <img 
                src={getImageForService(activeIndex)} 
                alt={activeService.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/90 to-transparent"></div>
            </div>
            
            {/* Content Side */}
            <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-primary">
              <h3 className="text-3xl font-bold text-white mb-4">{activeService.title}</h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {activeService.short_description}
              </p>
              <div>
                <Link 
                  to={`/services/${activeService.slug}`} 
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Explore Service <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
