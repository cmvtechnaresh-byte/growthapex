import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ZapOff, UserMinus, Settings, ArrowDown } from 'lucide-react';

const reasons = [
  {
    icon: <AlertCircle size={24} />,
    title: "They run ads. You lose leads.",
    desc: "Campaigns go live, budget gets spent, but leads fall into a black hole. No follow-up system. No nurturing. Just wasted spend."
  },
  {
    icon: <ZapOff size={24} />,
    title: "Tactics without strategy.",
    desc: "Posts go up. Reels get made. But there's no system connecting content to conversions. It looks busy. It produces nothing."
  },
  {
    icon: <UserMinus size={24} />,
    title: "Sales team left on their own.",
    desc: "Marketing generates interest but nobody trains the sales team to close. The gap between lead and revenue stays wide open."
  },
  {
    icon: <Settings size={24} />,
    title: "You're the project manager.",
    desc: "Three vendors. Five tools. Zero accountability. You spend more time managing your agency than running your business."
  }
];

const WhyUs = () => {
  return (
    <section
      id="why-us"
      style={{
        padding: '5rem 0',
        background: '#111827', // Dark mode matches Hero
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ 
            display: 'inline-flex', 
            padding: '0.5rem 1rem', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#94a3b8',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            Why GrowthApex
          </div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            maxWidth: '1000px',
            lineHeight: 1.1,
            marginBottom: '2rem',
            letterSpacing: '-2px'
          }}>
            Most agencies run your marketing. <br />
            <span style={{ color: '#ffffff', opacity: 0.8 }}>Nobody fixes why it isn't working.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '850px', lineHeight: 1.7 }}>
            You've probably hired someone before. Paid for posts, ran some ads, maybe even built a funnel. But the leads didn't convert, the sales team didn't close, and the agency just kept sending reports with no real answers. Sound familiar?
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '4rem'
        }} className="why-us-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
              }}
            >
              {/* Animated Icon box */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [0.95, 1, 0.95]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.1)', // Subtle red
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ef4444',
                  marginBottom: '1.5rem',
                }}
              >
                {r.icon}
              </motion.div>

              <h3 style={{
                fontSize: '1.25rem', fontWeight: 800,
                color: '#ffffff', marginBottom: '1rem',
              }}>{r.title}</h3>

              <p style={{
                fontSize: '1rem', color: '#94a3b8',
                lineHeight: 1.6, fontWeight: 500
              }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-us-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
