const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Function to inject environment variables into HTML
function injectEnvVars(html) {
  const envScript = `
    <script>
      window.ENV = {
        SUPABASE_URL: '${process.env.SUPABASE_URL}',
        SUPABASE_KEY: '${process.env.SUPABASE_KEY}'
      };
    </script>
  `;
  return html.replace('</head>', envScript + '</head>');
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Add secure HTTP headers
  const secureHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code === 'ENOENT') {
        fs.readFile('./index.html', (error, content) => {
          let html = content.toString('utf-8');
          html = injectEnvVars(html);
          res.writeHead(200, { 'Content-Type': 'text/html', ...secureHeaders });
          res.end(html, 'utf-8');
        });
      } else {
        res.writeHead(500, secureHeaders);
        res.end('Server error');
      }
    } else {
      if (extname === '.html') {
        let html = content.toString('utf-8');
        html = injectEnvVars(html);
        res.writeHead(200, { 'Content-Type': 'text/html', ...secureHeaders });
        res.end(html, 'utf-8');
      } else {
        res.writeHead(200, { 'Content-Type': contentType, ...secureHeaders });
        res.end(content, 'utf-8');
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
