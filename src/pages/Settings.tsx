import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowLeft, User, Bell, CreditCard, Shield, Save, Check, Key } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    bio: '',
    website: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    toast.success('Settings saved!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <Link to="/dashboard" className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold text-white">Settings</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id ? 'bg-[#ff375f]/10 text-[#ff375f]' : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Profile Settings</h2>
                    <p className="text-white/50">Manage your public profile information</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-2xl font-bold text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <button className="btn-secondary text-sm">Change Avatar</button>
                      <p className="text-xs text-white/40 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Full Name</label>
                      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-holographic" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email</label>
                      <input type="email" value={profile.email} disabled className="input-holographic opacity-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Bio</label>
                    <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell us about yourself..." rows={4} className="input-holographic resize-none" />
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Account Security</h2>
                  <div className="space-y-4">
                    <div><label className="block text-sm text-white/60 mb-2">Current Password</label><input type="password" placeholder="••••••••" className="input-holographic" /></div>
                    <div><label className="block text-sm text-white/60 mb-2">New Password</label><input type="password" placeholder="••••••••" className="input-holographic" /></div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Billing & Subscription</h2>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#ff375f]/10 to-[#ff6b35]/10 border border-[#ff375f]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-white/60">Current Plan</p>
                        <p className="text-2xl font-bold text-white capitalize">{user?.subscriptionTier || 'Free'}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#ff375f]/20 text-[#ff375f] text-sm">Active</span>
                    </div>
                    <button className="btn-primary text-sm">Upgrade Plan</button>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-2">API Keys</h2>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-medium text-white mb-2">Production API Key</p>
                    <code className="block p-3 rounded-lg bg-black/30 text-sm text-white/60 font-mono">sf_live_••••••••••••••••••••••••</code>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Notifications</h2>
                  {[
                    { label: 'Site ranking updates', desc: 'When your Flood Score changes' },
                    { label: 'New rental inquiries', desc: 'When someone wants to rent your site' },
                    { label: 'Job proposals', desc: 'When you receive a new proposal' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <p className="font-medium text-white">{item.label}</p>
                        <p className="text-sm text-white/40">{item.desc}</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-[#ff375f] relative"><span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" /></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  {saved ? <><Check className="w-5 h-5" /> Saved</> : <><Save className="w-5 h-5" /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
