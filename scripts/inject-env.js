// Script to inject environment variables into HTML files for local development using templates
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Map original HTML files to their templates
const templateMap = {
  'index.html': 'index.template.html',
  'admin.html': 'admin.template.html',
  'admin-orders.html': 'admin-orders.template.html',
  'table.html': 'table.template.html'
};

// First, make sure we have templates for all files
Object.values(templateMap).forEach(templateFile => {
  const templatePath = path.join(__dirname, '..', templateFile);
  if (!fs.existsSync(templatePath)) {
    // If template doesn't exist, create it from the current file
    const originalFile = Object.keys(templateMap).find(key => templateMap[key] === templateFile);
    const originalPath = path.join(__dirname, '..', originalFile);
    if (fs.existsSync(originalPath)) {
      let content = fs.readFileSync(originalPath, 'utf8');
      // Replace any existing env vars with placeholders
      content = content.replace(
        /SUPABASE_URL:\s*['"][^'"]*['"]/g,
        "SUPABASE_URL: 'YOUR_SUPABASE_URL'"
      );
      content = content.replace(
        /SUPABASE_KEY:\s*['"][^'"]*['"]/g,
        "SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY'"
      );
      fs.writeFileSync(templatePath, content, 'utf8');
      console.log(`✅ Created template ${templateFile} from ${originalFile}`);
    }
  }
});

// Now inject env vars into the actual HTML files from templates
Object.entries(templateMap).forEach(([targetFile, templateFile]) => {
  const templatePath = path.join(__dirname, '..', templateFile);
  const targetPath = path.join(__dirname, '..', targetFile);
  
  if (fs.existsSync(templatePath)) {
    let html = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with actual env vars
    html = html.replace('YOUR_SUPABASE_URL', process.env.SUPABASE_URL);
    html = html.replace('YOUR_SUPABASE_ANON_KEY', process.env.SUPABASE_KEY);
    
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log(`✅ Injected env vars into ${targetFile}`);
  }
});
