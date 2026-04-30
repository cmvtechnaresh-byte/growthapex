import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ZapOff, UserMinus, Settings } from 'lucide-react';

const reasons = [
  {
    Icon: AlertCircle,
    title: 'They run ads. You lose leads.',
    desc: 'Campaigns go live, budget gets spent, but leads fall into a black hole. No follow-up system. No nurturing. Just wasted spend.',
  },
  {
    Icon: ZapOff,
    title: 'Tactics without strategy.',
    desc: 'Posts go up. Reels get made. But there\'s no system connecting content to conversions. It looks busy. It produces nothing.',
  },
  {
    Icon: UserMinus,
    title: 'Sales team left on their own.',
    desc: 'Marketing generates interest but nobody trains the sales team to close. The gap between lead and revenue stays wide open.',
  },
  {
    Icon: Settings,
    title: "You're the project manager.",
    desc: 'Three vendors. Five tools. Zero accountability. You spend more time managing your agency than running your business.',
  },
];

const WhyUs = () => {
  return (
    <section
      id="why-us"
      style={{
        padding: 'var(--section-pad)',
        background: 'var(--bg-dark)',
        color: 'var(--text-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top border line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '760px', marginBottom: '4rem' }}
        >
          <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Why GrowthApex</div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.025em',
          }}>
            Most agencies run your marketing.{' '}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              Nobody fixes why it isn't working.
            </span>
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
            lineHeight: 1.75,
            maxWidth: '640px',
          }}>
            You've probably hired someone before. Paid for posts, ran some ads, maybe even built a funnel. But the leads didn't convert, the sales team didn't close, and the agency just kept sending reports with no real answers. Sound familiar?
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          className="why-us-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.09)' }}
              style={{
                padding: '2rem 2.25rem',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                transition: 'all 0.25s ease',
              }}
            >
              <div
                className="icon-box icon-box-red"
                style={{ marginBottom: '1.5rem', width: '44px', height: '44px', borderRadius: '10px' }}
              >
                <r.Icon size={20} />
              </div>

              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.015em',
              }}>
                {r.title}
              </h3>

              <p style={{
                fontSize: '0.93rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                fontWeight: 400,
              }}>
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .why-us-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
