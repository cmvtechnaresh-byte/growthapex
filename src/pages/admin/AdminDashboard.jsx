import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { LogOut, Mail, Phone, Calendar, Search, Tag, Users, Inbox, Eye, X, TrendingUp, BarChart3, Clock, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const [selectedLead, setSelectedLead] = useState(null); // For Detail Modal
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/emslogin');
      return;
    }

    const fetchData = async () => {
      try {
        const qContacts = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
        const qNews = query(collection(db, "newsletter"), orderBy("createdAt", "desc"));

        const snapshotContacts = await getDocs(qContacts);
        const snapshotNews = await getDocs(qNews);

        setContacts(snapshotContacts.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setNewsletter(snapshotNews.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090f', color: '#fff' }}>Loading command center...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#090915', color: '#f1f5f9', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', background: '#0c0c1a', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 5 }}>
        <div style={{ padding: '0 1rem', marginBottom: '2.5rem' }}>
           <img src="/logo.png" alt="Logo" style={{ height: '55px', filter: 'brightness(1.2)' }} />
           <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px' }}>CORE COMMAND CENTER</div>
        </div>
        
        <button 
          onClick={() => setActiveTab('contacts')}
          style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: activeTab === 'contacts' ? 'rgba(224,32,53,0.1)' : 'transparent', color: activeTab === 'contacts' ? '#fff' : '#64748b', border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center', transition: '0.2s', borderLeft: activeTab === 'contacts' ? '3px solid var(--primary)' : '3px solid transparent' }}>
          <LayoutDashboard size={20} color={activeTab === 'contacts' ? 'var(--primary)' : 'inherit'} />
          <span>Leads Pipeline</span>
        </button>

        <button 
          onClick={() => setActiveTab('newsletter')}
          style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: activeTab === 'newsletter' ? 'rgba(224,32,53,0.1)' : 'transparent', color: activeTab === 'newsletter' ? '#fff' : '#64748b', border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center', transition: '0.2s', borderLeft: activeTab === 'newsletter' ? '3px solid var(--primary)' : '3px solid transparent' }}>
          <Mail size={20} color={activeTab === 'newsletter' ? 'var(--primary)' : 'inherit'} />
          <span>Newsletter Subs</span>
        </button>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
           <button 
             onClick={handleLogout}
             style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.1)', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
             <LogOut size={20} />
             <span>Sign Out</span>
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: '3.5rem', maxWidth: '1600px', width: '100%', overflowY: 'auto' }}>
        <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-1.5px' }}>Command Center</h1>
             <p style={{ color: '#64748b', fontWeight: 600 }}>Managing {contacts.length + newsletter.length} total growth assets across the platform.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#0c0c1a', padding: '0.75rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <Clock size={16} color="var(--primary)" />
             <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>Live Engine Status: <span style={{ color: '#10b981' }}>Active</span></span>
          </div>
        </header>

        {/* STATS OVERVIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
           {[
             { label: 'Pipeline Leads', val: contacts.length, icon: Users, color: '#e02035' },
             { label: 'Newsletter Subs', val: newsletter.length, icon: Mail, color: '#3b82f6' },
             { label: 'Growth Target', val: '84%', icon: TrendingUp, color: '#10b981' },
             { label: 'Conversions', val: '12.4%', icon: BarChart3, color: '#8b5cf6' }
           ].map((stat, i) => (
             <div key={i} style={{ padding: '2rem', borderRadius: '2rem', background: '#0c0c1a', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                   <div style={{ padding: '0.75rem', borderRadius: '14px', background: `${stat.color}15`, color: stat.color }}>
                      <stat.icon size={22} />
                   </div>
                   <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800 }}>+2.4% ↑</div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '0.25rem' }}>{stat.val}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
             </div>
           ))}
        </div>

        {activeTab === 'contacts' ? (
          <div style={{ background: '#0c0c1a', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <tr>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>LEAD INFO</th>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>NICHE</th>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>DATE</th>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>ACTION</th>
                   </tr>
                </thead>
                <tbody>
                   {contacts.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                         <td style={{ padding: '1.5rem 2.5rem' }}>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>{c.email}</div>
                            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>{c.phone}</div>
                         </td>
                         <td style={{ padding: '1.5rem 2.5rem' }}>
                            <span style={{ background: 'rgba(224,32,53,0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
                               {c.niche}
                            </span>
                         </td>
                         <td style={{ padding: '1.5rem 2.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>
                            {c.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                         </td>
                         <td style={{ padding: '1.5rem 2.5rem', textAlign: 'right' }}>
                            <button 
                              onClick={() => setSelectedLead(c)}
                              style={{ background: '#fff', color: '#000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                               <Eye size={16} /> Analysis
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        ) : (
          <div style={{ background: '#0c0c1a', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <tr>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>EMAIL ADDRESS</th>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>DATE ADDED</th>
                      <th style={{ padding: '1.5rem 2.5rem', color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>STATUS</th>
                   </tr>
                </thead>
                <tbody>
                   {newsletter.map((n) => (
                      <tr key={n.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                         <td style={{ padding: '1.5rem 2.5rem', color: '#fff', fontWeight: 700 }}>{n.email}</td>
                         <td style={{ padding: '1.5rem 2.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                            {n.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                         </td>
                         <td style={{ padding: '1.5rem 2.5rem' }}>
                            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', background: 'rgba(16,185,129,0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>Active</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,10,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
           <div style={{ background: '#0c0c1a', width: '100%', maxWidth: '500px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: '2.5rem', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(224,32,53,0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <TrendingUp size={28} />
                    </div>
                    <div>
                       <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>Lead Intelligence</h3>
                       <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Sync complete • Captured on {selectedLead.createdAt?.toDate().toLocaleDateString()}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedLead(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', color: '#94a3b8', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={20} />
                 </button>
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', flexGrow: 1 }}>
                 
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                       <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Primary Channel</label>
                       <div style={{ fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}><Mail size={16} color="var(--primary)" /> {selectedLead.email}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                       <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Contact Phone</label>
                       <div style={{ fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}><Phone size={16} color="var(--primary)" /> {selectedLead.phone}</div>
                    </div>
                 </div>

                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Industry Focus / Niche</label>
                    <div style={{ fontWeight: 900, color: '#fff', fontSize: '1.25rem' }}>{selectedLead.niche}</div>
                 </div>

                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Digital Footprint</label>
                    <a href={selectedLead.socials} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)', wordBreak: 'break-all' }}>{selectedLead.socials}</a>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                       <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Growth Target</label>
                       <div style={{ fontWeight: 800, color: '#f1f5f9' }}>{Array.isArray(selectedLead.revenueGoal) ? selectedLead.revenueGoal.join(', ') : selectedLead.revenueGoal}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                       <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' }}>Allocated Ad Spend</label>
                       <div style={{ fontWeight: 800, color: '#f1f5f9' }}>{selectedLead.adSpend}</div>
                    </div>
                 </div>
              </div>

              <div style={{ padding: '2rem 2.5rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
                 <button 
                   onClick={() => setSelectedLead(null)}
                   style={{ padding: '1rem 2rem', borderRadius: '14px', background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 10px 20px rgba(224,32,53,0.3)' }}>
                    Close Intelligence
                 </button>
              </div>

           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
