import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Force solid white header on all blog pages
  const isBlogPage = location.pathname.startsWith('/blog');
  const isSolid = isBlogPage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, 
        zIndex: 100,
        background: isSolid ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
        backdropFilter: isSolid ? 'blur(16px)' : 'none',
        borderBottom: isSolid ? '1px solid var(--glass-border)' : '1px solid transparent',
        boxShadow: isSolid ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container flex justify-between items-center" style={{ height: '100px' }}>
          
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="GrowthApex Logo" style={{ height: '70px' }} onError={(e) => { e.target.style.display = 'none'; }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" style={{ display: 'none' }}>
            <a href="/#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>About Us</a>
            <a href="/#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Services</a>
            <a href="/#results" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Results</a>
            <a href="/#process" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Process</a>
            <Link to="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-secondary)'}>Blog</Link>
            <a href="/#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Book Call</a>
          </nav>

          <style>{"\
            @media (min-width: 768px) {\
              nav.hidden { display: flex !important; }\
              .mobile-toggle { display: none !important; }\
            }\
          "}</style>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: '80px', left: 0, right: 0, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--glass-border)', padding: '2rem', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}
          >
            <a href="/#about" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>About Us</a>
            <a href="/#services" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>Services</a>
            <a href="/#results" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>Results</a>
            <a href="/#process" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>Process</a>
            <Link to="/blog" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>Blog</Link>
            <a href="/#contact" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Book Call</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
