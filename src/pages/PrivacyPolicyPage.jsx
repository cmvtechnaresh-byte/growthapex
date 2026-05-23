import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ id, title, children }) => (
  <section id={id} style={{ marginBottom: '3rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <span className="mono-accent">//</span>
      <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
    </div>
    <div style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '0.92rem' }}>
      {children}
    </div>
  </section>
);

const P = ({ children }) => (
  <p style={{ marginBottom: '0.9rem' }}>{children}</p>
);

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
    {items.map((item, i) => (
      <li key={i} style={{ position: 'relative', listStyle: 'none', paddingLeft: '1rem' }}>
        <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>›</span>
        {item}
      </li>
    ))}
  </ul>
);

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const lastUpdated = 'May 23, 2025';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '6rem' }}>

      {/* Cyber grid background */}
      <div className="cyber-grid" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Header banner */}
      <div style={{
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow accent */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '1px',
          background: 'linear-gradient(90deg,transparent,var(--cyan-glow),transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="mono-accent" style={{ marginBottom: '1rem' }}>// LEGAL</p>
          <h1 style={{
            fontSize: 'clamp(2rem,5vw,3rem)', fontFamily: 'var(--font-display)',
            color: 'var(--text-1)', letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
            Last updated: <span style={{ color: 'var(--cyan)' }}>{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* Sticky TOC + Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(180px,220px,240px) 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
          className="privacy-layout"
        >
          {/* Sticky TOC */}
          <aside style={{ position: 'sticky', top: '5rem' }}>
            <p className="mono-accent" style={{ marginBottom: '1rem', fontSize: '0.65rem' }}>// CONTENTS</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                ['#overview', 'Overview'],
                ['#information', 'Information We Collect'],
                ['#use', 'How We Use It'],
                ['#sharing', 'Sharing Data'],
                ['#cookies', 'Cookies'],
                ['#retention', 'Data Retention'],
                ['#rights', 'Your Rights'],
                ['#security', 'Security'],
                ['#children', 'Children'],
                ['#changes', 'Policy Changes'],
                ['#contact', 'Contact Us'],
              ].map(([href, label]) => (
                <a key={href} href={href} style={{
                  color: 'var(--text-3)', fontSize: '0.8rem',
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                  padding: '0.3rem 0', transition: 'color .15s',
                  borderLeft: '2px solid var(--border)', paddingLeft: '0.75rem',
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.color = 'var(--cyan)';
                    e.currentTarget.style.borderLeftColor = 'var(--cyan)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.color = 'var(--text-3)';
                    e.currentTarget.style.borderLeftColor = 'var(--border)';
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Back to home */}
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              marginTop: '2.5rem', color: 'var(--cyan)', fontSize: '0.8rem',
              textDecoration: 'none', fontFamily: 'var(--font-mono)',
              transition: 'opacity .15s',
            }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.75'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              ← Back to Home
            </Link>
          </aside>

          {/* Main content */}
          <main>
            {/* Intro card */}
            <div className="card" style={{ marginBottom: '3rem', background: 'var(--cyan-dim)', borderColor: 'rgba(34,211,238,0.15)' }}>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                At <strong style={{ color: 'var(--text-1)' }}>GrowthApex</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{' '}
                <a href="https://growthapex.in" style={{ color: 'var(--cyan)' }}>growthapex.in</a>{' '}
                or use any of our services. Please read it carefully.
              </p>
            </div>

            <Section id="overview" title="Overview">
              <P>
                GrowthApex ("we", "our", or "us") operates as a full-stack digital growth agency offering performance marketing, funnel creation, social media management, lead nurturing, and related services to coaches, consultants, wellness leaders, and course creators primarily across India.
              </P>
              <P>
                By accessing our website or submitting any form, you agree to the terms described in this Privacy Policy. If you do not agree, please discontinue use of our services.
              </P>
            </Section>

            <Section id="information" title="Information We Collect">
              <P>We may collect the following types of information:</P>
              <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Information you provide directly:</p>
              <Ul items={[
                'Full name, email address, and phone number (via contact/audit forms)',
                'Business type, monthly revenue, and ad spend details (via audit questionnaires)',
                'Any messages or notes submitted through our forms',
              ]} />
              <p style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem', marginTop: '1rem', fontSize: '0.9rem' }}>Information collected automatically:</p>
              <Ul items={[
                'IP address, browser type, and device information',
                'Pages visited, time spent, and referring URLs',
                'Cookies and similar tracking technologies (see Cookies section)',
              ]} />
            </Section>

            <Section id="use" title="How We Use Your Information">
              <P>We use the information we collect to:</P>
              <Ul items={[
                'Respond to audit requests, inquiries, and service-related communications',
                'Deliver, operate, and improve our services and website',
                'Send you relevant follow-up emails and marketing communications (with your consent)',
                'Analyze usage trends and optimize the website experience',
                'Comply with legal obligations and enforce our terms',
              ]} />
              <P>
                We will never sell your personal data to third parties for their own marketing purposes.
              </P>
            </Section>

            <Section id="sharing" title="Sharing Your Information">
              <P>We may share your information only in the following circumstances:</P>
              <Ul items={[
                'With trusted service providers (e.g., CRM tools, email platforms, ad networks) who assist in operating our business — bound by confidentiality agreements',
                'With analytics providers such as Google Analytics to understand site usage',
                'If required by law, court order, or governmental authority',
                'In connection with a merger, acquisition, or sale of business assets — you will be notified',
              ]} />
            </Section>

            <Section id="cookies" title="Cookies &amp; Tracking Technologies">
              <P>
                Our website uses cookies — small text files placed on your device — to enhance your experience, remember preferences, and gather analytics data.
              </P>
              <Ul items={[
                'Essential cookies: Required for the website to function correctly',
                'Analytics cookies: Help us understand how visitors interact with the site (e.g., Google Analytics)',
                'Marketing cookies: Track ad campaign performance on platforms like Meta and Google',
              ]} />
              <P>
                You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.
              </P>
            </Section>

            <Section id="retention" title="Data Retention">
              <P>
                We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by applicable law. Lead and audit form submissions are typically retained for up to 24 months unless you request deletion earlier.
              </P>
            </Section>

            <Section id="rights" title="Your Rights">
              <P>Depending on your jurisdiction, you may have the right to:</P>
              <Ul items={[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your personal data ("right to be forgotten")',
                'Withdraw consent for marketing communications at any time',
                'Object to processing of your data for direct marketing',
              ]} />
              <P>
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:support@growthapex.in" style={{ color: 'var(--cyan)' }}>support@growthapex.in</a>.
                We will respond within 30 days.
              </P>
            </Section>

            <Section id="security" title="Security">
              <P>
                We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </P>
            </Section>

            <Section id="children" title="Children's Privacy">
              <P>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it promptly.
              </P>
            </Section>

            <Section id="changes" title="Changes to This Policy">
              <P>
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </P>
              <P>
                Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
              </P>
            </Section>

            <Section id="contact" title="Contact Us">
              <P>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out:</P>
              <div className="card" style={{ marginTop: '1rem', display: 'inline-flex', flexDirection: 'column', gap: '0.6rem' }}>
                <p style={{ color: 'var(--text-1)', fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>GrowthApex</p>
                <a href="mailto:support@growthapex.in" style={{ color: 'var(--cyan)', textDecoration: 'none', fontSize: '0.88rem' }}>support@growthapex.in</a>
                <a href="tel:+919217648531" style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.88rem' }}>+91 9217648531</a>
                <a href="https://growthapex.in" style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.88rem' }}>growthapex.in</a>
              </div>
            </Section>
          </main>
        </div>
      </div>

      {/* Responsive layout style */}
      <style>{`
        @media (max-width: 768px) {
          .privacy-layout {
            grid-template-columns: 1fr !important;
          }
          .privacy-layout aside {
            position: static !important;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
          }
          .privacy-layout aside nav {
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 0.4rem !important;
          }
          .privacy-layout aside nav a {
            border-left: none !important;
            border: 1px solid var(--border) !important;
            border-radius: 4px !important;
            padding: 0.25rem 0.6rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;
