import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 24, className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="spinner" size={size} color="currentColor" />
    </div>
  );
};
