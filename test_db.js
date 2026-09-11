require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

async function testConnection() {
  console.log("Testing connection to Supabase via REST API...");
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/menu_items?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
        const err = await response.text();
        console.error("Connection failed or table 'menu_items' does not exist.");
        console.error("Status:", response.status, response.statusText);
        console.error("Error details:", err);
    } else {
        const data = await response.json();
        console.log("✅ Connection successful!");
        console.log("Sample data from 'menu_items':", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testConnection();
