const fs = require('fs');

const fixColors = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/var\(--text-primary\)/g, "#0f172a");
  content = content.replace(/var\(--text-secondary\)/g, "#475569");
  content = content.replace(/color: '#f1f5f9'/g, "color: '#0f172a'");
  content = content.replace(/color: '#64748b'/g, "color: '#475569'");
  content = content.replace(/color: '#94a3b8'/g, "color: '#475569'");
  
  // also fix background and borders if missed
  content = content.replace(/background: 'rgba\\(255,255,255,0\.04\\)'/g, "background: '#ffffff'");
  content = content.replace(/background: 'rgba\\(255,255,255,0\.05\\)'/g, "background: '#ffffff'");
  content = content.replace(/background: 'rgba\\(255,255,255,0\.06\\)'/g, "background: '#ffffff'");
  content = content.replace(/background: 'rgba\\(255,255,255,0\.15\\)'/g, "background: 'rgba(0,0,0,0.1)'");
  content = content.replace(/border: '1px solid rgba\\(255,255,255,0\.07\\)'/g, "border: '1px solid rgba(0,0,0,0.08)'");
  content = content.replace(/border: '1px solid rgba\\(255,255,255,0\.08\\)'/g, "border: '1px solid rgba(0,0,0,0.08)'");
  content = content.replace(/border: '1px solid rgba\\(255,255,255,0\.1\\)'/g, "border: '1px solid rgba(0,0,0,0.08)'");
  content = content.replace(/border: '1\.5px solid rgba\\(255,255,255,0\.1\\)'/g, "border: '1.5px solid rgba(0,0,0,0.12)'");
  content = content.replace(/borderTop: '1px solid rgba\\(255,255,255,0\.06\\)'/g, "borderTop: '1px solid rgba(0,0,0,0.08)'");
  content = content.replace(/borderTop: '1px solid rgba\\(255,255,255,0\.07\\)'/g, "borderTop: '1px solid rgba(0,0,0,0.08)'");

  fs.writeFileSync(filePath, content, 'utf8');
}

fixColors('src/components/Footer.jsx');
try {
  fixColors('src/components/FreeResource.jsx');
} catch (e) { }

console.log("Footer fixed");
