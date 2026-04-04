import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, GraduationCap, Briefcase, Sparkles, HelpCircle } from 'lucide-react';

const NicheCard = ({ icon: Icon, title, subtitle, pain, solution, isDark = false, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: isDark ? '1px solid #164EAA' : '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}
  >
    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem' }}>
      <div style={{ 
        width: '56px', height: '56px', borderRadius: '12px', 
        background: '#ffffff', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        color: '#164EAA', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Icon size={28} />
      </div>
      <div>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>{title}</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.4 }}>{subtitle}</p>
      </div>
    </div>

    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem', flex: 1 }}>
      <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
        THE PAIN
      </div>
      <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
        {pain}
      </p>
    </div>

    <div style={{ background: 'rgba(4, 190, 150, 0.08)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(4, 190, 150, 0.1)' }}>
      <div style={{ color: '#04BE96', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
        WHAT WE DO
      </div>
      <p style={{ color: '#04BE96', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 }}>
        {solution}
      </p>
    </div>
  </motion.div>
);

const Niches = () => {
  return (
    <section id="niches" style={{ background: '#111827', color: '#ffffff', padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      
      <div className="container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '6rem' }}
        >
          <div style={{ 
            display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(4, 190, 150, 0.1)', 
            borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, color: '#04BE96', marginBottom: '1.5rem',
            border: '1px solid rgba(4, 190, 150, 0.2)'
          }}>
            Who we work with
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-2.5px', lineHeight: 1.1 }}>
            If you sell your expertise — we know <br />
            exactly how to grow you.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '850px', lineHeight: 1.7 }}>
            We've built growth engines for coaches, consultants, wellness leaders, and <br />
            course creators across India. Here's what we see in each niche — and what we do about it.
          </p>
        </motion.div>

        {/* Niche Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '6rem' }} className="niche-grid">
          <NicheCard 
            icon={Heart}
            title="Health & wellness coaches"
            subtitle="Nutritionists, fitness coaches, holistic wellness"
            pain="You're an expert at transforming lives but your calendar is half empty. You post consistently, boost a few ads, and still struggle to fill your consultation slots week after week."
            solution="We build a lead machine that fills your calendar with qualified prospects — people already sold on working with you before they even book a call."
          />
          <NicheCard 
            icon={Users}
            title="Herbalife & network marketing leaders"
            subtitle="Top distributors, President's team, GET team"
            isDark={true}
            pain="Your downline isn't growing fast enough. Event attendance is inconsistent. You're spending hours on WhatsApp follow-ups that go nowhere — and traditional marketing feels off-brand."
            solution="We build targeted recruitment funnels and event promotion systems that grow your team organically — without the pushy sales feel that turns quality prospects away."
          />
          <NicheCard 
            icon={GraduationCap}
            title="Course creators & educators"
            subtitle="Online courses, masterclasses, cohort programs"
            pain="You've built an incredible course but every launch feels like starting from zero. Ad costs are rising, webinar show-up rates are dropping, and your email list isn't converting the way it should."
            solution="We engineer your entire launch system — from cold audience to enrolled student. Ads, webinar funnels, email sequences, and nurturing — all connected and optimised for maximum enrollments."
          />
          <NicheCard 
            icon={Briefcase}
            title="Business & life consultants"
            subtitle="Strategy consultants, coaches, advisors"
            pain="Most of your clients come from referrals — which is great until it isn't. You have no predictable lead pipeline and your digital presence doesn't reflect the premium value you actually deliver."
            solution="We build your authority online and create a consistent inbound pipeline — so you stop depending on referrals and start attracting high-ticket clients on demand."
          />
          <NicheCard 
            icon={Sparkles}
            title="Spiritual coaches & gurus"
            subtitle="Meditation, mindfulness, spiritual healing"
            isDark={true}
            pain="Your work is deeply transformational but marketing it feels inauthentic. You've avoided aggressive selling — and as a result your reach stays small despite the massive impact you create."
            solution="We craft heart-led marketing that feels true to your message — growing your audience and filling your programs without ever compromising the integrity of your work."
          />
          <NicheCard 
            icon={HelpCircle}
            title="Don't see your niche here?"
            subtitle="If you sell knowledge or expertise — we can grow you"
            pain="Every knowledge-based business faces the same core problem — exceptional expertise that isn't reaching enough of the right people, consistently enough, to build real revenue."
            solution="If you sell your expertise in any form — we audit your growth, identify the gaps, and build the engine to scale it. Book a free audit and let's find out if we're the right fit."
          />
        </div>

        {/* Founder Note Block */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{
             background: '#0c3c8a',
             borderRadius: '2rem',
             padding: '4rem',
             position: 'relative',
             overflow: 'hidden'
           }}
           className="founder-note"
        >
          <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
             <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
               A NOTE FROM OUR FOUNDER
             </p>
             <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.3, color: '#ffffff' }}>
               "I built GrowthApex because I kept seeing the same thing — brilliant coaches and creators being let down by agencies that didn't understand their world."
             </h3>
             <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                We don't treat your business like a generic ad account. We understand the nuance of selling expertise, building trust, and converting an audience that needs to believe in YOU before they buy. That's exactly the gap we fill.
             </p>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', background: '#164EAA', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', border: '2px solid rgba(255,255,255,0.1)'
                }}> S </div>
                <div>
                   <h5 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>Surya</h5>
                   <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontWeight: 700 }}>Founder & Growth Strategist — GrowthApex</p>
                </div>
             </div>
          </div>

          <button style={{
            position: 'absolute', right: '4rem', top: '50%', transform: 'translateY(-50%)',
            background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)',
            padding: '1.2rem 2.5rem', borderRadius: '1rem', fontWeight: 800, fontSize: '1.05rem',
            cursor: 'pointer', transition: 'all 0.2s'
          }} className="btn-founder-cta">
            Book a free audit
          </button>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .niche-grid { grid-template-columns: 1fr !important; }
          .founder-note { padding: 3rem 2rem !important; }
          .founder-note button { position: static !important; transform: none !important; margin-top: 3rem; width: 100%; }
        }
        .btn-founder-cta:hover {
          background: #ffffff !important;
          color: #164EAA !important;
          border-color: #ffffff !important;
        }
      `}</style>
    </section>
  );
};

export default Niches;
