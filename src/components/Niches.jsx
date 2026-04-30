import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, GraduationCap, Briefcase, Sparkles, HelpCircle } from 'lucide-react';

const NicheCard = ({ icon: Icon, title, subtitle, pain, solution, accent = false, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: 'var(--bg-2)',
      border: accent ? '1px solid var(--border-2)' : '1px solid var(--border)',
      borderRadius: 'var(--r2)',
      padding: '2rem',
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
    whileHover={{ boxShadow: '0 0 24px rgba(34,211,238,0.06)' }}
  >
    {accent && (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
    )}

    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: 'var(--r)',
        background: accent ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.05)',
        border: accent ? '1px solid var(--border-2)' : '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        color: accent ? 'var(--cyan)' : 'var(--text-2)',
      }}>
        <Icon size={18} />
      </div>
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.2rem', letterSpacing: '-0.02em' }}>{title}</h4>
        <p style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>{subtitle}</p>
      </div>
    </div>

    <div style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.1)', padding: '1rem 1.25rem', borderRadius: 'var(--r)', marginBottom: '0.75rem', flex: 1 }}>
      <div style={{ color: '#f87171', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
        The Pain
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: '0.83rem', lineHeight: 1.65 }}>{pain}</p>
    </div>

    <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.12)', padding: '1rem 1.25rem', borderRadius: 'var(--r)' }}>
      <div style={{ color: 'var(--green)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
        What We Do
      </div>
      <p style={{ color: 'var(--green)', fontSize: '0.83rem', fontWeight: 500, lineHeight: 1.6 }}>{solution}</p>
    </div>
  </motion.div>
);

const Niches = ({ onOpenModal }) => (
  <section id="niches" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// WHO WE WORK WITH</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          If you sell your expertise —{' '}
          <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>we know exactly how to grow you.</span>
        </h2>
        <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', maxWidth: '600px', lineHeight: 1.7 }}>
          We've built growth engines for coaches, consultants, wellness leaders, and course creators across India. Here's what we see in each niche — and what we do about it.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '3.5rem' }} className="niche-grid">
        <NicheCard
          icon={Heart} delay={0}
          title="Health & wellness coaches"
          subtitle="Nutritionists, fitness coaches, holistic wellness"
          pain="You're an expert at transforming lives but your calendar is half empty. You post consistently, boost a few ads, and still struggle to fill your consultation slots week after week."
          solution="We build a lead machine that fills your calendar with qualified prospects — people already sold on working with you before they even book a call."
        />
        <NicheCard
          icon={Users} delay={0.07} accent
          title="Herbalife & network marketing leaders"
          subtitle="Top distributors, President's team, GET team"
          pain="Your downline isn't growing fast enough. Event attendance is inconsistent. You're spending hours on WhatsApp follow-ups that go nowhere — and traditional marketing feels off-brand."
          solution="We build targeted recruitment funnels and event promotion systems that grow your team organically — without the pushy sales feel that turns quality prospects away."
        />
        <NicheCard
          icon={GraduationCap} delay={0.14}
          title="Course creators & educators"
          subtitle="Online courses, masterclasses, cohort programs"
          pain="You've built an incredible course but every launch feels like starting from zero. Ad costs are rising, webinar show-up rates are dropping, and your email list isn't converting."
          solution="We engineer your entire launch system — from cold audience to enrolled student. Ads, webinar funnels, email sequences — all connected and optimised for maximum enrollments."
        />
        <NicheCard
          icon={Briefcase} delay={0.21}
          title="Business & life consultants"
          subtitle="Strategy consultants, coaches, advisors"
          pain="Most of your clients come from referrals — which is great until it isn't. You have no predictable lead pipeline and your digital presence doesn't reflect the premium value you deliver."
          solution="We build your authority online and create a consistent inbound pipeline — so you stop depending on referrals and start attracting high-ticket clients on demand."
        />
        <NicheCard
          icon={Sparkles} delay={0.28} accent
          title="Spiritual coaches & gurus"
          subtitle="Meditation, mindfulness, spiritual healing"
          pain="Your work is deeply transformational but marketing it feels inauthentic. You've avoided aggressive selling — and as a result your reach stays small despite the massive impact you create."
          solution="We craft heart-led marketing that feels true to your message — growing your audience and filling your programs without ever compromising the integrity of your work."
        />
        <NicheCard
          icon={HelpCircle} delay={0.35}
          title="Don't see your niche here?"
          subtitle="If you sell knowledge or expertise — we can grow you"
          pain="Every knowledge-based business faces the same core problem — exceptional expertise that isn't reaching enough of the right people, consistently enough, to build real revenue."
          solution="If you sell your expertise in any form — we audit your growth, identify the gaps, and build the engine to scale it. Book a free audit and let's find out if we're the right fit."
        />
      </div>

      {/* Founder note */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'var(--bg-2)', border: '1px solid var(--border-2)',
          borderRadius: 'var(--r2)', padding: '2.5rem 3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2.5rem', flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
        }}
        className="founder-note"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)' }} />
        <div style={{ maxWidth: '640px' }}>
          <span className="mono-accent" style={{ display: 'block', marginBottom: '0.875rem' }}>// FROM OUR FOUNDER</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.4, letterSpacing: '-0.02em' }}>
            "I built GrowthApex because I kept seeing the same thing — brilliant coaches and creators being let down by agencies that didn't understand their world."
          </h3>
          <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            We don't treat your business like a generic ad account. We understand the nuance of selling expertise, building trust, and converting an audience that needs to believe in YOU before they buy. That's exactly the gap we fill.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan-dim)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700 }}>S</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-1)' }}>Surya</p>
              <p style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>Founder & Growth Strategist — GrowthApex</p>
            </div>
          </div>
        </div>
        <button onClick={onOpenModal} className="btn btn-cyber" style={{ flexShrink: 0, padding: '0.875rem 2rem' }}>
          Book a free audit
        </button>
      </motion.div>
    </div>

    <style>{`
      @media(max-width:900px){.niche-grid{grid-template-columns:1fr!important;}.founder-note{flex-direction:column!important;padding:2rem 1.5rem!important;}.founder-note button{width:100%!important;}}
    `}</style>
  </section>
);

export default Niches;
