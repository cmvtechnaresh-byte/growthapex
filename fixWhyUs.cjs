const fs = require('fs');
let content = fs.readFileSync('src/components/WhyUs.jsx', 'utf8');

// Container Background
content = content.replace(/background: 'linear-gradient\\(180deg, var\\(--bg-color\\) 0%, #0e0e18 50%, var\\(--bg-color\\) 100%\\)'/, "background: 'var(--bg-color)'");

// Grid lines
content = content.replace(/linear-gradient\\(rgba\\(255,255,255,0\.02\\) 1px/g, "linear-gradient(rgba(0,0,0,0.04) 1px");
content = content.replace(/linear-gradient\\(90deg, rgba\\(255,255,255,0\.02\\) 1px/g, "linear-gradient(90deg, rgba(0,0,0,0.04) 1px");

// Text Colors
content = content.replace(/color: '#f1f5f9'/g, "color: 'var(--text-primary)'");
content = content.replace(/color: '#64748b'/g, "color: 'var(--text-secondary)'");

// Card background and border
content = content.replace(/background: 'rgba\\(255,255,255,0\.03\\)'/g, "background: '#ffffff'");
content = content.replace(/border: '1px solid rgba\\(255,255,255,0\.07\\)'/g, "border: '1px solid rgba(0,0,0,0.08)'");

fs.writeFileSync('src/components/WhyUs.jsx', content, 'utf8');
console.log("WhyUs.jsx fixed!");
