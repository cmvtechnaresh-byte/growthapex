import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Footer = ({ onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // '', 'success', 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('');

    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{ background: '#09090f', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Top CTA Banner */}
        <div className="footer-cta-banner" style={{ background: 'linear-gradient(135deg, rgba(224,32,53,0.1), rgba(224,32,53,0.04))', borderRadius: '1.5rem', padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '5rem', border: '1px solid rgba(224,32,53,0.15)' }}>
          <div>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f1f5f9', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
              Ready to grow your empire?
            </h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>
              Stop wasting money on agencies that don't deliver. Let's build a predictable system.
            </p>
          </div>
          <button 
            onClick={onOpenModal}
            className="btn btn-primary btn-glow"
            style={{ padding: '1.1rem 2.2rem', fontSize: '1.1rem', borderRadius: '0.75rem' }}
          >
            Start Your Project <ArrowRight size={20} style={{ marginLeft: '0.75rem' }}/>
          </button>
        </div>

        <div className="footer-grid">
          
          {/* Column 1: Brand */}
          <div className="footer-column-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <img className="footer-logo" src="/logo.png" alt="GrowthApex Logo" style={{ height: '70px', width: 'fit-content' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500 }}>
              We are a full-stack growth partner for businesses that demand performance-driven results and sustainable scale.
            </p>
            <div className="footer-socials" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ padding: '0.7rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--primary)', border: '1px solid rgba(255,255,255,0.08)' }}><Twitter size={20} /></a>
              <a href="#" style={{ padding: '0.7rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--primary)', border: '1px solid rgba(255,255,255,0.08)' }}><Instagram size={20} /></a>
              <a href="#" style={{ padding: '0.7rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--primary)', border: '1px solid rgba(255,255,255,0.08)' }}><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Column 2 & 3: Navigation & Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.5rem' }}>Company</h4>
            <a href="#about" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>About Us</a>
            <a href="#services" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Services</a>
            <a href="#results" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Results</a>
            <a href="#process" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Methodology</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.5rem' }}>Resources</h4>
            <a href="/blog" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Our Blog</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Case Studies</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Privacy Policy</a>
            <button onClick={onOpenModal} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Contact Us</button>
          </div>

          {/* Column 4: Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
             <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.5rem' }}>Stay Updated</h4>
             <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>Get top-tier agency growth tactics and conversion hacks directly in your inbox.</p>
             <form onSubmit={handleSubscribe} style={{ display: 'flex', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', padding: '0.25rem', background: 'rgba(255,255,255,0.05)' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" 
                  required
                  style={{ padding: '0.75rem 1rem', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: 500, background: 'transparent', color: '#f1f5f9' }} 
                />
                <button 
                  disabled={loading}
                  type="submit"
                  style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0 1.25rem', fontWeight: 700, cursor: 'pointer', borderRadius: '8px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? '...' : 'Join'}
                </button>
             </form>
             {status === 'success' && <p style={{ fontSize: '0.8rem', color: 'green', fontWeight: 600 }}>Thank you for joining!</p>}
             {status === 'error' && <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Error. Try again later.</p>}
          </div>
          
        </div>
        
        {/* Bottom Strip */}
        <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>
            © {new Date().getFullYear()} GrowthApex. all reserved
          </p>
        </div>

      </div>

      <style>{`
        .footer-grid {
          display: grid;
          gap: 4rem;
          margin-bottom: 4rem;
          grid-template-columns: minmax(280px, 1.8fr) 1fr 1fr 1.3fr;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-cta-banner { padding: 2.5rem 2rem !important; flex-direction: column; text-align: center; }
          .footer-cta-banner h3 { font-size: 1.8rem !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
