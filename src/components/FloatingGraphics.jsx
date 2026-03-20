import React from 'react';
import { motion } from 'framer-motion';

const FloatingGraphics = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Dynamic Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '15%', left: '5%', opacity: 0.15, fontSize: '3rem' }}
      >
        🚀
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', top: '45%', right: '8%', opacity: 0.1, fontSize: '4rem' }}
      >
        📈
      </motion.div>

      <motion.div 
        animate={{ 
          y: [20, 0, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: 'absolute', bottom: '15%', left: '12%', opacity: 0.12, fontSize: '2.5rem' }}
      >
        🤖
      </motion.div>

      <motion.div 
        animate={{ 
          x: [-10, 10, -10],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '25%', right: '25%', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
    </div>
  );
};

export default FloatingGraphics;
