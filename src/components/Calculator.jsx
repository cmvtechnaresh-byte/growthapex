import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

const Calculator = ({ onOpenModal }) => {
  const [currentRevenue, setCurrentRevenue] = useState(500000);
  const [targetGrowth, setTargetGrowth] = useState(1); // multiplier
  const [adBudget, setAdBudget] = useState(50000);

  const estimatedROAS = 3.5;
  const projectedRevenue = currentRevenue + (adBudget * estimatedROAS);
  const potentialGrowth = ((projectedRevenue - currentRevenue) / currentRevenue) * 100;

  return (
    <section className="section" id="calculator" style={{ position: 'relative', overflow: 'hidden', background: '#09090f' }}>
      <div
        style={{
          position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(224,32,53,0.08) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none'
        }}
      />
      <div className="container">

        <div className="text-center" style={{ marginBottom: '5rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 800 }}>* ROI CALCULATOR</div>
          <h2 className="heading-xl" style={{ fontWeight: 700, lineHeight: 1.1 }}>
            See Your <span className="text-gradient-primary">Growth Potential</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '2rem auto 0', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.7 }}>
            Stop guessing your marketing impact. Use our data-driven growth model to project reach, leads, and revenue based on proven performance benchmarks.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>

          {/* Inputs */}
          <div
            style={{
              padding: '3.5rem 3rem',
              borderRadius: '2.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.4 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'flex-end' }}>
                  <label style={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '0.5px' }}>CURRENT MONTHLY REVENUE</label>
                  <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>₹{currentRevenue.toLocaleString()}</span>
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(parseInt(e.target.value))}
                    className="custom-range"
                  />
                </div>
              </div>
              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'flex-end' }}>
                  <label style={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '0.5px' }}>MONTHLY AD BUDGET</label>
                  <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>₹{adBudget.toLocaleString()}</span>
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min="20000"
                    max="1000000"
                    step="10000"
                    value={adBudget}
                    onChange={(e) => setAdBudget(parseInt(e.target.value))}
                    className="custom-range"
                  />
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(162,21,39,0.05)', borderRadius: '1.25rem', border: '1px solid rgba(162,21,39,0.15)' }}>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, fontWeight: 500 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>* NOTE:</span> This estimate is based on an average <span style={{ color: '#f1f5f9', fontWeight: 700 }}>{estimatedROAS}x ROAS</span>. High-ticket businesses often see much higher conversion returns.
                </p>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ width: '100%' }}
          >
            <div
              style={{
                background: 'linear-gradient(145deg, #e02035 0%, #a21527 100%)',
                padding: '4rem 3.5rem',
                borderRadius: '2.5rem',
                color: '#fff',
                boxShadow: '0 40px 80px rgba(224,32,53,0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute', top: '-50%', right: '-30%', width: '400px', height: '400px',
                  background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none'
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>PROJECTED MONTHLY REVENUE</span>
                  <h3 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, marginBottom: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-2.5px', textShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    ₹{Math.round(projectedRevenue).toLocaleString()}
                  </h3>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', width: '100%' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={28} color="#fff" strokeWidth={3} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>+{Math.round(potentialGrowth)}%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 700, textTransform: 'uppercase' }}>Growth Potential</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenModal && onOpenModal()}
                    className="btn"
                    style={{
                      background: '#fff',
                      color: 'var(--primary)',
                      padding: '1.25rem 2.25rem',
                      borderRadius: '1.25rem',
                      fontWeight: 900,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Book Growth Strategy <ArrowRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .custom-range {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 5px;
          outline: none;
          cursor: pointer;
        }
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          background: var(--primary);
          border: 3px solid #f1f5f9;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(224,32,53,0.4);
          transition: all 0.2s;
        }
        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 25px rgba(224,32,53,0.6);
        }
        @media (max-width: 1024px) {
           #calculator .grid-2 {
              grid-template-columns: 1fr;
              gap: 3rem;
           }
        }
        @media (max-width: 600px) {
           #calculator h3 { font-size: 2.2rem !important; }
           #calculator .badge { margin-bottom: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Calculator;
