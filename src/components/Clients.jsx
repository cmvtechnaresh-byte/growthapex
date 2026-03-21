import React from 'react';
import { motion } from 'framer-motion';

// Import client images
import aarush from '../assets/client/Aarush_Bhola.jpeg';
import nandan from '../assets/client/Coach Nandan.jpg';
import mannu from '../assets/client/Mannu Chaudhary.png';
import rahul from '../assets/client/Rahul Chaudhary.jpg';
import sujoy from '../assets/client/Sujoy das.jpg';
import yash from '../assets/client/Yash Sharma.jpg';
import deepak from '../assets/client/deepak baja.jpg';
import jitesh from '../assets/client/jitesh pant.jpg';
import saurav from '../assets/client/saurav singha.jpg';

const clients = [
  { name: 'Aarush Bhola', img: aarush },
  { name: 'Deepak Bajaj', img: deepak },
  { name: 'Jitesh Pant', img: jitesh },
  { name: 'Sujoy Das', img: sujoy },
  { name: 'Coach Nandan', img: nandan },
  { name: 'Rahul Chaudhary', img: rahul },
  { name: 'Singha10', img: saurav },
  { name: 'Mannu Chaudhary', img: mannu },
  { name: 'Yash Sharma', img: yash }
];

const Clients = () => {
  return (
    <section style={{ 
      background: '#09090f', 
      padding: '4rem 0', 
      borderBottom: '1px solid rgba(255,255,255,0.03)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ 
              color: 'var(--primary)', 
              fontWeight: 900, 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '3px',
              display: 'block',
              marginBottom: '1rem'
            }}>
            Trusted Powerhouses
          </motion.span>
          <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             style={{ 
               fontSize: '2rem', 
               fontWeight: 900, 
               color: '#f1f5f9',
               textTransform: 'none',
               letterSpacing: '-1px'
             }}>
             Architects of <span style={{ color: 'var(--primary)' }}>Impact</span>
          </motion.h2>
        </div>

        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          {/* Gradient Overlays for smooth edges */}
          <div style={{ 
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', 
            background: 'linear-gradient(to right, #09090f, transparent)', zIndex: 2 
          }} />
          <div style={{ 
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', 
            background: 'linear-gradient(to left, #09090f, transparent)', zIndex: 2 
          }} />

          <motion.div 
            animate={{ x: [0, -2000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex', gap: '4rem', width: 'fit-content', padding: '1rem 0', alignItems: 'center' }}
          >
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '1rem',
                minWidth: '160px',
                filter: 'grayscale(100%)',
                opacity: 0.6,
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%)';
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  background: '#1a1f2e'
                }}>
                  <img 
                    src={client.img} 
                    alt={client.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '0.8rem', 
                  fontWeight: 800, 
                  textAlign: 'center',
                  textTransform: 'none',
                  letterSpacing: '1px'
                }}>
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
