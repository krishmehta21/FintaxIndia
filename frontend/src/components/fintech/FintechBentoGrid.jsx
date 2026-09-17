import React from "react";
import { 
  ShieldCheck, TrendingUp, CheckCircle2, 
  MessageSquare, Layers, Clock
} from "lucide-react";

export const FintechBentoGrid = () => {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#08182d] border-y border-white/10 relative overflow-hidden text-white">
      <div className="container max-w-7xl relative z-10 px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-2">
            The FinTax Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-heading">
            Why Leading Businesses Choose <span className="text-accent">FinTax</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-base md:text-lg mt-3 leading-relaxed">
            Traditional accounting and CA processes are slow. We combine vetted Chartered Accountants with modern digital workflows to eliminate delays and maximize tax efficiency.
          </p>
        </div>

        {/* Executive Feature Grid */}
        <div className="space-y-6">
          
          {/* Top Row: 2 Major Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Card 1: Dual-Stage Statutory Review */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-accent/40 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                  <ShieldCheck size={26} />
                </div>
                <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase block mb-1">
                  Verification Standard
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading">
                  Dual-Stage Statutory Review Framework
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Every return undergoes multi-layer pre-filing checks (AIS, TIS, 26AS, GSTR-2B reconciliation) followed by rigorous review by a qualified Chartered Accountant to ensure statutory accuracy.
                </p>
              </div>

              {/* Verified Safeguards Checklist */}
              <div className="bg-black/20 border border-white/10 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>AIS/TIS Reconciliation</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>Rule 36(4) ITC Matching</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>ROC Statutory Checklist</span>
                </div>
              </div>
            </div>

            {/* Card 2: Timely Compliance & Proactive Filing */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-accent/40 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                  <Clock size={26} />
                </div>
                <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase block mb-1">
                  Filing Discipline
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading">
                  Timely Compliance & Proactive Filing
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Prevent late-filing fees and interest charges with structured calendar reminders, accelerated review workflows, and prompt government portal acknowledgments.
                </p>
              </div>

              {/* SLA Workflow Milestones */}
              <div className="bg-black/20 border border-white/10 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-200 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Document Intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>CA Forensic Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span className="text-emerald-400 font-semibold">Portal Acknowledgment</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 3: Strategic Tax Structuring */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-accent/40 hover:bg-white/[0.06] transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                <TrendingUp size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-accent font-heading block mb-1">
                Strategic
              </span>
              <h4 className="text-base font-bold text-white mb-2">Legal Tax Optimization</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Legitimate tax planning under the Income Tax Act, utilizing permissible allowances, corporate deductions, and regime selection.
              </p>
            </div>

            {/* Card 4: Direct CA Consultation */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-accent/40 hover:bg-white/[0.06] transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading block mb-1">
                Direct CA
              </span>
              <h4 className="text-base font-bold text-white mb-2">Dedicated Professional Support</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Direct communication with a designated Chartered Accountant for strategic clarity without call-center intermediaries.
              </p>
            </div>

            {/* Card 5: All-in-One Corporate & Tax Stack */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-accent/40 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <Layers size={20} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">
                  All-in-One Corporate Stack
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  From Day 1 incorporation to Series A compliance, statutory audits, and ESOP schemes, we handle every corporate touchpoint.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Pvt Ltd & LLP", "GST Invoicing", "TDS Returns", "ROC Filings", "Transfer Pricing", "80-IAC"].map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/[0.06] text-gray-200 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


