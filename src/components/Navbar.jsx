import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const NAV = [
  { label: 'About',    href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Results',  href: '/#results' },
  { label: 'Process',  href: '/#process' },
  { label: 'Blog',     href: '/blog', route: true },
];

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const aStyle = {
    color: 'var(--text-2)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 450,
    letterSpacing: '0.005em',
    transition: 'color 0.12s',
    padding: '0.2rem 0',
  };
  const hover = e => (e.currentTarget.style.color = 'var(--text-1)');
  const out   = e => (e.currentTarget.style.color = 'var(--text-2)');

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(7,7,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s var(--ease)',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px' }}>

          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center' }}>
            <img src={logoImg} alt="GrowthApex" style={{ height:'46px', width:'auto' }}
              onError={e => { e.target.style.display='none'; }} />
          </Link>

          {/* Desktop */}
          <nav className="desktop-nav" style={{ display:'none', alignItems:'center', gap:'2rem' }}>
            {NAV.map(n => n.route
              ? <Link key={n.label} to={n.href} style={aStyle} onMouseOver={hover} onMouseOut={out}>{n.label}</Link>
              : <a key={n.label} href={n.href} style={aStyle} onMouseOver={hover} onMouseOut={out}>{n.label}</a>
            )}
            <button onClick={onOpenModal} style={{
              background: 'var(--blue)', color:'#fff', border:'none',
              padding: '0.55rem 1.2rem', borderRadius:'var(--radius)',
              fontWeight:500, fontSize:'0.875rem', cursor:'pointer',
              fontFamily:'var(--font-body)', letterSpacing:'-0.01em',
              transition: 'all 0.15s ease',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
            onMouseOver={e => { e.currentTarget.style.background='#4a8ef0'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseOut={e  => { e.currentTarget.style.background='var(--blue)'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              Book a free audit
            </button>
          </nav>

          <style>{`@media(min-width:900px){.desktop-nav{display:flex !important;}.mobile-toggle{display:none !important;}}`}</style>

          {/* Mobile toggle */}
          <button className="mobile-toggle"
            onClick={() => setOpen(p => !p)}
            style={{
              background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
              color:'var(--text-1)', cursor:'pointer',
              width:'38px', height:'38px', borderRadius:'var(--radius)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-6 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-6 }}
            transition={{ duration:0.18, ease:'easeOut' }}
            style={{
              position:'fixed', top:'68px', left:0, right:0,
              zIndex:999,
              background:'rgba(7,7,10,0.96)',
              backdropFilter:'blur(20px)',
              borderBottom:'1px solid var(--border)',
              padding:'1.25rem clamp(1.25rem,5vw,3.5rem)',
              display:'flex', flexDirection:'column', gap:0,
              boxShadow:'0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            {NAV.map(n => n.route
              ? <Link key={n.label} to={n.href} onClick={() => setOpen(false)}
                  style={{ color:'var(--text-2)', textDecoration:'none', fontSize:'1rem', fontWeight:450,
                    padding:'0.875rem 0', borderBottom:'1px solid var(--border)' }}>
                  {n.label}
                </Link>
              : <a key={n.label} href={n.href} onClick={() => setOpen(false)}
                  style={{ color:'var(--text-2)', textDecoration:'none', fontSize:'1rem', fontWeight:450,
                    padding:'0.875rem 0', borderBottom:'1px solid var(--border)' }}>
                  {n.label}
                </a>
            )}
            <button onClick={() => { setOpen(false); onOpenModal(); }} style={{
              marginTop:'1.25rem', background:'var(--blue)', color:'#fff', border:'none',
              padding:'0.875rem', borderRadius:'var(--radius)', fontWeight:500, fontSize:'0.95rem',
              cursor:'pointer', fontFamily:'var(--font-body)',
            }}>
              Book a free growth audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
