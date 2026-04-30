import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ZapOff, UserMinus, Settings } from 'lucide-react';

const REASONS = [
  { num: '01', Icon: AlertCircle, title: 'They run ads. You lose leads.', desc: 'Campaigns go live, budget gets spent, but leads fall into a black hole. No follow-up system. No nurturing. Just wasted spend.' },
  { num: '02', Icon: ZapOff,      title: 'Tactics without strategy.',     desc: "Posts go up. Reels get made. But there's no system connecting content to conversions. It looks busy. It produces nothing." },
  { num: '03', Icon: UserMinus,   title: 'Sales team left on their own.', desc: 'Marketing generates interest but nobody trains the sales team to close. The gap between lead and revenue stays wide open.' },
  { num: '04', Icon: Settings,    title: "You're the project manager.",   desc: 'Three vendors. Five tools. Zero accountability. You spend more time managing your agency than running your business.' },
];

const WhyUs = () => (
  <section id="why-us" style={{ background: 'var(--black)', color: 'var(--text-1)', padding: '6rem 0', position: 'relative' }}>
    <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:'1px', background:'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

    <div className="container">

      {/* Header */}
      <motion.div
        initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.55 }}
        style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap', marginBottom:'4rem' }}
      >
        <div>
          <span className="label" style={{ display:'block', marginBottom:'1rem' }}>Why GrowthApex</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4vw, 3rem)',
            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '600px',
          }}>
            Most agencies run your marketing.{' '}
            <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>Nobody fixes why it isn't working.</span>
          </h2>
        </div>
        <p style={{ maxWidth:'380px', color:'var(--text-2)', fontSize:'0.95rem', lineHeight:1.7, letterSpacing:'-0.01em' }}>
          You've probably hired someone before. Paid for posts, ran some ads, maybe even built a funnel. But the leads didn't convert, the sales team didn't close, and the agency just kept sending reports with no real answers.
        </p>
      </motion.div>

      {/* Numbered list */}
      <div className="why-us-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:0 }}>
        {REASONS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            style={{
              padding: '2.5rem',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display:'flex', alignItems:'flex-start', gap:'1.25rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-3)',
                letterSpacing: '0.08em', paddingTop: '0.1rem', flexShrink: 0,
              }}>
                {r.num}
              </span>
              <div>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.12)',
                  borderRadius: 'var(--radius)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#f87171', marginBottom: '1.25rem',
                }}>
                  <r.Icon size={16} />
                </div>
                <h3 style={{ fontSize:'1.05rem', fontWeight:700, letterSpacing:'-0.02em', marginBottom:'0.6rem', color:'var(--text-1)' }}>
                  {r.title}
                </h3>
                <p style={{ fontSize:'0.88rem', color:'var(--text-2)', lineHeight:1.7 }}>{r.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Thin bottom border */}
      <div style={{ height:'1px', background:'var(--border)', marginTop:0 }} />
    </div>

    <style>{`@media(max-width:700px){.why-us-grid{grid-template-columns:1fr!important;}.why-us-grid>div{border-right:none!important;border-bottom:1px solid var(--border)!important;}}`}</style>
  </section>
);

export default WhyUs;
