import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Camera, User, Mail, Phone, Building, 
  Globe, MapPin, Save, Loader2, CheckCircle2, Shield,
  CreditCard, Bell, Lock
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileSettings() {
  const { user, setUser } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'notifications'>('profile');
  
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    company: user?.company || '',
    website: user?.website || '',
    location: user?.location || '',
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload - in production, upload to Supabase Storage
    setTimeout(() => {
      const fakeUrl = URL.createObjectURL(file);
      if (user) {
        setUser({ ...user, avatar_url: fakeUrl });
      }
      toast.success('Avatar updated successfully');
      setIsUploading(false);
    }, 1500);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        setUser({ 
          ...user, 
          full_name: formData.fullName,
          bio: formData.bio,
          phone: formData.phone,
          company: formData.company,
          website: formData.website,
          location: formData.location,
        });
      }
      toast.success('Profile updated successfully');
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
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
          <div>
            <h1 className="text-xl font-bold text-white">Profile Settings</h1>
            <p className="text-sm text-white/50">Manage your account information</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1">
            <div className="glass-card p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#ff375f]/10 text-[#ff375f]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
                  <div className="flex items-center gap-6">
                    <div 
                      onClick={handleAvatarClick}
                      className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
                    >
                      {user?.avatar_url ? (
                        <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-white" />
                      )}
                      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div>
                      <button 
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                        className="btn-secondary text-sm disabled:opacity-50"
                      >
                        {isUploading ? 'Uploading...' : 'Change Avatar'}
                      </button>
                      <p className="text-sm text-white/40 mt-2">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input-holographic"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email</label>
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60">
                        <Mail className="w-4 h-4" />
                        <span>{formData.email}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="input-holographic pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Company</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your company name"
                          className="input-holographic pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className="input-holographic pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="City, Country"
                          className="input-holographic pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm text-white/60 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="input-holographic"
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input-holographic" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">New Password</label>
                    <input type="password" placeholder="••••••••" className="input-holographic" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="input-holographic" />
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Two-Factor Authentication</div>
                      <div className="text-white/50 text-sm">Enable 2FA for extra security</div>
                    </div>
                    <button className="ml-auto btn-secondary text-sm">Enable</button>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#ff375f]/20 to-[#ff6b35]/20 border border-[#ff375f]/30">
                    <div>
                      <div className="text-xl font-bold text-white capitalize">{user?.subscription_tier} Plan</div>
                      <div className="text-white/60">Billed monthly</div>
                    </div>
                    <button className="btn-secondary text-sm">Upgrade</button>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div className="flex-1">
                        <div className="text-white">•••• •••• •••• 4242</div>
                        <div className="text-white/50 text-sm">Expires 12/25</div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                  <button className="mt-4 btn-secondary text-sm w-full">Add Payment Method</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'New rental requests', desc: 'Get notified when someone wants to rent your site' },
                    { label: 'Payment received', desc: 'Get notified when you receive a payment' },
                    { label: 'Site performance', desc: 'Weekly reports on your site rankings' },
                    { label: 'Marketing updates', desc: 'New features and promotional offers' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <div className="text-white font-medium">{item.label}</div>
                        <div className="text-white/50 text-sm">{item.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff375f]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
