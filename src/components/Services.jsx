import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Target, Sparkles, Layers, MousePointer2, Zap, Cpu } from 'lucide-react';
import socialMediaImg from '../assets/social_media_3d.png';
import paidAdsImg from '../assets/paid_ads_3d.png';
import contentImg from '../assets/content_creation_3d.png';
import strategyImg from '../assets/strategy_3d.png';
import funnelImg from '../assets/results_3d.png';
import automationImg from '../assets/automation_3d.png';

const mainServices = [
  {
    title: "Full-Stack Social Media Management",
    desc: "End-to-end handling of your brand presence on major platforms.",
    features: ["Content strategy & planning", "Script writing & storytelling", "High-quality video editing", "Consistent posting", "Performance tracking & reporting"],
    image: socialMediaImg,
    icon: <Sparkles size={24} />
  },
  {
    title: "Performance Marketing (Paid Ads)",
    desc: "Drive targeted traffic and high-ROI conversions through paid channels.",
    features: ["Meta & Google Ads campaigns", "Advanced audience targeting", "Funnel-based ad strategies", "ROI-focused scaling"],
    image: paidAdsImg,
    icon: <Target size={24} />
  },
  {
    title: "High-Converting Content Creation",
    desc: "Content that doesn’t just look good — it sells and builds authority.",
    features: ["Hook-based scripting", "Short-form & long-form videos", "Conversion-driven creatives", "Personal brand content systems"],
    image: contentImg,
    icon: <Zap size={24} />
  }
];

const otherServices = [
  {
    title: "Strategic Funnel & Offer Creation",
    desc: "Offer structuring, pricing strategy, and sales funnel architecture.",
    features: ["Offer & pricing strategy", "Marketing architecture", "Lead magnets"],
    icon: <Layers size={20} />,
    image: strategyImg
  },
  {
    title: "High-Converting Landing Pages",
    desc: "Custom-designed pages optimized for UI/UX and messaging.",
    features: ["Custom design", "Optimized UI/UX", "Action-driven copy"],
    icon: <MousePointer2 size={20} />,
    image: funnelImg
  },
  {
    title: "Lead Nurturing & Automation",
    desc: "WhatsApp, email, and webinar automation to close more leads.",
    features: ["WhatsApp & Email automation", "Webinar systems", "Lead follow-up flows"],
    icon: <Zap size={20} />,
    image: automationImg
  },
  {
    title: "AI-Powered Content & Editing",
    desc: "Scalable content systems using AI avatars and premium production.",
    features: ["AI avatars & voice cloning", "4K premium production", "Scalable systems"],
    icon: <Cpu size={20} />,
    image: socialMediaImg
  }
];

const Services = () => {
  return (
    <section className="section" id="services" style={{ background: 'var(--bg-color)' }}>
      <div className="container">

        <div style={{ marginBottom: '5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--primary)' }}>*</span> OUR SERVICES
          </div>
          <h2 className="heading-xl" style={{ fontWeight: 700, lineHeight: 1.1, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            One Ecosystem. <br /> <span className="text-gradient-primary">Unlimited Growth.</span>
          </h2>
        </div>

        {/* Main Services — Row 1: 2 cards side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="services-row-1">
          {mainServices.slice(0, 2).map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '2rem',
                padding: '2.75rem',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top red accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.5 }} />

              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(224,32,53,0.12)', border: '1px solid rgba(224,32,53,0.2)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.75rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
              <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>{service.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {service.features.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: '#94a3b8', fontSize: '0.95rem' }}>
                    <Check size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} strokeWidth={3} /> {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Services — Row 2: 3rd card full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '2rem',
            padding: '2.75rem 3rem',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            marginBottom: '6rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="services-row-2"
        >
          {/* Top red accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary) 30%, var(--primary) 70%, transparent)', opacity: 0.5 }} />

          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(224,32,53,0.12)', border: '1px solid rgba(224,32,53,0.2)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
              {mainServices[2].icon}
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{mainServices[2].title}</h3>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.7 }}>{mainServices[2].desc}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {mainServices[2].features.map((f, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: '#94a3b8', fontSize: '1rem' }}>
                <Check size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} strokeWidth={3} /> {f}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Other Services (Grid) */}
        <div style={{ marginTop: '8rem' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--primary)' }}>*</span> OUR OTHER SERVICES
            </div>
            <h2 className="heading-md" style={{ fontWeight: 800, marginTop: '0.75rem' }}>
              Complementary <span className="text-primary">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
            {otherServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  padding: '2.25rem 2rem',
                  borderRadius: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                  opacity: 0.6,
                }} />

                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(224,32,53,0.12)',
                  border: '1px solid rgba(224,32,53,0.2)',
                  color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  {s.icon}
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {s.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {s.features.map((f, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
                      <Check size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
         @media (max-width: 900px) {
           .services-row-1 { grid-template-columns: 1fr !important; }
           .services-row-2 { grid-template-columns: 1fr !important; gap: 2rem !important; }
           .services-row-2 > div:last-child { padding-left: 0 !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 2rem !important; }
         }
      `}</style>
    </section>
  );
};

export default Services;
