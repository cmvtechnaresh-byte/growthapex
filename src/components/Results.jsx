import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Trophy, TrendingUp, Users, Target } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "", prefix = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
};

const CaseStudyCard = ({ name, title, category, metrics, quote, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
      <div>
        <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>{name}</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{title}</p>
      </div>
      <div style={{ 
        padding: '6px 16px', borderRadius: '100px', background: 'rgba(4, 190, 150, 0.1)', 
        color: '#04BE96', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' 
      }}>
        {category}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: i === 1 ? '#04BE96' : '#164EAA', marginBottom: '0.25rem' }}>{m.val}</div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, lineHeight: 1.2 }}>{m.label}</div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 'auto', paddingLeft: '1.5rem', borderLeft: '2px solid #04BE96' }}>
      <p style={{ color: '#f8fafc', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.6 }}>
        "{quote}"
      </p>
    </div>
  </motion.div>
);

const Results = () => {
  return (
    <section id="results" style={{ background: '#111827', color: '#ffffff', padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(22, 78, 170, 0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <div style={{ 
            display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(4, 190, 150, 0.1)', 
            borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, color: '#04BE96', marginBottom: '1.5rem',
            border: '1px solid rgba(4, 190, 150, 0.2)'
          }}>
            Results
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-2.5px', lineHeight: 1.1 }}>
            Numbers don't lie. <br />
            Here's what we've built.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: 1.7 }}>
            Across health coaches, wellness leaders, consultants, and course creators — <br />
            here's what happens when the full growth engine runs together.
          </p>
        </motion.div>

        {/* Global Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '8rem', textAlign: 'center' }} className="results-stats">
          {[
            { val: 20, suffix: "+", label: "Brands grown by our team", color: '#164EAA' },
            { val: 3.8, suffix: "x", label: "Average ROAS delivered", color: '#04BE96' },
            { val: 10000, suffix: "+", label: "Leads generated total", color: '#164EAA' },
            { val: 45, prefix: "0-", label: "Days to first results", color: '#04BE96' }
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: s.color, marginBottom: '0.5rem' }}>
                <AnimatedNumber value={s.val} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', opacity: 0.9 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Case Study Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }} className="case-study-grid">
          <CaseStudyCard 
            name="Sneha Kapoor"
            title="Health Coach — Mumbai"
            category="Lead generation"
            metrics={[
              { val: "8x", label: "Consultation bookings" },
              { val: "1,800", label: "Leads in 45 days" },
              { val: "₹18", label: "Cost per lead" }
            ]}
            quote="Before GrowthApex I was getting 3 consultations a week. Now I have a waitlist. The entire system just works."
          />
          <CaseStudyCard 
            name="Rahul Sharma"
            title="Course Creator — Delhi"
            category="Performance marketing"
            delay={0.1}
            metrics={[
              { val: "4.2x", label: "ROAS on Meta ads" },
              { val: "340%", label: "Revenue growth" },
              { val: "60 days", label: "To breakeven" }
            ]}
            quote="Our last launch was our biggest ever. The funnel they built converted better than anything we'd tried before."
          />
          <CaseStudyCard 
            name="Vikram Mehta"
            title="Wellness Coach — Bangalore"
            category="Full stack"
            metrics={[
              { val: "12k", label: "Instagram growth" },
              { val: "5x", label: "Engagement rate" },
              { val: "22", label: "Bookings per week" }
            ]}
            quote="From 3 bookings a week to 22 — and my content finally reflects the brand I always wanted."
          />
          <CaseStudyCard 
            name="Amit Verma"
            title="Business Consultant — Pune"
            category="Sales training"
            delay={0.1}
            metrics={[
              { val: "68%", label: "Close rate increase" },
              { val: "3x", label: "Revenue in 90 days" },
              { val: "Zero", label: "Leads wasted" }
            ]}
            quote="The sales training alone was worth the entire investment. My team finally knows how to close."
          />
        </div>

        {/* Team Track Record Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(rgba(22, 78, 170, 0.05), rgba(22, 78, 170, 0.1))',
            borderRadius: '2rem',
            padding: '4rem',
            marginTop: '6rem',
            border: '1px solid rgba(22, 78, 170, 0.2)'
          }}
          className="track-record"
        >
          <div style={{ marginBottom: '3rem' }}>
            <h4 style={{ color: '#164EAA', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
              FOUNDING TEAM TRACK RECORD
            </h4>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Before GrowthApex — what our team has built.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>
              Our founders and core team members have collectively delivered these results across 20+ brands prior to GrowthApex.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="track-stats">
            {[
              { val: "3x", label: "Avg lead flow growth for wellness brands" },
              { val: "₹2Cr+", label: "Revenue generated through funnels" },
              { val: "50+", label: "Campaigns managed across Meta & Google" },
              { val: "4.1x", label: "Average ROAS across ad campaigns" },
              { val: "15,000+", label: "Total leads generated for clients" },
              { val: "100+", label: "Sales professionals trained" }
            ].map((s, i) => (
              <div key={i} style={{ 
                background: '#ffffff', padding: '2rem', borderRadius: '1.2rem', 
                border: '1px solid rgba(22, 78, 170, 0.1)', flex: 1 
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#164EAA', marginBottom: '0.5rem' }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '6rem',
            background: '#0c3c8a',
            borderRadius: '1.5rem',
            padding: '3rem 4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem'
          }}
          className="results-cta"
        >
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              WANT RESULTS LIKE THESE?
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
              See if your business qualifies.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
              We only take on clients we're confident we can grow.
            </p>
          </div>
          <button style={{
            background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)',
            padding: '1.2rem 2.5rem', borderRadius: '1rem', fontWeight: 800, fontSize: '1.05rem',
            cursor: 'pointer', transition: 'all 0.2s'
          }} className="btn-outline-hover">
            Book a free growth audit
          </button>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .track-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .results-stats { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; }
          .case-study-grid { grid-template-columns: 1fr !important; }
          .results-cta { flex-direction: column; text-align: center; padding: 3rem 2rem !important; }
          .results-cta button { width: 100%; }
        }
        @media (max-width: 600px) {
          .results-stats { grid-template-columns: 1fr !important; }
          .track-stats { grid-template-columns: 1fr !important; }
          .track-record { padding: 2.5rem 1.5rem !important; }
        }
        .btn-outline-hover:hover {
          background: #ffffff !important;
          color: #164EAA !important;
          border-color: #ffffff !important;
        }
      `}</style>
    </section>
  );
};

export default Results;
