import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { syncToGoogleSheets } from '../utils/googleSheets';
import logoImg from '../assets/logoggog.png';

/* ── Helpers ── */
const RadioGroup = ({ options, value, onChange, name }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
    {options.map((opt) => {
      const selected = value === opt;
      return (
        <div
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.85rem',
            border: `1.5px solid ${selected ? '#04BE96' : 'rgba(255,255,255,0.1)'}`,
            background: selected ? 'rgba(4,190,150,0.08)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
        >
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${selected ? '#04BE96' : 'rgba(255,255,255,0.25)'}`,
            background: selected ? '#04BE96' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s ease',
          }}>
            {selected && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff' }} />}
          </div>
          <span style={{ color: selected ? '#f8fafc' : '#94a3b8', fontWeight: 600, fontSize: '0.97rem' }}>{opt}</span>
        </div>
      );
    })}
  </div>
);

const TextInput = ({ label, required, placeholder, value, onChange, type = 'text', hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {hint && <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '-0.25rem' }}>{hint}</p>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Your answer'}
      required={required}
      style={{
        background: 'transparent',
        border: 'none',
        borderBottom: '1.5px solid rgba(255,255,255,0.2)',
        padding: '0.75rem 0',
        color: '#f8fafc',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        width: '100%',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => (e.target.style.borderBottomColor = '#04BE96')}
      onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
    />
  </div>
);

const TextArea = ({ label, required, placeholder, value, onChange, hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {hint && <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '-0.25rem' }}>{hint}</p>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Your answer'}
      required={required}
      rows={3}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(255,255,255,0.1)',
        borderRadius: '0.75rem',
        padding: '0.9rem 1rem',
        color: '#f8fafc',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        width: '100%',
        resize: 'vertical',
        transition: 'border-color 0.2s',
        marginTop: '0.5rem',
      }}
      onFocus={e => (e.target.style.borderColor = '#04BE96')}
      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
    />
  </div>
);

const SectionHeader = ({ num, title, subtitle }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0f2044 0%, #0e1e38 100%)',
    borderRadius: '1.2rem 1.2rem 0 0',
    padding: '2rem 2.5rem',
    marginBottom: 0,
    borderBottom: '1px solid rgba(4,190,150,0.15)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: '#04BE96', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: '0.85rem', flexShrink: 0,
      }}>{num}</div>
      <h2 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, paddingLeft: '2.5rem' }}>{subtitle}</p>}
  </div>
);

const FormCard = ({ children, header }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '1.2rem',
    overflow: 'hidden',
    marginBottom: '1.5rem',
  }}>
    {header}
    <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {children}
    </div>
  </div>
);

/* ── Main page ── */
const AuditFormPage = () => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [submittedName, setSubmittedName] = useState('');

  // Section 1
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [describes, setDescribes] = useState('');
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

  useEffect(() => {
    document.title = 'Free Growth Audit Form | GrowthApex';
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!submitted) return;
    if (countdown <= 0) { navigate('/'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submitted, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullName, businessName, whatsapp, email,
      describes: describes === 'Other — please specify below' ? `Other: ${describesOther}` : describes,
      businessAge, revenue, clientSource, salesTeam,
      runningAds, adBudget, funnel, afterInterest,
      primaryGoal, revenueTarget, biggestBlock,
      agencyBefore, agencyWrong, readyToInvest,
      createdAt: serverTimestamp(),
      type: 'audit_form',
    };
    try {
      await addDoc(collection(db, 'audit_forms'), data);
      syncToGoogleSheets(data, 'audit');
      setSubmittedName(fullName.split(' ')[0]);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Progress calculation (simple — count filled radio fields)
  const totalFields = 14;
  const filled = [describes, businessAge, revenue, clientSource, salesTeam,
    runningAds, adBudget, funnel, afterInterest, primaryGoal, revenueTarget,
    agencyBefore, readyToInvest, fullName].filter(Boolean).length;
  const progress = Math.min(100, Math.round((filled / totalFields) * 100));

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ maxWidth: '560px', width: '100%' }}
        >
          {/* Success Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f2044 0%, #0e1e38 100%)',
            borderRadius: '1.5rem 1.5rem 0 0',
            padding: '2.5rem 2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #04BE96, #164EAA)' }} />
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#04BE96', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 1.5rem',
              boxShadow: '0 0 40px rgba(4,190,150,0.4)',
            }}>
              <Check size={32} color="#fff" strokeWidth={3} />
            </div>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '1.8rem', marginBottom: '0.5rem' }}>You're almost there! 🎯</h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Your free growth audit slot is almost confirmed.</p>
          </div>

          {/* Body */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none', borderRadius: '0 0 1.5rem 1.5rem', padding: '2.5rem' }}>
            <p style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Thanks <span style={{ color: '#04BE96', fontWeight: 700 }}>{submittedName}</span> — we've received your request and we're already looking forward to your call.
            </p>

            <div style={{
              background: 'rgba(4,190,150,0.08)', border: '1px solid rgba(4,190,150,0.2)',
              borderRadius: '0.85rem', padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              marginBottom: '2rem',
            }}>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              <p style={{ color: '#94a3b8', fontSize: '0.93rem', lineHeight: 1.6, margin: 0 }}>
                We'll confirm your slot on WhatsApp within <strong style={{ color: '#f8fafc' }}>2 hours.</strong> Keep an eye out for our message.
              </p>
            </div>

            <p style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1.25rem' }}>One last step before your call 👇</p>
            {[
              { n: 1, bold: 'Fill our 5-minute growth questionnaire.', rest: ' This lets us come prepared with real insights specific to YOUR business — not generic advice.' },
              { n: 2, bold: 'We analyse your answers', rest: ' before the call so we walk in knowing exactly where your growth is leaking.' },
              { n: 3, bold: 'Show up to your call', rest: ' and get a clear, personalised growth plan — whether we work together or not.' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#164EAA', color: '#fff', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.85rem',
                }}>{item.n}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.93rem', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#f8fafc' }}>{item.bold}</strong>{item.rest}
                </p>
              </div>
            ))}

            {/* Countdown */}
            <div style={{ textAlign: 'center', margin: '2rem 0 1rem', color: '#64748b', fontSize: '0.9rem' }}>
              Redirecting you to home in <span style={{ color: '#04BE96', fontWeight: 700 }}>{countdown}s</span>
            </div>

            <Link
              to="/"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: '#fff', color: '#111827',
                borderRadius: '0.85rem', padding: '1rem',
                fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <Home size={18} /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={topRef} style={{ minHeight: '100vh', background: '#111827', paddingTop: '2rem', paddingBottom: '5rem' }}>
      {/* Top nav strip */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to home
          </Link>
          <img src={logoImg} alt="GrowthApex" style={{ height: '44px' }} onError={e => e.target.style.display='none'} />
        </div>

        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#ffffff', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            GrowthApex — Free Growth Audit Form
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>
            Takes 5–7 minutes. The more detail you give us, the sharper your audit will be. We review every response personally before your call.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600 }}>Form progress</span>
            <span style={{ color: '#04BE96', fontSize: '0.82rem', fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '99px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #04BE96, #164EAA)', borderRadius: '99px' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Section 1 ── */}
          <FormCard header={<SectionHeader num={1} title="About you" subtitle="Basic details so we know who we're speaking with." />}>
            <TextInput label="Full name" required value={fullName} onChange={e => setFullName(e.target.value)} />
            <TextInput label="Business name" required value={businessName} onChange={e => setBusinessName(e.target.value)} />
            <TextInput label="WhatsApp number" required type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} hint="We'll confirm your Calendly booking on WhatsApp" />
            <TextInput label="Email address" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                What best describes you? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup
                value={describes}
                onChange={setDescribes}
                options={[
                  'Health / wellness coach',
                  'Herbalife / network marketing leader',
                  'Course creator / online educator',
                  'Business / life consultant',
                  'Spiritual coach / guru',
                  'Other — please specify below',
                ]}
              />
              {describes === 'Other — please specify below' && (
                <div style={{ marginTop: '1rem' }}>
                  <TextInput label="Please specify" required value={describesOther} onChange={e => setDescribesOther(e.target.value)} placeholder="Describe your role..." />
                </div>
              )}
            </div>
          </FormCard>

          {/* ── Section 2 ── */}
          <FormCard header={<SectionHeader num={2} title="Your business right now" subtitle="Help us understand where you are today." />}>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                How long have you been running your business? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={businessAge} onChange={setBusinessAge}
                options={['Less than 6 months','6 months — 1 year','1 — 3 years','3+ years']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>
                What is your current monthly revenue range? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>This helps us recommend the right strategy and ad budget for your stage</p>
              <RadioGroup value={revenue} onChange={setRevenue}
                options={['Below ₹50,000 / month','₹50,000 — ₹1,50,000 / month','₹1,50,000 — ₹5,00,000 / month','₹5,00,000+ / month','Pre-revenue — not launched yet']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Where do most of your clients currently come from? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={clientSource} onChange={setClientSource}
                options={['Referrals / word of mouth','Instagram / Facebook organic','Paid ads','WhatsApp groups / network','I don\'t have a consistent source yet']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Do you currently have a sales team? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={salesTeam} onChange={setSalesTeam}
                options={['Yes — 2 or more closers','Just me — I close everything myself','No sales team yet']} />
            </div>
          </FormCard>

          {/* ── Section 3 ── */}
          <FormCard header={<SectionHeader num={3} title="Your marketing right now" subtitle="This is where we find your leakages." />}>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Are you currently running paid ads? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={runningAds} onChange={setRunningAds}
                options={['Yes — Meta (Facebook / Instagram)','Yes — Google','Yes — both','No — never run ads','Tried before but stopped']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                What is your current weekly ad budget (or what are you willing to invest)? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={adBudget} onChange={setAdBudget}
                options={['Below ₹10,000 / week','₹10,000 — ₹20,000 / week','₹20,000 — ₹50,000 / week','₹50,000+ / week']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Do you have a sales funnel or landing page currently? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={funnel} onChange={setFunnel}
                options={['Yes — fully built and running','Basic landing page only','No — sending traffic to my Instagram / website','Not sure what a funnel is']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>
                What happens after someone shows interest in your business? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>Be honest — this is where most growth leakages live</p>
              <RadioGroup value={afterInterest} onChange={setAfterInterest}
                options={['Automated follow-up sequence kicks in','I manually follow up on WhatsApp','They book a call directly','Honestly — most leads go cold']} />
            </div>
          </FormCard>

          {/* ── Section 4 ── */}
          <FormCard header={<SectionHeader num={4} title="Your goals" subtitle="Tell us where you want to go so we can map the right path." />}>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                What is your primary goal for the next 6 months? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={primaryGoal} onChange={setPrimaryGoal}
                options={['Get more leads consistently','Convert existing leads into paying clients','Launch or scale a course / program','Build my brand and audience online','All of the above']} />
            </div>
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                What revenue target are you working towards? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={revenueTarget} onChange={setRevenueTarget}
                options={['₹1 lakh / month','₹3 — 5 lakh / month','₹10 lakh / month','₹25 lakh+ / month']} />
            </div>
            <TextArea
              label="What is the single biggest thing holding your growth back right now?"
              required
              hint="Be as specific as possible — this shapes everything we prepare for your audit call"
              value={biggestBlock}
              onChange={e => setBiggestBlock(e.target.value)}
            />
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Have you worked with a marketing agency before? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={agencyBefore} onChange={setAgencyBefore}
                options={['Yes — great experience','Yes — disappointing results','Yes — mixed results','No — first time considering it']} />
            </div>
            <TextArea
              label="If yes — what went wrong?"
              hint="Optional but very useful for us to understand what to avoid"
              value={agencyWrong}
              onChange={e => setAgencyWrong(e.target.value)}
            />
            <div>
              <label style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: '1rem' }}>
                Are you ready to invest in growth in the next 30 days? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <RadioGroup value={readyToInvest} onChange={setReadyToInvest}
                options={['Yes — I\'m ready to move fast','Possibly — depends on the plan','Just exploring for now']} />
            </div>
          </FormCard>

          {/* Footer note */}
          <div style={{
            background: 'rgba(4,190,150,0.06)', border: '1px solid rgba(4,190,150,0.15)',
            borderRadius: '0.85rem', padding: '1.25rem 1.5rem',
            color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65,
            marginBottom: '2rem', textAlign: 'center',
          }}>
            Once you submit, our team reviews your form within <strong style={{ color: '#f8fafc' }}>24 hours</strong>. You'll receive a confirmation on WhatsApp with your audit call details. We only proceed with clients we're genuinely confident we can grow.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '1.25rem',
              background: loading ? 'rgba(255,255,255,0.5)' : '#ffffff',
              color: '#111827',
              borderRadius: '0.85rem', border: 'none',
              fontWeight: 900, fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.75rem',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Submitting...' : <>Book my free growth audit <ArrowRight size={20} /></>}
          </button>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '0.75rem' }}>
            Takes 30 seconds · No credit card · Limited slots per month
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuditFormPage;
