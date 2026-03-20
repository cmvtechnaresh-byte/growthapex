import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section bg-secondary" id="contact" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          align-items: flex-start;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .contact-form-panel {
          padding: 3rem;
        }
        .contact-info-chips {
          flex-direction: row;
        }
        .contact-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 0.625rem;
          border: 1.5px solid #e2e8f0;
          background: #fafafa;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: var(--font-body);
          color: #1e293b;
          box-sizing: border-box;
        }
        .contact-input:focus {
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(162,21,39,0.08);
        }
        .contact-input::placeholder { color: #94a3b8; }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .contact-form-panel {
            padding: 1.75rem 1.25rem;
          }
          .contact-info-chips {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Badge */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="badge" style={{ fontWeight: 700, marginBottom: '1rem' }}>* CONTACT US</div>
          <h2
            className="heading-xl"
            style={{
              lineHeight: 1.1,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--primary)',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            Let's talk about your{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 800, color: '#1a1f2e' }}>
              next project
            </span>
          </h2>
        </motion.div>

        <div className="contact-grid">

          {/* ── Left: Info panel ── */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#64748b' }}>
              We're here to help you grow. Get in touch with our team and start building a winning digital strategy today.
            </p>

            {/* Trust chips */}
            <div
              className="contact-info-chips"
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              {['Fast response', 'Expert support', 'Clear guidance'].map((label) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: '#1a1f2e',
                    padding: '0.55rem 1rem',
                    background: '#ffffff',
                    borderRadius: '0.75rem',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Check size={13} strokeWidth={4} color="var(--primary)" />
                  {label}
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { Icon: Mail,    label: 'Email Us',  value: 'support@growthapex.in' },
                { Icon: MapPin,  label: 'Based In',  value: 'India — Serving Globally' },
              ].map(({ Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    borderRadius: '0.75rem',
                    background: 'rgba(162,21,39,0.08)',
                    border: '1px solid rgba(162,21,39,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.1rem' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            className="contact-form-panel glass-panel"
            style={{
              borderRadius: '1.75rem',
              border: '1px solid var(--glass-border)',
              background: '#ffffff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '3rem 1rem' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                  Message Sent!
                </h3>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>

                {/* Row 1: First / Last */}
                <div className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      First Name <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input className="contact-input" type="text" placeholder="e.g. Rahul" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      Last Name <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input className="contact-input" type="text" placeholder="e.g. Sharma" required />
                  </div>
                </div>

                {/* Row 2: Email / Phone */}
                <div className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      Email <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input className="contact-input" type="email" placeholder="hello@yourbrand.com" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                      Phone <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input className="contact-input" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                {/* Row 3: Company / Subject */}
                <div className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Company</label>
                    <input className="contact-input" type="text" placeholder="Your company name" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Subject</label>
                    <input className="contact-input" type="text" placeholder="e.g. Lead Generation" />
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Message</label>
                  <textarea
                    className="contact-input"
                    rows="4"
                    placeholder="Tell us about your business & goals..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Submit */}
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      background: 'var(--primary)',
                      borderRadius: '0.875rem',
                      padding: '1rem 2rem',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                      fontFamily: 'var(--font-body)',
                      boxShadow: '0 8px 24px rgba(162,21,39,0.25)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.opacity = '0.92';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Send Message
                    <div style={{
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '34px', height: '34px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ArrowRight size={16} color="#fff" strokeWidth={3} />
                    </div>
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
