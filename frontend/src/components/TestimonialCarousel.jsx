import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === testimonials.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
      };
    }
  };

  // Pre-calculate adjacent indices for the "peeking" effect
  const prevIndex = currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 === testimonials.length ? 0 : currentIndex + 1;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 overflow-hidden py-12">
      
      {/* Container for the cards */}
      <div className="relative h-[350px] md:h-[400px] flex items-center justify-center">
        
        {/* Peeking Previous Card */}
        {testimonials.length > 2 && (
          <div className="hidden md:block absolute left-0 w-1/4 h-full opacity-30 transform -translate-x-1/2 scale-90 pointer-events-none blur-sm transition-all duration-500">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col justify-center">
               <p className="text-gray-400 italic">"{testimonials[prevIndex].content.substring(0, 50)}..."</p>
            </div>
          </div>
        )}

        {/* Active Card */}
        <div className="relative w-full md:w-1/2 lg:w-2/5 h-full z-10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev();
                }
              }}
              className="absolute inset-0 bg-white p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col justify-center cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-accent"
              tabIndex={0}
              aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
              }}
            >
              <Quote className="text-accent mb-6 opacity-50" size={48} />
              <blockquote className="text-xl md:text-2xl font-semibold text-primary mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div>
                <p className="font-bold text-gray-900 uppercase tracking-wide">
                  {testimonials[currentIndex].client_name}
                </p>
                <p className="text-muted text-sm mt-1">
                  {testimonials[currentIndex].client_role}
                  {testimonials[currentIndex].client_role && testimonials[currentIndex].client_company ? ' • ' : ''}
                  {testimonials[currentIndex].client_company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Peeking Next Card */}
        {testimonials.length > 2 && (
          <div className="hidden md:block absolute right-0 w-1/4 h-full opacity-30 transform translate-x-1/2 scale-90 pointer-events-none blur-sm transition-all duration-500">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col justify-center">
               <p className="text-gray-400 italic">"{testimonials[nextIndex].content.substring(0, 50)}..."</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-white text-primary hover:bg-primary hover:text-white border border-gray-200 transition-colors shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2" role="tablist">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  currentIndex === idx ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-white text-primary hover:bg-primary hover:text-white border border-gray-200 transition-colors shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

// Swipe helpers
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
