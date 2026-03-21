import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import vijayImg from '../assets/Screenshot 2026-03-21 010644.png';

const cases = [
  {
    type: "Health Coach",
    metricTitle: "Generated Revenue",
    metricValue: "₹22L",
    beforeLabel: "BEFORE", beforeValue: "12 Leads",
    afterLabel: "AFTER (30 Days)", afterValue: "320 Leads",
    methodLbl: "Method:", methodVal: "Meta Ads",
    systemLbl: "System:", systemVal: "Webinar Funnel"
  },
  {
    type: "Consultant",
    metricTitle: "Return on Ad Spend",
    metricValue: "4X ROI",
    beforeLabel: "BEFORE (CPL)", beforeValue: "₹850",
    afterLabel: "AFTER (CPL)", afterValue: "₹210",
    methodLbl: "Platform:", methodVal: "Google & Meta",
    systemLbl: "System:", systemVal: "VSL Funnel"
  },
  {
    type: "Fitness Coach",
    metricTitle: "Consistent Leads",
    metricValue: "150+/mo",
    beforeLabel: "BEFORE", beforeValue: "Word of Mouth",
    afterLabel: "AFTER", afterValue: "Predictable Ops",
    methodLbl: "Method:", methodVal: "IG Personal Brand",
    systemLbl: "System:", systemVal: "DM Automation"
  }
];

import aarush from '../assets/client/Aarush_Bhola.jpeg';
import nandan from '../assets/client/Coach Nandan.jpg';
import mannu from '../assets/client/Mannu Chaudhary.png';
import rahul from '../assets/client/Rahul Chaudhary.jpg';
import sujoy from '../assets/client/Sujoy das.jpg';
import yash from '../assets/client/Yash Sharma.jpg';
import deepak from '../assets/client/deepak baja.jpg';
import jitesh from '../assets/client/jitesh pant.jpg';
import saurav from '../assets/client/saurav singha.jpg';

// ── Testimonials for the auto-slider ──────────────────────────────────────────
const testimonials = [
  {
    quote: "GrowthApex doesn't just run ads — they build systems. Within 45 days our cost per lead dropped from ₹850 to ₹210.",
    name: "Aarush Bhola",
    role: "Impact Creator",
    img: aarush,
    gradient: "linear-gradient(135deg, #e02035, #ff6b6b)",
  },
  {
    quote: "The strategy call alone gave us more clarity than 3 months working with our previous agency.",
    name: "Coach Nandan",
    role: "Systems Expert",
    img: nandan,
    gradient: "linear-gradient(135deg, #A21527, #f59e0b)",
  },
  {
    quote: "We went from occasional leads to over 1,200 registrations a month. The automation alone saved us 20 hours a week.",
    name: "Rahul Chaudhary",
    role: "Growth Catalyst",
    img: rahul,
    gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
  },
  {
    quote: "If you're looking for predictable results and a team that actually treats your brand like their own, this is it.",
    name: "Deepak Bajaj",
    role: "Strategic Partner",
    img: deepak,
    gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
  },
  {
    quote: "Their approach to social media is years ahead of the curve. They turned our attention into a revenue-generating machine.",
    name: "Yash Sharma",
    role: "Fitness Authority",
    img: yash,
    gradient: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
  },
  {
    quote: "The ROI we've seen since switching to GrowthApex is unmatched. They are truly the architects of impact.",
    name: "Jitesh Pant",
    role: "Digital Visionary",
    img: jitesh,
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    quote: "Unbelievable efficiency. They scaled our operations while reducing our mental load significantly.",
    name: "Mannu Chaudhary",
    role: "Scale Master",
    img: mannu,
    gradient: "linear-gradient(135deg, #A21527, #8b5cf6)",
  },
  {
    quote: "Highly recommended for any serious brand looking to dominate their market with data-driven precision.",
    name: "Sujoy Das",
    role: "Motivation Leader",
    img: sujoy,
    gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
  },
];

const SLIDE_INTERVAL = 4000;

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

const TestimonialSlider = () => {
  const [[current, direction], setCurrent] = useState([0, 1]);
  const timerRef = useRef(null);

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => [
      (prev + dir + testimonials.length) % testimonials.length,
      dir,
    ]);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paginate]);

  // Pause on hover
  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(() => paginate(1), SLIDE_INTERVAL);
  };

  const t = testimonials[current];

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{
        maxWidth: '860px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Testimonial Content Area */}
      <div
        style={{
          padding: '2rem 1rem',
          textAlign: 'center',
          position: 'relative',
          minHeight: '280px',
        }}
      >

        {/* Slide content */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.75rem', marginTop: '0.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-heading)',
            }}>
              "{t.quote}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: t.img ? `url(${t.img}) center/cover no-repeat` : t.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}>
                {!t.img && t.initials}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{t.name}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next buttons */}
      {[{ dir: -1, side: 'left', Icon: ChevronLeft }, { dir: 1, side: 'right', Icon: ChevronRight }].map(({ dir, side, Icon }) => (
        <button
          key={side}
          onClick={() => paginate(dir)}
          style={{
            position: 'absolute',
            top: '50%',
            [side]: '-24px',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,21,39,0.18)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <Icon size={20} color="var(--primary)" />
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent([i, i > current ? 1 : -1])}
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '99px',
              background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const Testimonials = () => {
  return (
    <section className="section" id="results">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge mb-4">Real Growth. Real Numbers.</div>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Transforming Coaches into <span className="text-gradient-primary">Industry Leaders</span>
          </h2>
        </div>

        {/* Results cards grid */}
        <div className="grid grid-3 gap-6" style={{ marginBottom: '6rem' }}>
          {cases.map((c, i) => (
            <div
              key={i}
              className="glass relative hover-card"
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '1.5rem',
                height: '100%',
                background: 'rgba(255,255,255,0.04)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.1)' }}>{c.type}</div>

              <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '1rem', borderLeft: '5px solid var(--primary)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.25rem' }}>{c.metricTitle}</div>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1, letterSpacing: '-1.5px' }}>{c.metricValue}</div>
              </div>

              <div className="grid grid-2 gap-4" style={{ marginBottom: '2.5rem' }}>
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.25rem', textTransform: 'uppercase' }}>{c.beforeLabel}</div>
                  <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '1rem' }}>{c.beforeValue}</div>
                </div>
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.25rem', textTransform: 'uppercase' }}>{c.afterLabel}</div>
                  <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>{c.afterValue}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">{c.methodLbl}</span>
                  <span style={{ fontWeight: 600 }}>{c.methodVal}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">{c.systemLbl}</span>
                  <span style={{ fontWeight: 600 }}>{c.systemVal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Auto-sliding testimonials ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge" style={{ marginBottom: '1rem', fontWeight: 700 }}>* WHAT OUR CLIENTS SAY</div>
          <h3 className="heading-sm" style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            Hear It From The <span className="text-gradient-primary">People We've Helped</span>
          </h3>
        </div>

        <TestimonialSlider />
      </div>
    </section>
  );
};

export default Testimonials;
