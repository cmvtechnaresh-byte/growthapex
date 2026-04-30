import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/* ── Animated counter ── */
const Num = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const mv  = useMotionValue(0);
  const sv  = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const inV = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => { if (inV) mv.set(value); }, [inV, mv, value]);
  useEffect(() => sv.on('change', x => setV(Math.round(x))), [sv]);
  return <span ref={ref}>{v}</span>;
};

/* ── Ticker strip ── */
const SERVICES = [
  'Social Media Management', 'Meta Ads', 'Google Ads',
  'Sales Funnel Design', 'Lead Nurturing', 'Sales Training',
  'Growth Leakage Audit', 'WhatsApp Automation',
  'Content Strategy', 'Conversion Optimisation',
];

const Hero = ({ onOpenModal }) => (
  <section
    className="hero-section"
    style={{
      minHeight: '100vh',
      background: 'var(--black)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    }}
  >
    {/* Dot grid — fades out at bottom */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)',
      maskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)',
      pointerEvents: 'none',
    }} />

    {/* Very faint blue glow — top right only */}
    <div style={{
      position: 'absolute',
      top: '-10%', right: '-8%',
      width: '500px', height: '500px',
      background: 'radial-gradient(circle, rgba(59,126,237,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    {/* ── Main Content ── */}
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '140px', paddingBottom: '0' }}>

      {/* Top label row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1rem',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <span style={{
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--text-3)',
        }}>
          Full Stack Growth Agency &nbsp;·&nbsp; India
        </span>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.72rem', fontWeight: 500,
          color: 'var(--green)', letterSpacing: '0.06em',
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }}/>
          Taking on new clients
        </span>
      </motion.div>

      {/* ── Big headline ── */}
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 800,
              lineHeight: 0.97,
              letterSpacing: '-0.04em',
              marginBottom: '2.5rem',
              color: 'var(--text-1)',
            }}
          >
            We don't run{' '}
            <span style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.3)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}>
              your
            </span>
            <br />marketing.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              We build it.
            </span>
          </motion.h1>

          {/* Sub row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
            }}
          >
            <p style={{
              maxWidth: '480px',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: 'var(--text-2)',
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
            }}>
              From social media to performance ads, funnels to lead nurturing, sales training to fixing leakages — one team, one goal, one outcome.{' '}
              <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>We take you to the Apex.</span>
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flexShrink: 0 }}>
              <button
                onClick={onOpenModal}
                className="btn btn-green btn-glow"
                style={{ padding: '0.8rem 1.75rem', fontSize: '0.9rem' }}
              >
                Book a free audit <ArrowRight size={15} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
              >
                See results <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="hero-stats-strip"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border)',
          marginTop: '4rem',
        }}
      >
        {[
          { val: 20, suffix: '+', label: 'Brands grown' },
          { val: 3,  suffix: 'x', label: 'Avg lead growth' },
          { val: 6,  suffix: '',  label: 'Months to results' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '1.75rem 2rem',
            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.4rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--text-1)',
              marginBottom: '0.35rem',
            }}>
              <Num value={s.val} />{s.suffix}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* ── Services ticker ── */}
    <div style={{
      borderTop: '1px solid var(--border)',
      padding: '0.9rem 0',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      marginTop: '1px',
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        width: 'max-content',
        animation: 'ticker 28s linear infinite',
        willChange: 'transform',
      }}>
        {[...SERVICES, ...SERVICES].map((s, i) => (
          <span key={i} style={{
            fontSize: '0.78rem',
            fontWeight: 500,
            color: 'var(--text-3)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: '3rem',
          }}>
            {s}
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-3)', display: 'inline-block', marginLeft: '-1rem' }}/>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
