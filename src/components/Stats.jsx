import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { num: 10, prefix: '', suffix: 'Cr+', label: 'Revenue Generated' },
  { num: 300, prefix: '', suffix: '+',  label: 'Campaigns Launched' },
  { num: 3,   prefix: '', suffix: 'X',  label: 'Average ROI' },
  { num: 200, prefix: '', suffix: 'K+', label: 'Leads Generated' },
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
      className="section bg-secondary"
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
      }}
    >
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
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(162,21,39,0.1)',
                transition: { duration: 0.22 },
              }}
              className="stat-card glass"
              style={{ cursor: 'default', textAlign: 'center' }}
            >
              <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {stat.prefix}
                <AnimatedNumber value={stat.num} duration={2} />
                <span style={{ color: 'var(--primary)' }}>{stat.suffix}</span>
              </div>

              <div
                className="stat-label text-secondary"
                style={{ fontSize: '1.1rem', fontWeight: 500 }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
