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
      background: '#ffffff', 
      padding: '4rem 0',
      borderBottom: '1px solid #f1f5f9',
      overflow: 'hidden' 
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--primary)' }}>*</span> Results Achieved By Our Founding Team
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ 
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
              fontWeight: 900, 
              color: '#0f172a', 
              letterSpacing: '-2px',
              lineHeight: 1.1
            }}>
            Before GrowthApex: <br /> <span className="text-gradient-primary">Work By Our Core Team Members</span>
          </motion.h2>
        </div>

        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          {/* Gradient Overlays */}
          <div style={{ 
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '200px', 
            background: 'linear-gradient(to right, #ffffff, transparent)', zIndex: 2 
          }} />
          <div style={{ 
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '200px', 
            background: 'linear-gradient(to left, #ffffff, transparent)', zIndex: 2 
          }} />

          <motion.div
            animate={{ x: [0, -1800] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex', gap: '5rem', width: 'fit-content', padding: '2rem 0', alignItems: 'flex-start' }}
          >
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '1.8rem', 
                minWidth: '200px',
                filter: 'grayscale(100%)',
                opacity: 0.5,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.children[0].style.borderColor = 'var(--primary)';
                  e.currentTarget.children[0].style.boxShadow = '0 30px 60px rgba(22, 78, 170, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.children[0].style.borderColor = 'rgba(0,0,0,0.05)';
                  e.currentTarget.children[0].style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  background: '#f8fafc',
                  padding: '4px',
                  transition: 'all 0.5s ease'
                }}>
                  <img 
                    src={client.img} 
                    alt={client.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                  />
                </div>
                <span style={{ 
                  color: '#94a3b8', 
                  fontSize: '0.9rem', 
                  fontWeight: 800, 
                  textAlign: 'center',
                  textTransform: 'uppercase',
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
