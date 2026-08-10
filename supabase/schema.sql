-- Run this once in Supabase → SQL Editor → New query → paste → Run

-- Templates table: mirrors src/data/templates.js so purchase state lives server-side.
create table if not exists templates (
  slug text primary key,
  name text not null,
  price_cents integer not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Purchases table: one row per completed PayPal payment.
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  template_slug text not null references templates(slug),
  buyer_email text not null,
  paypal_order_id text not null unique,
  amount_cents integer not null,
  status text not null default 'pending', -- 'pending' | 'completed' | 'failed'
  created_at timestamptz not null default now()
);

-- Seed the three templates currently shown on /templates.
insert into templates (slug, name, price_cents) values
  ('saas-landing', 'SaaS Landing Page', 1900),
  ('dashboard-starter', 'Dashboard Starter', 2400),
  ('ecommerce-product-page', 'E-commerce Product Page', 1500)
on conflict (slug) do nothing;

-- Row Level Security: templates are publicly readable; purchases are NOT
-- publicly readable (a buyer should only ever see confirmation of their own
-- purchase, handled via a server-side check, not a client-side select).
alter table templates enable row level security;
alter table purchases enable row level security;

create policy "templates are publicly readable"
  on templates for select
  using (true);

-- No public select/insert/update policy on purchases: all purchase writes
-- happen through a server-side function once PayPal payment is verified,
-- never directly from the browser with the anon key.

-- ============================================================
-- Auth-related tables (added for user accounts + marketplace uploads)
-- ============================================================

-- Public profile info, one row per authenticated user.
-- Supabase Auth already handles the actual login (email+password or GitHub);
-- this table only holds the extra public-facing fields.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  github_username text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are publicly readable"
  on profiles for select
  using (true);

create policy "users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- User-submitted components, held for review before they appear anywhere public.
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  description text not null,
  code text not null,
  status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
  rejection_reason text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table submissions enable row level security;

-- Users can see their own submissions (including pending/rejected ones).
create policy "users can view their own submissions"
  on submissions for select
  using (auth.uid() = user_id);

-- Users can submit, but only up to 5 pending submissions at a time
-- (enforced in the app layer / edge function, not just RLS, since RLS can't
-- easily count rows). This policy only checks ownership.
create policy "users can insert their own submissions"
  on submissions for insert
  with check (auth.uid() = user_id);

-- Simple per-user rate limiting: tracks the last write time per action,
-- checked by edge functions before allowing another write.
create table if not exists rate_limits (
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  window_start timestamptz not null default now(),
  count integer not null default 1,
  primary key (user_id, action)
);

alter table rate_limits enable row level security;
-- No public policies at all: only edge functions (via service role) touch this table.

-- IP-based rate limiting for anonymous endpoints (e.g. the PayPal verify
-- function, which runs before any login exists). Keyed by IP + action
-- instead of user_id since the caller isn't authenticated.
create table if not exists ip_rate_limits (
  ip text not null,
  action text not null,
  window_start timestamptz not null default now(),
  count integer not null default 1,
  primary key (ip, action)
);

alter table ip_rate_limits enable row level security;
-- No public policies: only edge functions (via service role) touch this table.


