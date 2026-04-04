import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { num: 10, prefix: '', suffix: 'X', label: 'Increase in Reach' },
  { num: 5, prefix: '', suffix: 'X', label: 'Boost in Engagement' },
  { num: 70, prefix: '', suffix: '%', label: 'Lower Cost Per Lead' },
  { num: 100, prefix: '', suffix: '%', label: 'Consistent Growth' },
];

const AnimatedNumber = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsub = springValue.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springValue]);

  return <span ref={ref}>{display}</span>;
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      className="section"
      id="stats"
      style={{
        padding: '8rem 0',
        background: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <div
          className="badge"
          style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <span style={{ color: 'var(--primary)' }}>*</span> SOCIAL PROOF
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1, color: '#0f172a', letterSpacing: '-2px' }}>
          Real Growth. <br className="hidden md:block" /> <span className="text-gradient-primary">Real Numbers.</span>
        </h2>
      </div>
      <style>{`
        .stats-grid {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 1.5rem;
        }
        @media (max-width: 1024px) {
           .stats-grid {
              grid-template-columns: repeat(2, 1fr);
           }
        }
        @media (max-width: 480px) {
           .stats-grid {
              grid-template-columns: 1fr;
           }
           .stat-value {
              font-size: 2.25rem !important;
           }
           .stat-label {
              font-size: 0.9rem !important;
           }
        }
      `}</style>
      <div className="container">
        <div ref={ref} className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px rgba(0,0,0,0.08)',
                borderColor: 'rgba(22, 78, 170,0.3)',
                transition: { duration: 0.22 },
              }}
              style={{
                cursor: 'default',
                textAlign: 'center',
                background: '#ffffff',
                borderRadius: '2rem',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '3rem 2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.4 }} />

              <div
                className="stat-value"
                style={{
                  fontSize: 'clamp(3.5rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-heading)',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: '0.2rem',
                  letterSpacing: '-2px'
                }}
              >
                {stat.prefix}
                <span style={{ color: 'var(--primary)' }}>
                  <AnimatedNumber value={stat.num} duration={2} />
                </span>
                <span className="text-gradient-primary" style={{
                  fontSize: 'clamp(2.5rem, 3vw, 3.5rem)',
                  filter: 'drop-shadow(0 0 15px rgba(4, 190, 150, 0.4))'
                }}>
                  {stat.suffix}
                </span>
              </div>

              <div
                className="stat-label"
                style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', opacity: 0.9, letterSpacing: '0.5px' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '5rem', opacity: 0.8, fontWeight: 700, color: '#475569', fontSize: '1.2rem', fontStyle: 'italic' }}>
          "We don’t promise vanity metrics — we deliver business results."
        </div>
      </div>
    </section>
  );
};

export default Stats;
