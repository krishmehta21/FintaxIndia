import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Sparkles, IndianRupee, ArrowRight, Check, 
  HelpCircle, ShieldCheck, Building2, User, Landmark, Percent
} from "lucide-react";
import { Link } from "react-router-dom";

export const TaxCalculatorWidget = () => {
  const [activeTab, setActiveTab] = useState("individual"); // 'individual' | 'startup'

  // Individual Tax State
  const [income, setIncome] = useState(1800000); // 18 Lakh default
  const [has80C, setHas80C] = useState(true);
  const [has80D, setHas80D] = useState(true);
  const [hasHRA, setHasHRA] = useState(true);

  // Business State
  const [selectedEntity, setSelectedEntity] = useState("pvt-ltd");

  // Format INR Currency
  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Indian Tax Calculation Logic (FY 2025-26 / 2026-27)
  const taxCalculations = useMemo(() => {
    // 1. NEW REGIME CALCULATION
    // Standard Deduction: 75,000
    const taxableNew = Math.max(0, income - 75000);
    let taxNew = 0;
    if (taxableNew <= 700000) {
      // 87A rebate makes tax zero up to 7L (effectively 7.75L with std deduction)
      taxNew = 0;
    } else {
      // Slabs:
      // 0 - 3L: Nil
      // 3 - 7L: 5% (20,000)
      // 7 - 10L: 10% (30,000)
      // 10 - 12L: 15% (30,000)
      // 12 - 15L: 20% (60,000)
      // > 15L: 30%
      let remaining = taxableNew;
      if (remaining > 300000) {
        const slab1 = Math.min(remaining - 300000, 400000);
        taxNew += slab1 * 0.05;
      }
      if (remaining > 700000) {
        const slab2 = Math.min(remaining - 700000, 300000);
        taxNew += slab2 * 0.10;
      }
      if (remaining > 1000000) {
        const slab3 = Math.min(remaining - 1000000, 200000);
        taxNew += slab3 * 0.15;
      }
      if (remaining > 1200000) {
        const slab4 = Math.min(remaining - 1200000, 300000);
        taxNew += slab4 * 0.20;
      }
      if (remaining > 1500000) {
        const slab5 = remaining - 1500000;
        taxNew += slab5 * 0.30;
      }
      // Add 4% Health & Education Cess
      taxNew = taxNew * 1.04;
    }

    // 2. OLD REGIME CALCULATION
    // Standard Deduction: 50,000
    let deductions = 50000;
    if (has80C) deductions += 150000; // 80C up to 1.5L
    if (has80D) deductions += 50000;  // 80D up to 50k
    if (hasHRA) deductions += 120000; // HRA / Home Loan interest approx

    const taxableOld = Math.max(0, income - deductions);
    let taxOld = 0;
    if (taxableOld <= 500000) {
      taxOld = 0;
    } else {
      // 0 - 2.5L: Nil
      // 2.5 - 5L: 5% (12,500)
      // 5 - 10L: 20% (1,00,000)
      // > 10L: 30%
      let remaining = taxableOld;
      if (remaining > 250000) {
        const slab1 = Math.min(remaining - 250000, 250000);
        taxOld += slab1 * 0.05;
      }
      if (remaining > 500000) {
        const slab2 = Math.min(remaining - 500000, 500000);
        taxOld += slab2 * 0.20;
      }
      if (remaining > 1000000) {
        const slab3 = remaining - 1000000;
        taxOld += slab3 * 0.30;
      }
      taxOld = taxOld * 1.04;
    }

    const betterRegime = taxNew <= taxOld ? "New Regime" : "Old Regime";
    const savings = Math.abs(taxOld - taxNew);

    return {
      taxNew: Math.round(taxNew),
      taxOld: Math.round(taxOld),
      betterRegime,
      savings: Math.round(savings),
      effectiveRate: ((Math.min(taxNew, taxOld) / income) * 100).toFixed(1),
    };
  }, [income, has80C, has80D, hasHRA]);

  // Entity Details
  const entityData = {
    "pvt-ltd": {
      name: "Private Limited Company",
      tagline: "Ideal for VC funding, startups, and high-growth scaleups",
      taxRate: "22% + Cess (Section 115BAA)",
      minDirectors: "2 Directors",
      fundingReady: "100% Investor Preferred",
      auditReq: "Mandatory Statutory Audit",
      annualCompliance: "ROC, MGT-7, AOC-4, Income Tax, GST",
      estimatedSetupDays: "5–8 Business Days"
    },
    "llp": {
      name: "Limited Liability Partnership (LLP)",
      tagline: "Best for consulting firms, agencies & boutique enterprises",
      taxRate: "30% (No Minimum Alternate Tax / AMT)",
      minDirectors: "2 Designated Partners",
      fundingReady: "Limited Equity Funding",
      auditReq: "Only if turnover > ₹40L or capital > ₹25L",
      annualCompliance: "Form 11, Form 8, Income Tax",
      estimatedSetupDays: "6–10 Business Days"
    },
    "opc": {
      name: "One Person Company (OPC)",
      tagline: "Tailored for solo founders wanting corporate limited liability",
      taxRate: "22% or 25% based on turnover",
      minDirectors: "1 Director + 1 Nominee",
      fundingReady: "Convertible to Pvt Ltd later",
      auditReq: "Mandatory Statutory Audit",
      annualCompliance: "Simplified Annual Return & ROC",
      estimatedSetupDays: "5–7 Business Days"
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 md:my-20 px-4">
      {/* Container Shell */}
      <div className="relative rounded-3xl bg-[#081325]/90 border border-accent/25 backdrop-blur-2xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] p-6 md:p-10 overflow-hidden">
        {/* Glow Accent Spots */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Header with Selector Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={13} />
              Interactive Financial Intelligence
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
              Instant Tax & Structure <span className="text-accent">Simulator</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Estimate your optimal tax liability or compare incorporation models in real time.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("individual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                activeTab === "individual"
                  ? "bg-accent text-primary shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <User size={15} />
              Individual Tax (ITR)
            </button>
            <button
              onClick={() => setActiveTab("startup")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                activeTab === "startup"
                  ? "bg-accent text-primary shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Building2 size={15} />
              Corporate Structure
            </button>
          </div>
        </div>

        {/* Tab 1: Individual Tax Optimizer */}
        {activeTab === "individual" && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Income Slider Header */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-semibold text-gray-300">Annual Gross Income (CTC / Turnover)</span>
                  <span className="text-2xl md:text-3xl font-extrabold text-accent font-heading">
                    {formatINR(income)}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="500000"
                  max="5000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-gray-400 self-center mr-1">Quick Select:</span>
                  {[800000, 1500000, 2500000, 3500000, 5000000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setIncome(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                        income === preset
                          ? "bg-accent/20 border-accent text-accent font-bold"
                          : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      ₹{(preset / 100000).toFixed(0)}L
                    </button>
                  ))}
                </div>
              </div>

              {/* Deductions Toggles (Relevant for Old Regime) */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Applicable Deductions (Old Regime Simulation)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={has80C}
                      onChange={(e) => setHas80C(e.target.checked)}
                      className="rounded border-gray-600 text-accent focus:ring-accent accent-accent w-4 h-4"
                    />
                    <span>Section 80C (₹1.5L)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={has80D}
                      onChange={(e) => setHas80D(e.target.checked)}
                      className="rounded border-gray-600 text-accent focus:ring-accent accent-accent w-4 h-4"
                    />
                    <span>Section 80D (₹50k)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={hasHRA}
                      onChange={(e) => setHasHRA(e.target.checked)}
                      className="rounded border-gray-600 text-accent focus:ring-accent accent-accent w-4 h-4"
                    />
                    <span>HRA / Home Loan</span>
                  </label>
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="flex items-start gap-3 text-xs text-gray-400 bg-accent/5 border border-accent/20 p-3.5 rounded-xl">
                <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
                <p>
                  FinTax CA partners cross-verify all 26AS, AIS/TIS entries, and investment proofs to ensure 100% compliant maximum refund claims.
                </p>
              </div>
            </div>

            {/* Right Results Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 rounded-2xl p-6 relative overflow-hidden">
                {/* Highlight Ribbon */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs text-gray-300 font-medium">Recommended Strategy</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <Sparkles size={12} />
                    {taxCalculations.betterRegime}
                  </span>
                </div>

                {/* Side by side regimes */}
                <div className="grid grid-cols-2 gap-4 py-5 border-b border-white/10 text-center">
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">New Tax Regime</span>
                    <span className="text-xl font-bold text-white mt-1 block">
                      {formatINR(taxCalculations.taxNew)}
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Old Tax Regime</span>
                    <span className="text-xl font-bold text-gray-300 mt-1 block">
                      {formatINR(taxCalculations.taxOld)}
                    </span>
                  </div>
                </div>

                {/* Savings Callout */}
                <div className="py-4 text-center">
                  <span className="text-xs text-gray-400">Estimated Arbitrage Savings</span>
                  <div className="text-3xl font-extrabold text-accent font-heading mt-1">
                    {formatINR(taxCalculations.savings)}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono mt-1 inline-block">
                    Effective Tax Rate: {taxCalculations.effectiveRate}%
                  </span>
                </div>

                {/* Direct Action Link */}
                <Link
                  to={`/contact?service=income-tax-filing&income=${income}&regime=${encodeURIComponent(taxCalculations.betterRegime)}`}
                  className="w-full btn btn-accent py-3 text-sm font-bold flex items-center justify-center gap-2 rounded-xl mt-3 shadow-lg"
                >
                  File With Our Senior CA <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Startup & Business Structure Matrix */}
        {activeTab === "startup" && (
          <div className="pt-8 space-y-6">
            {/* Entity Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "pvt-ltd", title: "Private Limited", badge: "Most Popular" },
                { id: "llp", title: "LLP (Partnership)", badge: "Low Compliance" },
                { id: "opc", title: "One Person Co (OPC)", badge: "Solo Founder" },
              ].map((ent) => (
                <button
                  key={ent.id}
                  onClick={() => setSelectedEntity(ent.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedEntity === ent.id
                      ? "bg-accent/15 border-accent shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-gray-400"
                  }`}
                >
                  <span className="text-xs font-bold text-accent block mb-1 uppercase tracking-wider">
                    {ent.badge}
                  </span>
                  <span className="text-base font-bold text-white block">
                    {ent.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Entity Breakdown Card */}
            <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {entityData[selectedEntity].name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {entityData[selectedEntity].tagline}
                  </p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono font-bold self-start md:self-auto">
                  Turnaround: {entityData[selectedEntity].estimatedSetupDays}
                </div>
              </div>

              {/* Grid Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-gray-400 block mb-1">Corporate Tax Rate</span>
                  <span className="text-base font-bold text-white">{entityData[selectedEntity].taxRate}</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-gray-400 block mb-1">Investor Readiness</span>
                  <span className="text-base font-bold text-accent">{entityData[selectedEntity].fundingReady}</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-gray-400 block mb-1">Audit Requirement</span>
                  <span className="text-base font-bold text-white">{entityData[selectedEntity].auditReq}</span>
                </div>
                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-xs text-gray-400 block mb-1">Annual Filings</span>
                  <span className="text-xs font-medium text-gray-300">{entityData[selectedEntity].annualCompliance}</span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 text-center sm:text-left">
                  Includes Name Approval (RUN), DSCs, DINs, MOA/AOA drafting, PAN, TAN, and Bank Account setup.
                </div>
                <Link
                  to={`/contact?service=corporate-services&entity=${selectedEntity}`}
                  className="btn btn-accent px-6 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap"
                >
                  Incorporate With Us →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
