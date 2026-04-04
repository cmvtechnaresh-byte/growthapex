import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isSolid = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookCall = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(17, 24, 39, 0.8)' : 'transparent',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="container flex justify-between items-center" style={{ height: '110px' }}>

          <Link to="/" className="flex items-center" style={{ textDecoration: 'none', paddingLeft: 0, marginLeft: 0 }}>
            <img src={logoImg} alt="GrowthApex Logo" style={{ height: '70px', display: 'block', paddingLeft: 0, marginLeft: 0 }} onError={(e) => { e.target.style.display = 'none'; }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '2rem' }}>
            <a href="/#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s', letterSpacing: '0.5px' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>About Us</a>
            <a href="/#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s', letterSpacing: '0.5px' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Services</a>
            <a href="/#results" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s', letterSpacing: '0.5px' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Results</a>
            <a href="/#process" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s', letterSpacing: '0.5px' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Process</a>
            <Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s', letterSpacing: '0.5px' }} onMouseOver={e => e.target.style.color = '#ffffff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}>Blog</Link>
            <button
              onClick={onOpenModal}
              className="btn btn-primary" style={{ padding: '0.7rem 1.75rem', fontSize: '0.9rem', borderRadius: '0.75rem' }}
            >
              Book a free growth audit
            </button>
          </nav>

          <style>{`
            @media (min-width: 900px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
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
            style={{ position: 'fixed', top: '100px', left: 0, right: 0, background: 'var(--bg-color)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '2rem', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            <a href="/#about" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>About Us</a>
            <a href="/#services" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Services</a>
            <a href="/#results" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Results</a>
            <a href="/#process" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Process</a>
            <Link to="/blog" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }}>Blog</Link>
            <button
              onClick={() => { setIsOpen(false); onOpenModal(); }}
              className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', borderRadius: '0.75rem' }}
            >
              Book a free growth audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
