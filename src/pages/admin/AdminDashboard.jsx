import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import {
  LogOut, Mail, Phone, Calendar, Eye, X, TrendingUp,
  BarChart3, Clock, LayoutDashboard, ClipboardList, Users, CheckCircle
} from 'lucide-react';

/* ── small helpers ── */
const Cell = ({ label, value, full = false }) => (
  <div style={{
    background: 'rgba(255,255,255,0.02)', padding: '1.25rem 1.5rem',
    borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)',
    gridColumn: full ? '1 / -1' : undefined,
  }}>
    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{label}</div>
    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.92rem', wordBreak: 'break-word' }}>{value || '—'}</div>
  </div>
);

const SidebarBtn = ({ icon: Icon, label, tab, activeTab, onClick, count }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%', padding: '1rem', borderRadius: '14px',
      background: activeTab === tab ? 'rgba(4,190,150,0.1)' : 'transparent',
      color: activeTab === tab ? '#fff' : '#64748b',
      border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer',
      display: 'flex', gap: '0.75rem', alignItems: 'center', transition: '0.2s',
      borderLeft: activeTab === tab ? '3px solid #04BE96' : '3px solid transparent',
    }}
  >
    <Icon size={20} color={activeTab === tab ? '#04BE96' : 'inherit'} />
    <span style={{ flex: 1 }}>{label}</span>
    {count !== undefined && (
      <span style={{
        background: activeTab === tab ? '#04BE96' : 'rgba(255,255,255,0.08)',
        color: activeTab === tab ? '#fff' : '#94a3b8',
        fontSize: '0.72rem', fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '99px',
      }}>{count}</span>
    )}
  </button>
);

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [auditForms, setAuditForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('audits');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/emslogin');
      return;
    }
    const fetchData = async () => {
      try {
        const [snapContacts, snapNews, snapAudits] = await Promise.all([
          getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))),
          getDocs(query(collection(db, 'newsletter'), orderBy('createdAt', 'desc'))),
          getDocs(query(collection(db, 'audit_forms'), orderBy('createdAt', 'desc'))),
        ]);
        setContacts(snapContacts.docs.map(d => ({ id: d.id, ...d.data() })));
        setNewsletter(snapNews.docs.map(d => ({ id: d.id, ...d.data() })));
        setAuditForms(snapAudits.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/emslogin');
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090915', color: '#94a3b8', fontSize: '1rem', fontWeight: 700 }}>
      Loading command center...
    </div>
  );

  const fmt = (ts) => ts?.toDate?.()?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || '—';

  return (
    <div style={{ minHeight: '100vh', background: '#090915', color: '#f1f5f9', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Sidebar ── */}
      <div style={{ width: '270px', background: '#0c0c1a', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexShrink: 0 }}>
        <div style={{ padding: '0 0.75rem', marginBottom: '2.5rem' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '50px', filter: 'brightness(1.2)' }} onError={e => e.target.style.display='none'} />
          <div style={{ marginTop: '0.5rem', fontSize: '0.68rem', color: '#64748b', fontWeight: 800, letterSpacing: '1.5px' }}>COMMAND CENTER</div>
        </div>

        <SidebarBtn icon={ClipboardList} label="Audit Forms" tab="audits" activeTab={activeTab} count={auditForms.length} onClick={() => setActiveTab('audits')} />
        <SidebarBtn icon={Users} label="Leads Pipeline" tab="contacts" activeTab={activeTab} count={contacts.length} onClick={() => setActiveTab('contacts')} />
        <SidebarBtn icon={Mail} label="Newsletter Subs" tab="newsletter" activeTab={activeTab} count={newsletter.length} onClick={() => setActiveTab('newsletter')} />

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={handleLogout}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.12)', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center' }}
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flexGrow: 1, padding: '3rem', overflowY: 'auto' }}>

        {/* Header */}
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: '0.4rem', letterSpacing: '-1.5px' }}>Command Center</h1>
            <p style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>
              {auditForms.length} audit forms · {contacts.length} leads · {newsletter.length} subscribers
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#0c0c1a', padding: '0.65rem 1.25rem', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Clock size={15} color="#04BE96" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8' }}>Live: <span style={{ color: '#04BE96' }}>Active</span></span>
          </div>
        </header>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'Audit Forms', val: auditForms.length, icon: ClipboardList, color: '#04BE96' },
            { label: 'Pipeline Leads', val: contacts.length, icon: TrendingUp, color: '#164EAA' },
            { label: 'Newsletter Subs', val: newsletter.length, icon: Mail, color: '#8b5cf6' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '1.75rem', borderRadius: '1.5rem', background: '#0c0c1a', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '10px', background: `${s.color}18`, color: s.color }}>
                  <s.icon size={20} />
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.4rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── AUDIT FORMS TAB ── */}
        {activeTab === 'audits' && (
          <div style={{ background: '#0c0c1a', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ClipboardList size={18} color="#04BE96" />
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Growth Audit Submissions</h2>
              <span style={{ marginLeft: 'auto', background: 'rgba(4,190,150,0.1)', color: '#04BE96', padding: '0.3rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 800 }}>
                {auditForms.length} total
              </span>
            </div>
            {auditForms.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>No audit submissions yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      {['Name', 'WhatsApp', 'Email', 'Describes', 'Revenue', 'Ready', 'Date', ''].map(h => (
                        <th key={h} style={{ padding: '1rem 1.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditForms.map((a) => (
                      <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '1rem 1.5rem', color: '#fff', fontWeight: 800, whiteSpace: 'nowrap' }}>{a.fullName}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <a href={`https://wa.me/${a.whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                            style={{ color: '#04BE96', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                            {a.whatsapp}
                          </a>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontSize: '0.88rem' }}>{a.email}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ background: 'rgba(4,190,150,0.08)', color: '#04BE96', padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                            {a.describes?.split(' ').slice(0, 3).join(' ')}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{a.revenue}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{
                            color: a.readyToInvest?.includes('ready') ? '#04BE96' : '#f59e0b',
                            fontWeight: 800, fontSize: '0.78rem',
                            background: a.readyToInvest?.includes('ready') ? 'rgba(4,190,150,0.1)' : 'rgba(245,158,11,0.1)',
                            padding: '0.3rem 0.7rem', borderRadius: '8px',
                          }}>
                            {a.readyToInvest?.includes('ready') ? '🔥 Hot' : a.readyToInvest?.includes('Possibly') ? '⏳ Warm' : '💤 Cold'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{fmt(a.createdAt)}</td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedItem({ ...a, _type: 'audit' })}
                            style={{ background: '#fff', color: '#111', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 900, fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
                          >
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {activeTab === 'contacts' && (
          <div style={{ background: '#0c0c1a', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users size={18} color="#164EAA" />
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Leads Pipeline</h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                <tr>
                  {['Lead Info', 'Niche', 'Date', 'Action'].map(h => (
                    <th key={h} style={{ padding: '1rem 2rem', color: '#64748b', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ fontWeight: 800, color: '#fff' }}>{c.email}</div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>{c.phone}</div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <span style={{ background: 'rgba(22,78,170,0.1)', color: '#164EAA', padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900 }}>{c.niche}</span>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', color: '#94a3b8', fontSize: '0.88rem' }}>{fmt(c.createdAt)}</td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <button onClick={() => setSelectedItem({ ...c, _type: 'contact' })}
                        style={{ background: '#fff', color: '#111', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 900, fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── NEWSLETTER TAB ── */}
        {activeTab === 'newsletter' && (
          <div style={{ background: '#0c0c1a', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} color="#8b5cf6" />
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Newsletter Subscribers</h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                <tr>
                  {['Email Address', 'Date Added', 'Status'].map(h => (
                    <th key={h} style={{ padding: '1rem 2rem', color: '#64748b', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {newsletter.map((n) => (
                  <tr key={n.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '1.25rem 2rem', color: '#fff', fontWeight: 700 }}>{n.email}</td>
                    <td style={{ padding: '1.25rem 2rem', color: '#94a3b8', fontSize: '0.88rem' }}>{fmt(n.createdAt)}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <span style={{ color: '#04BE96', fontWeight: 800, fontSize: '0.78rem', background: 'rgba(4,190,150,0.1)', padding: '0.35rem 0.75rem', borderRadius: '20px' }}>Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,10,0.88)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedItem(null); }}>
          <div style={{ background: '#0c0c1a', width: '100%', maxWidth: selectedItem._type === 'audit' ? '780px' : '520px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>

            {/* Modal header */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', margin: 0 }}>
                  {selectedItem._type === 'audit' ? '🎯 Audit Form — ' + selectedItem.fullName : '📋 Lead — ' + selectedItem.email}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.3rem 0 0', fontWeight: 600 }}>Submitted on {fmt(selectedItem.createdAt)}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', color: '#94a3b8', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '2rem 2.5rem', overflowY: 'auto', flexGrow: 1 }}>

              {selectedItem._type === 'audit' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Quick contact strip */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={`https://wa.me/${selectedItem.whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                      style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(4,190,150,0.1)', border: '1px solid rgba(4,190,150,0.2)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#04BE96', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                      📱 {selectedItem.whatsapp}
                    </a>
                    <a href={`mailto:${selectedItem.email}`}
                      style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(22,78,170,0.1)', border: '1px solid rgba(22,78,170,0.2)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#6699ff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                      ✉️ {selectedItem.email}
                    </a>
                  </div>

                  {/* Section 1 */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#04BE96', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>§1 — About</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <Cell label="Full Name" value={selectedItem.fullName} />
                      <Cell label="Business Name" value={selectedItem.businessName} />
                      <Cell label="Describes As" value={selectedItem.describes} full />
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#04BE96', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>§2 — Business Now</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <Cell label="Business Age" value={selectedItem.businessAge} />
                      <Cell label="Monthly Revenue" value={selectedItem.revenue} />
                      <Cell label="Client Source" value={selectedItem.clientSource} />
                      <Cell label="Sales Team" value={selectedItem.salesTeam} />
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#04BE96', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>§3 — Marketing</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <Cell label="Running Ads" value={selectedItem.runningAds} />
                      <Cell label="Weekly Ad Budget" value={selectedItem.adBudget} />
                      <Cell label="Has Funnel" value={selectedItem.funnel} />
                      <Cell label="After Interest" value={selectedItem.afterInterest} />
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#04BE96', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>§4 — Goals</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <Cell label="Primary Goal" value={selectedItem.primaryGoal} />
                      <Cell label="Revenue Target" value={selectedItem.revenueTarget} />
                      <Cell label="Biggest Blocker" value={selectedItem.biggestBlock} full />
                      <Cell label="Agency Before" value={selectedItem.agencyBefore} />
                      <Cell label="Ready to Invest" value={selectedItem.readyToInvest} />
                      {selectedItem.agencyWrong && <Cell label="What Went Wrong" value={selectedItem.agencyWrong} full />}
                    </div>
                  </div>
                </div>
              ) : (
                /* Contact lead detail */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Cell label="Email" value={selectedItem.email} />
                    <Cell label="Phone" value={selectedItem.phone} />
                  </div>
                  <Cell label="Niche" value={selectedItem.niche} />
                  <Cell label="Ad Spend" value={selectedItem.adSpend} />
                  <Cell label="Social / Website" value={selectedItem.socials} />
                  <Cell label="Revenue Goal" value={Array.isArray(selectedItem.revenueGoal) ? selectedItem.revenueGoal.join(', ') : selectedItem.revenueGoal} />
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedItem(null)}
                style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
