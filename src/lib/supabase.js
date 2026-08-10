import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rtvcipqzbtlibelsenxo.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dmNpcHF6YnRsaWJlbHNlbnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMzY4NzgsImV4cCI6MjEwMTkxMjg3OH0.wDcGjGWiM8KYFisDxGYhYskw9pVviHCkztnUKujsDCg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
