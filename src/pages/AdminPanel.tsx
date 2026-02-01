import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  LayoutDashboard, Users, Globe, Building2, DollarSign, 
  Settings, LogOut, Search, Filter, MoreHorizontal, ArrowUpRight, Shield
} from 'lucide-react';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { user, logout, updateUserRole, updateUserTier } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users },
    { label: 'Active Sites', value: '4,521', change: '+8%', icon: Globe },
    { label: 'Monthly Revenue', value: '$45,280', change: '+24%', icon: DollarSign },
    { label: 'Active Rentals', value: '892', change: '+18%', icon: Building2 },
  ];

  const users = [
    { id: '1', name: 'John Smith', email: 'john@example.com', role: 'builder', tier: 'pro', sites: 5, joined: '2 hours ago', status: 'active' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@agency.com', role: 'freelancer', tier: 'enterprise', sites: 8, joined: '5 hours ago', status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@seo.com', role: 'renter', tier: 'free', sites: 0, joined: '1 day ago', status: 'pending' },
    { id: '4', name: 'Emily Davis', email: 'emily@legal.com', role: 'employer', tier: 'pro', sites: 2, joined: '2 days ago', status: 'active' },
  ];

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'sites', label: 'Sites', icon: Globe },
    { id: 'rentals', label: 'Rentals', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateUserRole(userId, newRole as any);
    toast.success('User role updated');
  };

  const handleTierChange = async (userId: string, newTier: string) => {
    await updateUserTier(userId, newTier as any);
    toast.success('User tier updated');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d12] border-r border-white/5 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Admin</span>
              <span className="text-xs text-[#ff375f] block">Super Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeTab === link.id
                  ? 'bg-[#ff375f]/10 text-[#ff375f]'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
              <p className="text-sm text-white/50">Super Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white">{user?.fullName}</p>
                <p className="text-xs text-[#ff375f]">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-white font-bold">
                {user?.fullName?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card p-5">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-5 h-5 text-[#ff375f]" />
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-4">Revenue Trend</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[35, 45, 40, 55, 50, 65, 70, 75, 85, 90, 95, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-[#ff375f] to-[#ff6b35] rounded-t opacity-80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-4">User Growth</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[20, 25, 30, 35, 40, 48, 55, 62, 70, 78, 85, 92].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/10 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New user registered', detail: 'pro@agency.com', time: '2 min ago' },
                    { action: 'Site published', detail: 'luxury-homes-seattle.seoflood.ai', time: '5 min ago' },
                    { action: 'Rental created', detail: '$720/mo - Seattle Luxury Homes', time: '12 min ago' },
                    { action: 'Payment received', detail: '$29 - Pro plan upgrade', time: '15 min ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm text-white">{item.action}</p>
                        <p className="text-xs text-white/40">{item.detail}</p>
                      </div>
                      <span className="text-xs text-white/30">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff375f]/50"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60 text-sm">
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">User</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Role</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Plan</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Sites</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                    <tr key={user.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-white text-sm font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-white">{user.name}</p>
                            <p className="text-xs text-white/40">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="user">User</option>
                          <option value="builder">Builder</option>
                          <option value="renter">Renter</option>
                          <option value="freelancer">Freelancer</option>
                          <option value="employer">Employer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          value={user.tier}
                          onChange={(e) => handleTierChange(user.id, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/60">{user.sites}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-semibold text-white">Platform Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'Maintenance Mode', desc: 'Disable all user access', enabled: false },
                  { label: 'New Registrations', desc: 'Allow new user signups', enabled: true },
                  { label: 'Rental Marketplace', desc: 'Enable site rentals', enabled: true },
                  { label: 'AI Content Generation', desc: 'Enable AI writing features', enabled: true },
                  { label: 'Mass Page Generator', desc: 'Enable bulk page generation', enabled: true },
                  { label: 'Social Marketing', desc: 'Enable social media tools', enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white">{setting.label}</p>
                      <p className="text-xs text-white/40">{setting.desc}</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative transition-colors ${
                      setting.enabled ? 'bg-[#ff375f]' : 'bg-white/10'
                    }`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        setting.enabled ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
