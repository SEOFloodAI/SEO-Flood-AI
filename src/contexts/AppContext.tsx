import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type UserRole = 'user' | 'builder' | 'renter' | 'freelancer' | 'employer' | 'admin' | 'superadmin';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  authorityScore: number;
  affiliateCode?: string;
  createdAt: string;
  // New profile fields
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  company?: string;
  website?: string;
  location?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  updateUserTier: (userId: string, tier: SubscriptionTier) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Demo users for testing before Supabase setup
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'demo@seoflood.ai': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@seoflood.ai',
      fullName: 'Demo User',
      role: 'builder',
      subscriptionTier: 'pro',
      authorityScore: 78,
      avatarUrl: '',
      bio: 'Professional SEO specialist',
      phone: '+1 (555) 123-4567',
      company: 'SEO Masters Inc.',
      website: 'https://seomasters.com',
      location: 'New York, NY',
      createdAt: new Date().toISOString(),
    }
  },
  'seofloodai@gmail.com': {
    password: 'Pierre007007%%%',
    user: {
      id: '2',
      email: 'seofloodai@gmail.com',
      fullName: 'Super Admin',
      role: 'superadmin',
      subscriptionTier: 'enterprise',
      authorityScore: 100,
      affiliateCode: 'ADMIN001',
      avatarUrl: '',
      bio: 'Platform administrator',
      phone: '+1 (555) 999-0000',
      company: 'SEO Flood AI',
      website: 'https://seo-flood-ai.vercel.app',
      location: 'Global',
      createdAt: new Date().toISOString(),
    }
  },
  'admin@seoflood.ai': {
    password: 'admin123',
    user: {
      id: '3',
      email: 'admin@seoflood.ai',
      fullName: 'Admin User',
      role: 'admin',
      subscriptionTier: 'enterprise',
      authorityScore: 95,
      avatarUrl: '',
      bio: 'Platform moderator',
      phone: '+1 (555) 888-7777',
      company: 'SEO Flood AI',
      website: 'https://seo-flood-ai.vercel.app',
      location: 'United States',
      createdAt: new Date().toISOString(),
    }
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('seoflood_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const refreshUser = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        const updatedUser: User = {
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          role: data.role,
          subscriptionTier: data.subscription_tier,
          authorityScore: data.authority_score || 0,
          affiliateCode: data.affiliate_code,
          avatarUrl: data.avatar_url,
          bio: data.bio,
          phone: data.phone,
          company: data.company,
          website: data.website,
          location: data.location,
          createdAt: data.created_at,
        };
        setUser(updatedUser);
        localStorage.setItem('seoflood_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Check demo users first
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem('seoflood_user', JSON.stringify(demoUser.user));
      setIsLoading(false);
      return { success: true };
    }

    // Try Supabase auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userData: User = {
          id: data.user.id,
          email: data.user.email!,
          fullName: profile?.full_name || '',
          role: profile?.role || 'user',
          subscriptionTier: profile?.subscription_tier || 'free',
          authorityScore: profile?.authority_score || 0,
          affiliateCode: profile?.affiliate_code,
          avatarUrl: profile?.avatar_url,
          bio: profile?.bio,
          phone: profile?.phone,
          company: profile?.company,
          website: profile?.website,
          location: profile?.location,
          createdAt: profile?.created_at,
        };

        setUser(userData);
        localStorage.setItem('seoflood_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }

    setIsLoading(false);
    return { success: true };
  };

  const signup = async (email: string, password: string, fullName: string, role: UserRole) => {
    setIsLoading(true);

    try {
      // Try Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create user profile
      if (data.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role,
          subscription_tier: 'free',
        });

        const newUser: User = {
          id: data.user.id,
          email,
          fullName,
          role,
          subscriptionTier: 'free',
          authorityScore: 0,
          createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        localStorage.setItem('seoflood_user', JSON.stringify(newUser));
      }
    } catch (error) {
      console.error('Signup error:', error);
      // For demo, create local user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName,
        role,
        subscriptionTier: 'free',
        authorityScore: 0,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('seoflood_user', JSON.stringify(newUser));
    }

    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('seoflood_user');
  };

  const updateUserRole = async (userId: string, role: UserRole) => {
    if (user?.role === 'superadmin' || user?.role === 'admin') {
      await supabase.from('users').update({ role }).eq('id', userId);
    }
  };

  const updateUserTier = async (userId: string, tier: SubscriptionTier) => {
    if (user?.role === 'superadmin' || user?.role === 'admin') {
      await supabase.from('users').update({ subscription_tier: tier }).eq('id', userId);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateUserRole,
      updateUserTier,
      refreshUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
