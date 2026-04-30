import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Difference from './components/Difference';
import Process from './components/Process';
import Results from './components/Results';
import Niches from './components/Niches';
import BookAudit from './components/BookAudit';
import MiniAuditModal from './components/MiniAuditModal';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AuditFormPage from './pages/AuditFormPage';
import WhatsAppWidget from './components/WhatsAppWidget';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// The main homepage sections
const HomePage = ({ onOpenModal }) => (
  <>
    <Hero onOpenModal={onOpenModal} />
    <WhyUs />
    <Difference />
    <Services />
    <Process />
    <Results />
    <Niches />
    <BookAudit onOpenModal={onOpenModal} />
  </>
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isAdminPage = location.pathname.startsWith('/emslogin') || location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar onOpenModal={openModal} />}
      
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={openModal} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/audit" element={<AuditFormPage />} />
        
        {/* Admin Routes */}
        <Route path="/emslogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isAdminPage && <Footer onOpenModal={openModal} />}

      {/* WhatsApp Floating Widget */}
      {!isAdminPage && <WhatsAppWidget phoneNumber="919217648431" />}

      {/* Mini Audit Popup */}
      <MiniAuditModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
