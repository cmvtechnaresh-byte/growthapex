import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
      <div className="bg-glow glow-top-right"></div>

      <div className="container grid grid-2 hero-grid gap-8 items-center" style={{ gap: '2rem' }}>

        <div className="flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div
            className="badge"
            style={{ width: 'fit-content' }}
          >
            Your Full-Stack Growth Partner
          </div>

          <h1
            className="heading-lg"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.2, marginTop: '0.5rem', marginBottom: '1.5rem' }}
          >
            Ads toh sab chalate hain... <br />
            <span className="text-gradient-primary">GrowthApex aapka business chalata hai.</span>
          </h1>

          <p
            className="text-muted"
            style={{ maxWidth: '600px', fontSize: '1.25rem', fontWeight: 600, color: '#475569', marginBottom: '2.5rem', lineHeight: 1.5 }}
          >
            "We don’t work as an agency vendor.<br />
            We work as your <span style={{ color: 'var(--primary)' }}>growth partner.</span>"
          </p>

          <div
            className="flex gap-4 hero-btns"
            style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}
          >
            <a href="#contact" className="btn btn-primary btn-glow" style={{ 
              whiteSpace: 'nowrap', 
              padding: '1.2rem 2rem',
              fontSize: '1.05rem',
              boxShadow: '0 20px 40px rgba(162,21,39,0.2)',
              flex: '1',
              minWidth: '200px'
            }}>
              🚀 Book Your Strategy Call
            </a>
            <a href="#results" className="btn btn-outline" style={{ 
              whiteSpace: 'nowrap',
              padding: '1.2rem 1.5rem',
              fontSize: '1.05rem',
              border: '2px solid rgba(0,0,0,0.1)',
              flex: '1',
              minWidth: '160px'
            }}>
              📊 See Results <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}
          className="hidden md:flex"
        >
          {/* Main Hero Graphic with Glow */}
          <div style={{ position: 'absolute', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(162,21,39,0.08) 0%, transparent 70%)', zIndex: -1, top: '-10%', left: '-10%' }}></div>
          
          <motion.img
            src={heroImg}
            alt="Growth Strategy Illustration"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -20, 0] 
            }}
            transition={{ 
              x: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              width: '100%',
              maxWidth: '850px',
              borderRadius: '2.5rem',
              filter: 'drop-shadow(0 40px 100px rgba(162,21,39,0.2))',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>

        <style>{"\
          @media (min-width: 1024px) {\
            .hero-grid { grid-template-columns: 1fr 1.3fr !important; gap: 4rem !important; }\
          }\
          @media (max-width: 768px) {\
             .hidden.md\\:flex { display: none !important; }\
          }\
        "}</style>
      </div>

    </section>
  );
};

export default Hero;
