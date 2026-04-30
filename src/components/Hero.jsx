import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const Num = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const mv  = useMotionValue(0);
  const sv  = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const inV = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => { if (inV) mv.set(value); }, [inV, mv, value]);
  useEffect(() => sv.on('change', x => setV(Math.round(x))), [sv]);
  return <span ref={ref}>{v}</span>;
};

const TICKER = [
  'Social Media Management','Meta Ads','Google Ads','Sales Funnel Design',
  'Lead Nurturing','Sales Training','Growth Leakage Audit','WhatsApp Automation',
  'Content Strategy','Conversion Optimisation',
];

const Hero = ({ onOpenModal }) => (
  <section style={{
    minHeight:'100vh', background:'var(--bg)',
    position:'relative', display:'flex', flexDirection:'column',
    justifyContent:'flex-end', overflow:'hidden',
  }}>
    {/* Cyber grid */}
    <div className="cyber-grid" />

    {/* Subtle corner glow — top right */}
    <div style={{
      position:'absolute', top:'-15%', right:'-10%',
      width:'600px', height:'600px',
      background:'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)',
      pointerEvents:'none',
    }}/>
    {/* Bottom left purple hint */}
    <div style={{
      position:'absolute', bottom:'-10%', left:'-5%',
      width:'400px', height:'400px',
      background:'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)',
      pointerEvents:'none',
    }}/>

    <div className="container" style={{ position:'relative', zIndex:1, paddingTop:'130px', paddingBottom:0 }}>

      {/* ── Top status bar ── */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
        style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid var(--border)', paddingBottom:'1rem', marginBottom:'3rem',
          flexWrap:'wrap', gap:'0.75rem',
        }}
      >
        <span className="mono">GROWTHAPEX.IN // FULL STACK GROWTH AGENCY</span>
        <span style={{
          display:'flex', alignItems:'center', gap:'0.5rem',
          fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--green)', letterSpacing:'0.1em',
        }}>
          <motion.span
            animate={{ opacity:[1,0.3,1] }}
            transition={{ duration:1.5, repeat:Infinity }}
            style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }}
          />
          STATUS: TAKING NEW CLIENTS
        </span>
      </motion.div>

      {/* ── Massive headline ── */}
      <motion.h1
        initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.7, delay:0.1 }}
        style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(2rem,4vw,3.6rem)',
          fontWeight:800, lineHeight:1.08,
          letterSpacing:'-0.03em', marginBottom:'1.75rem',
        }}
      >
        We don't run<br/>
        <span style={{
          WebkitTextStroke:'1.5px rgba(34,211,238,0.4)',
          WebkitTextFillColor:'transparent', color:'transparent',
        }}>
          your marketing.
        </span>
        <br/>
        <span style={{
          background:'linear-gradient(135deg, var(--cyan) 0%, #818cf8 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
        }}>
          We build it.
        </span>
      </motion.h1>

      {/* ── Sub row ── */}
      <motion.div
        initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6, delay:0.25 }}
        style={{
          display:'flex', alignItems:'flex-end', justifyContent:'space-between',
          gap:'2rem', flexWrap:'wrap',
          borderTop:'1px solid var(--border)', paddingTop:'2rem',
        }}
      >
        <p style={{
          maxWidth:'480px', fontSize:'clamp(0.88rem,1.1vw,0.95rem)',
          color:'var(--text-2)', lineHeight:1.75, letterSpacing:'-0.01em',
        }}>
          From social media to performance ads, funnels to lead nurturing, sales training to fixing leakages — one team, one goal, one outcome.{' '}
          <span style={{ color:'var(--text-1)', fontWeight:500 }}>We take you to the Apex.</span>
        </p>

        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', flexShrink:0 }}>
          <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding:'0.8rem 1.75rem' }}>
            Book a free audit <ArrowRight size={15}/>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('results')?.scrollIntoView({ behavior:'smooth' })}
            style={{ padding:'0.8rem 1.4rem' }}
          >
            See results <ArrowUpRight size={14}/>
          </button>
        </div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.45 }}
        className="hero-stats-strip"
        style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid var(--border)', marginTop:'3.5rem' }}
      >
        {[
          { val:20, suffix:'+', label:'Brands Grown' },
          { val:3,  suffix:'×', label:'Avg Lead Growth' },
          { val:6,  suffix:'',  label:'Months to Results' },
        ].map((s, i) => (
          <div key={i} style={{
            padding:'1.75rem 2rem',
            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:'1.65rem', fontWeight:700,
              letterSpacing:'-0.02em', lineHeight:1,
              color:'var(--cyan)', marginBottom:'0.35rem',
              textShadow:'0 0 16px rgba(34,211,238,0.25)',
            }}>
              <Num value={s.val}/>{s.suffix}
            </div>
            <div className="mono" style={{ textTransform:'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* ── Ticker ── */}
    <div style={{
      borderTop:'1px solid var(--border)', padding:'0.85rem 0',
      overflow:'hidden', position:'relative', zIndex:1, marginTop:'1px',
      background:'rgba(34,211,238,0.02)',
    }}>
      <div style={{
        display:'flex', gap:'2.5rem', width:'max-content',
        animation:'ticker 30s linear infinite', willChange:'transform',
      }}>
        {[...TICKER,...TICKER].map((s,i) => (
          <span key={i} className="mono" style={{
            whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:'2.5rem',
          }}>
            {s}
            <span style={{ width:3, height:3, borderRadius:'50%', background:'var(--text-3)', display:'inline-block', marginLeft:'-1.25rem' }}/>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
