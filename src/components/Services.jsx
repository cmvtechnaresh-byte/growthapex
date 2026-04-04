import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Monitor, LayoutGrid, PhoneCall, Users, Search, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, desc, features, icon: Icon, isPopular = false, color = "#04BE96", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay }}
    whileHover={{ 
      y: -8, 
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
      boxShadow: isPopular ? '0 20px 50px rgba(22, 78, 170, 0.2)' : '0 20px 40px rgba(0,0,0,0.3)',
      transition: { duration: 0.2 }
    }}
    style={{
      background: '#1f2937', 
      padding: '2.5rem',
      borderRadius: '1.5rem',
      border: isPopular ? `2px solid #164EAA` : '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'default'
    }}
  >
    {isPopular && (
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          top: '-14px',
          left: '20px',
          background: '#164EAA',
          color: '#ffffff',
          padding: '4px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          zIndex: 2
        }}
      >
        Most popular
      </motion.div>
    )}

    <motion.div 
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.3 }}
      style={{
        width: '48px', height: '48px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#ffffff',
        marginBottom: '1.5rem',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Icon size={24} />
    </motion.div>

    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>{title}</h3>
    <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>{desc}</p>

    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {features.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
          {f}
        </div>
      ))}
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <section id="services" style={{ background: '#111827', color: '#ffffff', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Accent */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(22, 78, 170, 0.05) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      <div className="container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ 
            display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(4, 190, 150, 0.1)', 
            borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, color: '#04BE96', marginBottom: '1.5rem',
            border: '1px solid rgba(4, 190, 150, 0.2)'
          }}>
            Our services
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-2px', lineHeight: 1.1 }}>
            Everything your growth needs. <br />
            Under one roof.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '850px', lineHeight: 1.7 }}>
            No more managing three vendors and five tools. We handle the full stack — <br />
            so you focus on your business while we build your growth engine.
          </p>
        </motion.div>

        {/* Top 2 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="service-grid">
          <ServiceCard 
            title="End-to-end social media"
            icon={Monitor}
            delay={0.1}
            desc="From content calendar to posting to community management — we run your social presence so it actually builds trust and drives enquiries."
            features={[
              "Monthly content calendar",
              "Reels, carousels & static posts",
              "Caption & hashtag strategy",
              "Community engagement",
              "Platform growth tracking"
            ]}
          />
          <ServiceCard 
            title="Performance marketing"
            isPopular={true}
            icon={Activity}
            color="#164EAA"
            delay={0.2}
            desc="Data-driven paid campaigns on Meta and Google built to convert — not just reach. Every rupee tracked, every result measured."
            features={[
              "Meta ads — Facebook & Instagram",
              "Google search & display",
              "Ad copy & creative strategy",
              "Weekly performance reports",
              "Continuous A/B optimisation"
            ]}
          />
        </div>

        {/* Middle 3 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }} className="service-grid-3">
          <ServiceCard 
            title="Funnel creation"
            icon={LayoutGrid}
            delay={0.3}
            desc="Landing pages, lead magnets, webinar funnels, and checkout flows — built to convert cold traffic into paying clients."
            features={[
              "Landing page design & copy",
              "Webinar & lead gen funnels",
              "Thank you & upsell pages",
              "Integration & testing"
            ]}
          />
          <ServiceCard 
            title="Lead nurturing"
            icon={PhoneCall}
            delay={0.4}
            desc="Automated WhatsApp and email sequences that follow up, build trust, and convert leads who didn't buy the first time."
            features={[
              "WhatsApp automation flows",
              "Email nurture sequences",
              "Re-engagement campaigns",
              "CRM setup & management"
            ]}
          />
          <ServiceCard 
            title="Sales team training"
            icon={Users}
            color="#164EAA"
            delay={0.5}
            desc="We train your closers to convert the leads we generate. Scripts, objection handling, and live coaching so nothing falls through the cracks."
            features={[
              "Sales script development",
              "Objection handling playbook",
              "Live mock call sessions",
              "Conversion tracking"
            ]}
          />
        </div>

        {/* Bottom Audit Card */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{
             background: 'rgba(255,255,255,0.02)',
             padding: '3rem',
             borderRadius: '1.5rem',
             border: '1px solid rgba(255,255,255,0.05)',
             display: 'grid',
             gridTemplateColumns: '1.2fr 1fr',
             gap: '4rem',
             alignItems: 'center',
             marginTop: '3.5rem'
           }}
           className="audit-row"
        >
           <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <motion.div 
                animate={{ 
                  boxShadow: ['0 0 0 0px rgba(239, 68, 68, 0.2)', '0 0 0 20px rgba(239, 68, 68, 0)', '0 0 0 0px rgba(239, 68, 68, 0)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  width: '60px', height: '60px', borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}
              >
                <Search size={28} />
              </motion.div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Growth leakage audit</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Most businesses are losing 40-60% of their potential revenue through invisible gaps — slow follow-ups, weak landing pages, untrained sales teams, broken funnels. We find every leak and fix it before spending another rupee on ads.
                </p>
              </div>
           </div>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {["Funnel gaps", "Follow-up failures", "Landing page drop-offs", "Sales conversion gaps"].map((tag, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, background: 'rgba(239, 68, 68, 0.15)' }}
                  style={{
                    padding: '8px 20px', borderRadius: '100px', background: 'rgba(239, 68, 68, 0.08)',
                    color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'default'
                  }}
                >
                  {tag}
                </motion.div>
              ))}
           </div>
        </motion.div>

        {/* Blue CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '6rem',
            background: 'linear-gradient(135deg, #164EAA 0%, #0c3c8a 100%)',
            borderRadius: '1.5rem',
            padding: '3.5rem 4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: '0 25px 60px rgba(22, 78, 170, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="cta-banner"
        >
          {/* Subtle Banner Shimmer */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              transform: 'skewX(-20deg)'
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.8, letterSpacing: '1px', marginBottom: '0.75rem' }}>
              NOT SURE WHERE TO START?
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: '0.75rem' }}>
              Start with a free growth audit.
            </h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              We'll identify exactly where your growth is leaking — at zero cost.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary" 
            style={{ 
              background: '#ffffff', color: '#164EAA', padding: '1.2rem 2.5rem', 
              fontSize: '1.05rem', fontWeight: 800, borderRadius: '1rem', border: 'none',
              position: 'relative', zIndex: 1, cursor: 'pointer'
            }}
          >
            Book your free audit <ArrowRight size={18} style={{ marginLeft: '0.75rem' }} />
          </motion.button>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .service-grid-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .service-grid, .service-grid-3, .audit-row { grid-template-columns: 1fr !important; }
          .cta-banner { flex-direction: column; text-align: center; padding: 3rem 2rem !important; }
          .cta-banner button { width: 100%; }
          .audit-row { gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;
