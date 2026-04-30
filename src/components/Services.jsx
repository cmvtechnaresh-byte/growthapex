import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Monitor, LayoutGrid, PhoneCall, Users, Search, Plus, Minus } from 'lucide-react';
// cyber-styled services section

const SERVICES = [
  {
    id: 1,
    Icon: Monitor,
    title: 'End-to-end social media',
    tag: 'Social',
    tagColor: '#a78bfa',
    desc: 'From content calendar to posting to community management — we run your social presence so it actually builds trust and drives enquiries.',
    features: ['Monthly content calendar', 'Reels, carousels & static posts', 'Caption & hashtag strategy', 'Community engagement', 'Platform growth tracking'],
  },
  {
    id: 2,
    Icon: Activity,
    title: 'Performance marketing',
    tag: 'Ads',
    tagColor: '#3b7eed',
    popular: true,
    desc: 'Data-driven paid campaigns on Meta and Google built to convert — not just reach. Every rupee tracked, every result measured.',
    features: ['Meta ads — Facebook & Instagram', 'Google search & display', 'Ad copy & creative strategy', 'Weekly performance reports', 'Continuous A/B optimisation'],
  },
  {
    id: 3,
    Icon: LayoutGrid,
    title: 'Funnel creation',
    tag: 'Funnels',
    tagColor: '#f59e0b',
    desc: 'Landing pages, lead magnets, webinar funnels, and checkout flows — built to convert cold traffic into paying clients.',
    features: ['Landing page design & copy', 'Webinar & lead gen funnels', 'Thank you & upsell pages', 'Integration & testing'],
  },
  {
    id: 4,
    Icon: PhoneCall,
    title: 'Lead nurturing',
    tag: 'CRM',
    tagColor: '#22c55e',
    desc: 'Automated WhatsApp and email sequences that follow up, build trust, and convert leads who didn\'t buy the first time.',
    features: ['WhatsApp automation flows', 'Email nurture sequences', 'Re-engagement campaigns', 'CRM setup & management'],
  },
  {
    id: 5,
    Icon: Users,
    title: 'Sales team training',
    tag: 'Training',
    tagColor: '#f87171',
    desc: 'We train your closers to convert the leads we generate. Scripts, objection handling, and live coaching so nothing falls through the cracks.',
    features: ['Sales script development', 'Objection handling playbook', 'Live mock call sessions', 'Conversion tracking'],
  },
  {
    id: 6,
    Icon: Search,
    title: 'Growth leakage audit',
    tag: 'Audit',
    tagColor: '#fb923c',
    desc: 'Most businesses lose 40–60% of potential revenue through invisible gaps. We find every leak and fix it before spending another rupee on ads.',
    features: ['Funnel gap analysis', 'Follow-up failure detection', 'Landing page review', 'Sales conversion gaps'],
  },
];

const ServiceRow = ({ service, isOpen, onToggle }) => (
  <div style={{ borderBottom: '1px solid var(--border)' }}>
    <button
      onClick={onToggle}
      style={{
        width: '100%', background: 'none', border: 'none',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        padding: '1.5rem 0', cursor: 'pointer',
        textAlign: 'left',
        transition: 'opacity 0.15s',
      }}
      onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
      onMouseOut={e  => (e.currentTarget.style.opacity = '1')}
    >
      {/* Number */}
      <span style={{ fontFamily:'var(--font-display)', fontSize:'0.7rem', fontWeight:700, color:'var(--text-3)', letterSpacing:'0.08em', width:'24px', flexShrink:0 }}>
        0{service.id}
      </span>

      {/* Icon */}
      <div style={{
        width:'38px', height:'38px', borderRadius:'var(--radius)',
        background: isOpen ? service.tagColor + '18' : 'var(--surface)',
        border: `1px solid ${isOpen ? service.tagColor + '30' : 'var(--border)'}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        color: isOpen ? service.tagColor : 'var(--text-2)',
        flexShrink: 0, transition:'all 0.2s',
      }}>
        <service.Icon size={17}/>
      </div>

      {/* Title */}
      <span style={{
        flex:1, fontFamily:'var(--font-display)',
        fontSize:'clamp(1rem,2vw,1.2rem)', fontWeight:700,
        letterSpacing:'-0.02em', color:'var(--text-1)',
      }}>
        {service.title}
        {service.popular && (
          <span style={{
            marginLeft:'0.75rem', fontSize:'0.65rem', fontWeight:700,
            padding:'0.2rem 0.6rem', borderRadius:'4px',
            background:'rgba(59,126,237,0.12)', color:'var(--blue)',
            letterSpacing:'0.06em', textTransform:'uppercase', verticalAlign:'middle',
          }}>
            Popular
          </span>
        )}
      </span>

      {/* Tag */}
      <span style={{
        fontSize:'0.72rem', fontWeight:600, color:service.tagColor,
        letterSpacing:'0.08em', textTransform:'uppercase',
        display:'none', // hidden on mobile, shown on desktop
        padding:'0.25rem 0.75rem', borderRadius:'4px',
        background: service.tagColor + '12',
      }} className="svc-tag">
        {service.tag}
      </span>

      {/* Toggle */}
      <span style={{ color:'var(--text-3)', flexShrink:0, transition:'transform 0.2s', transform: isOpen ? 'rotate(0)' : 'rotate(0)' }}>
        {isOpen ? <Minus size={16}/> : <Plus size={16}/>}
      </span>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height:0, opacity:0 }}
          animate={{ height:'auto', opacity:1 }}
          exit={{ height:0, opacity:0 }}
          transition={{ duration:0.25, ease:'easeInOut' }}
          style={{ overflow:'hidden' }}
        >
          <div style={{
            paddingLeft: 'calc(24px + 38px + 3rem)',
            paddingBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
          }} className="svc-body">
            <p style={{ color:'var(--text-2)', fontSize:'0.9rem', lineHeight:1.75, letterSpacing:'-0.01em' }}>
              {service.desc}
            </p>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
              {service.features.map((f, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontSize:'0.85rem', color:'var(--text-2)' }}>
                  <span style={{ width:4, height:4, borderRadius:'50%', background:service.tagColor, flexShrink:0 }}/>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Services = () => {
  const [open, setOpen] = useState(2); // default open: Performance marketing

  return (
    <section id="services" style={{ background:'var(--black)', color:'var(--text-1)', padding:'6rem 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.55 }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap', marginBottom:'3.5rem' }}
        >
          <div>
            <span className="mono-accent" style={{ display:'block', marginBottom:'0.875rem' }}>// OUR SERVICES</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Everything your growth needs.{' '}
              <span style={{ color:'var(--text-2)', fontWeight:600 }}>Under one roof.</span>
            </h2>
          </div>
          <p style={{ maxWidth:'340px', color:'var(--text-2)', fontSize:'0.9rem', lineHeight:1.7 }}>
            No more managing three vendors and five tools. We handle the full stack — so you focus on your business while we build your growth engine.
          </p>
        </motion.div>

        {/* Service list */}
        <div style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
          {SERVICES.map(svc => (
            <ServiceRow
              key={svc.id}
              service={svc}
              isOpen={open === svc.id}
              onToggle={() => setOpen(open === svc.id ? null : svc.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          style={{
            marginTop: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            padding: '2.5rem',
            background: 'var(--bg-2)',
            borderRadius: 'var(--r2)',
            border: '1px solid var(--border-2)',
            boxShadow: '0 0 40px rgba(34,211,238,0.04)',
          }}
          className="cta-banner"
        >
          <div>
            <span className="mono-accent" style={{ display:'block', marginBottom:'0.5rem' }}>// NOT SURE WHERE TO START?</span>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.3rem,2.5vw,1.8rem)', fontWeight:800, letterSpacing:'-0.025em' }}>
              Start with a free growth audit.
            </h3>
            <p style={{ color:'var(--text-2)', fontSize:'0.9rem', marginTop:'0.5rem' }}>
              We'll identify exactly where your growth is leaking — at zero cost.
            </p>
          </div>
          <button
            className="btn btn-cyber"
            style={{ padding:'0.9rem 2rem', fontSize:'0.92rem', flexShrink:0 }}
          >
            Book your free audit
          </button>
        </motion.div>
      </div>

      <style>{`
        @media(min-width:768px){.svc-tag{display:inline-block!important;}}
        @media(max-width:600px){.svc-body{grid-template-columns:1fr!important;padding-left:0!important;}}
      `}</style>
    </section>
  );
};

export default Services;
