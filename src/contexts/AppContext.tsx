import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, type User, type UserRole } from '@/lib/supabase';
import { toast } from 'sonner';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'demo@seoflood.ai': {
    password: 'demo123',
    user: {
      id: 'demo-1',
      email: 'demo@seoflood.ai',
      full_name: 'Demo Builder',
      role: 'builder',
      subscription_tier: 'pro',
      authority_score: 78,
      avatar_url: '',
      bio: 'Professional SEO specialist and site builder',
      phone: '+1 (555) 123-4567',
      company: 'SEO Masters Inc.',
      website: 'https://seomasters.com',
      location: 'New York, NY',
      created_at: new Date().toISOString(),
    }
  },
  'seofloodai@gmail.com': {
    password: 'Pierre007007%%%',
    user: {
      id: 'admin-1',
      email: 'seofloodai@gmail.com',
      full_name: 'Super Admin',
      role: 'superadmin',
      subscription_tier: 'enterprise',
      authority_score: 100,
      affiliate_code: 'ADMIN001',
      avatar_url: '',
      bio: 'Platform administrator and founder',
      phone: '+1 (555) 999-0000',
      company: 'SEO Flood AI',
      website: 'https://seo-flood-ai.vercel.app',
      location: 'Global',
      created_at: new Date().toISOString(),
    }
  },
  'admin@seoflood.ai': {
    password: 'admin123',
    user: {
      id: 'admin-2',
      email: 'admin@seoflood.ai',
      full_name: 'Admin User',
      role: 'admin',
      subscription_tier: 'enterprise',
      authority_score: 95,
      avatar_url: '',
      bio: 'Platform moderator',
      phone: '+1 (555) 888-7777',
      company: 'SEO Flood AI',
      website: 'https://seo-flood-ai.vercel.app',
      location: 'United States',
      created_at: new Date().toISOString(),
    }
  },
  'renter@seoflood.ai': {
    password: 'renter123',
    user: {
      id: 'renter-1',
      email: 'renter@seoflood.ai',
      full_name: 'John Renter',
      role: 'renter',
      subscription_tier: 'pro',
      authority_score: 45,
      avatar_url: '',
      bio: 'Business owner looking for ranked pages',
      phone: '+1 (555) 777-6666',
      company: 'Local Business Co.',
      website: 'https://localbusiness.com',
      location: 'Los Angeles, CA',
      created_at: new Date().toISOString(),
    }
  },
  'freelancer@seoflood.ai': {
    password: 'freelancer123',
    user: {
      id: 'freelancer-1',
      email: 'freelancer@seoflood.ai',
      full_name: 'Sarah Freelancer',
      role: 'freelancer',
      subscription_tier: 'pro',
      authority_score: 62,
      avatar_url: '',
      bio: 'Web developer and SEO specialist',
      phone: '+1 (555) 444-3333',
      company: 'Freelance Studio',
      website: 'https://sarahdesigns.com',
      location: 'Austin, TX',
      created_at: new Date().toISOString(),
    }
  }
};

export type { UserRole };

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('seoflood_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('seoflood_user');
      }
    }
    setIsLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUser(data);
        localStorage.setItem('seoflood_user', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, [user?.id]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Check demo users
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem('seoflood_user', JSON.stringify(demoUser.user));
      setIsLoading(false);
      toast.success(`Welcome back, ${demoUser.user.full_name}!`);
      return { success: true };
    }

    // Try Supabase auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUser(profile);
          localStorage.setItem('seoflood_user', JSON.stringify(profile));
          toast.success(`Welcome back, ${profile.full_name}!`);
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { success: false, error: error.message || 'Invalid credentials' };
    }

    setIsLoading(false);
    return { success: true };
  };

  const signup = async (email: string, password: string, fullName: string, role: UserRole) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role,
          subscription_tier: 'free',
        });

        if (profileError) throw profileError;

        const newUser: User = {
          id: data.user.id,
          email,
          full_name: fullName,
          role,
          subscription_tier: 'free',
          authority_score: 0,
          created_at: new Date().toISOString(),
        };

        setUser(newUser);
        localStorage.setItem('seoflood_user', JSON.stringify(newUser));
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      // Fallback for demo
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        full_name: fullName,
        role,
        subscription_tier: 'free',
        authority_score: 0,
        created_at: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('seoflood_user', JSON.stringify(newUser));
      toast.success('Demo account created!');
    }

    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('seoflood_user');
    toast.success('Logged out successfully');
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('seoflood_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions: Record<UserRole, string[]> = {
      user: ['view_sites', 'rent_sites'],
      builder: ['view_sites', 'create_sites', 'manage_sites', 'rent_sites'],
      renter: ['view_sites', 'rent_sites', 'manage_rentals'],
      freelancer: ['view_sites', 'apply_jobs', 'manage_proposals'],
      employer: ['view_sites', 'post_jobs', 'manage_jobs'],
      admin: ['view_sites', 'create_sites', 'manage_sites', 'rent_sites', 'manage_users', 'view_analytics'],
      superadmin: ['*'],
    };

    const permissions = rolePermissions[user.role] || [];
    return permissions.includes('*') || permissions.includes(permission);
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
      updateUserProfile,
      refreshUser,
      hasPermission,
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
