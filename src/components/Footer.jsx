import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const L = ({ href, children, route, onClick }) => {
  const s = { color:'var(--text-3)', textDecoration:'none', fontSize:'0.875rem', fontWeight:400, display:'flex', alignItems:'center', gap:'0.45rem', transition:'color .12s', padding:'0.1rem 0' };
  const ov = e => (e.currentTarget.style.color = 'var(--cyan)');
  const ou = e => (e.currentTarget.style.color = 'var(--text-3)');
  if (route) return <Link to={href} style={s} onMouseOver={ov} onMouseOut={ou} onClick={onClick}>{children}</Link>;
  return <a href={href} style={s} onMouseOver={ov} onMouseOut={ou} onClick={onClick}>{children}</a>;
};

const ColHead = ({ children }) => (
  <p className="mono-accent" style={{ marginBottom:'1.1rem' }}>{children}</p>
);

const Footer = ({ onOpenModal }) => (
  <footer style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)' }}>
    {/* Cyan top glow line */}
    <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,var(--cyan-glow),transparent)' }}/>

    <div className="container" style={{ padding:'4rem clamp(1.25rem,5vw,3.5rem) 0' }}>
      <div className="footer-main-grid">

        {/* Brand */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <img src={logoImg} alt="GrowthApex" style={{ height:'44px', width:'auto', objectFit:'contain', alignSelf:'flex-start' }}
            onError={e => { e.target.style.display='none'; }}/>
          <p className="mono-accent" style={{ fontSize:'0.65rem' }}>WE TAKE YOU TO THE APEX</p>
          <p style={{ color:'var(--text-3)', fontSize:'0.85rem', lineHeight:1.7, maxWidth:'260px' }}>
            Full stack growth partner for coaches, consultants, wellness leaders, and course creators across India.
          </p>
        </div>

        {/* Services */}
        <div>
          <ColHead>// SERVICES</ColHead>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {['Performance marketing','Social media management','Funnel creation','Lead nurturing','Sales training','Growth leakage audit']
              .map(s => <L key={s} href="#services">{s}</L>)}
          </div>
        </div>

        {/* Company */}
        <div>
          <ColHead>// COMPANY</ColHead>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <L href="#about">About us</L>
            <L href="#results">Case studies</L>
            <L href="#niches">Who we work with</L>
            <L href="/audit" route>Book a free audit</L>
            <button onClick={onOpenModal} style={{
              background:'none', border:'none', cursor:'pointer', padding:'0.1rem 0',
              color:'var(--text-3)', fontSize:'0.875rem', fontFamily:'var(--font-body)',
              textAlign:'left', transition:'color .12s',
            }}
            onMouseOver={e => (e.currentTarget.style.color='var(--cyan)')}
            onMouseOut={e  => (e.currentTarget.style.color='var(--text-3)')}>
              Contact us
            </button>
          </div>
        </div>

        {/* Contact */}
        <div>
          <ColHead>// CONTACT</ColHead>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <L href="tel:+919217648531">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 9217648531
            </L>
            <L href="mailto:support@growthapex.in">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              support@growthapex.in
            </L>
            <L href="https://growthapex.in" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
              </svg>
              growthapex.in
            </L>
          </div>
        </div>
      </div>

      <div style={{ marginTop:'3.5rem', borderTop:'1px solid var(--border)', padding:'1.25rem 0', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <p className="mono" style={{ color:'var(--text-3)' }}>© {new Date().getFullYear()} GROWTHAPEX. ALL RIGHTS RESERVED.</p>
        <p className="mono" style={{ color:'var(--text-3)' }}>BUILT TO GROW. NOT JUST TO REPORT.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
