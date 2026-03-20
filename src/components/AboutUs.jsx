import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  {
    num: 5,
    suffix: "+",
    title: "Years Experience",
    desc: "Built, optimized, and scaled performance-driven marketing systems for businesses, brands, consultants, and digital companies across multiple industries."
  },
  {
    num: 250,
    suffix: "+",
    title: "Funnels & Campaigns",
    desc: "Executed high-converting funnels and paid campaigns for service businesses, education brands, and online companies focused on lead generation and sales."
  },
  {
    num: 9,
    suffix: " Cr+",
    title: "Ad Spend Experience",
    desc: "Managed and optimized over ₹9 crores in paid ads across Meta, Google, and YouTube, gaining deep insights into audience behavior and scalable performance."
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
    <section className="section bg-secondary" id="about" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">

        {/* Top Headings */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700 }}>
            * ABOUT US
          </div>

          <h2
            className="heading-sm"
            style={{
              maxWidth: '900px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.5,
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)'
            }}
          >
            We are a performance-driven marketing team that helps businesses scale using data-backed funnels,{' '}
            <span style={{ fontStyle: 'italic' }} className="text-primary">high-intent ads, and conversion-focused strategies.</span>
          </h2>

          <div
            style={{
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-secondary)'
            }}
          >
            * OUR MISSION IS SIMPLE TO BUILD PREDICTABLE CLIENT-ACQUISITION SYSTEMS THAT DRIVE REVENUE, AUTHORITY, AND LONG-TERM GROWTH.
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
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="Corporate Office Building"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  boxShadow: '0 20px 40px rgba(162,21,39,0.08)',
                  borderColor: 'rgba(162,21,39,0.15)',
                  transition: { duration: 0.25 }
                }}
                className="glass"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(0,0,0,0.03)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
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
                      filter: 'drop-shadow(0 5px 10px rgba(162,21,39,0.2))'
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
