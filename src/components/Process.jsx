import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';

const steps = [
  {
    num: "01",
    day: "Day 1",
    title: "You fill our growth form",
    desc: "Before we speak, we ask you to fill a detailed form — your business, your current marketing, your goals, and where you feel stuck. This means when we get on a call, we already know your situation and the conversation is sharp, not generic.",
    tags: ["Business snapshot", "Current marketing audit", "Goals & challenges"]
  },
  {
    num: "02",
    day: "Day 2-3",
    title: "We analyse & prepare",
    desc: "Our team reviews your form, studies your market, audits your current digital presence, and identifies your biggest growth leakages before we even speak. We come to the call with answers, not just questions.",
    tags: ["Competitor research", "Leakage identification", "Growth opportunity map"]
  },
  {
    num: "03",
    day: "Day 4-5",
    title: "Discovery call — we present our findings",
    desc: "This is not a sales call. We share what we found, where your growth is leaking, and exactly what we'd do to fix it. If we're the right fit, we move forward. If not, you still walk away with a clear picture of your business.",
    tags: ["Growth audit presentation", "Custom strategy outline", "Fit assessment"]
  },
  {
    num: "04",
    day: "Week 1-2",
    title: "Strategy & setup",
    desc: "Once onboarded, we build your complete growth blueprint — content strategy, ad structure, funnel architecture, nurturing sequences, and sales training plan. Everything mapped before a single rupee is spent.",
    tags: ["90-day growth plan", "Funnel architecture", "Content calendar", "Ad account setup"]
  },
  {
    num: "05",
    day: "Week 2-6",
    title: "Execute & launch",
    desc: "We go live across all channels simultaneously — social media, ads, funnels, nurturing sequences. Every piece is connected. Every touchpoint is intentional. First results typically show within 30-45 days.",
    tags: ["Campaigns go live", "Funnels activated", "Sales training begins", "Lead flow starts"]
  },
  {
    num: "06",
    day: "Ongoing",
    title: "Optimise & scale to the Apex",
    desc: "Every two weeks we review performance together — what's working, what needs fixing, and where to push harder. We don't set and forget. We iterate until the numbers consistently climb.",
    tags: ["Bi-weekly check-in calls", "Performance dashboards", "Monthly strategy review", "Continuous optimisation"]
  }
];

const StepItem = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2, filter: 'blur(8px)', y: 40 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        gap: '3rem',
        marginBottom: '6rem',
        position: 'relative'
      }}
      className="process-step"
    >
      {/* Number and Line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#ffffff', color: '#164EAA',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', fontWeight: 800,
          border: '1px solid rgba(22, 78, 170, 0.2)',
          zIndex: 2, flexShrink: 0
        }}>
          {step.num}
        </div>
        {index !== steps.length - 1 && (
          <div style={{
            width: '2px', flex: 1, background: 'rgba(255, 255, 255, 0.1)', marginTop: '1rem',
            minHeight: '150px'
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '2rem' }}>
        <div style={{ color: '#164EAA', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '1px' }}>
          {step.day}
        </div>
        <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px', color: '#ffffff' }}>
          {step.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '800px', marginBottom: '2rem' }}>
          {step.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
          {step.tags.map((tag, tIdx) => (
            <div key={tIdx} style={{
              padding: '8px 20px', borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;
      
      let totalDuration = 2000;
      let incrementTime = (totalDuration / end);
      
      let timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const Process = () => {
  return (
    <section className="section" id="process" style={{ background: '#111827', color: '#ffffff', padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Accent */}
      <div style={{
        position: 'absolute', top: '0', left: '0', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(22, 78, 170, 0.03) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0
      }} />

      <div className="container">
        
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           style={{ marginBottom: '8rem' }}
        >
          <div style={{ 
            display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(4, 190, 150, 0.1)', 
            borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, color: '#04BE96', marginBottom: '1.5rem',
            border: '1px solid rgba(4, 190, 150, 0.2)'
          }}>
            How we work
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-2.5px', lineHeight: 1.1 }}>
            A system built for results. <br />
            Not for looking busy.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '850px', lineHeight: 1.7 }}>
            No onboarding chaos. No guesswork. Every client goes through the same <br />
            proven process — so nothing falls through the cracks and results show up in 0-45 days.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} />
          ))}
        </div>

        {/* Footer Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '1.5rem',
            padding: '2.5rem 3.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            marginTop: '4rem',
            marginBottom: '6rem'
          }}
          className="summary-box"
        >
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: 'rgba(22, 78, 170, 0.1)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            color: '#164EAA'
          }}>
             <Users size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
              You're never left wondering what's happening.
            </h4>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '1.05rem' }}>
              Bi-weekly calls keep you fully in the loop — without you having to chase us for updates. <br />
              <span style={{ color: '#164EAA', fontWeight: 700 }}>You focus on your business. We focus on your growth.</span>
            </p>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', textAlign: 'center' }} className="process-stats">
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#164EAA', marginBottom: '0.5rem' }}>
              0-<AnimatedCounter value="45" />
            </div>
            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.1rem' }}>Days to first results</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#04BE96', marginBottom: '0.5rem' }}>
              <AnimatedCounter value="2" suffix="x" />
            </div>
            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.1rem' }}>Check-ins per month</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#164EAA', marginBottom: '0.5rem' }}>
              <AnimatedCounter value="6" />
            </div>
            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.1rem' }}>Month growth cycle</div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .summary-box { flex-direction: column; text-align: center; padding: 2.5rem 1.5rem !important; gap: 1.5rem !important; }
          .process-step { gap: 1.5rem !important; }
          .process-stats { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Process;
