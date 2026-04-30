import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const steps = [
  { num: '01', label: 'Pick a time on\nCalendly' },
  { num: '02', label: 'We analyse your\nbusiness' },
  { num: '03', label: '30-min\ngrowth call' },
  { num: '04', label: 'You get a clear\ngrowth plan' },
];

const trustBadges = [
  '100% free — no credit card',
  'No pushy sales pitch',
  'You keep the growth plan either way',
  'Limited slots per month',
];

const BookAudit = ({ onOpenModal }) => (
  <section style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative' }}>
    {/* Top cyan glow line */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />

    {/* Subtle grid */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'linear-gradient(rgba(34,211,238,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.02) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      pointerEvents: 'none',
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="mono-accent">// READY TO GROW?</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            fontWeight: 800, color: 'var(--text-1)',
            lineHeight: 1.15, marginBottom: '1.25rem',
            letterSpacing: '-0.03em',
          }}
        >
          Book your free growth audit.{' '}
          <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>Walk away with clarity — whether we work together or not.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 3rem' }}
        >
          In 30 minutes we'll map your biggest growth leakages, show you exactly what's holding you back, and outline what it would take to fix it. Zero cost. Zero obligation.
        </motion.p>

        {/* 4-step flow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--r2)', padding: '1.75rem 2rem',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'var(--cyan-dim)', border: '1px solid var(--border-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.7rem',
                  color: 'var(--cyan)', flexShrink: 0,
                  boxShadow: '0 0 12px rgba(34,211,238,0.12)',
                }}>
                  {step.num}
                </div>
                <span style={{
                  color: 'var(--text-2)', fontSize: '0.82rem', fontWeight: 500,
                  whiteSpace: 'pre-line', textAlign: 'left', lineHeight: 1.4, maxWidth: '100px',
                }}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight size={14} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ marginBottom: '0.875rem' }}
        >
          <button
            onClick={onOpenModal}
            className="btn btn-cyber"
            style={{ padding: '0.9rem 2.5rem', fontSize: '0.95rem', display: 'inline-flex' }}
          >
            Book your free growth audit <ArrowRight size={15}/>
          </button>
        </motion.div>

        <p className="mono-accent" style={{ fontSize: '0.65rem' }}>
          TAKES 2 MINUTES — PICK A SLOT THAT WORKS FOR YOU
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)', margin: '3rem 0 2rem' }} />

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25 }}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem 2rem' }}
        >
          {trustBadges.map((badge, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-3)', fontSize: '0.82rem' }}>
              <Check size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
              {badge}
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  </section>
);

export default BookAudit;
