import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMotionVariants } from "../utils/motion";
import { api } from "../api";

const DEFAULT_FAQS = [
  { 
    id: "f1", 
    question: "What documents are required for individual ITR filing?", 
    answer: "Generally, you need your PAN, Aadhaar, Form 16 (from all employers), bank account statements for the financial year, capital gains statements (from Zerodha, Groww, etc.), and investment receipts for 80C/80D deductions." 
  },
  { 
    id: "f2", 
    question: "How long does Private Limited or LLP company registration take?", 
    answer: "On the MCA V3 portal, incorporation typically takes 5 to 7 business days. This includes Name Approval (RUN), Digital Signature Certificates (DSC), DIN allocation, and MOA/AOA drafting." 
  },
  { 
    id: "f3", 
    question: "How does FinTax ensure zero department notices on GST & ITR?", 
    answer: "We perform automated forensic pre-checks against your AIS/TIS, 26AS, and GSTR-2B before filing. Furthermore, every single return is manually reviewed and signed off by a qualified FCA partner." 
  },
  { 
    id: "f4", 
    question: "Do you offer direct online CA consultations for founders outside Mumbai/Delhi?", 
    answer: "Yes! We serve clients across all 28 Indian states and international NRIs via encrypted video calls, email, and direct partner WhatsApp channels." 
  },
];

export const FAQPreview = () => {
  const mv = useMotionVariants();
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [openId, setOpenId] = useState("f1");

  useEffect(() => {
    let isMounted = true;
    const fetchFAQs = async () => {
      try {
        const data = await api.getQA();
        if (isMounted && data && data.length > 0) {
          setFaqs(data.slice(0, 5));
          setOpenId(data[0].id);
        }
      } catch (err) {
        // Fallback already rendered
      }
    };
    fetchFAQs();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white border-t border-gray-200 relative overflow-hidden">
      <div className="container max-w-6xl relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Support Card */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles size={13} className="text-accent" />
              Common Inquiries
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight font-heading">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>

            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Clear, transparent answers regarding our Chartered Accountant advisory, statutory filing timelines, and compliance standards.
            </p>

            {/* Direct Support Callout Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-50 border border-gray-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-primary">Have a specific tax situation?</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Our senior Chartered Accountants provide confidential preliminary assessments to identify tax savings or compliance gaps.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link
                  to="/contact"
                  className="btn btn-accent text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Ask a Senior CA</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/qa"
                  className="btn bg-white hover:bg-gray-100 text-primary border border-gray-200 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Browse Q&A Ledger</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-primary/30 shadow-md ring-1 ring-primary/10"
                      : "bg-gray-50/70 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 outline-none group"
                  >
                    <span className={`text-sm sm:text-base md:text-lg font-bold transition-colors ${
                      isOpen ? "text-primary" : "text-gray-900 group-hover:text-primary"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                      isOpen
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-200 text-gray-500 group-hover:text-primary"
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pt-1 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
