// Supabase Edge Function: submit-component
//
// Requires the caller to be authenticated (browser sends the user's JWT
// automatically via supabase.functions.invoke). Enforces:
//   1. Rate limit: max 5 submissions per user per rolling 24h window.
//   2. Max 5 *pending* submissions at a time (prevents queue flooding).
//   3. Basic code screening: rejects obviously malicious patterns before
//      anything is stored (this is NOT a substitute for human review -
//      it only blocks the most obvious abuse, e.g. remote script injection).
//   4. Size limit on submitted code (50 KB) to prevent abuse.
//
// All submissions land with status='pending' and are never shown publicly
// until a human approves them (moderation happens outside this function,
// e.g. directly in the Supabase table editor or a future admin page).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const MAX_CODE_BYTES = 50_000
const MAX_PENDING_SUBMISSIONS = 5
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000
const RATE_LIMIT_MAX_PER_WINDOW = 5

// Patterns that have no legitimate place in a copy-paste UI component and
// are the cheapest, highest-signal things to block automatically.
const BLOCKED_PATTERNS = [
  /<script[\s>]/i,
  /\beval\s*\(/,
  /new\s+Function\s*\(/,
  /document\.write/,
  /\bfetch\s*\(\s*['"`]https?:\/\//i, // no legitimate reason a UI snippet needs to call out to a URL
  /\bXMLHttpRequest\b/,
  /process\.env/,
  /require\s*\(\s*['"`]child_process['"`]\s*\)/,
]

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))

  if (userError || !user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
  }

  try {
    const { name, category, description, code } = await req.json()

    if (!name?.trim() || !category?.trim() || !description?.trim() || !code?.trim()) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 })
    }

    if (new TextEncoder().encode(code).length > MAX_CODE_BYTES) {
      return new Response(JSON.stringify({ error: 'Component code is too large (max 50KB)' }), { status: 400 })
    }

    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(code)) {
        return new Response(
          JSON.stringify({ error: 'Submission contains a disallowed pattern and was rejected automatically.' }),
          { status: 400 }
        )
      }
    }

    // --- Rate limiting ---
    const { data: rateLimitRow } = await supabase
      .from('rate_limits')
      .select('window_start, count')
      .eq('user_id', user.id)
      .eq('action', 'submit_component')
      .maybeSingle()

    const now = Date.now()
    if (rateLimitRow) {
      const windowStart = new Date(rateLimitRow.window_start).getTime()
      const withinWindow = now - windowStart < RATE_LIMIT_WINDOW_MS

      if (withinWindow && rateLimitRow.count >= RATE_LIMIT_MAX_PER_WINDOW) {
        return new Response(
          JSON.stringify({ error: 'Submission limit reached. Try again tomorrow.' }),
          { status: 429 }
        )
      }

      await supabase
        .from('rate_limits')
        .update(
          withinWindow
            ? { count: rateLimitRow.count + 1 }
            : { window_start: new Date().toISOString(), count: 1 }
        )
        .eq('user_id', user.id)
        .eq('action', 'submit_component')
    } else {
      await supabase.from('rate_limits').insert({
        user_id: user.id,
        action: 'submit_component',
        window_start: new Date().toISOString(),
        count: 1,
      })
    }

    // --- Pending-submission cap ---
    const { count: pendingCount } = await supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'pending')

    if ((pendingCount ?? 0) >= MAX_PENDING_SUBMISSIONS) {
      return new Response(
        JSON.stringify({ error: `You already have ${MAX_PENDING_SUBMISSIONS} submissions pending review.` }),
        { status: 429 }
      )
    }

    const { data: submission, error: insertError } = await supabase
      .from('submissions')
      .insert({
        user_id: user.id,
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        code,
        status: 'pending',
      })
      .select('id, name, category, status, created_at, rejection_reason')
      .single()

    if (insertError) throw insertError

    return new Response(JSON.stringify({ success: true, submission }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
