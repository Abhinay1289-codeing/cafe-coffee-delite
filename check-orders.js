const https = require('https');

const url = 'https://luhwhzsyjsiwdmwrohwc.supabase.co/rest/v1/orders?select=id,table_number,customer_name,total,status,created_at,items&order=created_at.desc&limit=40';
const options = {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aHdoenN5anNpd2Rtd3JvaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MTE5NTUsImV4cCI6MjEwMzM4Nzk1NX0.ZtNOL4PAvdY8udDYki3vTjuCw4jb8UdeZ4_abOMaWT0',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aHdoenN5anNpd2Rtd3JvaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MTE5NTUsImV4cCI6MjEwMzM4Nzk1NX0.ZtNOL4PAvdY8udDYki3vTjuCw4jb8UdeZ4_abOMaWT0'
  }
};

https.get(url, options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const orders = JSON.parse(body);
      console.log('Fetched recent orders count:', orders.length);
      
      const timeDuplicates = [];
      for (let i = 0; i < orders.length; i++) {
        for (let j = i + 1; j < orders.length; j++) {
          const o1 = orders[i];
          const o2 = orders[j];
          if (o1.table_number === o2.table_number && o1.total === o2.total && JSON.stringify(o1.items) === JSON.stringify(o2.items)) {
            const timeDiff = Math.abs(new Date(o1.created_at) - new Date(o2.created_at));
            if (timeDiff < 60000) { // Placed within 60 seconds
              timeDuplicates.push({ o1, o2, timeDiffSec: timeDiff / 1000 });
            }
          }
        }
      }

      console.log('\n--- RECENT ORDERS LIST ---');
      orders.forEach((o, idx) => {
        console.log(`[${idx+1}] ID: ${o.id} | Table: #${o.table_number} | Customer: ${o.customer_name} | Total: ₹${o.total} | Status: ${o.status} | Created: ${o.created_at}`);
      });

      console.log('\n--- DUPLICATE ORDER DETECTED? ---');
      if (timeDuplicates.length === 0) {
        console.log('✅ NO DUPLICATE ORDERS FOUND in recent orders!');
      } else {
        console.log(`⚠️ FOUND ${timeDuplicates.length} POTENTIAL DUPLICATE PAIRS:`);
        timeDuplicates.forEach(pair => {
          console.log(`- Table #${pair.o1.table_number} (₹${pair.o1.total}) - ID ${pair.o1.id} & ID ${pair.o2.id} created ${pair.timeDiffSec} seconds apart.`);
        });
      }
    } catch(e) {
      console.error('Parse error:', e, body);
    }
  });
}).on('error', e => console.error(e));
