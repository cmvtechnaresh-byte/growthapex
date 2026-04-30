import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';

const steps = [
  { num:'01', day:'Day 1',     title:'You fill our growth form',            desc:'Before we speak, we ask you to fill a detailed form — your business, your current marketing, your goals, and where you feel stuck. This means when we get on a call, we already know your situation and the conversation is sharp, not generic.', tags:['Business snapshot','Current marketing audit','Goals & challenges'] },
  { num:'02', day:'Day 2–3',   title:'We analyse & prepare',                desc:'Our team reviews your form, studies your market, audits your current digital presence, and identifies your biggest growth leakages before we even speak. We come to the call with answers, not just questions.', tags:['Competitor research','Leakage identification','Growth opportunity map'] },
  { num:'03', day:'Day 4–5',   title:'Discovery call — we present findings', desc:'This is not a sales call. We share what we found, where your growth is leaking, and exactly what we\'d do to fix it. If we\'re the right fit, we move forward. If not, you still walk away with a clear picture of your business.', tags:['Growth audit presentation','Custom strategy outline','Fit assessment'] },
  { num:'04', day:'Week 1–2',  title:'Strategy & setup',                    desc:'Once onboarded, we build your complete growth blueprint — content strategy, ad structure, funnel architecture, nurturing sequences, and sales training plan. Everything mapped before a single rupee is spent.', tags:['90-day growth plan','Funnel architecture','Content calendar','Ad account setup'] },
  { num:'05', day:'Week 2–6',  title:'Execute & launch',                    desc:'We go live across all channels simultaneously — social media, ads, funnels, nurturing sequences. Every piece is connected. Every touchpoint is intentional. First results typically show within 30–45 days.', tags:['Campaigns go live','Funnels activated','Sales training begins','Lead flow starts'] },
  { num:'06', day:'Ongoing',   title:'Optimise & scale to the Apex',        desc:'Every two weeks we review performance together — what\'s working, what needs fixing, and where to push harder. We don\'t set and forget. We iterate until the numbers consistently climb.', tags:['Bi-weekly check-in calls','Performance dashboards','Monthly strategy review','Continuous optimisation'] },
];

const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [d, setD] = React.useState(0);
  React.useEffect(() => {
    if (!isInView) return;
    let start = 0; const end = parseInt(value);
    const timer = setInterval(() => { start++; setD(start); if (start === end) clearInterval(timer); }, 2000 / end);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{d}{suffix}</span>;
};

const Process = () => (
  <section id="process" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}
        style={{ marginBottom: '4rem' }}
      >
        <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// HOW WE WORK</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          A system built for results.{' '}
          <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>Not for looking busy.</span>
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', maxWidth: '580px', lineHeight: 1.7 }}>
          No onboarding chaos. No guesswork. Every client goes through the same proven process — so nothing falls through the cracks and results show up in 0–45 days.
        </p>
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: '820px', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '1px', background: 'linear-gradient(to bottom, var(--cyan-glow), transparent)' }} />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="process-step"
            style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative' }}
          >
            {/* Step dot */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'var(--bg-2)', border: '1px solid var(--border-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
                color: 'var(--cyan)', zIndex: 2,
              }}>
                {step.num}
              </div>
            </div>

            {/* Content */}
            <div style={{ paddingBottom: '1.5rem', flex: 1 }}>
              <span className="mono-accent" style={{ fontSize: '0.62rem', display: 'block', marginBottom: '0.5rem' }}>{step.day}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '0.75rem', color: 'var(--text-1)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '620px', marginBottom: '1.25rem' }}>{step.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {step.tags.map((tag, t) => (
                  <span key={t} className="tag tag-cyan">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--r2)', padding: '2rem 2.5rem',
          marginBottom: '3.5rem',
        }}
        className="summary-box"
      >
        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--r)', background: 'var(--cyan-dim)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--cyan)' }}>
          <Users size={20}/>
        </div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>You're never left wondering what's happening.</h4>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Bi-weekly calls keep you fully in the loop — without you having to chase us for updates.{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>You focus on your business. We focus on your growth.</span>
          </p>
        </div>
      </motion.div>

      {/* Bottom stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r2)', overflow: 'hidden' }} className="process-stats">
        {[
          { val: '45', suffix: '', label: 'Days to first results', prefix: '0-', color: 'var(--cyan)' },
          { val: '2',  suffix: 'x', label: 'Check-ins per month', prefix: '',   color: 'var(--green)' },
          { val: '6',  suffix: '',  label: 'Month growth cycle',   prefix: '',   color: 'var(--cyan)' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '1.75rem', textAlign: 'center', background: 'var(--bg-2)', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.65rem', fontWeight: 700, color: s.color, marginBottom: '0.35rem', textShadow: `0 0 14px ${s.color}40` }}>
              {s.prefix}<AnimatedCounter value={s.val} suffix={s.suffix}/>
            </div>
            <div className="mono" style={{ color: 'var(--text-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @media(max-width:700px){.process-step{gap:1rem!important;}.process-stats{grid-template-columns:1fr!important;}.process-stats>div{border-right:none!important;border-bottom:1px solid var(--border);}}
    `}</style>
  </section>
);

export default Process;
