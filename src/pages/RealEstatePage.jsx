import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Home, MapPin, CheckCircle, Phone, Star, ArrowRight, Megaphone, BarChart3, Target, Zap } from 'lucide-react';
import MiniAuditModal from '../components/MiniAuditModal';

const SERVICES = [
  {
    icon: TrendingUp,
    color: '#22d3ee',
    title: 'Performance Marketing',
    tag: 'Meta & Google Ads',
    desc: 'Data-driven paid campaigns targeting verified homebuyers, investors, and NRIs. We eliminate wasted spend and maximise qualified site visits.',
    points: ['Buyer intent targeting', 'Lookalike & retargeting layers', 'A/B tested creatives', 'Weekly ROI reporting'],
  },
  {
    icon: Users,
    color: '#a855f7',
    title: 'Channel Partner Activation',
    tag: 'CP Recruitment',
    desc: 'Systematic funnels to recruit, onboard, and activate high-performing channel partners who consistently bring bookings.',
    points: ['CP recruitment campaigns', 'Onboarding automation', 'Deal update WhatsApp flows', 'Commission tracking dashboards'],
  },
  {
    icon: Megaphone,
    color: '#f59e0b',
    title: 'Project Launch Campaigns',
    tag: 'Pre-launch & Launch',
    desc: 'End-to-end launch strategy from teaser to sold-out — pre-launch buzz, launch-day blitz, and post-launch retargeting.',
    points: ['Pre-launch interest funnel', 'Launch-day paid blitz', 'Site visit nurturing flow', 'Inventory urgency campaigns'],
  },
  {
    icon: BarChart3,
    color: '#f87171',
    title: 'CRM & Lead Nurturing',
    tag: 'Automation',
    desc: 'Automated WhatsApp and email flows that follow up with every lead — so no enquiry falls through the cracks after the site visit.',
    points: ['WhatsApp automation sequences', 'Email drip campaigns', 'Site visit reminder flows', 'Re-engagement campaigns'],
  },
  {
    icon: Target,
    color: '#fb923c',
    title: 'Growth Leakage Audit',
    tag: 'Audit',
    desc: 'We find where your leads are dying — be it slow follow-up, poor creatives, or wrong targeting — and fix every leak before spend scales.',
    points: ['Funnel drop-off analysis', 'Creative performance audit', 'Lead response time audit', 'Channel mix review'],
  },
];

const RESULTS = [
  { metric: '₹400Cr+', label: 'Inventory sold', color: '#22d3ee' },
  { metric: '2,800+', label: 'Qualified leads', color: '#a855f7' },
  { metric: '18+', label: 'Developer clients', color: '#f59e0b' },
  { metric: '4.2×', label: 'Average ROAS', color: '#4ade80' },
  { metric: '68%', label: 'Avg lead-to-visit rate', color: '#f87171' },
  { metric: '3×', label: 'Site visit growth (avg)', color: '#fb923c' },
];

const WHO = [
  { icon: Building2, label: 'Residential developers' },
  { icon: Home, label: 'Luxury & premium projects' },
  { icon: MapPin, label: 'Affordable housing' },
  { icon: Users, label: 'Real estate aggregators' },
  { icon: TrendingUp, label: 'Commercial & co-working' },
  { icon: Zap, label: 'PropTech startups' },
];

const FAQS = [
  {
    q: 'Do you work with small developers or only large ones?',
    a: 'We work with developers of all sizes — from boutique luxury builders to large township developers. Our campaigns are scaled to match your inventory size and budget.',
  },
  {
    q: 'How is your approach different from generic digital agencies?',
    a: 'We specialise exclusively in high-intent verticals. For real estate, we understand the buyer psychology, long sales cycles, and the role of channel partners — so our funnels are built for this context, not copied from a generic playbook.',
  },
  {
    q: 'What platforms do you run campaigns on?',
    a: 'Primarily Meta (Facebook & Instagram) and Google (Search, Display, YouTube). We also manage WhatsApp broadcast flows and email automation for lead nurturing.',
  },
  {
    q: 'How long before we see results?',
    a: 'Qualified leads typically start flowing within 7–14 days of campaign launch. Meaningful ROI patterns are visible within the first 30–45 days.',
  },
  {
    q: 'Do you help with creative — videos, photos, renders?',
    a: 'Yes. We handle ad copy, creatives, and design. If you have renders or photos, we optimise them for ads. If not, we guide you on what to produce.',
  },
];

const ServiceCard = ({ icon: Icon, color, title, tag, desc, points, delay }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      style={{
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--r2)', padding: '2rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      whileHover={{ boxShadow: `0 0 28px ${color}12`, borderColor: color + '28' }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: 'var(--r)',
          background: color + '14', border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0,
        }}>
          <Icon size={20} />
        </div>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', background: color + '12', color, letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', alignSelf: 'flex-start' }}>{tag}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
      {open && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.5rem' }}>
          {points.map(p => (
            <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.83rem', color: 'var(--text-2)' }}>
              <CheckCircle size={13} color={color} style={{ flexShrink: 0 }} /> {p}
            </li>
          ))}
        </ul>
      )}
      <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 'auto', paddingTop: '0.5rem' }}>
        {open ? '^ collapse' : "v see what is included"}
      </div>
    </motion.div>
  );
};

const FaqItem = ({ q, a, delay }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem', padding: '1.4rem 0', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--text-1)' }}>{q}</span>
        <span style={{ color: 'var(--cyan)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.75, paddingBottom: '1.5rem' }}>{a}</p>
      )}
    </motion.div>
  );
};

const RealEstatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '68px' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          backgroundImage: `linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)`,
          backgroundSize: '56px 56px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '6px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)' }}>
                <Building2 size={15} color="#a855f7" />
              </span>
              <span className="mono-accent" style={{ color: '#a855f7' }}>// REAL ESTATE MARKETING</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '800px' }}>
              Sell more homes.{' '}
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Activate more partners.
              </span>
              <br />Scale your project.
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.8, maxWidth: '620px', marginBottom: '2.5rem' }}>
              GrowthApex delivers full-funnel digital marketing engineered for Indian real estate — from pre-launch buzz to post-launch sellout. We drive qualified site visits, not just impressions.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-cyber" style={{ padding: '0.95rem 2.2rem', fontSize: '0.95rem' }}>
                Book a free audit
              </button>
              <a href="tel:+919217648531" className="btn btn-ghost" style={{ padding: '0.95rem 2.2rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Phone size={15} /> Call us now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Stats */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0', borderLeft: '1px solid var(--border)' }} className="re-page-stats">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                style={{ padding: '1.75rem 1.5rem', borderRight: '1px solid var(--border)', textAlign: 'center' }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: r.color, letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>{r.metric}</p>
                <p style={{ color: 'var(--text-3)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '3rem' }}>
            <span className="mono-accent" style={{ display: 'block', marginBottom: '0.75rem', color: '#a855f7' }}>// WHAT WE DO</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Full-stack real estate marketing.{' '}
              <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>One partner.</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="re-svc-grid">
            {SERVICES.map((svc, i) => <ServiceCard key={svc.title} {...svc} delay={i * 0.07} />)}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '2.5rem' }}>
            <span className="mono-accent" style={{ display: 'block', marginBottom: '0.75rem', color: '#a855f7' }}>// WHO WE WORK WITH</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Built for every segment of real estate.
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }} className="re-who-grid">
            {WHO.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '1.5rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--r)', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                  <Icon size={18} />
                </div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.4, textAlign: 'center' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '2.5rem' }}>
            <span className="mono-accent" style={{ display: 'block', marginBottom: '0.75rem', color: '#a855f7' }}>// FAQs</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Common questions from developers.
            </h2>
          </motion.div>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {FAQS.map((faq, i) => <FaqItem key={faq.q} {...faq} delay={i * 0.06} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(34,211,238,0.05) 100%)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: 'var(--r2)', padding: '3.5rem',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />)}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem' }}>
              Ready to scale your project?
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 2rem' }}>
              Book a free 30-minute growth audit. We'll analyse your current funnel, identify where leads are leaking, and show you a clear path to more site visits and bookings.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-cyber" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Book free audit <ArrowRight size={16} />
              </button>
              <a href="tel:+919217648531" className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Phone size={16} /> +91 9217648531
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <MiniAuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @media(max-width:1024px){.re-svc-grid{grid-template-columns:repeat(2,1fr)!important;}.re-who-grid{grid-template-columns:repeat(3,1fr)!important;}.re-page-stats{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.re-svc-grid{grid-template-columns:1fr!important;}.re-who-grid{grid-template-columns:repeat(2,1fr)!important;}.re-page-stats{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:480px){.re-who-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </div>
  );
};

export default RealEstatePage;
