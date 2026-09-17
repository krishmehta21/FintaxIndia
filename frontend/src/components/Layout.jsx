import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Menu, X, Landmark, ChevronDown } from 'lucide-react';
import { CustomLogo } from './Logo';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const MotionNavLink = motion(NavLink);
const MotionLink = motion(Link);

const SERVICES_LIST = [
  { title: "Income Tax Filing", slug: "income-tax-filing" },
  { title: "Financial Services", slug: "financial-services" },
  { title: "GST Filing", slug: "gst-filing" },
  { title: "Loan Services", slug: "loan-services" },
  { title: "Insurance Services", slug: "insurance-services" },
  { title: "Corporate Services", slug: "corporate-services" },
];

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const { scrollY, scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const magneticProps = shouldReduceMotion ? {} : {
    transition: { type: "tween", duration: 0.2 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <nav 
        className={`navbar fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-200 ${
          isScrolled 
            ? 'py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-md' 
            : 'py-5 bg-white'
        }`}
      >
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <MotionLink to="/" className={`navbar-logo transition-transform duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`} onClick={closeMenu} {...magneticProps}>
              <CustomLogo dark={false} />
            </MotionLink>
            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-8 bg-gray-200"></div>
          </div>
          
          <button 
            className="md:hidden text-primary p-2 focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0 gap-6 md:gap-8 border-b md:border-b-0 border-gray-100 z-50`}>
            <MotionNavLink to="/" end className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} {...magneticProps}>Home</MotionNavLink>
            <MotionNavLink to="/about" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} {...magneticProps}>About</MotionNavLink>
            
            {/* Services Dropdown */}
            <div 
              className="relative group w-full md:w-auto"
              onMouseEnter={() => window.innerWidth >= 768 && setServicesDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setServicesDropdownOpen(false)}
            >
              <div className="flex items-center justify-between md:justify-start gap-1">
                <MotionNavLink 
                  to="/services" 
                  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} 
                  onClick={closeMenu} 
                  {...magneticProps}
                >
                  Services
                </MotionNavLink>
                <button 
                  className="p-1 md:pointer-events-none text-primary focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.innerWidth < 768) {
                      setServicesDropdownOpen(!servicesDropdownOpen);
                    }
                  }}
                  aria-label="Toggle services menu"
                >
                  <ChevronDown size={16} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : 'md:group-hover:rotate-180'}`} />
                </button>
              </div>

              {/* Invisible bridge to prevent hover glitch */}
              <div className="hidden md:block absolute top-full left-0 w-full h-8 bg-transparent z-40" />
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:absolute md:top-full md:left-0 md:mt-6 md:w-56 bg-white md:shadow-xl md:rounded-md md:border border-gray-100 overflow-hidden flex flex-col md:pt-2 md:pb-2 w-full pl-4 md:pl-0 z-50"
                  >
                    {SERVICES_LIST.map((service) => (
                      <Link 
                        key={service.slug} 
                        to={`/services/${service.slug}`}
                        className="block px-4 py-3 md:py-2 text-sm font-medium text-gray-600 hover:text-accent md:hover:bg-gray-50 transition-colors"
                        onClick={closeMenu}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MotionNavLink to="/qa" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} {...magneticProps}>Q&A</MotionNavLink>
            <MotionNavLink to="/blog" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} {...magneticProps}>Blog</MotionNavLink>
            <MotionLink to="/contact" className="md:ml-2 px-5 py-2.5 text-sm font-semibold border border-primary/20 text-primary hover:bg-primary/5 rounded-md transition-colors whitespace-nowrap" onClick={closeMenu} {...magneticProps}>
              Book a Consultation
            </MotionLink>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden mt-auto">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-10">
            <div className="md:col-span-4 lg:col-span-5">
              <Link to="/" className="inline-block mb-6">
                <CustomLogo dark={true} />
              </Link>
              <p className="text-gray-400 leading-relaxed max-w-sm text-sm md:text-base">
                Professional Chartered Accountant consultancy providing rigorous financial, tax, and advisory services. Strategic planning that delivers uncompromising integrity.
              </p>
            </div>
            
            <div className="md:col-span-4 lg:col-span-3">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-90 drop-shadow-md">Navigation</h4>
              <ul className="flex flex-col gap-4">
                {['About Us', 'Our Services', 'Q&A Ledger', 'Insights Blog', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <Link to={item === 'About Us' ? '/about' : item === 'Our Services' ? '/services' : item === 'Q&A Ledger' ? '/qa' : item === 'Insights Blog' ? '/blog' : '/contact'} className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all text-sm font-medium">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-90 drop-shadow-md">Corporate Office</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-400">
                <li className="flex items-start gap-3 group">
                  <span className="text-accent/70 mt-0.5 group-hover:text-accent transition-colors">✉</span>
                  <a href="mailto:contact@fintaxindia.com" className="hover:text-white transition-colors">contact@fintaxindia.com</a>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-accent/70 mt-0.5 group-hover:text-accent transition-colors">⚲</span>
                  <span>Financial District, New Delhi<br/>India 110001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4 text-xs text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} FinTax India. Regulated Financial Advisory.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
