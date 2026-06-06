import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, TrendingUp, Users, MapPin, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const REAL_ESTATE_SERVICES = [
  {
    icon: TrendingUp,
    title: 'Performance Ads for Developers',
    color: '#22d3ee',
    desc: 'Meta & Google campaigns precision-targeted to serious homebuyers and investors. Every lead pre-qualified, every rupee accountable.',
  },
  {
    icon: Users,
    title: 'Channel Partner Recruitment',
    color: '#a855f7',
    desc: 'We build recruitment funnels that attract high-performing CPs — so your distribution network expands without endless cold calls.',
  },
  {
    icon: Home,
    title: 'Project Launch Campaigns',
    color: '#f59e0b',
    desc: 'Pre-launch buzz, launch-day blitz, and post-launch retargeting — a full-funnel system engineered for sold-out inventory.',
  },
];

const STATS = [
  { value: '₹400Cr+', label: 'Real estate inventory sold' },
  { value: '2,800+', label: 'Qualified leads generated' },
  { value: '18+', label: 'Developer brands managed' },
  { value: '4.2×', label: 'Average ROAS achieved' },
];

const StatPill = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--border-2)',
      borderRadius: 'var(--r2)',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>{value}</p>
    <p style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, color, desc, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-3)' : 'var(--bg-2)',
        border: `1px solid ${hovered ? color + '30' : 'var(--border)'}`,
        borderRadius: 'var(--r2)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default',
        transition: 'all 0.22s ease',
        boxShadow: hovered ? `0 0 28px ${color}14` : 'none',
      }}
    >
      <div style={{
        width: '42px', height: '42px', borderRadius: 'var(--r)',
        background: color + '14', border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>
        <Icon size={19} />
      </div>
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-1)' }}>{title}</h4>
      <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
  );
};

const RealEstate = ({ onOpenModal }) => (
  <section id="real-estate" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
    {/* Background grid accent */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.4,
      backgroundImage: `
        linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '56px 56px',
      pointerEvents: 'none',
    }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.35), transparent)' }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}
      >
        <div style={{ maxWidth: '620px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}>
              <Building2 size={14} color="#a855f7" />
            </span>
            <span className="mono-accent" style={{ color: '#a855f7' }}>// REAL ESTATE MARKETING</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
            The growth engine{' '}
            <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>real estate developers trust.</span>
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: '0.92rem', lineHeight: 1.75 }}>
            From luxury apartments to affordable housing — we drive qualified site visits, channel partner activations, and project sellouts with data-driven digital marketing built specifically for the Indian real estate market.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignSelf: 'flex-start' }}>
          <Link to="/real-estate" style={{ textDecoration: 'none' }}>
            <button className="btn" style={{
              background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
              color: '#a855f7', padding: '0.8rem 1.6rem', borderRadius: 'var(--r)',
              fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.2)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              See real estate services <ArrowRight size={15} />
            </button>
          </Link>
          <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding: '0.8rem 1.6rem', fontSize: '0.88rem' }}>
            Book a free audit
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }} className="re-stats-grid">
        {STATS.map((s, i) => <StatPill key={s.label} {...s} delay={i * 0.07} />)}
      </div>

      {/* Service Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '3rem' }} className="re-service-grid">
        {REAL_ESTATE_SERVICES.map((svc, i) => (
          <ServiceCard key={svc.title} {...svc} delay={i * 0.08} />
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(34,211,238,0.05) 100%)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: 'var(--r2)',
          padding: '2.5rem 3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
        }}
        className="re-cta-banner"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <span style={{ color: 'var(--text-3)', fontSize: '0.75rem', marginLeft: '0.4rem', fontFamily: 'var(--font-mono)' }}>18+ DEVELOPER CLIENTS</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
            Ready to sell out your next project?
          </h3>
          <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.65 }}>
            Get a free real estate growth audit — we'll show you exactly what's costing you site visits and leads.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexShrink: 0 }}>
          <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding: '0.875rem 2rem' }}>
            Get free audit
          </button>
          <Link to="/real-estate" style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost" style={{ padding: '0.875rem 2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Learn more <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>

    <style>{`
      @media(max-width:900px){
        .re-stats-grid{grid-template-columns:repeat(2,1fr)!important;}
        .re-service-grid{grid-template-columns:1fr!important;}
        .re-cta-banner{flex-direction:column!important;padding:2rem 1.5rem!important;}
      }
      @media(max-width:600px){
        .re-stats-grid{grid-template-columns:repeat(2,1fr)!important;}
        .re-cta-banner .btn{width:100%!important;justify-content:center!important;}
      }
    `}</style>
  </section>
);

export default RealEstate;
