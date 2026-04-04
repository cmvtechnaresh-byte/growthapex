const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.jsx', 'utf8');

content = content.replace(/<span style=\{\{([\s\S]*?)WebkitTextFillColor: 'transparent',([\s\S]*?)\}\}>/, '<span className="text-gradient-primary">');

fs.writeFileSync('src/components/Hero.jsx', content, 'utf8');
