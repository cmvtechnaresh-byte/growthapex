import React from 'react';
import { motion } from 'framer-motion';
import FloatingGraphics from './FloatingGraphics';
import { Search, Map, Cpu, Rocket, RotateCcw } from 'lucide-react';

const steps = [
  {
    num: "1",
    icon: <Search size={22} />,
    title: "Discovery & Positioning",
    desc: "We identify your niche, audience, and unique value to build a solid foundation."
  },
  {
    num: "2",
    icon: <Map size={22} />,
    title: "Strategy Mapping",
    desc: "Data-driven content & marketing blueprint tailored for your brand growth."
  },
  {
    num: "3",
    icon: <Cpu size={22} />,
    title: "Content Engine",
    desc: "Script → Shoot → Edit → Publish: A streamlined content production machine."
  },
  {
    num: "4",
    icon: <Rocket size={22} />,
    title: "Performance Scaling",
    desc: "Ads + organic synergy for maximum reach and high-intent lead generation."
  },
  {
    num: "5",
    icon: <RotateCcw size={22} />,
    title: "Optimization Loop",
    desc: "Analyze → Improve → Scale → Repeat: Continuous growth through data."
  }
];

const Process = () => {
  return (
    <section className="section bg-secondary" id="process" style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
      <FloatingGraphics />
      <style>{`
        .process-grid {
           display: grid;
           grid-template-columns: repeat(5, 1fr);
           gap: 1.5rem;
           position: relative;
        }
        .process-line {
           position: absolute;
           top: 3rem;
           left: 10%;
           right: 10%;
           height: 2px;
           background: var(--glass-border);
           z-index: 0;
           display: block;
        }
        @media (max-width: 1024px) {
           .process-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 3rem 1.5rem;
           }
           .process-line { display: none !important; }
        }
        @media (max-width: 640px) {
           .process-grid {
              grid-template-columns: 1fr;
              gap: 3.5rem;
           }
           .step-bubble {
              width: 5rem !important;
              height: 5rem !important;
              font-size: 1.5rem !important;
              margin-bottom: 1.5rem !important;
           }
           .step-title {
              font-size: 1.25rem !important;
           }
           .step-desc {
              font-size: 0.95rem !important;
              max-width: 280px;
              margin: 0 auto;
           }
        }
      `}</style>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge mb-4">Methodology</div>
          <h2
            className="heading-sm" style={{ marginBottom: '1rem', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            The 5-Step <span className="text-gradient-primary">GrowthApex System</span>
          </h2>
        </div>

        <div className="process-grid">
          {/* Connecting Line */}
          <div className="process-line"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="text-center relative z-10" style={{ padding: '0 1rem', zIndex: 1 }}>

              <div className="step-bubble" style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--primary)', margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', boxShadow: '0 0 30px var(--primary-glow)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--primary)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.num}</span>
                {step.icon}
              </div>

              <h3 className="step-title" style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>{step.title}</h3>
              <p className="step-desc text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
