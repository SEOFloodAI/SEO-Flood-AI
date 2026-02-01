// Supabase Configuration
// Replace these with your actual Supabase credentials after creating your project

import { createClient } from '@supabase/supabase-js';

// INSTRUCTIONS TO SET UP SUPABASE:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Project Settings > API
// 4. Copy the URL and anon/public key
// 5. Replace the values below

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Schema Setup Instructions:
/*
Run this SQL in your Supabase SQL Editor:

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'builder', 'renter', 'freelancer', 'employer', 'admin', 'superadmin')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  authority_score INTEGER DEFAULT 0,
  affiliate_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sites table
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT,
  content JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  authority_score INTEGER DEFAULT 0,
  traffic INTEGER DEFAULT 0,
  is_for_rent BOOLEAN DEFAULT false,
  rental_price INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rentals table
CREATE TABLE rentals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id),
  owner_id UUID REFERENCES users(id),
  renter_id UUID REFERENCES users(id),
  monthly_price INTEGER NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'pending', 'active', 'ended')),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('build', 'content', 'seo')),
  budget_min INTEGER,
  budget_max INTEGER,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent tasks table
CREATE TABLE agent_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  schedule TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  last_run TIMESTAMP,
  next_run TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Social posts table
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  site_id UUID REFERENCES sites(id),
  content TEXT NOT NULL,
  platforms TEXT[],
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
*/
