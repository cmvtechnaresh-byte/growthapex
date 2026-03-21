import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import Services from './components/Services';
import Team from './components/Team';
import WhyUs from './components/WhyUs';
import Calculator from './components/Calculator';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import Clients from './components/Clients';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// The main homepage sections
const HomePage = ({ onOpenModal }) => (
  <>
    <Hero onOpenModal={onOpenModal} />
    <Clients />
    <AboutUs />
    <Stats />
    <Services />
    <WhyUs />
    <Team />
    <Calculator onOpenModal={onOpenModal} />
    <Testimonials />
    <Process />
    <ContactForm />
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
        
        {/* Admin Routes */}
        <Route path="/emslogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isAdminPage && <Footer onOpenModal={openModal} />}
      
      {/* Global Contact Popup */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
