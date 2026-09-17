import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileCheck2, ShieldCheck, Building2, TrendingUp, 
  Coins, Briefcase, ArrowRight, CheckCircle2, Clock, 
  Sparkles, ExternalLink, ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";

export const ExecutiveServicesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      id: "01",
      slug: "income-tax-filing",
      title: "Income Tax & Direct Tax Advisory",
      subtitle: "ITR-1 to ITR-7, Capital Gains & Notice Defense",
      category: "Direct Taxation",
      icon: FileCheck2,
      sla: "24–48 Hours",
      accentColor: "from-amber-500/20 to-accent/5",
      iconBg: "bg-accent/10 text-accent border-accent/20",
      description: "Forensic multi-form tax optimization for salaried executives, high-volume traders, creators, and corporate entities. Engineered to capture every legitimate deduction and shield against scrutiny notices.",
      deliverables: [
        "Schedule FA & Foreign Asset Reporting",
        "ESOP, RSU & Multi-Asset Capital Gains (LTCG/STCG)",
        "AIS, TIS & Form 26AS Algorithmic Cross-Check",
        "Section 44ADA & 44AD Presumptive Tax Returns"
      ]
    },
    {
      id: "02",
      slug: "gst-filing",
      title: "GST Compliance & ITC Recovery Engine",
      subtitle: "Monthly GSTR-1/3B, 2B Reconciliation & Audit",
      category: "Indirect Taxation",
      icon: ShieldCheck,
      sla: "Continuous Monthly",
      accentColor: "from-emerald-500/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: "End-to-end indirect tax governance. Automated cross-referencing of purchase registers with GSTR-2B ensures maximum Input Tax Credit (ITC) recovery while ensuring 100% Rule 36(4) compliance.",
      deliverables: [
        "Zero-Mismatch GSTR-2B Input Tax Credit Tracking",
        "Multi-State GSTIN Registration & LUT for Zero-Rated Exports",
        "E-Way Bill & Dynamic E-Invoicing System Setup",
        "Department Notice Defense (ASMT-10 & DRC-01 Representations)"
      ]
    },
    {
      id: "03",
      slug: "corporate-services",
      title: "Corporate Law, MCA & ROC Governance",
      subtitle: "Company Formation, Annual Filings & Secretarial Law",
      category: "Corporate Secretarial",
      icon: Building2,
      sla: "5–7 Business Days",
      accentColor: "from-blue-500/20 to-blue-500/5",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description: "Institutional legal architecture for startups and enterprises. Rapid digital incorporation on MCA V3 paired with rigorous annual statutory filings to prevent directors disqualification and severe MCA penalties.",
      deliverables: [
        "Spice+ Fast-Track Incorporation (Pvt Ltd, LLP, OPC)",
        "Annual ROC Filings (AOC-4 Balance Sheets, MGT-7 Returns)",
        "DPIIT Startup India Recognition & 80-IAC Tax Exemption",
        "Director KYC (DIR-3), Board Resolutions & MOA/AOA Amendments"
      ]
    },
    {
      id: "04",
      slug: "financial-services",
      title: "Virtual CFO & Strategic Corporate Finance",
      subtitle: "Cash Flow Modeling, MIS & Board-Level Governance",
      category: "Financial Strategy",
      icon: TrendingUp,
      sla: "Dedicated Retainer",
      accentColor: "from-indigo-500/20 to-indigo-500/5",
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description: "Executive-level financial leadership for scaling businesses. We deploy institutional cash-flow forecasting, unit economic audits, budgeting, and board-ready reporting packages to accelerate investor trust.",
      deliverables: [
        "Monthly Comprehensive Executive MIS & Budget Variance",
        "Burn Rate, Runway Forecasts & Working Capital Diagnostics",
        "Due Diligence Preparation & Cap Table Architecture",
        "Cost Rationalization & Profit Margin Enhancement"
      ]
    },
    {
      id: "05",
      slug: "loan-services",
      title: "Debt Advisory & Project Syndication",
      subtitle: "CMA Data, Bank Liaison & Capital Financing",
      category: "Banking & Credit",
      icon: Coins,
      sla: "7–10 Business Days",
      accentColor: "from-amber-500/20 to-amber-500/5",
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: "Turnkey debt syndication and project appraisal modeling. We structure creditworthy balance sheets and comprehensive CMA reports to sanction working capital (CC/OD), term loans, and equipment lines.",
      deliverables: [
        "Full Credit Monitoring Arrangement (CMA) Formulation",
        "Techno-Economic Project Feasibility & Cash Flow Projections",
        "Debt Service Coverage Ratio (DSCR) Structuring",
        "Direct Coordination with PSU, Private Banks & Leading NBFCs"
      ]
    },
    {
      id: "06",
      slug: "insurance-services",
      title: "Corporate Risk & Keyman Insurance",
      subtitle: "Executive Life Protection & Enterprise Shield",
      category: "Risk Architecture",
      icon: Briefcase,
      sla: "Custom Structuring",
      accentColor: "from-purple-500/20 to-purple-500/5",
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "Institutional risk mitigation frameworks designed under Section 37(1) of the Income Tax Act. Safeguard company continuity, protect founder equity, and shield directors from personal liability.",
      deliverables: [
        "Tax-Deductible Keyman Insurance Policy Structuring",
        "Directors & Officers (D&O) Liability Safeguards",
        "Comprehensive Group Health & Commercial Asset Coverage",
        "Partnership & Shareholder Buy-Sell Protection Models"
      ]
    }
  ];

  return (
    <section id="services-section" className="py-20 md:py-32 bg-[#060e1a] relative overflow-hidden text-white scroll-mt-8 border-t border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} className="text-accent" />
              Institutional Financial Practice
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-200 to-accent">Services</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mt-3 leading-relaxed">
              Six specialized financial and legal practice pillars, engineered to eliminate regulatory friction, safeguard business capital, and maximize statutory savings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>View Full Service Catalog</span>
              <ArrowRight size={14} className="text-accent" />
            </Link>
          </div>
        </div>

        {/* The 6-Card Executive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col justify-between rounded-3xl p-7 md:p-8 transition-all duration-500 border ${
                  isHovered
                    ? "bg-gradient-to-b from-[#0c1c2e] to-[#07111e] border-accent/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] -translate-y-1.5"
                    : "bg-[#091424]/80 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Subtle card top gradient shimmer on hover */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Top Bar: Number Index, Category Tag, and SLA */}
                  <div className="flex items-center justify-between gap-2 pb-5 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-accent">
                        {service.id}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        {service.category}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      <Clock size={11} className="text-accent" />
                      {service.sla}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${service.iconBg} group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <span className="text-xs text-gray-400 font-medium block mt-1">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Executive Description */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Matrix */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block mb-2">
                      Key Deliverables & Protections:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="relative z-10 pt-4 border-t border-white/10">
                  <Link
                    to={`/services/${service.slug}`}
                    className={`w-full py-3 px-4 rounded-xl flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isHovered
                        ? "bg-accent text-primary shadow-lg shadow-accent/20"
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>Engage Service Scope</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Assurance Band */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct CA Sign-Off on Every Engagement</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Every tax return, ROC petition, and GST filing is audited and signed off by a certified partner Chartered Accountant.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="btn btn-accent text-xs font-bold py-2.5 px-5 rounded-xl whitespace-nowrap"
          >
            Request Free Assessment →
          </Link>
        </div>

      </div>
    </section>
  );
};
