import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const otherServicesData = [
  {
    icon: '💻',
    title: 'WEBSITE & LMS DEVELOPMENT',
    desc: 'Create high-quality websites, landing pages, and LMS platforms built for performance, speed, and conversions across businesses, brands, and digital products.',
    features: ['Funnel-ready pages', 'Mobile & speed optimized'],
    accent: 'rgba(99,102,241,0.12)',
    accentBorder: 'rgba(99,102,241,0.3)',
  },
  {
    icon: '🎬',
    title: 'VIDEO EDITING',
    desc: 'High-quality video editing for ads, marketing campaigns, webinars, and social media content designed to capture attention and improve engagement.',
    features: ['Ad Creatives videos', 'Long form VSL Videos'],
    accent: 'rgba(236,72,153,0.1)',
    accentBorder: 'rgba(236,72,153,0.25)',
  },
  {
    icon: '📝',
    title: 'CONTENT & COPYWRITING',
    desc: 'We provide you with all the content from ad scripts, VSL scripts and PPTs for presentations.',
    features: ['Webinar scripts & decks', 'Ad & funnel copy'],
    accent: 'rgba(245,158,11,0.1)',
    accentBorder: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '🎯',
    title: 'SALES CLOSING TRAINING',
    desc: 'We create conversion-focused content including ad copy, funnel copy, webinar scripts, VSLs, and presentations aligned with your brand and goals.',
    features: ['Webinar pitch flow', 'Call closing frameworks'],
    accent: 'rgba(162,21,39,0.09)',
    accentBorder: 'rgba(162,21,39,0.25)',
  },
  {
    icon: '📢',
    title: 'DIGITAL PR & BRAND REPUTATION',
    desc: 'Help you in getting digital PR in news publications and featuring in magazines, award shows, etc.',
    features: ['Brand positioning', 'Online authority building'],
    accent: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.25)',
  },
  {
    icon: '🌟',
    title: 'PERSONAL BRANDING',
    desc: 'Help you in crafting a solid personal brand for your business on LinkedIn & Instagram.',
    features: ['Authority positioning', 'Content direction'],
    accent: 'rgba(59,130,246,0.1)',
    accentBorder: 'rgba(59,130,246,0.25)',
  },
];

const SLIDE_INTERVAL = 3500;

/* ── Single card ─────────────────────────────────────────────────────────── */
const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="service-slide-card"
      style={{
        background: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.82)',
        border: hovered
          ? `1.5px solid ${service.accentBorder}`
          : '1px solid rgba(0,0,0,0.07)',
        borderRadius: '1.25rem',
        boxShadow: hovered
          ? `0 24px 48px rgba(162,21,39,0.09), 0 4px 12px rgba(0,0,0,0.04)`
          : '0 8px 24px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
        userSelect: 'none',
      }}
    >
      {/* Icon bubble */}
      <motion.div
        animate={{
          background: hovered ? service.accent : 'rgba(255,255,255,1)',
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="icon-bubble"
        style={{
          display: 'inline-flex',
          padding: '0.9rem',
          borderRadius: '0.875rem',
          border: hovered ? `1px solid ${service.accentBorder}` : '1px solid rgba(0,0,0,0.05)',
          width: 'fit-content',
          marginBottom: '1.75rem',
          fontSize: '2.2rem',
          lineHeight: 1,
          transition: 'border 0.3s',
        }}
      >
        {service.icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={{ color: hovered ? 'var(--primary)' : 'var(--text-primary)' }}
        transition={{ duration: 0.22 }}
        className="service-card-title"
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '0.9rem',
          letterSpacing: '0.4px',
          fontFamily: 'var(--font-heading)',
          lineHeight: 1.3,
        }}
      >
        {service.title}
      </motion.h3>

      {/* Desc */}
      <p
        className="text-muted service-card-desc"
        style={{ fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem', flexGrow: 1 }}
      >
        {service.desc}
      </p>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
        {service.features.map((feat, idx) => (
          <motion.div
            key={idx}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.18, delay: idx * 0.04 }}
            className="feature-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
            }}
          >
            <Check size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            {feat}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 'auto' }}>
        <motion.a
          href="/#contact"
          animate={{
            background: hovered ? 'var(--primary)' : 'transparent',
            borderColor: hovered ? 'var(--primary)' : 'rgba(0,0,0,0.18)',
          }}
          transition={{ duration: 0.22 }}
          className="service-card-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            border: '1px solid',
            borderRadius: '2rem',
            padding: '0.3rem 0.3rem 0.3rem 1.1rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: hovered ? '#fff' : 'var(--text-primary)',
            transition: 'color 0.22s ease',
          }}
        >
          Work With Us
          <motion.div
            animate={{
              background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(162,21,39,0.1)',
              x: hovered ? 3 : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              border: '1px solid var(--primary)',
              borderRadius: '50%',
              padding: '0.45rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowRight size={15} style={{ color: hovered ? '#fff' : 'var(--primary)' }} />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
};

/* ── Main slider ─────────────────────────────────────────────────────────── */
const OtherServices = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const total = otherServicesData.length;
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);
  const paused = useRef(false);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const go = useCallback((d) => {
    setDir(d);
    setCurrent((prev) => (prev + d + total) % total);
  }, [total]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused.current) go(1);
    }, SLIDE_INTERVAL);
  }, [go]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // Build the visible slice (wrapping)
  const visibleCards = Array.from({ length: visibleCount }, (_, i) =>
    otherServicesData[(current + i) % total]
  );

  return (
    <section className="section bg-secondary" id="other-services">
      <style>{`
        .service-slide-card {
           flex: 0 0 calc(33.333% - 1rem);
           padding: 2.25rem 2rem;
        }
        @media (max-width: 1024px) {
           .service-slide-card {
              flex: 0 0 calc(50% - 0.75rem);
              padding: 2rem 1.5rem;
           }
        }
        @media (max-width: 640px) {
           .service-slide-card {
              flex: 0 0 100%;
              padding: 1.75rem 1.25rem;
           }
           .service-card-title {
              font-size: 1rem !important;
           }
           .service-card-desc {
              font-size: 0.875rem !important;
           }
           .icon-bubble {
              font-size: 1.8rem !important;
              padding: 0.75rem !important;
              margin-bottom: 1.25rem !important;
           }
           .feature-item {
              font-size: 0.8rem !important;
           }
           .service-card-btn {
              font-size: 0.8rem !important;
              padding: 0.25rem 0.25rem 0.25rem 0.9rem !important;
           }
           .slider-nav-btn {
              width: 38px !important;
              height: 38px !important;
           }
           .slider-nav-btn-prev {
              left: -8px !important;
           }
           .slider-nav-btn-next {
              right: -8px !important;
           }
        }
      `}</style>

      <div className="container">

        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="badge" style={{ marginBottom: '1.25rem', fontWeight: 700 }}>
            * OUR OTHER SERVICES
          </div>
          <h2
            className="heading-sm"
            style={{ fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            Everything Your Brand Needs to{' '}
            <span className="text-gradient-primary">Scale & Shine</span>
          </h2>
        </motion.div>

        {/* Slider wrapper */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {/* Cards strip */}
          <div style={{ overflow: 'hidden', padding: '1rem 0.15rem 2rem' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ x: dir > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                }}
              >
                {visibleCards.map((service, i) => (
                  <ServiceCard key={`${current}-${i}`} service={service} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev button */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="slider-nav-btn slider-nav-btn-prev"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-24px',
              transform: 'translateY(-60%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,21,39,0.18)';
              e.currentTarget.style.transform = 'translateY(-60%) scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
              e.currentTarget.style.transform = 'translateY(-60%) scale(1)';
            }}
          >
            <ChevronLeft size={20} color="var(--primary)" />
          </button>

          {/* Next button */}
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="slider-nav-btn slider-nav-btn-next"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-24px',
              transform: 'translateY(-60%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,21,39,0.18)';
              e.currentTarget.style.transform = 'translateY(-60%) scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
              e.currentTarget.style.transform = 'translateY(-60%) scale(1)';
            }}
          >
            <ChevronRight size={20} color="var(--primary)" />
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
          {otherServicesData.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '99px',
                background: i === current ? 'var(--primary)' : 'rgba(0,0,0,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OtherServices;
