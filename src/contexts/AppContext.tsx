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

    // Try Supabase auth (when configured)
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
          createdAt: profile?.created_at,
        };

        setUser(userData);
        localStorage.setItem('seoflood_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Login error:', error);
      // For demo, create a new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName: email.split('@')[0],
        role: 'user',
        subscriptionTier: 'free',
        authorityScore: 0,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('seoflood_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
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
