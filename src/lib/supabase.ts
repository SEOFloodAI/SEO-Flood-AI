// Supabase Configuration
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lkpawfnbmlwxdiwqnied.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcGF3Zm5ibWx3eGRpd3FuaWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTAzNzksImV4cCI6MjA4NDE2NjM3OX0.kTx9eM9bnpYSsc9bqRwKQvNSZg67iCqge6_vzkrtaH8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Schema Setup Instructions:
/* [SQL comments truncated for brevity - same as before] */
