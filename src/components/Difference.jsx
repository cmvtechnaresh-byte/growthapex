import React from 'react';
import { motion } from 'framer-motion';

const DifferenceCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: '#e0f2fe',
      borderRadius: '2.5rem',
      padding: '4rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1.15fr',
      gap: '4rem',
      alignItems: 'center',
      marginBottom: '8rem'
    }} className="diff-card"
  >
    <div style={{ textAlign: 'left' }}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', letterSpacing: '1px', marginBottom: '1.5rem' }}
      >
        HOW WE'RE DIFFERENT
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: '#082f49', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}
      >
        We don't just run your marketing. <br />
        We own your entire growth engine.
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: '1.15rem', color: '#0369a1', lineHeight: 1.6, fontWeight: 500 }}
      >
        One team handles everything — from your first Instagram post to your final sales call. We audit, fix, build, and scale. No finger-pointing. No gaps. Just results.
      </motion.p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[
        "End-to-end social media",
        "Performance marketing",
        "Funnel creation",
        "Lead nurturing systems",
        "Sales team training",
        "Fixing growth leakages"
      ].map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
          style={{
            background: '#ffffff',
            padding: '1.2rem 1.8rem',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#04BE96' }} />
          <span style={{ fontWeight: 700, color: '#082f49', fontSize: '1.05rem' }}>{item}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Difference = () => {
  const primaryTags = ["Health coaches", "Wellness coaches", "Herbalife leaders", "Course creators"];
  const secondaryTags = ["Business consultants", "Life coaches", "Spiritual coaches", "Fitness coaches"];

  return (
    <section style={{
      background: '#111827',
      color: '#ffffff',
      paddingBottom: '5rem',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Divider with Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '6rem', opacity: 0.5 }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #ffffff)' }} />
          <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            The GrowthApex difference
          </div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #ffffff)' }} />
        </div>

        <DifferenceCard />

        {/* BUILT FOR Section */}
        <div style={{ textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.9rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase' }}
          >
            BUILT FOR
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-2px' }}
          >
            We specialise in growing <br />
            knowledge-based businesses.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.4rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '4rem' }}
          >
            If you sell your expertise — we know exactly how to grow you.
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
            {primaryTags.map((tag, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1), type: 'spring', stiffness: 200 }}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '100px',
                  background: '#ecfdf5',
                  color: '#065f46',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: '1px solid #d1fae5'
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '1000px', margin: '1.5rem auto 0' }}>
            {secondaryTags.map((tag, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1), type: 'spring', stiffness: 200 }}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .diff-card { grid-template-columns: 1fr !important; padding: 2.5rem !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Difference;
