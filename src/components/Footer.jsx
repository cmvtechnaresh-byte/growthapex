import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logoggog.png';

const linkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 400,
  transition: 'color 0.15s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const FooterLink = ({ href, children, isRoute = false, onClick }) => {
  const props = {
    style: linkStyle,
    onMouseEnter: e => (e.currentTarget.style.color = 'var(--text-primary)'),
    onMouseLeave: e => (e.currentTarget.style.color = 'var(--text-secondary)'),
    onClick,
  };
  if (isRoute) return <Link to={href} {...props}>{children}</Link>;
  return <a href={href} {...props}>{children}</a>;
};

const Footer = ({ onOpenModal }) => {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      fontFamily: 'var(--font-body)',
    }}>
      <div className="container" style={{ padding: '4.5rem var(--container-pad) 0' }}>

        {/* Main Grid */}
        <div className="footer-main-grid">

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img
              src={logoImg}
              alt="GrowthApex"
              style={{ height: '52px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <p style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#10b981',
            }}>
              We take you to the Apex
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxWidth: '280px',
            }}>
              Full stack growth partner for coaches, consultants, wellness leaders, and course creators across India. We build growth engines — not just campaigns.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1.25rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                'Performance marketing',
                'Social media management',
                'Funnel creation',
                'Lead nurturing',
                'Sales training',
                'Growth leakage audit',
              ].map(item => (
                <FooterLink key={item} href="#services">{item}</FooterLink>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1.25rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <FooterLink href="#about">About us</FooterLink>
              <FooterLink href="#results">Case studies</FooterLink>
              <FooterLink href="#niches">Who we work with</FooterLink>
              <FooterLink href="/audit" isRoute>Book a free audit</FooterLink>
              <button
                onClick={onOpenModal}
                style={{
                  ...linkStyle,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'var(--font-body)',
                  textAlign: 'left',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1.25rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {/* Phone */}
              <a
                href="tel:+919217648531"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91 9217648531
              </a>
              {/* Email */}
              <a
                href="mailto:support@growthapex.in"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                support@growthapex.in
              </a>
              {/* Website */}
              <a
                href="https://growthapex.in"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
                growthapex.in
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '4rem',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>
            © {new Date().getFullYear()} GrowthApex. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>
            Built to grow businesses, not just run campaigns.
          </p>
        </div>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1fr 1fr;
          gap: 3.5rem;
        }
        @media (max-width: 1024px) {
          .footer-main-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .footer-main-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
