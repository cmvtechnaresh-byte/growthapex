import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const steps = [
  { num: 1, label: 'Pick a time on\nCalendly' },
  { num: 2, label: 'We analyse your\nbusiness' },
  { num: 3, label: '30-min\ngrowth call' },
  { num: 4, label: 'You get a clear\ngrowth plan' },
];

const trustBadges = [
  '100% free — no credit card',
  'No pushy sales pitch',
  'You keep the growth plan either way',
  'Limited slots per month',
];

const BookAudit = ({ onOpenModal }) => {
  return (
    <section
      style={{
        background: '#0e2147',
        padding: '6rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '0.45rem 1.25rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
          }}
        >
          Ready to grow?
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-1.5px',
          }}
        >
          Book your free growth audit. Walk away with clarity&nbsp;—&nbsp;whether we work together or not.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '620px',
            margin: '0 auto 3rem',
          }}
        >
          In 30 minutes we'll map your biggest growth leakages, show you exactly what's holding you back, and outline what it would take to fix it. Zero cost. Zero obligation.
        </motion.p>

        {/* 4-Step Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Circle */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 900,
                    fontSize: '1rem',
                    color: '#fff',
                    boxShadow: '0 4px 16px rgba(34,197,94,0.35)',
                  }}
                >
                  {step.num}
                </div>
                {/* Label */}
                <span
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    whiteSpace: 'pre-line',
                    textAlign: 'left',
                    lineHeight: 1.35,
                    maxWidth: '110px',
                  }}
                >
                  {step.label}
                </span>
              </div>
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <ArrowRight
                  size={18}
                  style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={onOpenModal}
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#0e2147',
              fontWeight: 800,
              fontSize: '1.1rem',
              padding: '1.1rem 2.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              letterSpacing: '-0.3px',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
            }}
          >
            Book your free growth audit
          </button>
          <p
            style={{
              color: '#22c55e',
              fontSize: '0.92rem',
              fontWeight: 600,
              marginTop: '1rem',
            }}
          >
            Takes 2 minutes — pick a slot that works for you
          </p>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            margin: '3.5rem 0 2.5rem',
          }}
        />

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <Check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
              {badge}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default BookAudit;
