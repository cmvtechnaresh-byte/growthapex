import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const Footer = ({ onOpenModal }) => {
  return (
    <footer
      style={{
        background: '#0a1628',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '5rem 1.5rem 0',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Main Grid */}
        <div className="footer-main-grid">

          {/* Column 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Logo */}
            <img
              src={logoImg}
              alt="GrowthApex Logo"
              style={{ height: '64px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
              onError={e => { e.target.style.display = 'none'; }}
            />

            {/* Tagline */}
            <p
              style={{
                color: '#22c55e',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              WE TAKE YOU TO THE APEX
            </p>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: '300px',
              }}
            >
              Full stack growth partner for coaches, consultants, wellness leaders, and course creators across India. We build growth engines — not just campaigns.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.05rem',
                marginBottom: '1.5rem',
                letterSpacing: '-0.3px',
              }}
            >
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Performance marketing',
                'Social media management',
                'Funnel creation',
                'Lead nurturing',
                'Sales training',
                'Growth leakage audit',
              ].map((item) => (
                <a
                  key={item}
                  href="#services"
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.05rem',
                marginBottom: '1.5rem',
                letterSpacing: '-0.3px',
              }}
            >
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'About us', href: '#about' },
                { label: 'Case studies', href: '#results' },
                { label: 'Who we work with', href: '#niches' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/audit"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'block',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                Book a free audit
              </Link>
              <button
                onClick={onOpenModal}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.05rem',
                marginBottom: '1.5rem',
                letterSpacing: '-0.3px',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Phone */}
              <a
                href="tel:+919217648431"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91 9217648431
              </a>
              {/* Email */}
              <a
                href="mailto:support@growthapex.in"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                support@growthapex.in
              </a>
              <a
                href="https://growthapex.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                growthapex.in
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div
          style={{
            marginTop: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '1.75rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', fontWeight: 500 }}>
            © {new Date().getFullYear()} GrowthApex. All rights reserved.
          </p>

        </div>

      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 0;
        }
        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 600px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
