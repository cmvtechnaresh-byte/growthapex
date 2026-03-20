import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, DollarSign, Users, Award } from 'lucide-react';

const Calculator = () => {
  const [budget, setBudget] = useState(15000);
  const [cpl, setCpl] = useState(200);
  const [cr, setCr] = useState(5);
  const [acv, setAcv] = useState(25000);

  const leads = Math.floor(budget / cpl) || 0;
  const clients = Math.floor(leads * (cr / 100)) || 0;
  const revenue = clients * acv || 0;

  return (
    <section className="section bg-secondary" id="calculator" style={{ position: 'relative' }}>
      <style>{`
        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .calculator-inputs {
          padding: 3rem;
        }
        .calculator-outputs {
          padding: 2rem;
        }
        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
          .calculator-inputs {
            padding: 2rem;
          }
        }
        @media (max-width: 640px) {
          .calculator-inputs {
            padding: 1.5rem;
          }
          .calculator-outputs {
            padding: 1.25rem;
          }
          .revenue-value {
             font-size: 1.75rem !important;
          }
          .output-card {
             flex-direction: column !important;
             align-items: flex-start !important;
             gap: 0.5rem !important;
          }
          .output-card-val {
             font-size: 1.5rem !important;
             align-self: flex-end;
          }
        }
      `}</style>
      <div className="bg-glow glow-center" style={{ opacity: 0.2 }}></div>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge mb-4">Interactive Tool</div>
          <h2 className="heading-sm" style={{ marginBottom: '1rem', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            <span className="text-gradient-primary">Revenue Growth</span> Calculator
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            See the exact math of how our systems scale your coaching or consulting business.
          </p>
        </div>

        <div className="calculator-grid">
          {/* Inputs */}
          <div className="glass calculator-inputs">
            <div className="input-group">
              <label style={{ fontWeight: 600 }}>Monthly Ad Budget (₹)</label>
              <input type="number" className="input-field" value={budget} onChange={e => setBudget(Number(e.target.value))} />
            </div>
            <div className="input-group">
              <label style={{ fontWeight: 600 }}>Cost Per Lead (CPL) (₹)</label>
              <input type="number" className="input-field" value={cpl} onChange={e => setCpl(Number(e.target.value))} />
            </div>
            <div className="input-group">
              <label style={{ fontWeight: 600 }}>Lead-to-Client Conversion Rate (%)</label>
              <input type="number" className="input-field" value={cr} onChange={e => setCr(Number(e.target.value))} />
            </div>
            <div className="input-group">
              <label style={{ fontWeight: 600 }}>Average Client Value (₹)</label>
              <input type="number" className="input-field" value={acv} onChange={e => setAcv(Number(e.target.value))} />
            </div>
          </div>

          {/* Outputs */}
          <div 
             className="glass-panel calculator-outputs" style={{ border: '1px solid var(--primary)', background: 'rgba(162,21,39,0.02)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
            <h3 className="heading-sm" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 700 }}>
              <CalcIcon className="text-primary" size={24}/> Estimated Monthly Output
            </h3>
            
            <div className="flex-col gap-4">
              <div className="glass output-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.04)', borderRadius: '0.5rem' }}><Users size={20}/></div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Estimated Leads</div>
                </div>
                <div className="output-card-val" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{leads}</div>
              </div>

              <div className="glass output-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.04)', borderRadius: '0.5rem' }}><Award size={20}/></div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Estimated Clients</div>
                </div>
                <div className="output-card-val" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{clients}</div>
              </div>

              <div className="glass output-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(162,21,39,0.06)', borderColor: 'rgba(162,21,39,0.15)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.6rem', background: 'var(--primary)', color: 'white', borderRadius: '0.5rem' }}><DollarSign size={22}/></div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Revenue</div>
                </div>
                <div className="revenue-value" style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1px' }}>₹{revenue.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a href="#contact" className="btn btn-primary btn-glow" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                🚀 Book Strategy Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
