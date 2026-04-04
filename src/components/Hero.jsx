import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Layers,
  UserCheck,
  Activity,
  Share2,
  Instagram,
  ArrowDown
} from 'lucide-react';

const AnimatedNumber = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const Hero = ({ onOpenModal }) => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '160px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
        background: '#111827', // Very dark background
        color: '#ffffff'
      }}
    >
      {/* ── Background Accents ── */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(4, 190, 150, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(22, 78, 170, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>

          {/* ── Left Column: Content ── */}
          <div style={{ textAlign: 'left', paddingLeft: 0, marginLeft: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                padding: '0.6rem 1.2rem',
                background: 'rgba(4, 190, 150, 0.15)',
                color: '#04BE96',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '2rem',
                border: '1px solid rgba(4, 190, 150, 0.2)'
              }}
            >
              Full Stack Growth Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-2px',
                color: '#ffffff'
              }}
            >
              We don't run <br />
              your marketing. <br />
              <span style={{
                color: '#04BE96',
                fontSize: '0.82em',
                display: 'block',
                marginTop: '0.5rem',
                textShadow: '0 0 40px rgba(4, 190, 150, 0.2)'
              }}>
                We build your <br />
                entire growth engine.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontSize: '1.15rem',
                color: '#94a3b8',
                lineHeight: 1.65,
                maxWidth: '520px',
                marginBottom: '1.5rem'
              }}
            >
              From social media to performance ads, funnels to lead nurturing, sales training to fixing leakages — one team, one goal, one outcome.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#04BE96',
                marginBottom: '3rem'
              }}
            >
              We take you to the Apex.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '1.5rem', marginBottom: '5rem', flexWrap: 'wrap' }}
            >
              <button
                onClick={onOpenModal}
                className="btn btn-glow"
                style={{
                  background: '#04BE96',
                  color: '#fff',
                  padding: '1.25rem 2.8rem',
                  borderRadius: '14px',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 40px rgba(4, 190, 150, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Book a free growth audit
              </button>
              <button
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  padding: '1.25rem 2.8rem',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}
              >
                See our work
              </button>
            </motion.div>

            {/* Stats Row with stagger */}
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              {[
                { val: 20, label: "Brands grown", suffix: "+" },
                { val: 3, label: "Avg lead growth", suffix: "x" },
                { val: 6, label: "Months to results", suffix: "" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                      <AnimatedNumber value={stat.val} />{stat.suffix}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800, marginTop: '0.5rem', letterSpacing: '0.5px' }}>
                      {stat.label.split(' ').map((w, j) => <React.Fragment key={j}>{w}<br /></React.Fragment>)}
                    </div>
                  </div>
                  {i < 2 && <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Card List ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '2.5rem',
              border: '2px solid rgba(255,255,255,0.05)',
              padding: '3.5rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '2px', marginBottom: '2.5rem', textTransform: 'uppercase' }}
            >
              WHAT WE BUILD FOR YOU
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { title: "End-to-end social media", desc: "Strategy → Script → Edit → Post", Icon: Instagram },
                { title: "Performance marketing", desc: "Meta, Google & more", Icon: TrendingUp },
                { title: "Full funnel creation", desc: "Landing pages to checkout", Icon: Layers },
                { title: "Lead nurturing & sales training", desc: "Convert leads into revenue", Icon: UserCheck },
                { title: "Fixing growth leakages", desc: "Stop losing paid leads", Icon: Activity },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ x: 10, background: 'rgba(255,255,255,0.04)', transition: { duration: 0.2 } }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    borderRadius: '1.2rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'default',
                    transition: 'border 0.2s'
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(4, 190, 150, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#04BE96'
                  }}>
                    <item.Icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f8fafc' }}>{item.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem 2rem',
                background: 'rgba(4, 190, 150, 0.08)',
                borderRadius: '1.2rem',
                border: '1px solid rgba(4, 190, 150, 0.15)',
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                fontWeight: 500,
                textAlign: 'center'
              }}
            >
              We only work with clients we know we can grow.
            </motion.div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .hero-section .grid-2 {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
        }
        .btn-glow:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
        @media (max-width: 1200px) {
          .hero-section .grid-2 {
            grid-template-columns: 1fr;
            gap: 5rem;
          }
          .hero-section { padding-top: 140px; text-align: center; }
          .hero-section h1, .hero-section p, .hero-section .stats-row { margin-left: auto; margin-right: auto; }
          .hero-section .stats-row { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
