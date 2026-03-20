import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 9999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(26, 31, 46, 0.82)',
              backdropFilter: 'blur(8px)',
              zIndex: -1
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: '#09090f',
              borderRadius: '2.5rem',
              width: '100%',
              maxWidth: '1100px',
              maxHeight: '92vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: 0
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '44px', height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100,
                color: '#94a3b8',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(224,32,53,0.1)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(224,32,53,0.3)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <X size={22} strokeWidth={2} />
            </button>

            <style>{`
              .modal-grid {
                display: grid;
                grid-template-columns: 1fr 1.15fr;
                min-height: 700px;
              }
              .modal-left {
                padding: 4rem 3.5rem;
                background: radial-gradient(circle at top left, rgba(224,32,53,0.08), transparent 70%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid rgba(255,255,255,0.06);
                text-align: center;
              }
              .modal-right {
                padding: 4rem 3.5rem;
                background: rgba(255,255,255,0.01);
              }
              .modal-icon-box {
                width: 48px; height: 48px; border-radius: 12px;
                background: rgba(224,32,53,0.1);
                border: 1px solid rgba(224,32,53,0.2);
                display: flex; align-items: center; justify-content: center;
                color: var(--primary);
                box-shadow: 0 0 20px rgba(224,32,53,0.1);
              }
              @media (max-width: 900px) {
                .modal-grid { grid-template-columns: 1fr; }
                .modal-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 5rem 2rem 3rem; }
                .modal-right { padding: 3rem 1.5rem; }
              }
            `}</style>

            <div className="modal-grid">
               {/* Left Section (Details) */}
               <div className="modal-left">
                  <div style={{ display: 'inline-block', margin: '0 auto 1.5rem' }}>
                    <div className="badge" style={{ fontWeight: 800 }}>* GET STARTED</div>
                  </div>
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                    fontWeight: 900, 
                    color: '#f1f5f9', 
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                    letterSpacing: '-1.5px'
                  }}>
                    Build Your <span style={{ color: 'var(--primary)', textShadow: '0 0 30px rgba(224,32,53,0.3)' }}>Growth Engine</span> Today.
                  </h2>
                  <p style={{ 
                    color: '#94a3b8', 
                    fontSize: '1.05rem', 
                    lineHeight: 1.7, 
                    marginBottom: '3rem',
                    maxWidth: '400px',
                    margin: '0 auto 3rem'
                  }}>
                    Fill out the form to see if we're a good fit. We only work with companies we can scale.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="modal-icon-box"><Mail size={22}/></div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>EMAIL SUPPORT</div>
                        <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1.05rem' }}>support@growthapex.in</div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="modal-icon-box"><Phone size={22}/></div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>CALL US</div>
                        <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1.05rem' }}>+91 870 755 7531</div>
                     </div>
                  </div>
               </div>

               {/* Right Section (Form) */}
               <div className="modal-right">
                  <ContactForm isModal={true} />
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
