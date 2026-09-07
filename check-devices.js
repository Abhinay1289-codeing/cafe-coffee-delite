require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // using anon key is fine since we have open read policy
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('admin_devices').select('*');
    if (error) console.error(error);
    else console.log('Devices:', data);
}
check();
