import { Twitter, Instagram, Globe } from 'lucide-react';
import suryaImg from '../assets/57ce1803-7152-45dd-b1b7-6a94a3cf03eb.jpg';
import nareshImg from '../assets/4cf42b26-d987-439b-9915-41cfd9df81d8.jpg';
import vinayImg from '../assets/WhatsApp Image 2026-03-20 at 4.11.53 PM.jpeg';
import gauravImg from '../assets/gaurav.jpg';

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
  }
];

const Team = () => {
  return (
    <section className="section bg-secondary" id="team" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        
        {/* Top Header */}
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', fontWeight: 700 }}>* MEET OUR TEAM</div>
          
          <h2 
            className="heading-xl" 
            style={{ 
              lineHeight: 1.1, 
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)'
            }}
          >
            Meet experts behind your <br/> 
            <span style={{ fontStyle: 'italic' }} className="text-primary">growth business</span>
          </h2>
        </div>

        {/* Team Grid (2-4 Columns) */}
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div 
               key={i}
               className="hover-card"
               style={{
                 borderRadius: '1.5rem',
                 overflow: 'hidden',
                 position: 'relative',
                 aspectRatio: '3/4',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                 background: '#000'
               }}
             >
              
              {/* Background Image */}
              <img 
                src={member.image} 
                alt={member.name} 
                className="team-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9,
                  transition: 'transform 0.5s ease',
                  border: 'none',
                  display: 'block'
                }}
              />

              {/* Gradient Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '60%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }}
              ></div>
              
              {/* Social Icons Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <a href="#" style={{ background: 'rgba(30,30,30,0.8)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', display: 'flex', transition: 'background 0.2s', backdropFilter: 'blur(4px)' }} onMouseOver={e => e.currentTarget.style.background = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(30,30,30,0.8)'}>
                  <Twitter size={16} />
                </a>
                <a href="#" style={{ background: 'rgba(30,30,30,0.8)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', display: 'flex', transition: 'background 0.2s', backdropFilter: 'blur(4px)' }} onMouseOver={e => e.currentTarget.style.background = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(30,30,30,0.8)'}>
                  <Instagram size={16} />
                </a>
                <a href="#" style={{ background: 'rgba(30,30,30,0.8)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', display: 'flex', transition: 'background 0.2s', backdropFilter: 'blur(4px)' }} onMouseOver={e => e.currentTarget.style.background = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(30,30,30,0.8)'}>
                  <Globe size={16} />
                </a>
              </div>

              {/* Text Container */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '2rem 1.5rem',
                  zIndex: 2
                }}
              >
                <h3 className="heading-sm" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: 600 }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {member.role}
                </p>
              </div>

            </div>
          ))}
        </div>

        <style>{`
          .team-grid {
             display: grid;
             gap: 2rem;
             grid-template-columns: repeat(4, 1fr);
          }
          .hover-card:hover .team-img {
             transform: scale(1.05);
          }
          @media (max-width: 1200px) {
             .team-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 900px) {
             .team-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
             .team-grid { grid-template-columns: 1fr; }
          }
        `}</style>
        
      </div>
    </section>
  );
};

export default Team;
