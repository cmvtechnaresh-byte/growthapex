import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/* ─────────── Shared mini components ─────────── */
const RadioRow = ({ label, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '0.85rem 1rem', borderRadius: '0.75rem',
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
    }}>
      {selected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
    </div>
    <span style={{ color: selected ? '#f8fafc' : '#94a3b8', fontWeight: 600, fontSize: '0.92rem' }}>{label}</span>
  </div>
);

const TInput = ({ label, required, type = 'text', value, onChange, placeholder, hint }) => (
  <div>
    <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.92rem', marginBottom: hint ? '0.25rem' : '0.5rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {hint && <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem', marginTop: 0 }}>{hint}</p>}
    <input
      type={type} value={value} onChange={onChange} required={required}
      placeholder={placeholder || 'Your answer'}
      style={{
        width: '100%', background: 'transparent', border: 'none',
        borderBottom: '1.5px solid rgba(255,255,255,0.18)',
        color: '#f8fafc', fontSize: '0.95rem', padding: '0.6rem 0',
        outline: 'none', fontFamily: 'inherit',
      }}
      onFocus={e => (e.target.style.borderBottomColor = '#04BE96')}
      onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.18)')}
    />
  </div>
);

const TTextarea = ({ label, required, value, onChange, hint }) => (
  <div>
    <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.92rem', marginBottom: hint ? '0.25rem' : '0.5rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {hint && <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem', marginTop: 0 }}>{hint}</p>}
    <textarea
      value={value} onChange={onChange} required={required} rows={3}
      placeholder="Your answer"
      style={{
        width: '100%', background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '0.65rem',
        color: '#f8fafc', fontSize: '0.92rem', padding: '0.75rem',
        outline: 'none', fontFamily: 'inherit', resize: 'vertical',
      }}
      onFocus={e => (e.target.style.borderColor = '#04BE96')}
      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
    />
  </div>
);

const RadioGroup = ({ label, required, hint, options, value, onChange }) => (
  <div>
    <label style={{ display: 'block', color: '#f8fafc', fontWeight: 700, fontSize: '0.92rem', marginBottom: hint ? '0.25rem' : '0.75rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {hint && <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.75rem', marginTop: 0 }}>{hint}</p>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {options.map(opt => (
        <RadioRow key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  </div>
);

const SectionLabel = ({ num, title, subtitle }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0f2044, #0d1b36)',
    borderRadius: '0.85rem', padding: '1rem 1.25rem',
    marginBottom: '1.25rem',
    borderLeft: '3px solid #04BE96',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: subtitle ? '0.3rem' : 0 }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%',
        background: '#04BE96', color: '#fff', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: '0.72rem',
      }}>{num}</div>
      <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.95rem' }}>{title}</span>
    </div>
    {subtitle && <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 0 2rem' }}>{subtitle}</p>}
  </div>
);

/* ─────────── STATES ─────────── */
// step 0 = mini form
// step 1 = "You're almost there!" 
// step 2 = full questionnaire
// step 3 = final success

const MiniAuditModal = ({ isOpen, onClose }) => {
  const bodyRef = useRef(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mini form fields
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [describes, setDescribes] = useState('');
  const [challenge, setChallenge] = useState('');
  const [miniDocId, setMiniDocId] = useState(null);

  // Full form — Section 1
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [fullDescribes, setFullDescribes] = useState('');
  const [describesOther, setDescribesOther] = useState('');

  // Section 2
  const [businessAge, setBusinessAge] = useState('');
  const [revenue, setRevenue] = useState('');
  const [clientSource, setClientSource] = useState('');
  const [salesTeam, setSalesTeam] = useState('');

  // Section 3
  const [runningAds, setRunningAds] = useState('');
  const [adBudget, setAdBudget] = useState('');
  const [funnel, setFunnel] = useState('');
  const [afterInterest, setAfterInterest] = useState('');

  // Section 4
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [revenueTarget, setRevenueTarget] = useState('');
  const [biggestBlock, setBiggestBlock] = useState('');
  const [agencyBefore, setAgencyBefore] = useState('');
  const [agencyWrong, setAgencyWrong] = useState('');
  const [readyToInvest, setReadyToInvest] = useState('');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0); setName(''); setWhatsapp(''); setDescribes(''); setChallenge('');
      setBusinessName(''); setEmail(''); setFullDescribes(''); setDescribesOther('');
      setBusinessAge(''); setRevenue(''); setClientSource(''); setSalesTeam('');
      setRunningAds(''); setAdBudget(''); setFunnel(''); setAfterInterest('');
      setPrimaryGoal(''); setRevenueTarget(''); setBiggestBlock('');
      setAgencyBefore(''); setAgencyWrong(''); setReadyToInvest('');
    }, 400);
  };

  const scrollTop = () => bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  // Submit mini form
  const submitMini = async (e) => {
    e.preventDefault();
    if (!name || !whatsapp || !describes || !challenge) return;
    setLoading(true);
    try {
      const ref = await addDoc(collection(db, 'mini_audits'), {
        name, whatsapp, describes, challenge,
        createdAt: serverTimestamp(), type: 'mini_audit',
      });
      setMiniDocId(ref.id);
      setStep(1);
      scrollTop();
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit full form
  const submitFull = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name, whatsapp, email, businessName,
      describes: fullDescribes === 'Other — please specify below' ? `Other: ${describesOther}` : (fullDescribes || describes),
      challenge,
      businessAge, revenue, clientSource, salesTeam,
      runningAds, adBudget, funnel, afterInterest,
      primaryGoal, revenueTarget, biggestBlock, agencyBefore, agencyWrong, readyToInvest,
      miniAuditId: miniDocId || null,
      createdAt: serverTimestamp(), type: 'audit_form',
    };
    try {
      await addDoc(collection(db, 'audit_forms'), data);
      setStep(3);
      scrollTop();
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const firstName = name.split(' ')[0] || 'there';
  const miniProgress = [name, whatsapp, describes, challenge].filter(Boolean).length / 4;

  // Full form progress
  const fullFields = [email, businessName, fullDescribes, businessAge, revenue, clientSource,
    salesTeam, runningAds, adBudget, funnel, afterInterest, primaryGoal, revenueTarget,
    biggestBlock, agencyBefore, readyToInvest];
  const fullProgress = fullFields.filter(Boolean).length / fullFields.length;

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
            style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,14,0.88)', backdropFilter: 'blur(10px)', zIndex: -1 }}
          />

          {/* Modal shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            style={{
              width: '100%',
              maxWidth: step === 2 ? '620px' : '480px',
              maxHeight: '92vh',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
              background: '#12192a',
              display: 'flex', flexDirection: 'column',
              transition: 'max-width 0.4s ease',
            }}
          >
            {/* Close btn */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '1.1rem', right: '1.1rem',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#94a3b8', zIndex: 20,
              }}
            >
              <X size={15} />
            </button>

            {/* Scrollable body */}
            <div ref={bodyRef} style={{ overflowY: 'auto', flex: 1, borderRadius: '1.5rem' }}>
              <AnimatePresence mode="wait">

                {/* ─ STEP 0: Mini short form ─ */}
                {step === 0 && (
                  <motion.div key="mini" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #0e1f40, #0c1a35)',
                      borderRadius: '1.5rem 1.5rem 0 0',
                      padding: '1.75rem 2rem 1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div animate={{ width: `${miniProgress * 100}%` }} transition={{ duration: 0.35 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg,#04BE96,#164EAA)', borderRadius: '99px' }} />
                      </div>
                      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', marginBottom: '0.4rem' }}>Get your free growth audit</h2>
                      <p style={{ color: '#04BE96', fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.5 }}>
                        30-minute call. We identify exactly where your growth is leaking — at zero cost.
                      </p>
                    </div>

                    <form onSubmit={submitMini} style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: 'rgba(4,190,150,0.07)', border: '1px solid rgba(4,190,150,0.15)', borderRadius: '0.75rem', padding: '0.8rem 1rem' }}>
                        <Check size={15} color="#04BE96" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>No spam. No pushy sales call. Just a clear picture of your growth opportunity.</span>
                      </div>

                      <TInput label="Full name" required value={name} onChange={e => setName(e.target.value)} />
                      <TInput label="WhatsApp number" required type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                      <RadioGroup label="What best describes you?" required value={describes} onChange={setDescribes}
                        options={['Health / wellness coach','Herbalife / network marketing leader','Course creator / educator','Consultant / coach','Other']} />

                      <RadioGroup label="What's your biggest growth challenge right now?" required value={challenge} onChange={setChallenge}
                        options={['Not getting enough leads','Leads not converting to sales','No consistent marketing system','Scaling what\'s already working']} />

                      <button type="submit" disabled={loading || !name || !whatsapp || !describes || !challenge}
                        style={{
                          width: '100%', padding: '1.05rem',
                          background: (!name || !whatsapp || !describes || !challenge) ? 'rgba(255,255,255,0.1)' : '#ffffff',
                          color: (!name || !whatsapp || !describes || !challenge) ? '#64748b' : '#111827',
                          borderRadius: '0.85rem', border: 'none', fontWeight: 900, fontSize: '0.97rem',
                          fontFamily: 'inherit', cursor: (!name || !whatsapp || !describes || !challenge) ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                          marginTop: '0.5rem',
                        }}>
                        {loading ? 'Submitting...' : <> Book my free growth audit <ArrowRight size={17} /> </>}
                      </button>
                      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.78rem', marginTop: '-0.75rem' }}>
                        Takes 30 seconds · No credit card · Limited slots per month
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ─ STEP 1: "You're almost there!" ─ */}
                {step === 1 && (
                  <motion.div key="success1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #0e1f40, #0c1a35)',
                      borderRadius: '1.5rem 1.5rem 0 0',
                      padding: '2rem', textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#04BE96,#164EAA)' }} />
                      <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#04BE96', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 30px rgba(4,190,150,0.4)' }}>
                        <Check size={27} color="#fff" strokeWidth={3} />
                      </div>
                      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.45rem', marginBottom: '0.4rem' }}>You're almost there! 🎯</h2>
                      <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Your free growth audit slot is almost confirmed.</p>
                    </div>

                    <div style={{ padding: '1.75rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                      <p style={{ color: '#f8fafc', fontSize: '0.97rem', lineHeight: 1.65, fontWeight: 500, margin: 0 }}>
                        Thanks <span style={{ color: '#04BE96', fontWeight: 800 }}>{firstName}</span> — we've received your request and we're already looking forward to your call.
                      </p>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', background: 'rgba(4,190,150,0.07)', border: '1px solid rgba(4,190,150,0.18)', borderRadius: '0.85rem', padding: '0.9rem 1rem' }}>
                        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>📱</span>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                          We'll confirm your slot on WhatsApp within <strong style={{ color: '#f8fafc' }}>2 hours.</strong> Keep an eye out for our message.
                        </p>
                      </div>

                      <p style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.92rem', margin: 0 }}>One last step before your call 👇</p>

                      {[
                        { n: 1, bold: 'Fill our 5-minute growth questionnaire.', rest: ' This lets us come prepared with real insights specific to YOUR business — not generic advice.' },
                        { n: 2, bold: 'We analyse your answers', rest: ' before the call so we walk in knowing exactly where your growth is leaking.' },
                        { n: 3, bold: 'Show up to your call', rest: ' and get a clear, personalised growth plan — whether we work together or not.' },
                      ].map(s => (
                        <div key={s.n} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                          <div style={{ width: '25px', height: '25px', borderRadius: '50%', flexShrink: 0, background: '#164EAA', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem' }}>{s.n}</div>
                          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                            <strong style={{ color: '#f8fafc' }}>{s.bold}</strong>{s.rest}
                          </p>
                        </div>
                      ))}

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {/* CTA → full form */}
                        <button
                          onClick={() => { setStep(2); scrollTop(); }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            background: '#ffffff', color: '#111827', borderRadius: '0.85rem', padding: '1rem',
                            fontWeight: 900, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                            fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                          }}>
                          Fill the growth questionnaire — takes 5 mins <ArrowRight size={16} />
                        </button>
                        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.78rem', margin: 0 }}>
                          Rather do it later? We'll send the link on WhatsApp too.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                          {['Zero obligation', '100% free', 'You keep the growth plan'].map(b => (
                            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.77rem', fontWeight: 700 }}>
                              <Check size={12} color="#04BE96" /> {b}
                            </div>
                          ))}
                        </div>
                        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>
                          — Team GrowthApex · <span style={{ color: '#04BE96' }}>growthapex.in</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─ STEP 2: Full questionnaire ─ */}
                {step === 2 && (
                  <motion.div key="fullform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div style={{ background: 'linear-gradient(135deg,#0e1f40,#0c1a35)', borderRadius: '1.5rem 1.5rem 0 0', padding: '1.75rem 2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div animate={{ width: `${fullProgress * 100}%` }} transition={{ duration: 0.35 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg,#04BE96,#164EAA)', borderRadius: '99px' }} />
                      </div>
                      <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, padding: 0, marginBottom: '1rem', fontFamily: 'inherit' }}>
                        <ArrowLeft size={14} /> Back
                      </button>
                      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.4rem' }}>GrowthApex — Free Growth Audit Form</h2>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                        Takes 5–7 minutes. The more detail you give us, the sharper your audit will be. We review every response personally before your call.
                      </p>
                    </div>

                    <form onSubmit={submitFull} style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                      {/* § 1 */}
                      <div>
                        <SectionLabel num={1} title="About you" subtitle="Basic details so we know who we're speaking with." />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <TInput label="Full name" required value={name} onChange={e => setName(e.target.value)} />
                          <TInput label="Business name" required value={businessName} onChange={e => setBusinessName(e.target.value)} />
                          <TInput label="WhatsApp number" required type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} hint="We'll confirm your Calendly booking on WhatsApp" />
                          <TInput label="Email address" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
                          <RadioGroup label="What best describes you?" required value={fullDescribes} onChange={setFullDescribes}
                            options={['Health / wellness coach','Herbalife / network marketing leader','Course creator / online educator','Business / life consultant','Spiritual coach / guru','Other — please specify below']} />
                          {fullDescribes === 'Other — please specify below' && (
                            <TInput label="Please specify" required value={describesOther} onChange={e => setDescribesOther(e.target.value)} placeholder="Describe your role..." />
                          )}
                        </div>
                      </div>

                      {/* § 2 */}
                      <div>
                        <SectionLabel num={2} title="Your business right now" subtitle="Help us understand where you are today." />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <RadioGroup label="How long have you been running your business?" required value={businessAge} onChange={setBusinessAge}
                            options={['Less than 6 months','6 months — 1 year','1 — 3 years','3+ years']} />
                          <RadioGroup label="What is your current monthly revenue range?" required hint="This helps us recommend the right strategy and ad budget for your stage" value={revenue} onChange={setRevenue}
                            options={['Below ₹50,000 / month','₹50,000 — ₹1,50,000 / month','₹1,50,000 — ₹5,00,000 / month','₹5,00,000+ / month','Pre-revenue — not launched yet']} />
                          <RadioGroup label="Where do most of your clients currently come from?" required value={clientSource} onChange={setClientSource}
                            options={['Referrals / word of mouth','Instagram / Facebook organic','Paid ads','WhatsApp groups / network','I don\'t have a consistent source yet']} />
                          <RadioGroup label="Do you currently have a sales team?" required value={salesTeam} onChange={setSalesTeam}
                            options={['Yes — 2 or more closers','Just me — I close everything myself','No sales team yet']} />
                        </div>
                      </div>

                      {/* § 3 */}
                      <div>
                        <SectionLabel num={3} title="Your marketing right now" subtitle="This is where we find your leakages." />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <RadioGroup label="Are you currently running paid ads?" required value={runningAds} onChange={setRunningAds}
                            options={['Yes — Meta (Facebook / Instagram)','Yes — Google','Yes — both','No — never run ads','Tried before but stopped']} />
                          <RadioGroup label="What is your current weekly ad budget (or what are you willing to invest)?" required value={adBudget} onChange={setAdBudget}
                            options={['Below ₹10,000 / week','₹10,000 — ₹20,000 / week','₹20,000 — ₹50,000 / week','₹50,000+ / week']} />
                          <RadioGroup label="Do you have a sales funnel or landing page currently?" required value={funnel} onChange={setFunnel}
                            options={['Yes — fully built and running','Basic landing page only','No — sending traffic to my Instagram / website','Not sure what a funnel is']} />
                          <RadioGroup label="What happens after someone shows interest in your business?" required hint="Be honest — this is where most growth leakages live" value={afterInterest} onChange={setAfterInterest}
                            options={['Automated follow-up sequence kicks in','I manually follow up on WhatsApp','They book a call directly','Honestly — most leads go cold']} />
                        </div>
                      </div>

                      {/* § 4 */}
                      <div>
                        <SectionLabel num={4} title="Your goals" subtitle="Tell us where you want to go so we can map the right path." />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <RadioGroup label="What is your primary goal for the next 6 months?" required value={primaryGoal} onChange={setPrimaryGoal}
                            options={['Get more leads consistently','Convert existing leads into paying clients','Launch or scale a course / program','Build my brand and audience online','All of the above']} />
                          <RadioGroup label="What revenue target are you working towards?" required value={revenueTarget} onChange={setRevenueTarget}
                            options={['₹1 lakh / month','₹3 — 5 lakh / month','₹10 lakh / month','₹25 lakh+ / month']} />
                          <TTextarea label="What is the single biggest thing holding your growth back right now?" required hint="Be as specific as possible — this shapes everything we prepare for your audit call" value={biggestBlock} onChange={e => setBiggestBlock(e.target.value)} />
                          <RadioGroup label="Have you worked with a marketing agency before?" required value={agencyBefore} onChange={setAgencyBefore}
                            options={['Yes — great experience','Yes — disappointing results','Yes — mixed results','No — first time considering it']} />
                          <TTextarea label="If yes — what went wrong?" hint="Optional but very useful for us to understand what to avoid" value={agencyWrong} onChange={e => setAgencyWrong(e.target.value)} />
                          <RadioGroup label="Are you ready to invest in growth in the next 30 days?" required value={readyToInvest} onChange={setReadyToInvest}
                            options={['Yes — I\'m ready to move fast','Possibly — depends on the plan','Just exploring for now']} />
                        </div>
                      </div>

                      {/* Footer note */}
                      <div style={{ background: 'rgba(4,190,150,0.06)', border: '1px solid rgba(4,190,150,0.15)', borderRadius: '0.85rem', padding: '1rem 1.25rem', color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.65, textAlign: 'center' }}>
                        Once you submit, our team reviews your form within <strong style={{ color: '#f8fafc' }}>24 hours</strong>. You'll receive a confirmation on WhatsApp with your audit call details. We only proceed with clients we're genuinely confident we can grow.
                      </div>

                      <button type="submit" disabled={loading}
                        style={{
                          width: '100%', padding: '1.1rem',
                          background: loading ? 'rgba(255,255,255,0.5)' : '#ffffff',
                          color: '#111827', borderRadius: '0.85rem', border: 'none',
                          fontWeight: 900, fontSize: '1rem', fontFamily: 'inherit',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        }}>
                        {loading ? 'Submitting...' : <> Submit audit form <ArrowRight size={18} /> </>}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ─ STEP 3: Final success ─ */}
                {step === 3 && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <div style={{ padding: '3rem 2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg,#04BE96,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(4,190,150,0.4)' }}>
                        <Check size={36} color="#fff" strokeWidth={3} />
                      </div>
                      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>
                        Form submitted successfully! 🎉
                      </h2>
                      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: '340px' }}>
                        Thank you <span style={{ color: '#04BE96', fontWeight: 700 }}>{firstName}</span>! Our team will review your answers and reach out on WhatsApp within <strong style={{ color: '#f8fafc' }}>24 hours</strong> to confirm your audit call.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginTop: '0.5rem' }}>
                        {['We review every form personally', 'You\'ll get a WhatsApp confirmation', 'Your audit is 100% free'].map(b => (
                          <div key={b} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.87rem', fontWeight: 600 }}>
                            <Check size={14} color="#04BE96" /> {b}
                          </div>
                        ))}
                      </div>
                      <button onClick={handleClose}
                        style={{ marginTop: '0.75rem', padding: '0.9rem 2.5rem', background: '#ffffff', color: '#111827', border: 'none', borderRadius: '0.85rem', fontWeight: 900, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Back to GrowthApex
                      </button>
                      <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '-0.25rem' }}>
                        — Team GrowthApex · <span style={{ color: '#04BE96' }}>growthapex.in</span>
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MiniAuditModal;
