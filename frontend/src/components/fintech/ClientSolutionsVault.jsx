import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Briefcase, Building, Shield, Check, 
  ArrowRight, Sparkles, Clock, Layers
} from "lucide-react";
import { Link } from "react-router-dom";

export const ClientSolutionsVault = () => {
  const [activeTrack, setActiveTrack] = useState("executives");

  const tracks = [
    { id: "executives", label: "Salaried & Executives", icon: User },
    { id: "freelancers", label: "Freelancers & Creators", icon: Sparkles },
    { id: "startups", label: "Startups & Scaleups", icon: Briefcase },
    { id: "enterprises", label: "SMEs & Family Offices", icon: Building },
  ];

  const solutionsMap = {
    executives: [
      {
        title: "Multi-Asset ITR-2 & ITR-3 Filing",
        desc: "Precision filing for professionals with foreign RSUs, domestic ESOPs, capital gains from crypto/equities, and multiple Form 16s.",
        sla: "24–48 Hours",
        highlights: ["Foreign Asset Schedule FA Reporting", "ESOP Perquisite Tax Reconciliation", "DTAA Foreign Tax Credit Claims", "Notice Shield Included"],
        targetService: "income-tax-filing"
      },
      {
        title: "Executive Tax Structuring",
        desc: "Proactive restructuring of salary packages, allowances, corporate perks, and NPS deductions to legally minimize peak 30%+ slab tax.",
        sla: "Annual Strategy",
        highlights: ["CTC Component Optimization", "Section 80CCD(2) Corporate NPS", "House Property Loss Harvesting", "Quarterly Advance Tax Schedule"],
        targetService: "financial-services"
      },
      {
        title: "High-Value Capital Gains Shield",
        desc: "Tax optimization on property sales, startup secondary equity sales, and mutual fund rebalancing under updated Finance Act provisions.",
        sla: "Case-by-Case",
        highlights: ["Section 54/54EC Capital Gains Exemption", "Indexation & Grandfathering Audits", "F&O / Intra-day Loss Setoff", "Statutory Computation Certificate"],
        targetService: "income-tax-filing"
      }
    ],
    freelancers: [
      {
        title: "Section 44ADA Presumptive Filing",
        desc: "Declare 50% flat profit on gross receipts up to ₹75 Lakhs without maintaining complex books of accounts or balance sheets.",
        sla: "24 Hours",
        highlights: ["50% Legal Flat Expense Deduction", "No Mandatory Book-keeping Overhead", "Quarterly Advance Tax Tracking", "Audit Exemption for Eligible Pros"],
        targetService: "income-tax-filing"
      },
      {
        title: "Export Invoicing & GST LUT Setup",
        desc: "Legal Letter of Undertaking (LUT) filing for IT developers and remote contractors to receive foreign client payments with 0% GST.",
        sla: "1–2 Days",
        highlights: ["Zero-Rated Export Compliance", "FIRC / FIRA Bank Coordination", "LUT Filing with Department", "Zero Output GST on Remittances"],
        targetService: "gst-filing"
      },
      {
        title: "Cross-Border TDS & Double Tax Relief",
        desc: "Claim full tax withholding credits under DTAA for clients in the US, UK, EU, or UAE without double taxation.",
        sla: "2–3 Days",
        highlights: ["Form 67 DTAA Relief Drafting", "Foreign Tax Residency Certificates", "TDS Reconciliation with 26AS", "International Wire Audit Trails"],
        targetService: "financial-services"
      }
    ],
    startups: [
      {
        title: "Spice+ Incorporation & DPIIT Setup",
        desc: "End-to-end incorporation for Private Limited or LLP companies with digital approvals, MCA compliance, and Startup India recognition.",
        sla: "5–7 Days",
        highlights: ["Name Approval & Digital Signatures", "MOA/AOA Drafting for Equity Rounds", "Section 80-IAC 3-Year Tax Holiday Guidance", "Corporate Bank Account Integration"],
        targetService: "corporate-services"
      },
      {
        title: "Early-Stage Compliance Retainer",
        desc: "All-in-one compliance coverage for founders: monthly GST, quarterly TDS, payroll compliance, and annual ROC filings under one roof.",
        sla: "Monthly Retainer",
        highlights: ["Automated GSTR-1 & 3B Monthly Cycles", "TDS Returns (24Q, 26Q) Preparation", "ROC Board Resolutions Drafting", "Direct WhatsApp Channel with CA"],
        targetService: "corporate-services"
      },
      {
        title: "Virtual CFO & Cap Table Modeling",
        desc: "Strategic financial advisory for seed and Series A startups: runway calculations, financial model forecasting, and investor MIS reports.",
        sla: "Dedicated Monthly",
        highlights: ["Monthly Burn & Runway Tracking", "Unit Economics & Gross Margin Audits", "ESOP Pool Structuring", "Due Diligence Readiness Check"],
        targetService: "financial-services"
      }
    ],
    enterprises: [
      {
        title: "Statutory & Tax Audit Shield",
        desc: "Thorough independent statutory audits under Section 44AB and the Companies Act 2013 with complete working papers and CA sign-off.",
        sla: "Dedicated Audit Team",
        highlights: ["Independent Partner Sign-Off", "CARO 2020 Compliance Reporting", "Internal Financial Control (IFC) Review", "Department Representation Support"],
        targetService: "corporate-services"
      },
      {
        title: "Multi-State GST & Automated ITC Engine",
        desc: "Algorithmic reconciliation of GSTR-2B vs. purchase register across multi-state GSTINs to recover millions in trapped tax credits.",
        sla: "Continuous Monthly",
        highlights: ["100% Rule 36(4) Compliance", "Vendor Payment Default Notice Trigger", "Custom E-Invoicing Integration", "Cross-State E-Way Bill Reconciliation"],
        targetService: "gst-filing"
      },
      {
        title: "Corporate Restructuring & Debt Advisory",
        desc: "Turnkey financial health evaluation, CMA data generation, and strategic balance sheet structuring for corporate loan sanctions.",
        sla: "7–10 Days",
        highlights: ["CMA Report Formulation for CC/OD Limits", "Debt Service Coverage (DSCR) Tuning", "Corporate Restructuring & Mergers", "Institutional Lender Coordination"],
        targetService: "loan-services"
      }
    ]
  };

  return (
    <section className="py-10 sm:py-16 md:py-28 bg-gray-50/70 border-y border-gray-200/80 relative overflow-hidden">
      <div className="container relative z-10 px-0 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Layers size={13} className="text-accent" />
            Tailored Advisory Tracks
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary font-heading tracking-tight">
            Tailored Solutions for <span className="text-accent">Your Stage</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-base md:text-lg mt-2 sm:mt-3">
            Whether you are an executive, scaling founder, or enterprise, select your profile to view your specialized advisory scope.
          </p>
        </div>

        {/* Tab Navigation Buttons (Horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap justify-start sm:justify-center gap-2 md:gap-3 mb-6 sm:mb-12 px-4 pb-2">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isActive = activeTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 sm:scale-105 border border-primary font-extrabold"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon size={15} className={isActive ? "text-accent" : "text-gray-400"} />
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mb-3 text-[11px] text-gray-400 font-medium">
          <span>← Swipe to explore track solutions ({solutionsMap[activeTrack].length}) →</span>
        </div>

        {/* Track Solution Cards (Swipeable Snap Carousel on mobile, Grid on md+) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 no-scrollbar">
          <AnimatePresence mode="wait">
            {solutionsMap[activeTrack].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center group flex flex-col justify-between bg-white border border-gray-200 hover:border-accent/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with SLA */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                      <Clock size={12} />
                      SLA: {solution.sla}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 font-mono uppercase tracking-wider">
                      Partner CA Review
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {solution.desc}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2.5 mb-8 border-t border-gray-100 pt-5">
                    {solution.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <Link
                  to={`/contact?service=${solution.targetService}&track=${activeTrack}`}
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-xs font-bold text-primary shadow-sm"
                >
                  <span>Request Advisory Scope</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
