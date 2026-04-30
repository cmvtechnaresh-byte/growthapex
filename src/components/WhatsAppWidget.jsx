import React, { useState } from 'react';

const WA_MESSAGE = `Hi GrowthApex! 👋

I visited your website and I'm interested in growing my business.

I'd love to know more about:
✅ Social Media Management
✅ Performance Marketing (Meta/Google Ads)
✅ Flexible Sales Funnel Creation
✅ Lead Nurturing & Sales Training

Can we schedule a FREE Growth Audit call?

Looking forward to hearing from you! 🚀`;

const WhatsAppWidget = ({ phoneNumber = '919217648531' }) => {
  const [hovered, setHovered] = useState(false);

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <>
      {/* Floating Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
        }}
      >
        {/* Tooltip */}
        <span
          style={{
            background: '#fff',
            color: '#111',
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(10px)',
            transition: 'all 0.25s ease',
            pointerEvents: 'none',
            fontFamily: 'var(--font-body, Inter, sans-serif)',
          }}
        >
          Chat & Get Free Audit!
        </span>

        {/* WhatsApp Icon Button */}
        <span
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered
              ? '0 8px 30px rgba(37,211,102,0.55)'
              : '0 4px 20px rgba(37,211,102,0.4)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        >
          {/* WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="white"
          >
            <path d="M16.002 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.347.638 4.585 1.75 6.526L2.667 29.333l6.99-1.724A13.283 13.283 0 0 0 16.002 29.333c7.364 0 13.331-5.969 13.331-13.333 0-7.364-5.967-13.333-13.331-13.333zm0 24.267a11.011 11.011 0 0 1-5.612-1.533l-.402-.24-4.15 1.023 1.058-3.998-.263-.413A10.929 10.929 0 0 1 5.001 16c0-6.074 4.927-11.001 11.001-11.001S27.003 9.926 27.003 16c0 6.074-4.927 11.001-11.001 11.001v-.067zm5.968-8.234c-.326-.163-1.929-.952-2.228-1.061-.299-.109-.517-.163-.734.163-.218.326-.843 1.061-1.033 1.28-.19.218-.381.245-.707.082-.326-.163-1.376-.507-2.62-1.616-.968-.863-1.621-1.929-1.812-2.255-.19-.326-.02-.502.144-.664.148-.148.326-.381.489-.572.163-.19.217-.326.326-.544.109-.217.054-.408-.027-.571-.082-.163-.734-1.77-1.006-2.423-.265-.636-.534-.549-.734-.559-.19-.009-.408-.011-.626-.011-.218 0-.572.082-.871.408-.299.326-1.143 1.116-1.143 2.72s1.17 3.154 1.333 3.372c.163.217 2.303 3.518 5.582 4.934.78.336 1.389.537 1.864.688.783.249 1.496.214 2.06.13.628-.094 1.929-.788 2.201-1.549.272-.762.272-1.414.19-1.549-.081-.136-.299-.218-.625-.381z"/>
          </svg>
        </span>

        {/* Pulse ring */}
        <span
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'rgba(37, 211, 102, 0.35)',
            animation: 'wa-pulse 2s ease-out infinite',
            zIndex: -1,
          }}
        />
      </a>

      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 480px) {
          /* Slightly smaller on mobile */
        }
      `}</style>
    </>
  );
};

export default WhatsAppWidget;
