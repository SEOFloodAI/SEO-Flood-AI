import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, Camera, User, Mail, Phone, Building, 
  Globe, MapPin, Save, Loader2 
} from 'lucide-react';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const { user, setUser } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
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
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setUser({ ...user!, avatarUrl: publicUrl });
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          phone: formData.phone,
          company: formData.company,
          website: formData.website,
          location: formData.location,
        })
        .eq('id', user?.id);

      if (error) throw error;

      setUser({ 
        ...user!, 
        fullName: formData.fullName,
        bio: formData.bio,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        location: formData.location,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

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

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Avatar Section */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div 
              onClick={handleAvatarClick}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
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
        <div className="glass-card p-6 mb-6">
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
        </div>

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
      </main>
    </div>
  );
};

export default ProfileSettings;
