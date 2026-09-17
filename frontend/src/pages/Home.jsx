import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Sparkles, ChevronRight, Briefcase, ShieldCheck
} from "lucide-react";
import { StatsBand } from "../components/StatsBand";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";
import { FAQPreview } from "../components/FAQPreview";
import CTAWithVerticalMarquee from "../components/ui/cta-with-text-marquee";
import { ElasticGallery } from "../components/ui/elastic-gallery";
import TestimonialsSection from "../components/ui/community-testimonial";
import { ImageStreamHero } from "../components/ui/image-stream-hero";
import { useSEO } from "../hooks/useSEO";

// FinTech Components
import { HeroCommandHUD } from "../components/fintech/HeroCommandHUD";
import { FintechBentoGrid } from "../components/fintech/FintechBentoGrid";
import { ClientSolutionsVault } from "../components/fintech/ClientSolutionsVault";
import { RapidAssessmentDrawer } from "../components/fintech/RapidAssessmentDrawer";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=75&w=600", alt: "Corporate building" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=75&w=600", alt: "Meeting" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=75&w=600", alt: "Charts" },
  { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=75&w=600", alt: "Calculator" },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=75&w=600", alt: "Professional" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=75&w=600", alt: "Team" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=600", alt: "Strategy" },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=75&w=600", alt: "Meeting table" },
];

const MotionLink = motion(Link);

export const Home = () => {
  useSEO({
    title: "FinTax India | Tax & Financial Services in India",
    description: "FinTax India provides professional tax, accounting and financial services for individuals and businesses across India."
  });

  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();

  const scrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-accent selection:text-primary overflow-x-hidden">
      
      {/* =========================================================================
          1. CINEMATIC HERO SECTION
      ========================================================================== */}
      <ImageStreamHero 
        images={heroImages}
        speed={35}
        axis={52}
        path={{
          railExit: 32,
          railBirth: -8,
          turnExit: 22
        }}
        className="relative overflow-hidden pt-4 pb-4 sm:pt-6 sm:pb-6 bg-[#030814] flex items-center"
      >
        {/* Scrims for maximum readability over background imagery */}
        <div className="absolute inset-0 bg-[#030814]/75 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[350px] bg-[#030814]/70 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 w-full pt-10 sm:pt-12 md:pt-14 pb-2">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Executive Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-3 sm:mb-4 hover:border-accent/40 transition-colors shadow-lg max-w-[95vw]"
            >
              <ShieldCheck size={14} className="text-accent shrink-0" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-200 truncate">
                ICAI Compliant Firm • 500+ Active Clients Across India
              </span>
            </motion.div>

            {/* Clear, High-Contrast Hero Headline */}
            <motion.h1 
              className="text-white text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black mb-2.5 sm:mb-4 leading-[1.12] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Manage & Grow Your Finances
            </motion.h1>

            {/* Simple, Readable Subtitle */}
            <motion.p 
              className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 font-normal leading-relaxed max-w-2xl text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] px-2"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Simplifying tax, accounting, and business management for brand owners, professionals, and entrepreneurs across India.
            </motion.p>

            {/* Action Buttons: Clean & Direct */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 justify-center w-full max-w-md sm:max-w-none mx-auto mb-4 sm:mb-6 px-4 sm:px-0"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              <Link 
                to="/contact"
                className="btn btn-accent px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={18} />
              </Link>
              <button 
                onClick={scrollToServices}
                className="btn bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Explore Services</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>

            {/* Embedded Live FinTax Command HUD Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-full px-2 sm:px-0"
            >
              <HeroCommandHUD />
            </motion.div>

          </div>
        </div>

        {/* Floating Blog Feature Indicator */}
        <MotionLink 
          to="/blog"
          className="hidden lg:flex absolute bottom-4 right-6 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 sm:p-3 rounded-2xl items-center gap-3 shadow-2xl hover:bg-white/15 transition-all group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center justify-center bg-accent/20 text-accent p-2 rounded-xl border border-accent/30 group-hover:bg-accent group-hover:text-primary transition-colors">
            <Sparkles size={16} />
          </div>
          <div className="pr-2 text-left">
            <p className="text-white font-bold text-xs flex items-center gap-1 group-hover:text-accent transition-colors">
              Explore Tax Insights
            </p>
            <p className="text-gray-300 text-[10px]">Latest Union Budget & GST Guides →</p>
          </div>
        </MotionLink>
      </ImageStreamHero>

      {/* =========================================================================
          2. STATS BAND
      ========================================================================== */}
      <div className="relative z-20 border-y border-white/10 bg-[#060e1a]">
        <StatsBand />
      </div>

      {/* =========================================================================
          3. CORE SEO VALUE PROPOSITION (Retaining Required Keywords)
      ========================================================================== */}
      <section className="py-10 sm:py-16 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            Institutional Standard
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-3 sm:mb-4 tracking-tight leading-tight font-heading"
            variants={mv.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Tax & Financial Services for Individuals and Businesses
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            FinTax India is committed to simplifying financial architecture and corporate governance for brand owners, professionals, and entrepreneurs across India. We combine modern digital workflows with licensed partner Chartered Accountants to deliver thorough statutory accuracy, dependable filing turnarounds, and continuous strategic advisory.
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          4. OUR SERVICES (EXPANDING ACCORDION)
      ========================================================================== */}
      <section id="services-section" className="py-10 sm:py-16 md:py-24 bg-white relative overflow-hidden scroll-mt-8">
        <div className="container relative z-10 px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Sparkles size={13} className="text-accent" />
              Core Practice Areas
            </span>
            <h2 className="section-title text-primary uppercase text-2xl sm:text-4xl">
              Our <span className="text-accent">Services</span>
            </h2>
            <p className="section-subtitle mx-auto text-gray-600 text-xs sm:text-base">
              Check out our aim to support your financial path and explore our range of services below.
            </p>
          </div>
          
          <ElasticGallery />
        </div>
      </section>

      {/* =========================================================================
          5. FIND THE RIGHT SERVICE FOR YOUR NEEDS
      ========================================================================== */}
      <RapidAssessmentDrawer />

      {/* =========================================================================
          6. WHY LEADING BUSINESSES CHOOSE FINTAX (BENTO GRID)
      ========================================================================== */}
      <FintechBentoGrid />

      {/* =========================================================================
          7. OUR 3-STEP ADVISORY PROCESS
      ========================================================================== */}
      <section className="py-10 sm:py-16 md:py-28 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="container max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
            <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-2">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-3 sm:mb-4 tracking-tight font-heading">
              Our 3-Step Advisory Process
            </h2>
            <p className="text-gray-600 text-xs sm:text-base md:text-lg">
              A structured, transparent framework ensuring complete compliance and maximum tax savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent z-0"></div>

            {[
              {
                step: "01",
                title: "Deep Forensic Audit",
                desc: "We analyze historical 26AS, AIS/TIS records, GSTR files, and past financial statements to unearth unnoticed tax credits and latent compliance vulnerabilities."
              },
              {
                step: "02",
                title: "Precision Deployment",
                desc: "Our partner CAs implement bespoke tax structures, optimal salary or business expense allocations, and multi-tier verification before department submissions."
              },
              {
                step: "03",
                title: "Continuous CA Advisory",
                desc: "We assign a designated FCA partner available year-round via WhatsApp and dedicated Slack channels to guide advance tax, board meetings, and regulatory changes."
              }
            ].map((method, idx) => (
              <div 
                key={idx}
                className="relative z-10 flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-primary border border-accent/30 flex items-center justify-center mb-4 sm:mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <span className="text-xl sm:text-2xl font-black text-accent font-mono">{method.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">{method.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TAILORED ADVISORY TRACKS (CLIENT SOLUTIONS VAULT)
      ========================================================================== */}
      <ClientSolutionsVault />

      {/* =========================================================================
          9. TESTIMONIALS SECTION
      ========================================================================== */}
      <TestimonialsSection data={{
        title: "Trusted By Fast-Moving Founders & Enterprises",
        subtitle: "See how FinTax India transforms financial compliance, legal tax savings, and audit defense across the country.",
        rows: [
          {
            id: "row1",
            speed: "45s",
            direction: "left",
            testimonials: [
              {
                id: "t1",
                quote: "FinTax restructured our employee ESOP tax allocation and saved our tech startup over ₹28 Lakhs. Their CA response time on WhatsApp is unmatched.",
                authorName: "Ananya Sharma",
                authorTitle: "CFO, TechNova India",
                avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t2",
                quote: "Their GSTR-2B automated reconciliation caught over ₹14 Lakhs in unclaimed Input Tax Credit our previous accountant missed entirely.",
                authorName: "Rajiv Menon",
                authorTitle: "Founder, LogisticsPro",
                avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t3",
                quote: "As a doctor with multiple clinic incomes, their 44ADA consultation saved me hours of stress and provided a thorough, fully compliant ITR.",
                authorName: "Dr. Priya Desai",
                authorTitle: "Consultant Surgeon, Mumbai",
                avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
              },
            ],
          },
          {
            id: "row2",
            speed: "40s",
            direction: "right",
            testimonials: [
              {
                id: "t4",
                quote: "When expanding into exports, FinTax handled our multi-state GST, LUT registrations, and FEMA documentation smoothly without a hitch.",
                authorName: "Vikram Singh",
                authorTitle: "CEO, Global Exports",
                avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t5",
                quote: "Zero stress during MCA filing season. Their team files well ahead of time, ensuring no penalties or late fees ever touch our balance sheet.",
                authorName: "Neha Gupta",
                authorTitle: "Managing Director, D2C Apparel",
                avatarUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t6",
                quote: "Their partner-level CA gives advice like an in-house CFO. Easily the highest ROI compliance investment we make every fiscal year.",
                authorName: "Amit Patel",
                authorTitle: "Head of Operations, FinEdge",
                avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
              },
            ],
          },
        ]
      }} />

      {/* =========================================================================
          10. ELEVATED FREQUENTLY ASKED QUESTIONS
      ========================================================================== */}
      <FAQPreview />

      {/* =========================================================================
          11. FINAL MARQUEE CTA
      ========================================================================== */}
      <div className="border-t border-white/10">
        <CTAWithVerticalMarquee />
      </div>

    </div>
  );
};
