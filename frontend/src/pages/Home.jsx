import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Briefcase, Target, ShieldCheck, Clock, 
  ChevronRight, CheckCircle2, Users, IndianRupee, Layers
} from 'lucide-react';
import { api } from '../api';
import { ServicesShowcase } from '../components/ServicesShowcase';
import { StatsBand } from '../components/StatsBand';
import { Spinner } from '../components/Spinner';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMotionVariants } from '../utils/motion';
import { FAQPreview } from '../components/FAQPreview';
import CTAWithVerticalMarquee from '../components/ui/cta-with-text-marquee';
import { ElasticGallery } from '../components/ui/elastic-gallery';
import TestimonialsSection from '../components/ui/community-testimonial';
import { ImageStreamHero } from '../components/ui/image-stream-hero';
import { useSEO } from '../hooks/useSEO';

const heroImages = [
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", alt: "Corporate building" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800", alt: "Meeting" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", alt: "Charts" },
  { src: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800", alt: "Calculator" },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800", alt: "Professional" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", alt: "Team" },
  { src: "https://images.unsplash.com/photo-1507679622836-81498b79b9bf?auto=format&fit=crop&q=80&w=800", alt: "Strategy" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", alt: "Meeting table" },
];

export const Home = () => {
  useSEO({
    title: 'FinTax India | Tax & Financial Services in India',
    description: 'FinTax India provides professional tax, accounting and financial services for individuals and businesses across India.'
  });

  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const MotionLink = motion(Link);
  const magneticProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };
  
  const orbAnimation1 = shouldReduceMotion ? {} : {
    animate: { y: [0, -50, 0], x: [0, 30, 0] },
    transition: { duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
  };
  
  const orbAnimation2 = shouldReduceMotion ? {} : {
    animate: { y: [0, 60, 0], x: [0, -40, 0] },
    transition: { duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testData] = await Promise.all([
          api.getServices(),
          api.getTestimonials()
        ]);
        setServices(servicesData);
        setTestimonials(testData);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div className="min-h-[85vh] flex items-center justify-center"><Spinner size={40} /></div>;
  }

  return (
    <div>
      {/* Cinematic Hero Section */}
      <ImageStreamHero 
        images={heroImages}
        speed={30}
        axis={50}
        path={{
          railExit: 32, // Bring them closer to center (was 44)
          railBirth: -8, // Start slightly closer
          turnExit: 22   // Slightly less aggressive rotation since they are closer
        }}
        className="relative min-h-[80vh] flex items-center overflow-hidden pb-16 bg-[#0a1526]"
      >
        {/* 1. Base strengthening: flat navy scrim */}
        <div className="absolute inset-0 bg-primary/65 pointer-events-none"></div>
        {/* 2. Color grade: mix-blend-multiply to tint stock footage toward brand navy */}
        <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-60 pointer-events-none"></div>
        {/* 3. Vignette: draw focus to center and obscure edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(11,31,58,0.85)_100%)] pointer-events-none"></div>

        <div className="container relative z-10 w-full pt-16 md:pt-24">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.h1 
              className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-6 leading-[1.1] tracking-tight drop-shadow-xl"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Manage & Grow Your Finances
            </motion.h1>
            <motion.p 
              className="text-gray-200 text-xl md:text-2xl mb-10 font-normal leading-relaxed max-w-2xl"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Simplifying financial and business management for brand owners, professionals, and entrepreneurs.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center w-full"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              <Link to="/contact" className="btn btn-accent">
                Book a Consultation
              </Link>
              <Link to="/services" className="btn btn-outline-white">
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 md:bottom-36 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-white/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1 hover:border-white/60 transition-colors">
            <motion.div 
              className="w-1 h-2 bg-accent rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Floating Trust Card */}
        <MotionLink 
          to="/blog"
          className="hidden md:flex absolute bottom-28 right-8 lg:right-16 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/15 transition-all group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center justify-center bg-accent/20 text-accent px-3 py-3 rounded-lg border border-accent/30 group-hover:bg-accent group-hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
          </div>
          <div className="pr-2">
            <p className="text-white font-bold text-sm mb-1 flex items-center gap-2 group-hover:text-accent transition-colors">
              Explore Tax Insights
              <span className="inline-flex relative h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
            </p>
            <p className="text-gray-300 text-xs group-hover:text-white transition-colors">Read our latest updates & guides →</p>
          </div>
        </MotionLink>
      </ImageStreamHero>

      {/* Trust & Stats Band */}
      <div className="relative z-20 -mt-16 md:-mt-24">
        <StatsBand />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Hero-Stats Overlap Gradient */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
            variants={mv.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Tax & Financial Services for Individuals and Businesses
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Fintax India is committed to simplifying financial and business management for brand owners, professionals and entrepreneurs. With a focus on offering high-quality and affordable services, we guide clients at every step of their journey. Further, our promise to reliability, transparency and client satisfaction has helped us for trusted relations with clients.
          </motion.p>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* Services Showcase */}
      <section className="py-8 md:py-16 bg-white relative overflow-hidden">
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            className="absolute -top-40 -left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply blur-[100px] opacity-[0.08]"
            {...orbAnimation1}
          />
          <motion.div 
            className="absolute top-40 -right-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-[100px] opacity-[0.08]"
            {...orbAnimation2}
          />
        </div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <motion.h2 
              className="section-title text-primary"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="section-subtitle mx-auto"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Check out our aim to support your financial path and explore our range of services below.
            </motion.p>
          </div>
          
          <ElasticGallery />
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Why Choose Us - Bento Grid */}
      <section className="pt-12 md:pt-32 pb-8 md:pb-12 bg-[#0a1526] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2 z-0"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-400"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              At Fintax India, we believe that financial management can be tough and complex. This is why we are committed to ease the process for you. Check out what makes us stand out:
            </motion.p>
          </div>

          {/* Ethereal Staggered Layout */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-6xl mx-auto px-4">
            
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-12 md:gap-12">
              {/* Item 1 */}
              <motion.div 
                className="relative group p-6 md:p-8 transition-all duration-500 hover:-translate-y-2"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Experts You Can Trust</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Our team includes experienced professionals in financial planning, tax filing and corporate solutions. We stay up to date with the latest market trends and norms to ensure you get accurate & reliable advice.
                  </p>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div 
                className="relative group p-6 md:p-8 transition-all duration-500 hover:-translate-y-2"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <Layers size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Complete Solutions</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    From income tax to GST filing, insurance planning to wealth management, we provide comprehensive financial services under one roof.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Column 2 - Staggered */}
            <div className="flex-1 flex flex-col gap-12 md:gap-12 md:mt-16">
              {/* Item 2 */}
              <motion.div 
                className="relative group p-6 md:p-8 transition-all duration-500 hover:-translate-y-2"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <Users size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Customer-Centric Service</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    We focus on your needs and work closely to understand your financial needs. Our solutions are customized to individual situations, ensuring the best results.
                  </p>
                </div>
              </motion.div>

              {/* Item 4 */}
              <motion.div 
                className="relative group p-6 md:p-8 transition-all duration-500 hover:-translate-y-2"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <IndianRupee size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Transparent Pricing</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    We offer fair pricing with no hidden charges. Our pricing is transparent, providing value for money while maintaining the best service standards.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Our Method Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-black text-primary mb-6 uppercase tracking-tight"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              The FinTax Methodology
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              A rigorous, three-phase approach to ensuring structural financial integrity and sustainable growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-gray-100 z-0"></div>

            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We conduct a comprehensive review of your current financial architecture, identifying vulnerabilities and strategic opportunities."
              },
              {
                step: "02",
                title: "Framework Deployment",
                desc: "Our team implements tailored compliance protocols, tax structures, and reporting systems aligned with regulatory demands."
              },
              {
                step: "03",
                title: "Ongoing Advisory",
                desc: "We don't just set up and leave. We provide continuous, proactive guidance to adapt to changing laws and scale your business."
              }
            ].map((method, idx) => (
              <motion.div 
                key={idx}
                className="relative z-10 flex flex-col items-center text-center group"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={mv.viewportConfig}
              >
                <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-50 shadow-[0_0_20px_rgba(0,0,0,0.05)] flex items-center justify-center mb-6 group-hover:border-accent transition-colors duration-500 relative">
                  <span className="text-2xl font-black text-primary group-hover:text-accent transition-colors duration-500">{method.step}</span>
                  <div className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{method.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                  {method.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Testimonials */}
      <TestimonialsSection data={{
        title: "Client Success Stories",
        subtitle: "See how FinTax India has transformed financial compliance and strategy for businesses across the country.",
        rows: [
          {
            id: "row1",
            speed: "50s",
            direction: "left",
            testimonials: [
              {
                id: "t1",
                quote: "FinTax completely overhauled our corporate tax strategy. We saved significantly and their audit readiness is unmatched.",
                authorName: "Ananya Sharma",
                authorTitle: "CFO, TechNova India",
                avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t2",
                quote: "Their GST advisory services have streamlined our multi-state operations flawlessly. Highly recommended for scaling startups.",
                authorName: "Rajiv Menon",
                authorTitle: "Founder, LogisticsPro",
                avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t3",
                quote: "Professional, punctual, and profoundly knowledgeable. The team at FinTax feels like an extension of our own finance department.",
                authorName: "Priya Desai",
                authorTitle: "Director, Retail Chain",
                avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
              },
            ],
          },
          {
            id: "row2",
            speed: "45s",
            direction: "right",
            testimonials: [
              {
                id: "t4",
                quote: "When dealing with complex international taxation, FinTax India provided clarity and a robust framework that protected our assets.",
                authorName: "Vikram Singh",
                authorTitle: "CEO, Global Exports",
                avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t5",
                quote: "The strategic planning they delivered during our merger was phenomenal. They caught details everyone else missed.",
                authorName: "Neha Gupta",
                authorTitle: "Managing Partner",
                avatarUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=150&q=80",
              },
              {
                id: "t6",
                quote: "Reliable year-round compliance without the usual stress. Their proactive communication is exactly what modern businesses need.",
                authorName: "Amit Patel",
                authorTitle: "Operations Head",
                avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
              },
            ],
          },
        ]
      }} />

      {/* FAQ Preview Component */}
      <FAQPreview />

      {/* Elegant Glowing Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.3)] relative z-20" />

      {/* Marquee CTA replacing the old static CTA */}
      <CTAWithVerticalMarquee />
    </div>
  );
};
