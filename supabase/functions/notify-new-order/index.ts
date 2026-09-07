import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SignJWT, importPKCS8 } from 'https://deno.land/x/jose@v4.14.4/index.ts'

// Helper to get Google OAuth access token using a Service Account
async function getAccessToken(clientEmail: string, privateKey: string) {
  const scope = 'https://www.googleapis.com/auth/firebase.messaging'
  const key = await importPKCS8(privateKey, 'RS256')
  const jwt = await new SignJWT({ scope })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience('https://oauth2.googleapis.com/token')
    .setExpirationTime('1h')
    .setIssuedAt()
    .sign(key)
    
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })
  const data = await res.json()
  return data.access_token
}

serve(async (req) => {
  try {
    // 1. Get the order data from the Postgres Webhook payload
    const payload = await req.json()
    
    // We only care about new inserts (new orders)
    if (payload.type !== 'INSERT') {
       return new Response(JSON.stringify({ message: "Not a new order" }), { status: 200 })
    }

    const order = payload.record;

    // 2. Initialize Supabase client to fetch all logged-in admin devices
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: devices, error: dbError } = await supabase
      .from('admin_devices')
      .select('fcm_token')

    if (dbError || !devices || devices.length === 0) {
      return new Response(JSON.stringify({ message: "No admin devices to notify" }), { status: 200 })
    }

    // 3. Get Firebase credentials from Supabase Secrets
    const serviceAccountStr = Deno.env.get('FIREBASE_SERVICE_ACCOUNT')
    if (!serviceAccountStr) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT secret is missing')
    }
    const serviceAccount = JSON.parse(serviceAccountStr)

    // 4. Authenticate with Google
    const accessToken = await getAccessToken(serviceAccount.client_email, serviceAccount.private_key)

    // 5. Send FCM message to all devices
    const projectId = serviceAccount.project_id
    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`

    const itemsStr = typeof order.items === 'string' ? order.items : JSON.stringify(order.items || []);

    const messageTemplate = {
      message: {
        data: {
          type: "new_order",
          orderId: String(order.id || ''),
          tableNumber: String(order.table_number || ''),
          customerName: String(order.customer_name || 'Guest'),
          customerPhone: String(order.customer_phone || ''),
          items: itemsStr,
          subtotal: String(order.subtotal || 0),
          gst: String(order.gst || 0),
          total: String(order.total || 0),
          notes: String(order.notes || ''),
          createdAt: String(order.created_at || '')
        },
        android: {
          priority: 'high'
        }
      }
    }

    const results = [];
    for (const device of devices) {
        messageTemplate.message.token = device.fcm_token;
        const res = await fetch(fcmUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(messageTemplate)
        });
        results.push(await res.json());
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})
