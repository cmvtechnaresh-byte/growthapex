import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Check, Filter, Bot } from 'lucide-react';

const serviceData = [
  {
    icon: <span style={{ fontSize: '2.5rem', lineHeight: 1, filter: 'drop-shadow(0px 8px 16px rgba(162, 21, 39, 0.25))', display: 'inline-block' }}>🚀</span>,
    title: "Lead Generation",
    desc: "Acquire high-intent leads through Meta Ads, Google Ads, YouTube Ads, and advanced targeting systems designed for businesses, brands, service providers, and digital companies.",
    features: ["High-intent targeting", "Conversion-focused ads"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <span style={{ fontSize: '2.5rem', lineHeight: 1, filter: 'drop-shadow(0px 8px 16px rgba(162, 21, 39, 0.25))', display: 'inline-block' }}>📈</span>,
    title: "Sales Funnels",
    desc: "We build persuasive, high-converting landing pages and complete funnel systems that guide prospects from first click to qualified leads, bookings, or sales.",
    features: ["Webinar & booking funnels", "Conversion-driven flow"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <span style={{ fontSize: '2.5rem', lineHeight: 1, filter: 'drop-shadow(0px 8px 16px rgba(162, 21, 39, 0.25))', display: 'inline-block' }}>🤖</span>,
    title: "Automations",
    desc: "Automate your marketing and customer touchpoints using email, SMS, WhatsApp, outbound calls, and internal workflows to improve conversions and reduce manual effort.",
    features: ["Lead nurturing systems", "Show-up & follow-ups"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  }
];

const Services = () => {
  return (
    <section className="section" id="services">
      <div className="container">
        
        {/* Top Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div 
            className="badge" 
            style={{ marginBottom: '1.5rem', fontWeight: 700 }}
          >
            * OUR SERVICES
          </div>
          
          <h2 
            className="heading-xl" 
            style={{ 
              lineHeight: 1.1, 
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'
            }}
          >
            Smart digital solutions <br/> 
            for <span style={{ fontStyle: 'italic' }} className="text-primary">business growth</span>
          </h2>
        </div>

        {/* Feature Cards Grid (Vertical Stack) */}
        <div className="flex-col gap-8">
          {serviceData.map((service, i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                padding: '1rem',
                overflow: 'hidden'
              }}
              className="grid grid-2 gap-8 items-center"
            >
              
              {/* Card Left: Copy & Icon */}
              <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{ 
                    display: 'inline-flex', 
                    padding: '1rem', 
                    borderRadius: '1rem', 
                    border: '1px solid rgba(0,0,0,0.05)', 
                    background: 'rgba(255,255,255,0.9)', 
                    width: 'fit-content',
                    marginBottom: '1rem'
                  }}
                >
                  {service.icon}
                </div>
                
                <h3 className="heading-ld" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                  {service.title}
                </h3>
                
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                  {service.desc}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {service.features.map((feat, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                      <Check size={20} className="text-primary" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Right: Image */}
              <div 
                style={{ 
                  borderRadius: '1rem', 
                  overflow: 'hidden', 
                  height: '100%', 
                  minHeight: '280px' 
                }}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Services;
