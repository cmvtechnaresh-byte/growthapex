import React from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <style>{`
        .footer-cta-banner {
          background: linear-gradient(135deg, rgba(162,21,39,0.05), rgba(162,21,39,0.01));
          border-radius: 1.5rem; 
          padding: 3rem 4rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          gap: 2rem;
          margin-bottom: 5rem;
          border: 1px solid rgba(162,21,39,0.1);
        }
        .footer-logo {
          height: 80px;
          width: fit-content;
        }
        .footer-column-brand {
           max-width: 300px;
        }
        @media (max-width: 1024px) {
           .footer-cta-banner {
              padding: 2.5rem;
           }
        }
        @media (max-width: 768px) {
           .footer-cta-banner {
              flex-direction: column;
              text-align: center;
              padding: 2rem 1.5rem;
           }
           .footer-logo {
              height: 60px;
              margin: 0 auto;
           }
           .footer-column-brand {
              text-align: center;
              margin: 0 auto;
              max-width: 100%;
           }
           .footer-socials {
              justify-content: center;
           }
        }
        @media (max-width: 968px) {
          footer .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 500px) {
          footer .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .footer-cta-banner h3 {
             font-size: 1.5rem !important;
          }
          .footer-cta-banner p {
             font-size: 1rem !important;
          }
        }
      `}</style>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Top CTA Banner */}
        <div className="footer-cta-banner">
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1f2e', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              Ready to grow your empire?
            </h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Stop wasting money on agencies that don't deliver. Let's build a predictable system.
            </p>
          </div>
          <a 
            href="#contact" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              background: 'var(--primary)',
              borderRadius: '2rem',
              padding: '0.8rem 1.8rem',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 10px 20px rgba(162,21,39,0.2)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Your Project 
            <ArrowRight size={18} strokeWidth={3} />
          </a>
        </div>

        <div className="footer-grid" style={{ display: 'grid', gap: '4rem', marginBottom: '4rem', gridTemplateColumns: '2fr 1fr 1fr 1.5fr' }}>
          
          {/* Column 1: Brand */}
          <div className="footer-column-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <img className="footer-logo" src="/logo.png" alt="GrowthApex Logo" onError={(e) => { e.target.style.display = 'none'; }} />
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
              We are a full-stack growth partner for businesses that demand performance-driven results and sustainable scale.
            </p>
            <div className="footer-socials" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ display: 'flex', padding: '0.5rem', borderRadius: '50%', background: '#f1f5f9', color: '#1e293b' }}><Twitter size={18} /></a>
              <a href="#" style={{ display: 'flex', padding: '0.5rem', borderRadius: '50%', background: '#f1f5f9', color: '#1e293b' }}><Instagram size={18} /></a>
              <a href="#" style={{ display: 'flex', padding: '0.5rem', borderRadius: '50%', background: '#f1f5f9', color: '#1e293b' }}><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Company</h4>
            <a href="#about" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>About Us</a>
            <a href="#services" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Services</a>
            <a href="#results" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Results</a>
            <a href="#process" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Methodology</a>
          </div>

          {/* Column 3: Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Support</h4>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Terms of Service</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Cookie Policy</a>
            <a href="/blog" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='#64748b'}>Our Blog</a>
          </div>

          {/* Column 4: Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Stay Updated</h4>
             <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Hook onto our newsletter for top-tier agency growth tactics and case studies.</p>
             <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '0.75rem', overflow: 'hidden', marginTop: '0.5rem' }}>
                <input type="email" placeholder="Enter your email" style={{ padding: '0.75rem 1rem', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
                <button style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0 1.25rem', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
             </div>
          </div>
          
        </div>
        
        {/* Bottom Strip */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
            © {new Date().getFullYear()} GrowthApex. All rights reserved.
          </p>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
            Crafted for <span style={{ color: 'var(--primary)' }}>Growth</span>.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
