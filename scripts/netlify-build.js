// Netlify build script to inject environment variables
const fs = require('fs');
const path = require('path');

const templateMap = {
  'index.html': 'index.template.html',
  'admin.html': 'admin.template.html',
  'admin-orders.html': 'admin-orders.template.html',
  'table.html': 'table.template.html'
};

Object.entries(templateMap).forEach(([targetFile, templateFile]) => {
  const templatePath = path.join(__dirname, '..', templateFile);
  const targetPath = path.join(__dirname, '..', targetFile);
  
  if (fs.existsSync(templatePath)) {
    let html = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with Netlify env vars
    html = html.replace('YOUR_SUPABASE_URL', process.env.SUPABASE_URL);
    html = html.replace('YOUR_SUPABASE_ANON_KEY', process.env.SUPABASE_KEY);
    
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log(`✅ Injected env vars into ${targetFile}`);
  }
});
