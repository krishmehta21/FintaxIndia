import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Shield, Briefcase, Landmark, Check, 
  ArrowRight, Sparkles, Clock, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const InteractiveServicesVault = () => {
  const [activeCategory, setActiveCategory] = useState("taxation");

  const categories = [
    { id: "taxation", label: "Tax Engineering (ITR)", icon: FileText },
    { id: "gst", label: "GST & Indirect Tax", icon: Shield },
    { id: "corporate", label: "Corporate & Startups", icon: Briefcase },
    { id: "advisory", label: "Wealth & Advisory", icon: Landmark },
  ];

  const servicesMap = {
    taxation: [
      {
        title: "Salaried & Executive ITR Filing",
        desc: "Advanced multi-form tax optimization (ITR-1/ITR-2) for tech workers, founders, and executives with ESOPs, RSUs, and foreign asset disclosures.",
        sla: "24–48 Hours",
        highlights: ["ESOP & RSU Capital Gains", "Foreign Assets Schedule FA", "Max 87A/80C/80D Optimization", "Notice Shield Included"],
        slug: "income-tax-filing"
      },
      {
        title: "Freelance & Professional (44ADA)",
        desc: "Presumptive taxation filing for developers, consultants, creators, and doctors. Declare 50% profits without maintaining cumbersome book records.",
        sla: "24 Hours",
        highlights: ["Section 44ADA Presumptive Slabs", "Advance Tax Quarterly Computations", "Zero Accounting Overhead", "Bank Statement Auditing"],
        slug: "income-tax-filing"
      },
      {
        title: "Capital Gains & Portfolio Advisory",
        desc: "Forensic calculation of short-term (STCG) and long-term (LTCG) capital gains across equity, crypto, real estate, and unlisted securities.",
        sla: "48 Hours",
        highlights: ["Intra-day & F&O Loss Harvesting", "Real Estate Indexation Claims", "Crypto 30% Flat Tax Reporting", "Grandfathering Compliance"],
        slug: "income-tax-filing"
      }
    ],
    gst: [
      {
        title: "End-to-End GST Registration",
        desc: "Quick, seamless GSTIN procurement with authorized signatory DSC setup, place of business verification, and HSN/SAC code mapping.",
        sla: "3–5 Days",
        highlights: ["State & Multi-State Registrations", "LUT for Zero-Rated Exports", "Virtual Office Verification Support", "E-Invoicing Readiness"],
        slug: "gst-filing"
      },
      {
        title: "Monthly & Quarterly GST Returns",
        desc: "Automated reconciliation of GSTR-1, GSTR-3B, and GSTR-2B. Maximize Input Tax Credit (ITC) while staying 100% compliant under Rule 36(4).",
        sla: "Before 11th & 20th",
        highlights: ["Zero Mismatch ITC Matching", "Automated Vendor Ledger Scrubbing", "E-Way Bill Advisory", "Reverse Charge (RCM) Tracking"],
        slug: "gst-filing"
      },
      {
        title: "GST Department Notice Defense",
        desc: "Expert CA drafted legal responses for ASMT-10, DRC-01 notices, mismatch allegations, and department audits.",
        sla: "Immediate Escalation",
        highlights: ["Formulation of Legal Submissions", "Department Personal Hearings Support", "Penalty Minimization Strategy", "ITC Reversal Rectification"],
        slug: "gst-filing"
      }
    ],
    corporate: [
      {
        title: "Pvt Ltd & LLP Company Incorporation",
        desc: "Fast-track company formation on MCA V3. Includes name approval, Digital Signature Certificates (DSC), DIN, MOA/AOA, PAN, TAN & corporate bank account.",
        sla: "5–7 Days",
        highlights: ["100% Digital Document Flow", "Startup India DPIIT Advisory", "Spice+ MCA Filing", "Complimentary 1st Year Compliance Plan"],
        slug: "corporate-services"
      },
      {
        title: "Annual ROC & Statutory Compliance",
        desc: "Flawless annual filing of AOC-4 (Financial Statements), MGT-7 (Annual Return), DIR-3 KYC, and statutory register maintenance.",
        sla: "Annual Retainer",
        highlights: ["Statutory Audit Integration", "Board Meeting Resolution Drafting", "Active Director KYC Filing", "Late Fee Prevention Guarantee"],
        slug: "corporate-services"
      },
      {
        title: "Virtual CFO & Strategic Advisory",
        desc: "High-level financial leadership for growing startups. Monthly MIS, cash flow burn rate modeling, budgeting, and investor board deck preparation.",
        sla: "Dedicated Monthly",
        highlights: ["Cash Burn & Runway Audits", "Unit Economics & Gross Margin Tuning", "Cap Table Management", "Investor Reporting Models"],
        slug: "financial-services"
      }
    ],
    advisory: [
      {
        title: "Commercial & Business Loan Syndication",
        desc: "Turnkey project report preparation (CMA Data), balance sheet health engineering, and direct lender coordination for CC/OD limits and term loans.",
        sla: "7–10 Days",
        highlights: ["CMA Report Formulation", "Debt Service Coverage Ratio (DSCR)", "Working Capital Limit Sanctions", "Banker Liaison & Negotiations"],
        slug: "loan-services"
      },
      {
        title: "Corporate & Keyman Insurance Structuring",
        desc: "Tax-deductible insurance solutions for founders, key executives, and enterprise assets to protect enterprise continuity.",
        sla: "Custom Advisory",
        highlights: ["Section 37(1) Tax Deduction Models", "Keyman Insurance Policy Design", "Director & Officers (D&O) Protection", "Employee Group Mediclaim"],
        slug: "insurance-services"
      },
      {
        title: "Family Office & Wealth Preservation",
        desc: "Cross-generational tax structuring, private family trust creation, and wealth protection under Indian regulatory frameworks.",
        sla: "Bespoke Engagements",
        highlights: ["Private Discretionary Trust Setup", "Succession & Inheritance Planning", "Capital Protection Architecture", "Tax-Efficient Asset Liquidation"],
        slug: "financial-services"
      }
    ]
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-accent" />
            Full-Spectrum Practice
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary font-heading tracking-tight uppercase">
            The FinTax <span className="text-accent">Services Vault</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mt-3">
            Click across our core pillars to explore rigorous financial services engineered for regulatory compliance and strategic growth.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105 border border-accent/40"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon size={16} className={isActive ? "text-accent" : "text-gray-400"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {servicesMap[activeCategory].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="group flex flex-col justify-between bg-gray-50/80 hover:bg-white border border-gray-200/80 hover:border-accent/40 rounded-3xl p-7 md:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with SLA */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                      <Clock size={12} />
                      SLA: {service.sla}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      Chartered Audit
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2.5 mb-8 border-t border-gray-200/70 pt-5">
                    {service.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white border border-gray-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-xs font-bold text-primary shadow-sm"
                >
                  <span>Explore Scope & Engage</span>
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
