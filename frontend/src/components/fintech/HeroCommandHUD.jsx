import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, Clock, ArrowRight } from "lucide-react";

export const HeroCommandHUD = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Compact Multi-Column Trust Ribbon */}
      <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 shadow-lg text-left">
        
        {/* 3-Column Trust Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 divide-x divide-white/10 text-center sm:text-left">
          
          {/* Col 1 */}
          <div className="px-1 sm:px-2 first:pl-0">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-accent text-[11px] sm:text-xs font-semibold mb-0.5">
              <ShieldCheck size={13} className="shrink-0" />
              <span className="hidden xs:inline">Review</span>
            </div>
            <p className="text-sm sm:text-lg font-bold text-white font-heading">
              Dual-Stage
            </p>
            <p className="text-[10px] sm:text-xs text-gray-300 truncate">
              CA Quality Check
            </p>
          </div>

          {/* Col 2 */}
          <div className="px-1 sm:px-2">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-accent text-[11px] sm:text-xs font-semibold mb-0.5">
              <TrendingUp size={13} className="shrink-0" />
              <span className="hidden xs:inline">Strategy</span>
            </div>
            <p className="text-sm sm:text-lg font-bold text-white font-heading">
              Optimized
            </p>
            <p className="text-[10px] sm:text-xs text-gray-300 truncate">
              Legal Deductions
            </p>
          </div>

          {/* Col 3 */}
          <div className="px-1 sm:px-2">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-accent text-[11px] sm:text-xs font-semibold mb-0.5">
              <Clock size={13} className="shrink-0" />
              <span className="hidden xs:inline">Support</span>
            </div>
            <p className="text-sm sm:text-lg font-bold text-white font-heading">
              Direct Desk
            </p>
            <p className="text-[10px] sm:text-xs text-gray-300 truncate">
              Dedicated Advisory
            </p>
          </div>

        </div>

        {/* Inviting Consultation Prompt */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-gray-300">
          <span className="truncate text-gray-300">
            Need tax or compliance guidance?
          </span>
          <Link 
            to="/contact" 
            className="text-white hover:text-accent font-semibold transition-colors flex items-center gap-1 shrink-0 ml-2 group"
          >
            <span>Speak with a CA</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};


