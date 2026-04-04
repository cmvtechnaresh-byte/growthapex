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
              <a
                href="mailto:hello@growthapex.in"
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
                hello@growthapex.in
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
