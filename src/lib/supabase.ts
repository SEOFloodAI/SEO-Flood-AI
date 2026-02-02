import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type UserRole = 'user' | 'builder' | 'renter' | 'freelancer' | 'employer' | 'admin' | 'superadmin';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type SiteStatus = 'draft' | 'published' | 'rented' | 'archived';
export type RentalStatus = 'trial' | 'active' | 'cancelled' | 'expired';
export type JobType = 'build' | 'content' | 'seo' | 'marketing';
export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  authority_score: number;
  affiliate_code?: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  company?: string;
  website?: string;
  location?: string;
  created_at: string;
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  domain?: string;
  subdomain: string;
  category: string;
  status: SiteStatus;
  authority_score: number;
  traffic_estimate: number;
  monthly_rental_price?: number;
  is_available_for_rent: boolean;
  seo_meta?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SitePage {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  content: string;
  target_keyword: string;
  meta_title: string;
  meta_description: string;
  schema_markup?: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  redirect_to_main: boolean;
  redirect_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Rental {
  id: string;
  site_id: string;
  page_id?: string;
  renter_user_id?: string;
  client_email: string;
  client_name?: string;
  client_website: string;
  overlay_url: string;
  monthly_price: number;
  status: RentalStatus;
  trial_ends_at?: string;
  subscription_starts_at?: string;
  subscription_ends_at?: string;
  paypal_subscription_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AIAgent {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  base_prompt: string;
  design_standards?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  employer_user_id: string;
  title: string;
  description: string;
  job_type: JobType;
  budget_min?: number;
  budget_max?: number;
  skills?: string[];
  status: JobStatus;
  created_at: string;
  updated_at: string;
}

export interface JobProposal {
  id: string;
  job_id: string;
  freelancer_user_id: string;
  cover_letter?: string;
  proposed_budget?: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
