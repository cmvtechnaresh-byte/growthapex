import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/* ── Radio Option Row ── */
const RadioRow = ({ label, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '0.9rem 1.1rem', borderRadius: '0.75rem',
      border: `1.5px solid ${selected ? '#04BE96' : 'rgba(255,255,255,0.09)'}`,
      background: selected ? 'rgba(4,190,150,0.08)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer', transition: 'all 0.15s ease',
    }}
  >
    <div style={{
      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${selected ? '#04BE96' : 'rgba(255,255,255,0.25)'}`,
      background: selected ? '#04BE96' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.15s ease',
    }}>
      {selected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
    </div>
    <span style={{ color: selected ? '#f8fafc' : '#94a3b8', fontWeight: 600, fontSize: '0.94rem' }}>{label}</span>
  </div>
);

/* ── Mini Audit Modal ── */
const MiniAuditModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [describes, setDescribes] = useState('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName(''); setWhatsapp(''); setDescribes(''); setChallenge('');
    setLoading(false); setSuccess(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !whatsapp || !describes || !challenge) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'mini_audits'), {
        name, whatsapp, describes, challenge,
        createdAt: serverTimestamp(),
        type: 'mini_audit',
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const firstName = name.split(' ')[0] || 'there';
  const progress = [name, whatsapp, describes, challenge].filter(Boolean).length / 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,14,0.85)', backdropFilter: 'blur(10px)', zIndex: -1 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            style={{
              width: '100%', maxWidth: '480px',
              maxHeight: '92vh', overflowY: 'auto',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
              background: '#12192a',
              position: 'relative',
            }}
          >
            {/* Close btn */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#94a3b8', zIndex: 10,
              }}
            >
              <X size={16} />
            </button>

            <AnimatePresence mode="wait">
              {!success ? (
                /* ── FORM STATE ── */
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                  {/* Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #0e1f40 0%, #0c1a35 100%)',
                    borderRadius: '1.5rem 1.5rem 0 0',
                    padding: '1.75rem 2rem 1.5rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Progress bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.35 }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #04BE96, #164EAA)', borderRadius: '99px' }}
                      />
                    </div>
                    <h2 style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                      Get your free growth audit
                    </h2>
                    <p style={{ color: '#04BE96', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>
                      30-minute call. We identify exactly where your growth is leaking — at zero cost.
                    </p>
                  </div>

                  {/* Form body */}
                  <form onSubmit={handleSubmit} style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Trust badge */}
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.7rem',
                      background: 'rgba(4,190,150,0.07)', border: '1px solid rgba(4,190,150,0.15)',
                      borderRadius: '0.75rem', padding: '0.85rem 1rem',
                    }}>
                      <Check size={16} color="#04BE96" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        No spam. No pushy sales call. Just a clear picture of your growth opportunity.
                      </span>
                    </div>

                    {/* Full name */}
                    <div>
                      <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                        Full name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text" value={name} onChange={e => setName(e.target.value)} required
                        placeholder="Your answer"
                        style={{
                          width: '100%', background: 'transparent', border: 'none',
                          borderBottom: '1.5px solid rgba(255,255,255,0.18)',
                          color: '#f8fafc', fontSize: '0.97rem', padding: '0.65rem 0',
                          outline: 'none', fontFamily: 'inherit',
                        }}
                        onFocus={e => e.target.style.borderBottomColor = '#04BE96'}
                        onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                        WhatsApp number <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required
                        placeholder="Your answer"
                        style={{
                          width: '100%', background: 'transparent', border: 'none',
                          borderBottom: '1.5px solid rgba(255,255,255,0.18)',
                          color: '#f8fafc', fontSize: '0.97rem', padding: '0.65rem 0',
                          outline: 'none', fontFamily: 'inherit',
                        }}
                        onFocus={e => e.target.style.borderBottomColor = '#04BE96'}
                        onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.18)'}
                      />
                    </div>

                    {/* What describes you */}
                    <div>
                      <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.9rem' }}>
                        What best describes you? <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {['Health / wellness coach', 'Herbalife / network marketing leader', 'Course creator / educator', 'Consultant / coach', 'Other'].map(opt => (
                          <RadioRow key={opt} label={opt} selected={describes === opt} onClick={() => setDescribes(opt)} />
                        ))}
                      </div>
                    </div>

                    {/* Biggest challenge */}
                    <div>
                      <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.9rem' }}>
                        What's your biggest growth challenge right now? <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {['Not getting enough leads', 'Leads not converting to sales', 'No consistent marketing system', 'Scaling what\'s already working'].map(opt => (
                          <RadioRow key={opt} label={opt} selected={challenge === opt} onClick={() => setChallenge(opt)} />
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !name || !whatsapp || !describes || !challenge}
                      style={{
                        width: '100%', padding: '1.1rem',
                        background: (!name || !whatsapp || !describes || !challenge) ? 'rgba(255,255,255,0.12)' : '#ffffff',
                        color: (!name || !whatsapp || !describes || !challenge) ? '#64748b' : '#111827',
                        borderRadius: '0.85rem', border: 'none',
                        fontWeight: 900, fontSize: '1rem', fontFamily: 'inherit',
                        cursor: (!name || !whatsapp || !describes || !challenge) ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        transition: 'all 0.2s',
                        marginTop: '0.5rem',
                      }}
                    >
                      {loading ? 'Submitting...' : <> Book my free growth audit <ArrowRight size={18} /> </>}
                    </button>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginTop: '-0.75rem' }}>
                      Takes 30 seconds · No credit card · Limited slots per month
                    </p>

                  </form>
                </motion.div>
              ) : (
                /* ── SUCCESS STATE ── */
                <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                  {/* Success header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #0e1f40 0%, #0c1a35 100%)',
                    borderRadius: '1.5rem 1.5rem 0 0',
                    padding: '2rem 2rem 1.75rem',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #04BE96, #164EAA)' }} />
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: '#04BE96', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 1.25rem',
                      boxShadow: '0 0 32px rgba(4,190,150,0.4)',
                    }}>
                      <Check size={28} color="#fff" strokeWidth={3} />
                    </div>
                    <h2 style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.4rem' }}>You're almost there! 🎯</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Your free growth audit slot is almost confirmed.</p>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.75rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <p style={{ color: '#f8fafc', fontSize: '1rem', lineHeight: 1.65, fontWeight: 500 }}>
                      Thanks <span style={{ color: '#04BE96', fontWeight: 800 }}>{firstName}</span> — we've received your request and we're already looking forward to your call.
                    </p>

                    {/* WhatsApp notice */}
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      background: 'rgba(4,190,150,0.07)', border: '1px solid rgba(4,190,150,0.18)',
                      borderRadius: '0.85rem', padding: '0.9rem 1rem',
                    }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>📱</span>
                      <p style={{ color: '#94a3b8', fontSize: '0.87rem', lineHeight: 1.6, margin: 0 }}>
                        We'll confirm your slot on WhatsApp within <strong style={{ color: '#f8fafc' }}>2 hours.</strong> Keep an eye out for our message.
                      </p>
                    </div>

                    <p style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.95rem', marginBottom: '-0.25rem' }}>
                      One last step before your call 👇
                    </p>

                    {/* 3 steps */}
                    {[
                      { n: 1, bold: 'Fill our 5-minute growth questionnaire.', rest: " This lets us come prepared with real insights specific to YOUR business — not generic advice." },
                      { n: 2, bold: 'We analyse your answers', rest: ' before the call so we walk in knowing exactly where your growth is leaking.' },
                      { n: 3, bold: 'Show up to your call', rest: ' and get a clear, personalised growth plan — whether we work together or not.' },
                    ].map(s => (
                      <div key={s.n} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                          background: '#164EAA', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 900, fontSize: '0.78rem',
                        }}>{s.n}</div>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                          <strong style={{ color: '#f8fafc' }}>{s.bold}</strong>{s.rest}
                        </p>
                      </div>
                    ))}

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                      {/* CTA → full /audit form */}
                      <Link
                        to="/audit"
                        onClick={handleClose}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                          background: '#ffffff', color: '#111827',
                          borderRadius: '0.85rem', padding: '1rem',
                          fontWeight: 900, fontSize: '0.97rem', textDecoration: 'none',
                          marginBottom: '0.75rem',
                          boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                          transition: 'opacity 0.2s',
                        }}
                      >
                        Fill the growth questionnaire — takes 5 mins <ArrowRight size={17} />
                      </Link>
                      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                        Rather do it later? We'll send the link on WhatsApp too.
                      </p>

                      {/* Trust badges */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {['Zero obligation', '100% free', 'You keep the growth plan'].map(b => (
                          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 700 }}>
                            <Check size={13} color="#04BE96" /> {b}
                          </div>
                        ))}
                      </div>

                      {/* Brand footer */}
                      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.78rem' }}>
                        — Team GrowthApex · <span style={{ color: '#04BE96' }}>growthapex.in</span>
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MiniAuditModal;
