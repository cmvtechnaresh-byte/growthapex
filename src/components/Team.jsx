import { Twitter, Instagram, Globe, Linkedin } from 'lucide-react';
import suryaImg from '../assets/57ce1803-7152-45dd-b1b7-6a94a3cf03eb.jpg';
import nareshImg from '../assets/4cf42b26-d987-439b-9915-41cfd9df81d8.jpg';
import vinayImg from '../assets/WhatsApp Image 2026-03-20 at 4.11.53 PM.jpeg';
import gauravImg from '../assets/gaurav.jpg';
import vijayImg from '../assets/Screenshot 2026-03-21 010644.png';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "Surya Pratap Singh",
    role: "Growth Strategist",
    image: suryaImg
  },
  {
    name: "Naresh Mandal",
    role: "Web Developer & Editor",
    image: nareshImg
  },
  {
    name: "Vinay Kumar",
    role: "Performance Specialist",
    image: vinayImg
  },
  {
    name: "Gaurav Rana",
    role: "Social Media Specialist",
    image: gauravImg
  },
  {
    name: "Vijay Singh",
    role: "Filmmaker",
    image: vijayImg
  }
];

// Duplicate for infinite scroll
const duplicatedMembers = [...teamMembers, ...teamMembers];

const Team = () => {
  return (
    <section className="section" id="team" style={{ background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Top Header */}
        <div className="text-center" style={{ marginBottom: '5rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--primary)' }}>*</span> OUR EXPERTS
          </div>
          
          <h2 
            style={{ 
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.1, 
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-2px'
            }}
          >
            Meet the <br /> <span className="text-gradient-primary">Engineering Team</span>
          </h2>
        </div>
      </div>

      {/* Auto-Slider Container */}
      <div style={{ padding: '2rem 0', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <motion.div 
          style={{ 
            display: 'flex', 
            gap: '2rem', 
            width: 'fit-content',
            paddingLeft: '2rem'
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
        >
          {duplicatedMembers.map((member, i) => (
            <div 
               key={i}
               style={{
                 minWidth: '320px',
                 width: '320px',
                 borderRadius: '2rem',
                 overflow: 'hidden',
                 position: 'relative',
                 aspectRatio: '3/4',
                 background: 'var(--bg-secondary)',
                 border: '1px solid rgba(255,255,255,0.06)',
                 boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                 flexShrink: 0
               }}
             >
              
              {/* Background Image */}
              <img 
                src={member.image} 
                alt={member.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85,
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
              />

              {/* Gradient Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9,9,15,0.95) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }}
              ></div>
              
              <div 
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  gap: '0.4rem',
                  zIndex: 10
                }}
              >
                <div style={{ background: 'rgba(30,30,30,0.6)', padding: '0.5rem', borderRadius: '8px', color: '#fff', display: 'flex', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Instagram size={13} />
                </div>
                <div style={{ background: 'rgba(30,30,30,0.6)', padding: '0.5rem', borderRadius: '8px', color: '#fff', display: 'flex', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Twitter size={13} />
                </div>
                <div style={{ background: 'rgba(30,30,30,0.6)', padding: '0.5rem', borderRadius: '8px', color: '#fff', display: 'flex', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Linkedin size={13} />
                </div>
              </div>

              {/* Text Container */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '2.5rem 2rem',
                  zIndex: 2
                }}
              >
                <h3 style={{ color: '#f1f5f9', fontSize: '1.4rem', marginBottom: '0.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px' }}>
                  {member.name}
                </h3>
                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {member.role}
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
