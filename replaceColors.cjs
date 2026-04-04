const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/#e02035/g, '#164EAA');
  content = content.replace(/#E02035/g, '#164EAA');
  
  content = content.replace(/rgba\(224,\s*32,\s*53/g, 'rgba(22, 78, 170');
  content = content.replace(/rgba\(162,\s*21,\s*39/g, 'rgba(22, 78, 170');
  
  content = content.replace(/#c01a2c/g, '#12408D');
  content = content.replace(/#C01A2C/g, '#12408D');

  // Specific replacement for the linear gradient in Hero component that I've seen
  content = content.replace(/linear-gradient\(135deg,\s*#164EAA\s*0%,\s*#ff6b6b\s*60%,\s*#ff9e5e\s*100%\)/g, 'linear-gradient(135deg, #164EAA 0%, #04BE96 100%)');
  // Also any other #ff6b6b / #ff9e5e gradients
  content = content.replace(/#ff6b6b|#ff9e5e/gi, '#04BE96');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done.');
