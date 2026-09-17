import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Check } from "lucide-react";
import { Link } from "react-router-dom";

export const RapidAssessmentDrawer = () => {
  const [profile, setProfile] = useState("startup");
  const [selectedService, setSelectedService] = useState("income-tax-filing");

  const profiles = [
    { id: "salaried", label: "Salaried / HNI Individual", desc: "Form 16, ESOPs, Capital Gains" },
    { id: "freelance", label: "Freelancer / Consultant", desc: "Section 44ADA, Export LUT" },
    { id: "startup", label: "Startup / SME Founder", desc: "Pvt Ltd, Compliances, ROC" },
    { id: "enterprise", label: "Corporate Enterprise", desc: "Multi-State GST, Statutory Audit" },
  ];

  // Exact 6 core services of FinTax India
  const serviceOptions = [
    { 
      id: "income-tax-filing", 
      label: "Income Tax Filing", 
      desc: "ITR-1 to ITR-4, Capital Gains, Notice Defense & 80C/80D Optimization" 
    },
    { 
      id: "gst-filing", 
      label: "GST Filing & Compliance", 
      desc: "Monthly GSTR-1 & 3B, 2B ITC Reconciliation, E-Invoicing & Registration" 
    },
    { 
      id: "corporate-services", 
      label: "Corporate & ROC Services", 
      desc: "Pvt Ltd & LLP Incorporation, Annual MCA Filings, AOC-4, MGT-7" 
    },
    { 
      id: "financial-services", 
      label: "Financial & Virtual CFO", 
      desc: "Cash Flow Strategy, MIS Reporting, Financial Modeling & Accounting" 
    },
    { 
      id: "loan-services", 
      label: "Loan & Debt Advisory", 
      desc: "CMA Data Preparation, Project Reports, CC/OD Working Capital Limits" 
    },
    { 
      id: "insurance-services", 
      label: "Corporate Insurance", 
      desc: "Keyman Insurance, D&O Protection, Group Health & Tax Exemption" 
    },
  ];

  const activeServiceObj = serviceOptions.find(s => s.id === selectedService) || serviceOptions[0];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gray-50 border-y border-gray-200/80 relative overflow-hidden">
      <div className="container relative z-10 max-w-5xl px-4">
        <div className="text-center mb-6 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-primary/10">
            <Sparkles size={13} className="text-accent" />
            Quick Service Matchmaker
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-primary font-heading">
            Find the Right Service for <span className="text-accent">Your Needs</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto">
            Choose your entity type and required practice area to generate your tailored engagement scope.
          </p>
        </div>

        {/* Step 1: Select Profile */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2 sm:mb-3">
            Step 1: Your Entity Profile
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {profiles.map((p) => {
              const isSelected = profile === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setProfile(p.id)}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-white border-primary shadow-md ring-2 ring-primary/10"
                      : "bg-white/80 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                    <span className={`text-xs sm:text-sm font-bold block truncate ${isSelected ? "text-primary" : "text-gray-900"}`}>
                      {p.label}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 block truncate sm:whitespace-normal">{p.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Core Service */}
        <div className="mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2 sm:mb-3">
            Step 2: Required Practice Area
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {serviceOptions.map((s) => {
              const isSelected = selectedService === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-white border-primary shadow-md ring-2 ring-primary/10"
                      : "bg-white/80 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                    <span className={`text-xs sm:text-sm font-bold block truncate ${isSelected ? "text-primary" : "text-gray-900"}`}>
                      {s.label}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-accent text-primary flex items-center justify-center text-[10px] shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{s.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Match Output Bar (Prestigious Contrast Accent) */}
        <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-primary text-white border border-primary-dark shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-accent flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-accent font-mono uppercase tracking-wider block">
                Recommended Advisory Track
              </span>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mt-0.5 break-words">
                {activeServiceObj.label} • Senior CA Consultation
              </h4>
              <p className="text-xs text-gray-300 mt-1 max-w-xl leading-relaxed">
                {activeServiceObj.desc}
              </p>
            </div>
          </div>

          <Link
            to={`/contact?service=${activeServiceObj.id}&profile=${profile}`}
            className="btn btn-accent px-6 sm:px-8 py-3.5 text-sm font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform w-full md:w-auto shrink-0 text-center"
          >
            <span>Proceed to Consultation</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
