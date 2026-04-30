import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedNumber = ({ value, suffix = '', prefix = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => { if (isInView) motionValue.set(value); }, [isInView, value, motionValue]);
  React.useEffect(() => springValue.on('change', l => setDisplay(Math.round(l))), [springValue]);
  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
};

const CaseCard = ({ name, title, category, tagColor = 'var(--cyan)', metrics, quote, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: 'var(--bg-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--r2)', padding: '2rem',
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}
    whileHover={{ borderColor: 'var(--border-2)' }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${tagColor}30, transparent)` }} />

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.2rem', letterSpacing: '-0.02em' }}>{name}</h4>
        <p style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>{title}</p>
      </div>
      <span className="tag" style={{ background: `${tagColor}15`, color: tagColor, border: `1px solid ${tagColor}25` }}>
        {category}
      </span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ background: 'var(--bg-3)', padding: '0.875rem 0.75rem', borderRadius: 'var(--r)', textAlign: 'center', border: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: i === 1 ? 'var(--green)' : 'var(--cyan)', marginBottom: '0.25rem' }}>{m.val}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', lineHeight: 1.3 }}>{m.label}</div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 'auto', paddingLeft: '1rem', borderLeft: '2px solid var(--cyan-glow)' }}>
      <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.65 }}>"{quote}"</p>
    </div>
  </motion.div>
);

const Results = ({ onOpenModal }) => (
  <section id="results" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// RESULTS</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          Numbers don't lie.{' '}
          <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>Here's what we've built.</span>
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', maxWidth: '600px', lineHeight: 1.7 }}>
          Across health coaches, wellness leaders, consultants, and course creators — here's what happens when the full growth engine runs together.
        </p>
      </motion.div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r2)', overflow: 'hidden', marginBottom: '3.5rem' }} className="results-stats">
        {[
          { val: 20,    suffix: '+',  label: 'Brands grown',         color: 'var(--cyan)' },
          { val: 3.8,   suffix: 'x',  label: 'Average ROAS',         color: 'var(--green)' },
          { val: 10000, suffix: '+',  label: 'Leads generated',       color: 'var(--cyan)' },
          { val: 45,    prefix: '0-', label: 'Days to first results', color: 'var(--green)' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '1.75rem 1.5rem', textAlign: 'center',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            background: 'var(--bg-2)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.65rem', fontWeight: 700, color: s.color, marginBottom: '0.35rem', textShadow: `0 0 16px ${s.color}40` }}>
              <AnimatedNumber value={s.val} suffix={s.suffix} prefix={s.prefix} />
            </div>
            <div className="mono" style={{ color: 'var(--text-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Case studies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '3.5rem' }} className="case-study-grid">
        <CaseCard name="Sneha Kapoor" title="Health Coach — Mumbai" category="Lead gen" tagColor="var(--cyan)" delay={0}
          metrics={[{ val:'8x', label:'Consultation bookings' }, { val:'1,800', label:'Leads in 45 days' }, { val:'₹18', label:'Cost per lead' }]}
          quote="Before GrowthApex I was getting 3 consultations a week. Now I have a waitlist. The entire system just works." />
        <CaseCard name="Rahul Sharma" title="Course Creator — Delhi" category="Performance" tagColor="var(--purple)" delay={0.07}
          metrics={[{ val:'4.2x', label:'ROAS on Meta ads' }, { val:'340%', label:'Revenue growth' }, { val:'60 days', label:'To breakeven' }]}
          quote="Our last launch was our biggest ever. The funnel they built converted better than anything we'd tried before." />
        <CaseCard name="Vikram Mehta" title="Wellness Coach — Bangalore" category="Full stack" tagColor="var(--green)" delay={0.14}
          metrics={[{ val:'12k', label:'Instagram growth' }, { val:'5x', label:'Engagement rate' }, { val:'22', label:'Bookings/week' }]}
          quote="From 3 bookings a week to 22 — and my content finally reflects the brand I always wanted." />
        <CaseCard name="Amit Verma" title="Business Consultant — Pune" category="Sales training" tagColor="var(--amber, #f59e0b)" delay={0.21}
          metrics={[{ val:'68%', label:'Close rate increase' }, { val:'3x', label:'Revenue in 90 days' }, { val:'Zero', label:'Leads wasted' }]}
          quote="The sales training alone was worth the entire investment. My team finally knows how to close." />
      </div>

      {/* Track record */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ background: 'var(--bg-2)', border: '1px solid var(--border-2)', borderRadius: 'var(--r2)', padding: '2.5rem 3rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}
        className="track-record"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
        <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// FOUNDING TEAM TRACK RECORD</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2vw,1.6rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
          Before GrowthApex — what our team has built.
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', maxWidth: '640px', lineHeight: 1.7, marginBottom: '2rem' }}>
          Our founders and core team members have collectively delivered these results across 20+ brands prior to GrowthApex.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }} className="track-stats">
          {[
            { val: '3x',      label: 'Avg lead flow growth for wellness brands' },
            { val: '₹2Cr+',   label: 'Revenue generated through funnels' },
            { val: '50+',     label: 'Campaigns managed across Meta & Google' },
            { val: '4.1x',    label: 'Average ROAS across ad campaigns' },
            { val: '15,000+', label: 'Total leads generated for clients' },
            { val: '100+',    label: 'Sales professionals trained' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: i % 2 === 0 ? 'var(--cyan)' : 'var(--green)', marginBottom: '0.35rem' }}>{s.val}</div>
              <div style={{ color: 'var(--text-2)', fontSize: '0.82rem', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap', padding: '2.5rem 3rem',
          background: 'var(--bg-2)', border: '1px solid var(--border-2)',
          borderRadius: 'var(--r2)', position: 'relative', overflow: 'hidden',
        }}
        className="results-cta"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
        <div>
          <span className="mono-accent" style={{ display: 'block', marginBottom: '0.5rem' }}>// WANT RESULTS LIKE THESE?</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2vw,1.6rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.35rem' }}>See if your business qualifies.</h3>
          <p style={{ color: 'var(--text-2)', fontSize: '0.88rem' }}>We only take on clients we're confident we can grow.</p>
        </div>
        <button onClick={onOpenModal} className="btn btn-cyber" style={{ padding: '0.875rem 2rem', flexShrink: 0 }}>
          Book a free growth audit
        </button>
      </motion.div>
    </div>

    <style>{`
      @media(max-width:900px){.results-stats{grid-template-columns:1fr 1fr!important;}.case-study-grid{grid-template-columns:1fr!important;}.results-cta{flex-direction:column!important;padding:2rem 1.5rem!important;}.results-cta button{width:100%!important;}.track-record{padding:2rem 1.5rem!important;}}
      @media(max-width:600px){.results-stats{grid-template-columns:1fr!important;}.track-stats{grid-template-columns:1fr!important;}}
    `}</style>
  </section>
);

export default Results;
