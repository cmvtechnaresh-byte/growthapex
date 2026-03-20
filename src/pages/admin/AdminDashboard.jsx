import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { LogOut, Mail, Phone, Calendar, Search, Tag, Users, Inbox } from 'lucide-react';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
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

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '50px', marginBottom: '2rem' }} />
        
        <button 
          onClick={() => setActiveTab('contacts')}
          style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: activeTab === 'contacts' ? 'rgba(162,21,39,0.05)' : 'transparent', color: activeTab === 'contacts' ? 'var(--primary)' : '#64748b', border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Inbox size={20} />
          <span>Contact Leads ({contacts.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('newsletter')}
          style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: activeTab === 'newsletter' ? 'rgba(162,21,39,0.05)' : 'transparent', color: activeTab === 'newsletter' ? 'var(--primary)' : '#64748b', border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Mail size={20} />
          <span>Newsletter ({newsletter.length})</span>
        </button>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
           <button 
             onClick={handleLogout}
             style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', background: 'transparent', color: '#ef4444', border: 'none', textAlign: 'left', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.75rem' }}>
             <LogOut size={20} />
             <span>Sign Out</span>
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: '3rem', maxWidth: '1400px', width: '100%' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
             <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1a1f2e' }}>Dashboard Overview</h1>
             <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Managing growth business and leads</p>
          </div>
        </header>

        {activeTab === 'contacts' ? (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
            {contacts.map((c) => (
              <div key={c.id} style={{ background: '#fff', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(162,21,39,0.08)', padding: '0.4rem 0.8rem', borderRadius: '99px', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800 }}>
                     <Tag size={12} /> Contact Lead
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                     {c.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                  </span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                   <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1f2e', marginBottom: '0.25rem' }}>{c.email}</h3>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                      <Phone size={14} /> {c.phone}
                   </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem', fontSize: '0.9rem', color: '#1a1f2e' }}>
                   <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem' }}>
                      <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'block' }}>COACHING NICHE</label>
                      <span style={{ fontWeight: 600 }}>{c.niche}</span>
                   </div>
                   <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem' }}>
                      <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'block' }}>URL / SOCIALS</label>
                      <a href={c.socials} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, wordBreak: 'break-all' }}>{c.socials}</a>
                   </div>
                   <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem' }}>
                      <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'block' }}>TARGET REVENUE</label>
                      <span style={{ fontWeight: 600 }}>{Array.isArray(c.revenueGoal) ? c.revenueGoal.join(', ') : c.revenueGoal}</span>
                   </div>
                   <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem' }}>
                      <label style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'block' }}>MONTHLY AD SPEND</label>
                      <span style={{ fontWeight: 600 }}>{c.adSpend}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '1.5rem', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                   <tr>
                      <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>EMAIL ADDRESS</th>
                      <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>DATE ADDED</th>
                      <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>STATUS</th>
                   </tr>
                </thead>
                <tbody>
                   {newsletter.map((n) => (
                      <tr key={n.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                         <td style={{ padding: '1.25rem 2rem', fontWeight: 700, color: '#1a1f2e' }}>{n.email}</td>
                         <td style={{ padding: '1.25rem 2rem', color: '#64748b', fontSize: '0.9rem' }}>{n.createdAt?.toDate().toLocaleDateString()}</td>
                         <td style={{ padding: '1.25rem 2rem' }}>
                            <span style={{ padding: '0.3rem 0.7rem', background: 'rgba(34,197,94,0.1)', color: '#16a34a', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800 }}>ACTIVE</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
