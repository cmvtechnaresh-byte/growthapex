const fs = require('fs');

const fixContactForm = () => {
  let content = fs.readFileSync('src/components/ContactForm.jsx', 'utf8');

  // Labels
  content = content.replace(/color: isModal \? '#94a3b8' : '#374151'/g, "color: 'var(--text-primary)'");
  content = content.replace(/color: '#94a3b8'/g, "color: 'var(--text-primary)'");
  
  // Card
  content = content.replace(/background: isModal \? 'transparent' : 'rgba\\(255,255,255,0\.03\\)'/, "background: isModal ? 'transparent' : '#ffffff'");
  content = content.replace(/border: isModal \? 'none' : '1px solid #f1f5f9'/, "border: isModal ? 'none' : '1px solid rgba(0,0,0,0.08)'");
  
  // Input classes
  content = content.replace(/border: 1\.5px solid rgba\\(255,255,255,0\.1\\);/g, "border: 1.5px solid rgba(0,0,0,0.12);");
  content = content.replace(/background: rgba\\(255,255,255,0\.05\\);/g, "background: '#ffffff';"); // WAIT, this might break if it's css class
  content = content.replace(/background: rgba\\(255,255,255,0\.08\\);/g, "background: '#ffffff';"); 
  
  // Let me replace CSS specifically:
  content = content.replace(
    /border: 1\.5px solid rgba\(255,255,255,0\.1\);\s*background: rgba\(255,255,255,0\.05\);\s*font-size: 1rem;\s*outline: none;\s*transition: all 0\.2s ease;\s*font-family: var\(--font-body\);\s*color: #f1f5f9;/g,
    `border: 1.5px solid rgba(0,0,0,0.15);\n          background: #ffffff;\n          font-size: 1rem;\n          outline: none;\n          transition: all 0.2s ease;\n          font-family: var(--font-body);\n          color: var(--text-primary);`
  );

  content = content.replace(
    /border-color: var\(--primary\);\s*box-shadow: 0 0 0 4px rgba\(22, 78, 170,0\.15\);\s*background: rgba\(255,255,255,0\.08\);/g,
    `border-color: var(--primary);\n          box-shadow: 0 0 0 4px rgba(22, 78, 170,0.15);\n          background: #ffffff;`
  );

  content = content.replace(
    /border-right: 1\.5px solid rgba\(255,255,255,0\.1\);\s*height: 100%;\s*position: absolute;\s*left: 0;\s*pointer-events: none;\s*background: rgba\(255,255,255,0\.03\);/g,
    `border-right: 1.5px solid rgba(0,0,0,0.12);\n           height: 100%;\n           position: absolute;\n           left: 0;\n           pointer-events: none;\n           background: rgba(0,0,0,0.03);`
  );

  content = content.replace(/color: '#f1f5f9'/g, "color: 'var(--text-primary)'");
  content = content.replace(/border: 2px solid rgba\(255,255,255,0\.2\);/g, "border: 2px solid rgba(0,0,0,0.2);");

  fs.writeFileSync('src/components/ContactForm.jsx', content, 'utf8');
}

const fixContactModal = () => {
    let content = fs.readFileSync('src/components/ContactModal.jsx', 'utf8');
    
    // Transform dark modal container into a bright light modal container
    content = content.replace(
        /background: 'linear-gradient\(145deg, rgba\(15,23,42,0\.95\) 0%, rgba\(9,9,15,0\.98\) 100%\)'/g,
        "background: '#ffffff'"
    );
    content = content.replace(
        /border: '1px solid rgba\(255,255,255,0\.08\)'/g,
        "border: '1px solid rgba(0,0,0,0.08)'"
    );
    content = content.replace(/color: '#f1f5f9'/g, "color: 'var(--text-primary)'");
    content = content.replace(/color: '#94a3b8'/g, "color: 'var(--text-secondary)'");

    fs.writeFileSync('src/components/ContactModal.jsx', content, 'utf8');
}

fixContactForm();
fixContactModal();

console.log("Contact redesigned for light UI");
