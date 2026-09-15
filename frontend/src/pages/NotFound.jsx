import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="bg-primary/5 p-6 rounded-full mb-8">
        <Landmark size={64} className="text-primary opacity-20" />
      </div>
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ledger Not Found</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
        The financial document or page you are looking for has been moved, deleted, or does not exist.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
        <ArrowLeft size={18} />
        Return to Home
      </Link>
    </div>
  );
};
