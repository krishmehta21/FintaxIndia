import React from 'react';

export const CustomLogo = ({ className = '', dark = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center group cursor-pointer ${className}`}>
      {/* Wordmark Container */}
      <div className="flex items-baseline font-sans font-medium tracking-tight relative" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
        <span className={dark ? 'text-white' : 'text-primary'}>Fin</span>
        
        {/* Animated Tie 'T' */}
        <div className="relative flex items-center justify-center ml-[-0.02em] mr-[-0.12em]">
          <svg 
            viewBox="0 0 24 32" 
            fill="currentColor" 
            className={`text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1`}
            style={{ width: '0.85em', height: '1.4em', transform: 'translateY(0.2em)' }}
          >
            {/* Minimalist Tie Shape */}
            <path d="M1 3h22l-5 4h-4l-2 23-2-23H6z" />
          </svg>
        </div>
        
        <span className="text-accent">ax</span>
        <span className={dark ? 'text-white' : 'text-primary'}>India</span>
      </div>
      
      {/* Tagline / Kicker */}
      <span className={`mt-1 text-[0.55rem] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
        dark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-primary'
      }`}>
        Tax & Advisory
      </span>
    </div>
  );
};
