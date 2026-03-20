import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroBg from '../assets/video (2).mp4';

const Hero = ({ onOpenModal }) => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* ── Background Video (Black & White) ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) brightness(0.7)',
          zIndex: 0,
        }}
      >
        <source src={heroBg} type="video/mp4" />
      </video>


      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(9,9,15,0.75) 55%, rgba(9,9,15,1) 100%)',
      }} />

      {/* ── Layer 2: Subtle red glow accent ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(224,32,53,0.1) 0%, transparent 70%)',
      }} />

      {/* ── Hero Content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 3, maxWidth: '900px' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge" style={{ marginBottom: '2rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            Your Full-Stack Growth Partner
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            fontSize: 'clamp(3.2rem, 6vw, 6.2rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            fontFamily: 'var(--font-heading)',
            color: '#f1f5f9',
            marginBottom: '1.rem',
            letterSpacing: '-0.02em',
          }}
        >
          Scale Your Brand with{' '}
          <span style={{
            background: 'linear-gradient(135deg, #e02035 0%, #ff6b6b 60%, #ff9e5e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Data-Driven Growth
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
            color: '#94a3b8',
            fontWeight: 500,
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 3rem auto',
          }}
        >
          Full-stack social media &amp; performance marketing systems
          designed to turn attention into revenue.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <button
            onClick={onOpenModal}
            className="btn btn-primary btn-glow"
            style={{
              padding: '1.15rem 2.75rem',
              fontSize: '1.1rem',
              borderRadius: '0.875rem',
              boxShadow: '0 20px 50px rgba(224,32,53,0.4)',
            }}
          >
            Get Started
          </button>
          <a
            href="#results"
            className="btn btn-outline"
            style={{
              padding: '1.15rem 2.25rem',
              fontSize: '1.1rem',
              borderRadius: '0.875rem',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            See Results <ArrowRight size={18} />
          </a>
        </motion.div>


      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-section { padding-top: 7rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
