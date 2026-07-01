// Netlify build script to inject environment variables
const fs = require('fs');
const path = require('path');

const templateMap = {
  'index.html': 'index.template.html',
  'admin.html': 'admin.template.html',
  'admin-orders.html': 'admin-orders.template.html',
  'table.html': 'table.template.html'
};

console.log('🔍 Checking environment variables:');
console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
console.log('SUPABASE_KEY exists:', !!process.env.SUPABASE_KEY);

Object.entries(templateMap).forEach(([targetFile, templateFile]) => {
    const templatePath = path.join(__dirname, '..', templateFile);
    const targetPath = path.join(__dirname, '..', targetFile);
    
    console.log(`📄 Processing ${templateFile} → ${targetFile}`);
    
    if (fs.existsSync(templatePath)) {
        let html = fs.readFileSync(templatePath, 'utf8');
        
        // Only replace if we have real values
        const useUrl = (process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('YOUR') && !process.env.SUPABASE_URL.includes('your-project')) 
          ? process.env.SUPABASE_URL 
          : 'YOUR_SUPABASE_URL';
        
        const useKey = (process.env.SUPABASE_KEY && !process.env.SUPABASE_KEY.includes('YOUR') && !process.env.SUPABASE_KEY.includes('your-anon')) 
          ? process.env.SUPABASE_KEY 
          : 'YOUR_SUPABASE_ANON_KEY';
        
        // Replace placeholders with Netlify env vars
        html = html.replaceAll('YOUR_SUPABASE_URL', useUrl);
        html = html.replaceAll('YOUR_SUPABASE_ANON_KEY', useKey);
        
        fs.writeFileSync(targetPath, html, 'utf8');
        console.log(`✅ Injected env vars into ${targetFile}`);
    } else {
        console.log(`⚠️ Template file not found: ${templateFile}`);
    }
});
