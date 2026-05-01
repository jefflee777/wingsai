-- Wings Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- USERS
-- ============================================
create table if not exists users (
  id uuid default uuid_generate_v4() primary key,
  wallet_address text unique not null,
  username text,
  avatar text,
  travel_style jsonb default '{}',
  reputation_score integer default 0,
  total_tokens numeric(20,4) default 0,
  level integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- JOURNEYS
-- ============================================
create type journey_status as enum ('planned', 'active', 'completed', 'abandoned');

create table if not exists journeys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  title text not null,
  description text,
  status journey_status default 'planned',
  destination text,
  route jsonb default '{}',
  ai_plan jsonb default '{}',
  budget numeric(12,2),
  total_rewards numeric(20,4) default 0,
  total_checkpoints integer default 0,
  verified_checkpoints integer default 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- CHECKPOINTS
-- ============================================
create table if not exists checkpoints (
  id uuid default uuid_generate_v4() primary key,
  journey_id uuid references journeys(id) on delete cascade,
  name text not null,
  description text,
  lat double precision not null,
  lng double precision not null,
  address text,
  rarity_score integer default 50 check (rarity_score >= 1 and rarity_score <= 100),
  category text default 'landmark',
  sort_order integer default 0,
  verified boolean default false,
  verified_at timestamptz,
  reward_value numeric(20,4) default 0,
  created_at timestamptz default now()
);

-- ============================================
-- VERIFICATIONS
-- ============================================
create type verify_method as enum ('gps', 'image', 'both');
create type verify_status as enum ('pending', 'approved', 'rejected', 'flagged');

create table if not exists verifications (
  id uuid default uuid_generate_v4() primary key,
  checkpoint_id uuid references checkpoints(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  method verify_method default 'gps',
  gps_lat double precision,
  gps_lng double precision,
  gps_accuracy double precision,
  distance_from_checkpoint double precision,
  image_url text,
  fraud_score double precision default 0,
  status verify_status default 'pending',
  created_at timestamptz default now()
);

-- ============================================
-- REWARDS
-- ============================================
create type reward_source as enum ('checkpoint', 'content', 'bonus', 'streak', 'referral');

create table if not exists rewards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  source reward_source default 'checkpoint',
  source_id uuid,
  amount numeric(20,4) not null,
  multiplier double precision default 1.0,
  final_amount numeric(20,4) not null,
  claimed boolean default false,
  claimed_at timestamptz,
  tx_hash text,
  earned_at timestamptz default now()
);

-- ============================================
-- CONTENT
-- ============================================
create type content_type as enum ('review', 'photo', 'tip', 'story');
create type content_status as enum ('pending', 'scored', 'rewarded', 'rejected');

create table if not exists content (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  checkpoint_id uuid references checkpoints(id) on delete set null,
  journey_id uuid references journeys(id) on delete set null,
  type content_type default 'review',
  title text,
  body text,
  media_urls text[] default '{}',
  quality_score double precision,
  reward_granted numeric(20,4) default 0,
  status content_status default 'pending',
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_journeys_user on journeys(user_id);
create index idx_journeys_status on journeys(status);
create index idx_checkpoints_journey on checkpoints(journey_id);
create index idx_verifications_user on verifications(user_id);
create index idx_rewards_user on rewards(user_id);
create index idx_rewards_claimed on rewards(claimed);
create index idx_content_user on content(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table users enable row level security;
alter table journeys enable row level security;
alter table checkpoints enable row level security;
alter table verifications enable row level security;
alter table rewards enable row level security;
alter table content enable row level security;

-- Public read for leaderboard
create policy "Public read users" on users for select using (true);
create policy "Public read journeys" on journeys for select using (true);
create policy "Public read content" on content for select using (true);
create policy "Public read checkpoints" on checkpoints for select using (true);
create policy "Public read verifications" on verifications for select using (true);
create policy "Public read rewards" on rewards for select using (true);

-- Insert/update/delete for authenticated (via service key from API routes)
create policy "Service insert users" on users for insert with check (true);
create policy "Service update users" on users for update using (true);
create policy "Service insert journeys" on journeys for insert with check (true);
create policy "Service update journeys" on journeys for update using (true);
create policy "Service delete journeys" on journeys for delete using (true);
create policy "Service insert checkpoints" on checkpoints for insert with check (true);
create policy "Service update checkpoints" on checkpoints for update using (true);
create policy "Service insert verifications" on verifications for insert with check (true);
create policy "Service update verifications" on verifications for update using (true);
create policy "Service insert rewards" on rewards for insert with check (true);
create policy "Service update rewards" on rewards for update using (true);
create policy "Service insert content" on content for insert with check (true);
create policy "Service update content" on content for update using (true);
