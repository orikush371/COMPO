// Supabase Edge Function: verify-paypal-purchase
//
// Deploy with: supabase functions deploy verify-paypal-purchase
// Requires these secrets set via `supabase secrets set`:
//   PAYPAL_CLIENT_ID
//   PAYPAL_CLIENT_SECRET
//   PAYPAL_API_BASE   (https://api-m.sandbox.paypal.com for testing,
//                       https://api-m.paypal.com for live)
//
// The browser calls this function with { orderId, templateSlug, buyerEmail }
// AFTER the PayPal button reports the buyer approved payment client-side.
// This function is the only thing allowed to write to `purchases` — it uses
// the service role key (available automatically inside Edge Functions) to
// bypass RLS, but only after independently confirming with PayPal's own API
// that the order was actually captured and paid. The browser's word alone
// is never trusted.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID')
const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET')
const PAYPAL_API_BASE = Deno.env.get('PAYPAL_API_BASE') ?? 'https://api-m.sandbox.paypal.com'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

async function getPayPalAccessToken() {
  const credentials = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error('Failed to authenticate with PayPal')
  const data = await res.json()
  return data.access_token
}

async function getPayPalOrder(orderId, accessToken) {
  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch PayPal order')
  return res.json()
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  // --- IP-based rate limit: max 10 purchase attempts per IP per hour ---
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
  const RATE_LIMIT_MAX = 10

  const { data: rateLimitRow } = await supabase
    .from('ip_rate_limits')
    .select('window_start, count')
    .eq('ip', ip)
    .eq('action', 'verify_purchase')
    .maybeSingle()

  const now = Date.now()
  if (rateLimitRow) {
    const windowStart = new Date(rateLimitRow.window_start).getTime()
    const withinWindow = now - windowStart < RATE_LIMIT_WINDOW_MS

    if (withinWindow && rateLimitRow.count >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: 'Too many attempts. Try again later.' }), { status: 429 })
    }

    await supabase
      .from('ip_rate_limits')
      .update(withinWindow ? { count: rateLimitRow.count + 1 } : { window_start: new Date().toISOString(), count: 1 })
      .eq('ip', ip)
      .eq('action', 'verify_purchase')
  } else {
    await supabase.from('ip_rate_limits').insert({ ip, action: 'verify_purchase', window_start: new Date().toISOString(), count: 1 })
  }

  try {
    const { orderId, templateSlug, buyerEmail } = await req.json()
    if (!orderId || !templateSlug || !buyerEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // Look up the template server-side — never trust a client-supplied price.
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('slug, price_cents, active')
      .eq('slug', templateSlug)
      .single()

    if (templateError || !template || !template.active) {
      return new Response(JSON.stringify({ error: 'Unknown or inactive template' }), { status: 404 })
    }

    // Independently verify the order with PayPal's own API.
    const accessToken = await getPayPalAccessToken()
    const order = await getPayPalOrder(orderId, accessToken)

    if (order.status !== 'COMPLETED') {
      return new Response(JSON.stringify({ error: 'Order not completed', status: order.status }), { status: 402 })
    }

    const capturedAmountCents = Math.round(
      parseFloat(order.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? '0') * 100
    )

    if (capturedAmountCents !== template.price_cents) {
      return new Response(JSON.stringify({ error: 'Amount mismatch' }), { status: 402 })
    }

    // Idempotent insert — a retried request with the same orderId won't double-record.
    const { error: insertError } = await supabase.from('purchases').insert({
      template_slug: templateSlug,
      buyer_email: buyerEmail,
      paypal_order_id: orderId,
      amount_cents: capturedAmountCents,
      status: 'completed',
    })

    if (insertError && !insertError.message.includes('duplicate key')) {
      throw insertError
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
