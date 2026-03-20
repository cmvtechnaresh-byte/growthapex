import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, HeadphonesIcon, RefreshCcw, Trophy } from 'lucide-react';

const reasons = [
  {
    icon: <BarChart3 size={28} />,
    title: "Data-First Decisions",
    desc: "Every campaign, content piece, and funnel is backed by real analytics — not guesswork. We measure what matters.",
    glow: "rgba(224,32,53,0.25)",
    accent: "#e02035"
  },
  {
    icon: <Zap size={28} />,
    title: "Full-Stack Execution",
    desc: "Strategy, content, ads, funnels, automation — we handle everything end-to-end so you focus on your core business.",
    glow: "rgba(167,139,250,0.2)",
    accent: "#a78bfa"
  },
  {
    icon: <Trophy size={28} />,
    title: "Proven Track Record",
    desc: "₹9Cr+ in managed ad spend. 300+ campaigns. 94% client success rate. Our numbers speak for themselves.",
    glow: "rgba(251,191,36,0.2)",
    accent: "#fbbf24"
  },
  {
    icon: <RefreshCcw size={28} />,
    title: "Optimization Loop",
    desc: "We don't set-it-and-forget-it. Continuous A/B testing, creative refreshes, and weekly performance reviews.",
    glow: "rgba(16,185,129,0.2)",
    accent: "#10b981"
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Brand-Safe Approach",
    desc: "We protect your brand's voice and reputation while aggressively scaling reach. Growth without compromise.",
    glow: "rgba(59,130,246,0.2)",
    accent: "#3b82f6"
  },
  {
    icon: <HeadphonesIcon size={28} />,
    title: "Dedicated Support",
    desc: "A dedicated account manager, weekly check-ins, and real-time reporting — you're never left in the dark.",
    glow: "rgba(236,72,153,0.2)",
    accent: "#ec4899"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

const WhyUs = () => {
  return (
    <section
      id="why-us"
      style={{
        padding: '7rem 0',
        background: 'linear-gradient(180deg, #09090f 0%, #0e0e18 50%, #09090f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(224,32,53,0.08) 0%, transparent 70%)'
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge" style={{ marginBottom: '1.5rem' }}>WHY GROWTHAPEX</div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            color: '#f1f5f9',
            lineHeight: 1.15,
            marginBottom: '1.5rem'
          }}>
            Built Different. <br />
            <span style={{
              background: 'linear-gradient(135deg, #e02035 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Engineered for Results.
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            We're not another agency. We partner with brands who are serious about growth and build the systems that make it happen.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }} className="why-us-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '1.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${r.accent}, transparent)`,
                opacity: 0.7
              }} />

              {/* Icon box */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '16px',
                background: `${r.glow}`,
                border: `1px solid ${r.accent}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: r.accent,
                marginBottom: '1.75rem',
                boxShadow: `0 8px 24px ${r.glow}`
              }}>
                {r.icon}
              </div>

              <h3 style={{
                fontSize: '1.2rem', fontWeight: 800,
                color: '#f1f5f9', marginBottom: '0.875rem',
                fontFamily: 'var(--font-heading)'
              }}>{r.title}</h3>

              <p style={{
                fontSize: '0.95rem', color: '#64748b',
                lineHeight: 1.7, fontWeight: 500
              }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: '5rem',
            padding: '3rem 4rem',
            borderRadius: '2rem',
            background: 'linear-gradient(135deg, rgba(224,32,53,0.12) 0%, rgba(167,139,250,0.08) 100%)',
            border: '1px solid rgba(224,32,53,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', color: '#e02035', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem' }}>
              Ready to Scale?
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}>
              Let's build your growth engine together.
            </h3>
          </div>
          <a
            href="#contact"
            className="btn btn-primary btn-glow"
            style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem', borderRadius: '0.875rem', whiteSpace: 'nowrap' }}
          >
            Start Growing Today →
          </a>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-us-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .why-us-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
