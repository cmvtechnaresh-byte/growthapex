import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import Services from './components/Services';
import OtherServices from './components/OtherServices';
import Team from './components/Team';
import Calculator from './components/Calculator';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

// The main homepage sections
const HomePage = () => (
  <>
    <Hero />
    <AboutUs />
    <Stats />
    <Services />
    <OtherServices />
    <Team />
    <Calculator />
    <Testimonials />
    <Process />
    <ContactForm />
  </>
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
