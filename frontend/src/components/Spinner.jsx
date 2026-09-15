import React from 'react';
import { motion } from 'framer-motion';

export const Spinner = ({ size = 40, className = '' }) => {
  return (
    <div className={`flex justify-center items-end gap-1.5 ${className}`} style={{ height: size }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="bg-accent rounded-t-sm"
          style={{ width: Math.max(4, size * 0.15) }}
          animate={{
            height: [size * 0.25, size, size * 0.25],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};
