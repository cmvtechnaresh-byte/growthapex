import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const NAV = [
  { label:'About',    href:'/#about' },
  { label:'Services', href:'/#services' },
  { label:'Results',  href:'/#results' },
  { label:'Process',  href:'/#process' },
  { label:'Blog',     href:'/blog', route:true },
];

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => setOpen(false), [location]);

  const ls = { color:'var(--text-2)', textDecoration:'none', fontSize:'0.875rem', fontWeight:400, transition:'color .12s', letterSpacing:'-0.01em' };
  const hov = e => (e.currentTarget.style.color = 'var(--cyan)');
  const out = e => (e.currentTarget.style.color = 'var(--text-2)');

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? 'rgba(5,6,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 0 30px rgba(34,211,238,0.04)' : 'none',
        transition:'all 0.3s var(--ease)',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px' }}>
          <Link to="/" style={{ textDecoration:'none' }}>
            <img src={logoImg} alt="GrowthApex" style={{ height:'44px', width:'auto' }}
              onError={e => { e.target.style.display='none'; }}/>
          </Link>

          <nav className="desktop-nav" style={{ display:'none', alignItems:'center', gap:'2rem' }}>
            {NAV.map(n => n.route
              ? <Link key={n.label} to={n.href} style={ls} onMouseOver={hov} onMouseOut={out}>{n.label}</Link>
              : <a key={n.label} href={n.href} style={ls} onMouseOver={hov} onMouseOut={out}>{n.label}</a>
            )}
            <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding:'0.55rem 1.2rem', fontSize:'0.82rem' }}>
              Book a free audit
            </button>
          </nav>

          <style>{`@media(min-width:900px){.desktop-nav{display:flex!important;}.mobile-toggle{display:none!important;}}`}</style>

          <button className="mobile-toggle" onClick={() => setOpen(p => !p)} style={{
            background:'var(--cyan-dim)', border:'1px solid var(--border)',
            color:'var(--cyan)', cursor:'pointer',
            width:'38px', height:'38px', borderRadius:'var(--r)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.18, ease:'easeOut' }}
            style={{
              position:'fixed', top:'68px', left:0, right:0, zIndex:999,
              background:'rgba(5,6,15,0.97)', backdropFilter:'blur(20px)',
              borderBottom:'1px solid var(--border)',
              padding:'1.25rem clamp(1.25rem,5vw,3.5rem)',
              display:'flex', flexDirection:'column',
              boxShadow:'0 24px 48px rgba(0,0,0,0.6)',
            }}
          >
            {NAV.map(n => n.route
              ? <Link key={n.label} to={n.href} onClick={() => setOpen(false)} style={{ color:'var(--text-2)', textDecoration:'none', fontSize:'1rem', fontWeight:400, padding:'0.875rem 0', borderBottom:'1px solid var(--border)' }}>{n.label}</Link>
              : <a key={n.label} href={n.href} onClick={() => setOpen(false)} style={{ color:'var(--text-2)', textDecoration:'none', fontSize:'1rem', fontWeight:400, padding:'0.875rem 0', borderBottom:'1px solid var(--border)' }}>{n.label}</a>
            )}
            <button onClick={() => { setOpen(false); onOpenModal(); }} className="btn btn-cyber" style={{ marginTop:'1.25rem', padding:'0.875rem', fontSize:'0.95rem', borderRadius:'var(--r)' }}>
              Book a free growth audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
