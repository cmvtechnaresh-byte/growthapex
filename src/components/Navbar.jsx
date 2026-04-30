import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const NAV_LINKS = [
  { label: 'About',    href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Results',  href: '/#results' },
  { label: 'Process',  href: '/#process' },
  { label: 'Blog',     href: '/blog', isRoute: true },
];

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen,   setIsOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  const linkStyle = {
    color: 'rgba(240,244,255,0.65)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.92rem',
    letterSpacing: '0.01em',
    transition: 'color 0.15s ease',
    padding: '0.25rem 0',
    position: 'relative',
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          background: scrolled
            ? 'rgba(12, 15, 23, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.4)'
            : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src={logoImg}
              alt="GrowthApex"
              style={{ height: '52px', width: 'auto', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '2.25rem' }}>
            {NAV_LINKS.map(link =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  style={linkStyle}
                  onMouseOver={e => (e.currentTarget.style.color = '#f0f4ff')}
                  onMouseOut={e  => (e.currentTarget.style.color = 'rgba(240,244,255,0.65)')}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseOver={e => (e.currentTarget.style.color = '#f0f4ff')}
                  onMouseOut={e  => (e.currentTarget.style.color = 'rgba(240,244,255,0.65)')}
                >
                  {link.label}
                </a>
              )
            )}

            {/* CTA */}
            <button
              onClick={onOpenModal}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.45)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#2563eb';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Book a free audit
            </button>
          </nav>

          <style>{`
            @media (min-width: 900px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#f0f4ff',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onClick={() => setIsOpen(prev => !prev)}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseOut={e  => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '76px',
              left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(12, 15, 23, 0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '1.5rem var(--container-pad)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            {NAV_LINKS.map(link =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'rgba(240,244,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    padding: '0.875rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'color 0.15s',
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'rgba(240,244,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    padding: '0.875rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            <button
              onClick={() => { setIsOpen(false); onOpenModal(); }}
              style={{
                marginTop: '1rem',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '0.9rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
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
