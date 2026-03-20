import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "1",
    title: "Growth Audit",
    desc: "Deep analysis of your current bottlenecks, high-ticket offers, and analytics."
  },
  {
    num: "2",
    title: "Strategy Design",
    desc: "Building custom funnel architecture, mapping ad angles, and scripting."
  },
  {
    num: "3",
    title: "Campaign Launch",
    desc: "Deploying targeted ads, pixel tracking, and automated email follow-ups."
  },
  {
    num: "4",
    title: "Revenue Scaling",
    desc: "Optimizing conversion metrics and aggressively scaling ad spend for ROI."
  }
];

const Process = () => {
  return (
    <section className="section bg-secondary" id="process" style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge mb-4">Methodology</div>
          <h2 
            className="heading-lg" style={{ marginBottom: '1rem' }}>
            The 4-Step <span className="text-gradient-primary">Growth System</span>
          </h2>
        </div>

        <div className="grid grid-4 gap-6 relative" style={{ position: 'relative' }}>
          {/* Connecting Line */}
          <div style={{ position: 'absolute', top: '3rem', left: '10%', right: '10%', height: '2px', background: 'var(--glass-border)', zIndex: 0 }} className="hidden md:block"></div>
          
          {steps.map((step, i) => (
            <div 
              key={i}
              className="text-center relative z-10" style={{ padding: '0 1rem', zIndex: 1 }}>
              
              <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))', border: '2px solid var(--primary)', margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)',   boxShadow: '0 0 30px var(--primary-glow)' }}>
                {step.num}
              </div>
              
              <h3 className="heading-sm" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{step.title}</h3>
              <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
