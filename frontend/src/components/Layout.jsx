import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Menu, X, Stamp } from 'lucide-react';

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <Stamp size={28} className="text-stamp" style={{color: 'var(--color-stamp)'}} />
            FinTax India
          </Link>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>About</NavLink>
            <NavLink to="/services" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Services</NavLink>
            <NavLink to="/qa" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Q&A</NavLink>
            <NavLink to="/contact" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Contact</NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container grid md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="navbar-logo mb-4 inline-flex" style={{color: 'var(--color-parchment)'}}>
              <Stamp size={24} style={{color: 'var(--color-brass)'}} />
              FinTax India
            </Link>
            <p className="text-muted" style={{color: 'rgba(250, 247, 240, 0.7)'}}>
              Professional Chartered Accountant consultancy providing rigorous financial, tax, and advisory services.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/qa">Q&A Ledger</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Details</h4>
            <ul className="flex flex-col gap-2 mono-text" style={{color: 'rgba(250, 247, 240, 0.7)'}}>
              <li>contact@fintaxindia.com</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FinTax India. Regulated Financial Advisory.</p>
        </div>
      </footer>
    </div>
  );
};
