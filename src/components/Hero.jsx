import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, TrendingUp, Layers, UserCheck, Activity, Instagram, CheckCircle2 } from 'lucide-react';

const AnimatedNumber = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsub = springValue.on('change', v => setDisplayValue(Math.round(v)));
    return unsub;
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const FEATURES = [
  { title: 'End-to-end social media',         desc: 'Strategy → Script → Edit → Post', Icon: Instagram },
  { title: 'Performance marketing',            desc: 'Meta, Google & more',              Icon: TrendingUp },
  { title: 'Full funnel creation',             desc: 'Landing pages to checkout',        Icon: Layers },
  { title: 'Lead nurturing & sales training',  desc: 'Convert leads into revenue',       Icon: UserCheck },
  { title: 'Fixing growth leakages',           desc: 'Stop losing paid leads',           Icon: Activity },
];

const STATS = [
  { val: 20, label: 'Brands grown',      suffix: '+' },
  { val: 3,  label: 'Avg lead growth',   suffix: 'x' },
  { val: 6,  label: 'Months to results', suffix: ''  },
];

const Hero = ({ onOpenModal }) => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-dark)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Grid texture */}
      <div className="bg-grid" />

      {/* Soft glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%', right: '-5%',
          width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
          zIndex: 0, pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-5%', left: '-5%',
          width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
          zIndex: 0, pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: '5rem', alignItems: 'center' }} className="hero-grid">

          {/* ── Left: Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow eyebrow-green"
              style={{ marginBottom: '1.75rem' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Full Stack Growth Agency
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.07,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              We don't run your marketing.{' '}
              <span
                style={{
                  display: 'block',
                  marginTop: '0.2em',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                We build your entire growth engine.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '500px',
                marginBottom: '1rem',
              }}
            >
              From social media to performance ads, funnels to lead nurturing, sales training to fixing leakages — one team, one goal, one outcome.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#10b981',
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.01em',
              }}
            >
              We take you to the Apex.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="hero-btns"
              style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}
            >
              <button
                onClick={onOpenModal}
                className="btn btn-green btn-glow"
                style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', borderRadius: '10px' }}
              >
                Book a free growth audit
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-ghost"
                style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', borderRadius: '10px' }}
                onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See our work
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}
            >
              {STATS.map((stat, i) => (
                <React.Fragment key={i}>
                  <div style={{ paddingRight: i < STATS.length - 1 ? '2.5rem' : 0 }}>
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      <AnimatedNumber value={stat.val} />{stat.suffix}
                    </div>
                    <div style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      marginTop: '0.4rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div style={{
                      width: '1px',
                      background: 'var(--border)',
                      margin: '0 2.5rem 0 0',
                      alignSelf: 'stretch',
                      minHeight: '40px',
                    }} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Feature card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              padding: '2.5rem',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle top accent */}
            <div style={{
              position: 'absolute',
              top: 0, left: '10%', right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)',
            }} />

            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
            }}>
              What we build for you
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FEATURES.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.08, duration: 0.45 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'transparent',
                    border: '1px solid transparent',
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div className="icon-box icon-box-blue" style={{ width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0 }}>
                    <item.Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {item.title}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(16,185,129,0.06)',
                borderRadius: '10px',
                border: '1px solid rgba(16,185,129,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#6ee7b7',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              We only work with clients we know we can grow.
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          .hero-section { text-align: center !important; }
          .hero-section .hero-grid > div:first-child { align-items: center !important; }
          .hero-section p { margin-left: auto !important; margin-right: auto !important; }
          .hero-btns { justify-content: center !important; }
        }
        @media (max-width: 600px) {
          .hero-btns { flex-direction: column !important; }
          .hero-btns .btn { width: 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
