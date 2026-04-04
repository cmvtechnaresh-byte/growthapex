import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Mail, Globe, Phone, PartyPopper } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { syncToGoogleSheets } from '../utils/googleSheets';

const ContactForm = ({ isModal = false }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revenue, setRevenue] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    niche: '',
    adSpend: '',
    socials: ''
  });

  const handleRevenueChange = (val) => {
    if (revenue.includes(val)) {
      setRevenue(revenue.filter(item => item !== val));
    } else {
      setRevenue([...revenue, val]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        revenueGoal: revenue,
        createdAt: serverTimestamp(),
        type: 'contact_form'
      });

      // Wait for background sync to Google Sheets
      await syncToGoogleSheets({ ...formData, revenueGoal: revenue }, 'lead');

      setSubmitted(true);
      // Wait bit before clearing
      setFormData({ email: '', phone: '', niche: '', adSpend: '', socials: '' });
      setRevenue([]);
    } catch (error) {
       console.error("Error saving to Firestore:", error);
       alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const revenueOptions = [
    "Rs.10 Lakh-Rs.25 Lakh",
    "Rs.25Lakh - Rs.50 Lakh",
    "Rs.50 Lakh- Rs.1Cr",
    "Above Rs.1Cr"
  ];

  const renderForm = (
    <div 
       className="contact-form-card"
       style={{ 
         background: isModal ? 'transparent' : '#ffffff', 
         borderRadius: isModal ? '1.5rem' : '2rem', 
         padding: isModal ? '0' : '3.5rem 3rem',
         boxShadow: isModal ? 'none' : '0 25px 70px rgba(0,0,0,0.06)',
         border: isModal ? 'none' : '1px solid rgba(0,0,0,0.08)',
         width: '100%',
         boxSizing: 'border-box',
         position: 'relative',
         minHeight: '500px'
       }}
     >
       <AnimatePresence>
         {submitted ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             style={{ 
               position: 'absolute', 
               top: 0, left: 0, width: '100%', height: '100%', 
               display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
               textAlign: 'center', padding: '2rem', zIndex: 10, background: isModal ? 'var(--bg-color)' : 'rgba(9,9,15,0.98)', borderRadius: 'inherit'
             }}
           >
              <div style={{ width: '80px', height: '80px', background: 'rgba(34,197,94,0.1)', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                 <Check size={40} strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem' }}>Success!</h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '300px' }}>
                Your inquiry has been received. Our growth strategist will reach out within <span style={{ color: 'var(--primary)', fontWeight: 700 }}>24 hours</span>.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn btn-primary" 
                style={{ marginTop: '2.5rem', padding: '0.8rem 2rem', borderRadius: '0.75rem' }}
              >
                Back to Website
              </button>
           </motion.div>
         ) : (
           <motion.form 
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onSubmit={handleSubmit} 
             style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
           >
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Email *</label>
               <input value={formData.email} onChange={handleInputChange} name="email" type="email" required className="contact-input-field" placeholder="your@email.com" />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Phone Number *</label>
               <div className="phone-wrapper">
                 <div className="flag-box">
                   <img src="https://flagcdn.com/w40/in.png" alt="India" style={{ width: '22px', borderRadius: '2px' }} />
                   <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>+91</span>
                 </div>
                 <input value={formData.phone} onChange={handleInputChange} name="phone" type="tel" required className="contact-input-field phone-input" placeholder="98765 43210" />
               </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                 Primary coaching niche / area of expertise? *
               </label>
               <input value={formData.niche} onChange={handleInputChange} name="niche" type="text" required className="contact-input-field" placeholder="e.g. Career Coaching" />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                 Current monthly ad spend? *
               </label>
               <input value={formData.adSpend} onChange={handleInputChange} name="adSpend" type="text" required className="contact-input-field" placeholder="e.g. ₹50,000 / ₹1 Lakh+" />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                 Instagram/Linkedin/Website URL ? *
               </label>
               <textarea value={formData.socials} onChange={handleInputChange} name="socials" required className="contact-input-field" rows="2" style={{ resize: 'none' }} placeholder="https://..."></textarea>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                 Desired Monthly Revenue ? *
               </label>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                 {revenueOptions.map((opt, i) => (
                   <div 
                     key={i} 
                     className={`checkbox-item ${revenue.includes(opt) ? 'active' : ''}`}
                     onClick={() => handleRevenueChange(opt)}
                   >
                     <div className="custom-checkbox">
                        {revenue.includes(opt) && <Check size={14} color="#fff" strokeWidth={4} />}
                     </div>
                     <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{opt}</span>
                   </div>
                 ))}
               </div>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="btn btn-primary btn-glow"
               style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', marginTop: '0.75rem', borderRadius: '0.75rem', opacity: loading ? 0.7 : 1 }}
             >
               {loading ? 'Submitting...' : 'Submit Inquiry'} <ArrowRight size={18} style={{ marginLeft: '0.75rem' }} />
             </button>

           </motion.form>
         )}
       </AnimatePresence>
     </div>
  );

  if (isModal) return renderForm;

  return (
    <section className="section bg-secondary" id="contact" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: flex-start;
        }
        .contact-input-field {
          width: 100%;
          padding: 1.1rem 1.25rem;
          border-radius: 0.85rem;
          border: 1.5px solid rgba(0,0,0,0.15);
          background: #ffffff;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s ease;
          font-family: var(--font-body);
          color: var(--text-primary);
          box-sizing: border-box;
        }
        .contact-input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(22, 78, 170,0.15);
          background: #ffffff;
        }
        .phone-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .flag-box {
           display: flex;
           align-items: center;
           gap: 0.5rem;
           padding: 0 1rem;
           border-right: 1.5px solid rgba(0,0,0,0.12);
           height: 100%;
           position: absolute;
           left: 0;
           pointer-events: none;
           background: rgba(0,0,0,0.03);
           border-radius: 0.75rem 0 0 0.75rem;
        }
        .phone-input {
           padding-left: 6rem !important;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: transform 0.2s;
        }
        .checkbox-item:hover { transform: translateX(4px); }
        .custom-checkbox {
          width: 22px;
          height: 22px;
          border: 2px solid rgba(0,0,0,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .checkbox-item.active .custom-checkbox {
          background: var(--primary);
          border-color: var(--primary);
        }

        @media (max-width: 968px) {
          .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 600px) {
          .contact-form-card { padding: 2.5rem 1.5rem !important; }
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="contact-grid">
          
          <div style={{ paddingRight: '1rem' }}>
            <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--primary)' }}>*</span> GET STARTED
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, color: '#0f172a', letterSpacing: '-2px' }}>
              Build Your <br /> <span className="text-gradient-primary">Growth Engine</span> Today.
            </h2>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Fill out the form to see if we're a good fit. We only work with people we're 100% confident we can scale.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(22, 78, 170,0.1)', border: '1px solid rgba(22, 78, 170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 0 20px rgba(22, 78, 170,0.1)' }}><Mail size={22}/></div>
                 <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>EMAIL SUPPORT</div>
                    <div style={{ fontWeight: 700, color: '#000000' }}>support@growthapex.in</div>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(22, 78, 170,0.1)', border: '1px solid rgba(22, 78, 170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 0 20px rgba(22, 78, 170,0.1)' }}><Phone size={22}/></div>
                 <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>CALL US</div>
                    <div style={{ fontWeight: 700, color: '#000000' }}>+91 92176 48531</div>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(22, 78, 170,0.1)', border: '1px solid rgba(22, 78, 170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 0 20px rgba(22, 78, 170,0.1)' }}><Globe size={22}/></div>
                 <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', letterSpacing: '1px' }}>OFFICE</div>
                    <div style={{ fontWeight: 700, color: '#000000' }}>Based in India — Working Globally</div>
                 </div>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ width: '100%' }}
          >
            {renderForm}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
