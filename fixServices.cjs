const fs = require('fs');
let content = fs.readFileSync('src/components/Services.jsx', 'utf8');

// Colors
content = content.replace(/color: '#f1f5f9'/g, "color: 'var(--text-primary)'");
content = content.replace(/color: '#64748b'/g, "color: 'var(--text-secondary)'");
content = content.replace(/color: '#94a3b8'/g, "color: 'var(--text-secondary)'");

// Borders
content = content.replace(/border: '1px solid rgba\(255,255,255,0\.07\)'/g, "border: '1px solid rgba(0,0,0,0.08)'");
content = content.replace(/borderLeft: '1px solid rgba\(255,255,255,0\.07\)'/g, "borderLeft: '1px solid rgba(0,0,0,0.08)'");
content = content.replace(/border-top: 1px solid rgba\(255,255,255,0\.07\)/g, "border-top: 1px solid rgba(0,0,0,0.08)");

// Box Shadows
content = content.replace(/boxShadow: '0 20px 60px rgba\(0,0,0,0\.3\)'/g, "boxShadow: '0 20px 60px rgba(0,0,0,0.08)'");

// Card backgrounds
content = content.replace(/background: 'rgba\(255,255,255,0\.03\)'/g, "background: '#ffffff'");

fs.writeFileSync('src/components/Services.jsx', content, 'utf8');
console.log("Services.jsx fixed!");
