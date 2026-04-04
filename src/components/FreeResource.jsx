import React from 'react';
import { motion } from 'framer-motion';
import { DownloadCloud, BookOpen } from 'lucide-react';

const FreeResource = () => {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-glow glow-bottom-left" style={{ opacity: 0.3 }}></div>
      <div className="container">
        <motion.div 
          initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}}
          className="glass-panel" style={{ padding: '0', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', border: '1px solid rgba(255,106,0,0.2)' }}>
          
          <div className="w-full md:w-1/2 p-12" style={{ flex: '1 1 50%', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--primary)' }}>*</span> FREE RESOURCE
            </div>
            
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, color: '#0f172a', letterSpacing: '-1.5px' }}>
              The Coach <br /> <span className="text-gradient-primary">Growth Blueprint</span>
            </h2>
            
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Learn the exact premium framework showing how top coaches and consultants generate 100+ highly qualified leads every month using ads and funnels.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-glow" style={{ padding: '1.2rem 2.5rem' }}>
                <DownloadCloud size={20} /> Download Guide
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2" style={{ flex: '1 1 50%', background: 'linear-gradient(135deg, rgba(255,106,0,0.1), rgba(139,92,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
            <div className="glass hover-card" style={{ width: '100%', maxWidth: '350px', aspectRatio: '3/4', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '2px solid rgba(0,0,0,0.05)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))', boxShadow: '20px 20px 60px rgba(0,0,0,0.05), inset 0 0 40px rgba(255,106,0,0.05)' }}>
              <div>
                <BookOpen size={48} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                <h3 className="heading-sm" style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: '1rem' }}>GROWTH<br/>BLUEPRINT</h3>
              </div>
              <p className="text-muted" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>The ultimate guide to generating 100+ premium leads per month.</p>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default FreeResource;
