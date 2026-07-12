/**
 * Cafe Coffee Delight — Supabase Client & DB Helpers
 *
 * ================================================================
 *  IMPORTANT: FIRST-TIME SETUP
 *  1. Create a Supabase project at https://supabase.com/dashboard
 *  2. Copy your Project URL and anon/public key from Project Settings → API
 *  3. Run the SQL in `setup.sql` in your Supabase project's SQL Editor
 *     (Dashboard → SQL Editor → New Query → Paste → Run ▶)
 *  4. Configure environment variables (see .env.example for details)
 * ================================================================
 */

const SUPABASE_URL = window.ENV?.SUPABASE_URL || '';
const SUPABASE_KEY = window.ENV?.SUPABASE_KEY || '';

window.sb = null;
let _supaClient = null;

try {
    if (SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_URL !== 'https://your-project-id.supabase.co' && SUPABASE_KEY && SUPABASE_KEY !== 'YOUR_SUPABASE_ANON_KEY' && SUPABASE_KEY !== 'your-anon-public-key') {
        _supaClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        window.sb = _supaClient;
    }
} catch (e) {
    console.log('Supabase not configured yet, using local data');
}

/* ===== MENU ITEMS ===== */

async function sbGetMenuItems() {
    if (!_supaClient) return null;
    const { data, error } = await _supaClient
        .from('menu_items')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) { console.error('[SB] getMenuItems:', error.message); return null; }
    return data || [];
}

async function sbUpsertMenuItem(item, sortOrder) {
    if (!_supaClient) return false;
    const { error } = await _supaClient.from('menu_items').upsert({
        name: item.name,
        price: Number(item.price),
        category: item.category,
        image: item.image || '',
        description: item.description || '',
        available: item.available !== false,
        sort_order: sortOrder ?? 0
    }, { onConflict: 'name' });
    if (error) { console.error('[SB] upsertMenuItem:', error.message); return false; }
    return true;
}

async function sbDeleteMenuItem(name) {
    if (!_supaClient) return false;
    const { error } = await _supaClient.from('menu_items').delete().eq('name', name);
    if (error) { console.error('[SB] deleteMenuItem:', error.message); return false; }
    return true;
}

async function sbSaveAllMenuItems(items) {
    if (!_supaClient) return false;
    const payload = items.map((item, i) => ({
        name: item.name,
        price: Number(item.price),
        category: item.category,
        image: item.image || '',
        description: item.description || '',
        available: item.available !== false,
        sort_order: i
    }));
    const { error } = await _supaClient.from('menu_items').upsert(payload, { onConflict: 'name' });
    if (error) { console.error('[SB] saveAllMenuItems:', error.message); return false; }
    return true;
}

async function sbSeedMenuIfEmpty(localItems) {
    if (!_supaClient) return false;
    const existing = await sbGetMenuItems();
    if (existing === null || existing.length > 0) return false;
    const payload = localItems.map((item, i) => ({
        name: item.name,
        price: Number(item.price),
        category: item.category,
        image: item.image || '',
        description: item.description || '',
        available: true,
        sort_order: i
    }));
    const { error } = await _supaClient.from('menu_items').insert(payload);
    if (error) { console.error('[SB] seedMenu:', error.message); return false; }
    console.log('✅ Menu seeded to Supabase!');
    return true;
}

/* ===== CONFIG ===== */

async function sbGetConfig() {
    if (!_supaClient) return null;
    const { data, error } = await _supaClient
        .from('config').select('data').eq('id', 1).maybeSingle();
    if (error) { console.error('[SB] getConfig:', error.message); return null; }
    return data?.data || null;
}

async function sbSaveConfig(configData) {
    if (!_supaClient) return false;
    const { error } = await _supaClient
        .from('config').upsert({ id: 1, data: configData });
    if (error) { console.error('[SB] saveConfig:', error.message); return false; }
    return true;
}

/* ===== CATEGORY OVERRIDES ===== */

async function sbGetCategoryOverrides() {
    if (!_supaClient) return {};
    const { data, error } = await _supaClient.from('category_overrides').select('*');
    if (error) { console.error('[SB] getCategoryOverrides:', error.message); return {}; }
    const result = {};
    (data || []).forEach(row => { result[row.cat_id] = row.label; });
    return result;
}

async function sbSaveCategoryOverride(catId, label) {
    if (!_supaClient) return false;
    const { error } = await _supaClient.from('category_overrides').upsert({ cat_id: catId, label });
    if (error) { console.error('[SB] saveCategoryOverride:', error.message); return false; }
    return true;
}

/* ===== ORDERS ===== */

async function sbSaveOrder(orderData) {
    if (!_supaClient) return null;
    const { data, error } = await _supaClient.from('orders').insert({
        table_number: orderData.tableNumber || null,
        customer_name: orderData.customerName || 'Guest',
        customer_phone: orderData.customerPhone || null,
        items: orderData.items,
        subtotal: orderData.subtotal,
        gst: orderData.gst,
        total: orderData.total,
        notes: orderData.notes || null,
        status: 'pending'
    }).select().single();
    if (error) { console.error('[SB] saveOrder:', error.message); return null; }
    return data;
}

async function sbGetOrders(limit = 200) {
    if (!_supaClient) return [];
    const { data, error } = await _supaClient
        .from('orders').select('*')
        .order('created_at', { ascending: false }).limit(limit);
    if (error) { console.error('[SB] getOrders:', error.message); return []; }
    return data || [];
}

async function sbUpdateOrderStatus(id, status) {
    if (!_supaClient) return false;
    const { error } = await _supaClient.from('orders').update({ status }).eq('id', id);
    if (error) { console.error('[SB] updateOrderStatus:', error.message); return false; }
    return true;
}

/* ===== RESET ===== */

async function sbResetMenuData() {
    if (!_supaClient) return;
    await _supaClient.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await _supaClient.from('config').delete().neq('id', 0);
    await _supaClient.from('category_overrides').delete().neq('cat_id', '__none__');
}

/* ===== REAL-TIME ===== */

function sbSubscribeMenuChanges(callback) {
    if (!_supaClient) return null;
    return _supaClient.channel('menu_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, callback)
        .subscribe();
}

function sbSubscribeOrderChanges(callback) {
    if (!_supaClient) return null;
    return _supaClient.channel('orders_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
        .subscribe();
}


