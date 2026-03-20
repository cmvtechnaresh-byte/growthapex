import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded check as requested for the portal
    if (email === 'growthapex05@gmail.com' && password === 'growthapex@1234#') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '1.5rem', padding: '3rem 2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
           <img src="/logo.png" alt="Logo" style={{ height: '60px', marginBottom: '1.5rem' }} />
           <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1f2e' }}>Admin Portal</h2>
           <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Login to access lead details</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
             <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
             <input 
               type="email" 
               placeholder="Admin Email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} 
             />
          </div>

          <div style={{ position: 'relative' }}>
             <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
             <input 
               type="password" 
               placeholder="Password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} 
             />
          </div>

          {error && <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>{error}</p>}

          <button 
            type="submit"
            style={{ width: '100%', background: 'var(--primary)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            Login <LogIn size={20} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
