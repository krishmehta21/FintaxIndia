import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';
import { useSEO } from '../hooks/useSEO';
import { 
  ShieldCheck, Clock, MessageSquare, Mail, CheckCircle2, 
  Sparkles, ArrowRight, X, Lock, Check, ChevronDown
} from 'lucide-react';

const CORE_SERVICES = [
  { id: "income-tax-filing", title: "Income Tax Filing" },
  { id: "gst-filing", title: "GST Filing & Compliance" },
  { id: "corporate-services", title: "Corporate & ROC Services" },
  { id: "financial-services", title: "Financial & Virtual CFO" },
  { id: "loan-services", title: "Loan & Debt Advisory" },
  { id: "insurance-services", title: "Corporate Insurance" },
];

const ENTITY_PROFILES = [
  { id: "salaried", label: "Salaried / HNI Individual" },
  { id: "freelance", label: "Freelancer / Consultant" },
  { id: "startup", label: "Startup / SME Founder" },
  { id: "enterprise", label: "Corporate Enterprise" },
];

const TRACK_TO_PROFILE = {
  executives: "Salaried / HNI Individual",
  freelancers: "Freelancer / Consultant",
  startups: "Startup / SME Founder",
  enterprises: "Corporate Enterprise"
};

const ENTITY_SELECT_OPTIONS = [
  { value: "", label: "Select your profile..." },
  ...ENTITY_PROFILES.map(p => ({ value: p.label, label: p.label })),
  { value: "Other", label: "Other / Individual" }
];

const SERVICE_SELECT_OPTIONS = [
  { value: "", label: "General Financial & CA Advisory" },
  ...CORE_SERVICES.map(s => ({ value: s.title, label: s.title }))
];

const CustomSelect = ({ 
  label, 
  id, 
  value, 
  options, 
  placeholder, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : (value || placeholder);
  const hasValue = Boolean(value);

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor={id} className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base text-left flex items-center justify-between transition-all bg-white cursor-pointer select-none ${
          isOpen 
            ? 'border-primary ring-2 ring-primary/20 shadow-sm' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className={hasValue ? 'text-gray-900 font-medium truncate' : 'text-gray-400 truncate'}>
          {displayLabel}
        </span>
        <ChevronDown 
          size={17} 
          className={`text-gray-500 shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-1.5 max-h-60 overflow-y-auto z-50 divide-y divide-gray-50"
          >
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-primary/5 text-primary font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check size={16} className="text-primary shrink-0 ml-2" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact = () => {
  useSEO({
    title: 'Contact Us | FinTax India',
    description: 'Get in touch with FinTax India for expert financial and tax advisory. Book a consultation or inquire about our corporate services today.'
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawServiceParam = searchParams.get('service') || '';
  const rawProfileParam = searchParams.get('profile') || '';
  const rawTrackParam = searchParams.get('track') || '';

  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();
  
  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const magneticProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  // Resolve matching service
  const matchedServiceObj = CORE_SERVICES.find(
    s => s.id === rawServiceParam || s.title.toLowerCase() === rawServiceParam.toLowerCase()
  );
  const initialService = matchedServiceObj ? matchedServiceObj.title : (rawServiceParam ? rawServiceParam : '');

  // Resolve matching profile
  const resolvedProfile = rawProfileParam 
    ? (ENTITY_PROFILES.find(p => p.id === rawProfileParam)?.label || rawProfileParam)
    : (rawTrackParam ? (TRACK_TO_PROFILE[rawTrackParam] || rawTrackParam) : '');

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    entity_type: resolvedProfile,
    service_interest: initialService, 
    contact_method: 'WhatsApp',
    message: '' 
  });

  const [showPresetNotice, setShowPresetNotice] = useState(Boolean(initialService || resolvedProfile));
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Sync state if search params change
  useEffect(() => {
    if (initialService || resolvedProfile) {
      setFormData(prev => ({
        ...prev,
        service_interest: initialService || prev.service_interest,
        entity_type: resolvedProfile || prev.entity_type
      }));
      setShowPresetNotice(true);
    }
  }, [rawServiceParam, rawProfileParam, rawTrackParam]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearPreset = () => {
    setShowPresetNotice(false);
    setSearchParams({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : null,
        service_interest: formData.entity_type 
          ? `${formData.service_interest || 'General Advisory'} [${formData.entity_type}]` 
          : formData.service_interest || 'General Advisory',
        message: `[Preferred Contact: ${formData.contact_method}] ${formData.message.trim()}`
      };

      await api.submitContact(payload);
      setSubmitSuccess(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        entity_type: '', 
        service_interest: '', 
        contact_method: 'WhatsApp', 
        message: '' 
      });
      setShowPresetNotice(false);
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err) {
      setSubmitError('Failed to transmit contact form. Please try again or reach out to us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section ref={heroRef} className="bg-primary text-white pt-10 pb-20 sm:pt-14 sm:pb-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-top"
          style={{ y: shouldReduceMotion ? 0 : y }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 max-w-3xl text-center px-4">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white font-heading tracking-tight"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Schedule a Consultation
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Submit your requirements below for audit-grade tax planning, ROC compliance, or financial advisory.
          </motion.p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="section -mt-10 md:-mt-14 relative z-20 pb-16">
        <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Contact Info Panel (Left Column - 4 cols) */}
          <motion.div 
            className="lg:col-span-4 bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-xl z-10 relative flex flex-col justify-between border border-white/10"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Direct Communication
              </h3>
              
              <p className="text-sm sm:text-base text-gray-200 mb-6 leading-relaxed">
                Connect with our partner Chartered Accountants for institutional guidance on your tax and business architecture.
              </p>

              {/* Direct Channels */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-accent uppercase text-xs font-semibold tracking-wider">Email Advisory</p>
                    <a href="mailto:contact@fintaxindia.com" className="text-sm sm:text-base font-bold text-white hover:text-accent transition-colors block truncate mt-0.5">
                      contact@fintaxindia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-emerald-400 uppercase text-xs font-semibold tracking-wider">WhatsApp CA Helpline</p>
                    <a 
                      href="https://wa.me/919876543210?text=Hi%20FinTax%20India,%20I%20would%20like%20to%20schedule%20a%20tax%20consultation." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition-colors block truncate mt-0.5"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <ShieldCheck size={18} className="text-accent shrink-0" />
                  <span>100% Confidentiality & CA-Client Privilege</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Clock size={18} className="text-emerald-400 shrink-0" />
                  <span>Average First CA Response: &lt; 2 Hours</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Lock size={18} className="text-gray-400 shrink-0" />
                  <span>Zero-Spam Policy • Encrypted Vault</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300 font-medium">
              Mon – Sat: 9:30 AM – 7:00 PM IST
            </div>
          </motion.div>

          {/* Form Panel (Right Column - 8 cols) */}
          <motion.div 
            className="lg:col-span-8 bg-white p-6 sm:p-8 md:p-9 rounded-2xl shadow-xl z-10 relative border border-gray-200"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
            transition={{ delay: 0.2 }}
          >
            {/* Pre-Selected Track Banner */}
            {showPresetNotice && (formData.service_interest || formData.entity_type) && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 sm:p-3.5 mb-5 flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary text-accent flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs uppercase text-accent font-bold tracking-wider block">
                      Custom Engagement Scope
                    </span>
                    <p className="text-sm sm:text-base font-bold text-primary truncate">
                      {formData.entity_type ? `${formData.entity_type} • ` : ''}{formData.service_interest || 'General Advisory'}
                    </p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={clearPreset}
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
                  title="Clear Preset"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <AnimatePresence>
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 mb-5 flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-emerald-950">Inquiry Transmitted Successfully</h4>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
                      Your consultation brief has been assigned to a senior Chartered Accountant. We will reach out within 2 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm mb-4 text-center">
                {submitError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className={`space-y-4 sm:space-y-5 transition-opacity duration-300 ${submitSuccess ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required 
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400" 
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required 
                    placeholder="e.g. rahul@company.com"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400" 
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Row 2: Phone/WhatsApp and Entity Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder:text-gray-400" 
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <CustomSelect
                    label="Entity Profile"
                    id="entity_type"
                    value={formData.entity_type}
                    placeholder="Select your profile..."
                    options={ENTITY_SELECT_OPTIONS}
                    onChange={(val) => setFormData(prev => ({ ...prev, entity_type: val }))}
                  />
                </div>
              </div>

              {/* Row 3: Practice Area & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <CustomSelect
                    label="Service Required"
                    id="service_interest"
                    value={formData.service_interest}
                    placeholder="General Financial & CA Advisory"
                    options={SERVICE_SELECT_OPTIONS}
                    onChange={(val) => setFormData(prev => ({ ...prev, service_interest: val }))}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Preferred Contact Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['WhatsApp', 'Call', 'Email'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, contact_method: method }))}
                        className={`py-2.5 px-2 rounded-lg text-xs sm:text-sm font-bold border transition-all text-center ${
                          formData.contact_method === method
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Detailed Requirements */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Detailed Requirements / Questions *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required 
                  rows="3" 
                  placeholder="Please describe your current tax situation, turnover, or specific compliance questions..."
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y min-h-[80px] text-gray-900 placeholder:text-gray-400"
                  value={formData.message}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button 
                  type="submit" 
                  className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-accent text-primary font-bold text-base sm:text-lg shadow-md shadow-accent/20 hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  disabled={submitting}
                  {...magneticProps}
                >
                  <span>{submitting ? 'Transmitting Consultation Request...' : 'Schedule CA Consultation'}</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>

              <p className="text-center text-xs sm:text-sm text-gray-500 pt-1">
                🔒 Protected by Chartered Accountant confidentiality ethics. No obligation.
              </p>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
