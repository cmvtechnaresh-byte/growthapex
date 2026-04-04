import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import aboutImg from '../assets/46928.jpg';
import FloatingGraphics from './FloatingGraphics';

const stats = [
  {
    num: 3,
    suffix: "+",
    title: "Years Experience",
    desc: "Built, optimized, and scaled performance-driven marketing systems for businesses, consultants, and brands across multiple industries."
  },
  {
    num: 50,
    suffix: "+",
    title: "Funnels & Campaigns",
    desc: "Executed high-converting funnels and paid campaigns for service businesses and education brands focused on lead generation and sales."
  },
  {
    num: 1,
    suffix: " Cr+",
    title: "Ad Spend Experience",
    desc: "Managed and optimized over ₹1 crore in paid ads across Meta and Google, gaining deep insights into audience behavior and scalable performance."
  },
  {
    num: 94,
    suffix: "%",
    title: "Client Success Rate",
    desc: "Our clients achieve consistent lead flow, improved conversions, and long-term growth through systems designed for stability and scale."
  }
];

// Animated counter component
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const AboutUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="section bg-secondary" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingGraphics />
      <div className="container">

        {/* Top Headings */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--primary)' }}>*</span> ABOUT US
          </div>

          <h2
            style={{
              maxWidth: '1100px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.1,
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#0f172a',
              letterSpacing: '-2px'
            }}
          >
            At GrowthApex, We Don’t Just Manage Marketing — <br />
            <span className="text-gradient-primary">We Engineer Growth Systems.</span>
          </h2>

          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <p style={{ fontSize: '1.2rem', color: '#475569', fontWeight: 500, lineHeight: 1.7 }}>
              We combine strategy, content, paid marketing, and automation into one powerful ecosystem that helps brands scale faster and smarter.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 400, lineHeight: 1.7 }}>
              From identifying your exact positioning to executing high-converting campaigns, our approach is built on data, creativity, and performance. We believe growth isn’t random — it’s designed, tested, and optimized.
            </p>
          </div>
        </motion.div>

        {/* Bottom Content Grid */}
        <div className="grid grid-2 gap-8 items-stretch">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.05)',
              width: '100%',
              minHeight: '400px'
            }}
          >
            <img
              src={aboutImg}
              alt="Strategic Growth Analysis"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="graphic-shadow animate-float-medium"
            />
          </motion.div>

          {/* Right Statistics Grid */}
          <div ref={containerRef} className="grid grid-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(22, 78, 170,0.08)',
                  borderColor: 'rgba(22, 78, 170,0.15)',
                  transition: { duration: 0.25 }
                }}
                className="glass"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  cursor: 'default',
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '3.8rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                    color: 'var(--text-primary)'
                  }}>
                    <AnimatedNumber value={stat.num} duration={2} />
                    <span style={{
                      color: 'var(--primary)',
                      filter: 'drop-shadow(0 5px 10px rgba(22, 78, 170,0.2))'
                    }}>
                      {stat.suffix}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.title}
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginTop: 'auto', fontWeight: 500 }}>
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
