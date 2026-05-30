import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import aarush from '../assets/client/Aarush_Bhola.jpeg';
import nandan from '../assets/client/Coach Nandan.jpg';
import mannu from '../assets/client/Mannu Chaudhary.png';
import rahul from '../assets/client/Rahul Chaudhary.jpg';
import sujoy from '../assets/client/Sujoy das.jpg';
import yash from '../assets/client/Yash Sharma.jpg';
import deepak from '../assets/client/deepak baja.jpg';
import jitesh from '../assets/client/jitesh pant.jpg';

// ── Text Testimonials for the auto-slider ──────────────────────────────────────────
const testimonials = [
  {
    quote: "GrowthApex doesn't just run ads — they build systems. Within 45 days our cost per lead dropped from ₹850 to ₹210.",
    name: "Aarush Bhola",
    role: "Impact Creator",
    img: aarush,
    gradient: "linear-gradient(135deg, #164EAA, #04BE96)",
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

const SLIDE_INTERVAL = 5000;

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
          padding: '4rem 3rem',
          textAlign: 'center',
          position: 'relative',
          minHeight: '320px',
          background: 'var(--bg-2)',
          borderRadius: 'var(--r2)',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <MessageSquareQuote size={140} color="var(--cyan)" style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.03, zIndex: 0 }} />

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
                <Star key={i} size={18} fill="var(--cyan)" color="var(--cyan)" style={{ opacity: 0.9 }} />
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--text-1)',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-body)',
            }}>
              "{t.quote}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: t.img ? `url(${t.img}) center/cover no-repeat` : t.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                flexShrink: 0,
                border: '2px solid var(--border-2)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              }}>
                {!t.img && t.name.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-1)' }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginTop: '0.1rem', fontFamily: 'var(--font-mono)' }}>{t.role}</div>
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
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--bg-3)',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--cyan)';
            e.currentTarget.style.boxShadow = '0 0 16px var(--cyan-glow)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <Icon size={18} color="var(--cyan)" />
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent([i, i > current ? 1 : -1])}
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              borderRadius: '99px',
              background: i === current ? 'var(--cyan)' : 'var(--border-2)',
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

const Testimonials = ({ onOpenModal }) => {
  return (
    <section className="section" id="testimonials" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background grid and glow */}
      <div className="cyber-grid" />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'var(--border)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// CLIENT STORIES</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Success in Action. <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>Hear from Our Clients.</span>
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
            Real reviews, real screens, and actual revenue breakdowns. See how coaches and creators scale their business with GrowthApex.
          </p>
        </div>

        {/* ── Featured Video Testimonial ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
          background: 'var(--bg-2)',
          border: '1px solid var(--border-2)',
          borderRadius: 'var(--r2)',
          padding: '2.5rem',
          marginBottom: '4rem',
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }} className="featured-video-container">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
          
          {/* Video Player */}
          <div style={{ 
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', /* 16:9 Aspect Ratio */
            borderRadius: 'var(--r2)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
          }}>
            <iframe 
              src="https://www.youtube.com/embed/-JaQ6VqqVUI" 
              title="Featured Client Testimonial" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          </div>

          {/* Details / Text */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="tag tag-cyan">Featured Review</span>
              <span style={{ color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem' }}>
                <Sparkles size={14} style={{ marginRight: '4px' }} /> Case Study
              </span>
            </div>
            
            <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 800, color: 'var(--text-1)', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.025em' }}>
              How We Transformed Client Acquisition
            </h3>
            
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Watch the detailed interview to understand our exact funnel building process, ad scaling strategies, and WhatsApp automation systems that generate high-ticket conversions on autopilot.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.25rem' }}>
              {[
                "Complete funnel redesign & optimization",
                "Automated high-ticket WhatsApp CRM setups",
                "Meta & Google ad scaling with hyper-targeting",
                "Dedicated sales team training and conversion coaching"
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-1)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding: '0.85rem 1.75rem', width: 'fit-content' }}>
              Get Your Free Growth Audit
            </button>
          </div>
        </div>

        {/* ── Shorts Gallery ── */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.4rem' }}>
            <span className="mono-accent">// SHORTS SUCCESS STORIES</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }} className="shorts-grid">
            {[
              { id: 'viAl-tNeaSw', title: 'Breakthrough Success Story' },
              { id: 'pw0tnxhZ_no', title: 'Lead Flow Automation Results' },
              { id: 'gavgY4dmBQE', title: 'Revenue Scaling Strategy' }
            ].map((short, idx) => (
              <div 
                key={idx} 
                className="glass hover-card"
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r2)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Short Video Player Frame */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '177.78%', /* 9:16 Aspect Ratio */
                  borderRadius: 'var(--r)',
                  overflow: 'hidden',
                  background: '#000',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${short.id}`}
                    title={short.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                </div>
                
                {/* Video Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0.5rem 0' }}>
                  <span className="mono" style={{ color: 'var(--cyan)', fontWeight: 600 }}>SHORT REVIEW</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="var(--cyan)" color="var(--cyan)" style={{ opacity: 0.8 }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Slider Text Testimonials ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3.5rem' }}>
            <span className="mono-accent">// MORE REVIEWS FROM THE FIELD</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
          </div>

          <TestimonialSlider />
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-video-container {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
            gap: 1.75rem !important;
          }
          .shorts-grid {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin: 0 auto;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .shorts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
