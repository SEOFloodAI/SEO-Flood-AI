import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Users, Globe, DollarSign, TrendingUp, 
  Settings, Shield, BarChart3, Search, Filter, MoreVertical,
  CheckCircle2, XCircle, Edit, Trash2, Loader2,
  Zap, Layers, Briefcase, Star, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription: string;
  sites: number;
  revenue: number;
  joinedAt: string;
  status: 'active' | 'suspended';
}

interface SiteData {
  id: string;
  name: string;
  subdomain: string;
  owner: string;
  authority: number;
  traffic: number;
  status: string;
  isRented: boolean;
}

interface RentalData {
  id: string;
  siteName: string;
  clientName: string;
  monthlyPrice: number;
  status: string;
  startedAt: string;
}

export default function AdminPanel() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'sites' | 'rentals' | 'settings'>('overview');
  const [users, setUsers] = useState<UserData[]>([]);
  const [sites, setSites] = useState<SiteData[]>([]);
  const [rentals, setRentals] = useState<RentalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'builder', subscription: 'pro', sites: 12, revenue: 3450, joinedAt: '2025-01-01', status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'renter', subscription: 'pro', sites: 0, revenue: 0, joinedAt: '2025-01-05', status: 'active' },
        { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'freelancer', subscription: 'free', sites: 0, revenue: 890, joinedAt: '2025-01-10', status: 'active' },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'builder', subscription: 'enterprise', sites: 28, revenue: 8900, joinedAt: '2024-12-15', status: 'active' },
      ]);

      setSites([
        { id: '1', name: 'Keto Diet Guide', subdomain: 'keto-diet', owner: 'John Doe', authority: 78, traffic: 2500, status: 'published', isRented: false },
        { id: '2', name: 'Best Plumber Miami', subdomain: 'plumber-miami', owner: 'John Doe', authority: 85, traffic: 1800, status: 'published', isRented: true },
        { id: '3', name: 'Austin Dentist Pro', subdomain: 'dentist-austin', owner: 'Alice Brown', authority: 62, traffic: 950, status: 'published', isRented: true },
      ]);

      setRentals([
        { id: '1', siteName: 'Best Plumber Miami', clientName: 'Mike\'s Plumbing', monthlyPrice: 199, status: 'active', startedAt: '2025-01-15' },
        { id: '2', siteName: 'Austin Dentist Pro', clientName: 'Smile Dental', monthlyPrice: 149, status: 'active', startedAt: '2025-01-20' },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = {
    totalUsers: users.length,
    totalSites: sites.length,
    totalRentals: rentals.length,
    monthlyRevenue: rentals.reduce((acc, r) => acc + r.monthlyPrice, 0),
    totalTraffic: sites.reduce((acc, s) => acc + s.traffic, 0),
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    toast.success('User status updated');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'sites', label: 'Sites', icon: Globe },
    { id: 'rentals', label: 'Rentals', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#ff375f]" />
                Admin Panel
              </h1>
              <p className="text-sm text-white/50">Platform management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff375f]/20 text-[#ff375f]">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Super Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#ff375f] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400' },
                { label: 'Total Sites', value: stats.totalSites, icon: Globe, color: 'text-green-400' },
                { label: 'Active Rentals', value: stats.totalRentals, icon: DollarSign, color: 'text-purple-400' },
                { label: 'Monthly Revenue', value: `$${stats.monthlyRevenue}`, icon: TrendingUp, color: 'text-yellow-400' },
                { label: 'Total Traffic', value: stats.totalTraffic.toLocaleString(), icon: Zap, color: 'text-cyan-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-5">
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Builders</h3>
                <div className="space-y-3">
                  {users.filter(u => u.role === 'builder').sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((user, i) => (
                    <div key={user.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-white/50 text-sm">{user.sites} sites</div>
                      </div>
                      <div className="text-green-400 font-medium">${user.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Sites by Traffic</h3>
                <div className="space-y-3">
                  {sites.sort((a, b) => b.traffic - a.traffic).slice(0, 5).map((site, i) => (
                    <div key={site.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{site.name}</div>
                        <div className="text-white/50 text-sm">{site.owner}</div>
                      </div>
                      <div className="text-blue-400 font-medium">{site.traffic.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="input-holographic pl-12 w-full"
                />
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/60 font-medium">User</th>
                    <th className="text-left p-4 text-white/60 font-medium">Role</th>
                    <th className="text-left p-4 text-white/60 font-medium">Plan</th>
                    <th className="text-left p-4 text-white/60 font-medium">Sites</th>
                    <th className="text-left p-4 text-white/60 font-medium">Revenue</th>
                    <th className="text-left p-4 text-white/60 font-medium">Status</th>
                    <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-white/50 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-white/10 text-xs text-white/60 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                          user.subscription === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                          user.subscription === 'pro' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {user.subscription}
                        </span>
                      </td>
                      <td className="p-4 text-white">{user.sites}</td>
                      <td className="p-4 text-green-400">${user.revenue}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSuspendUser(user.id)}
                            className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white"
                            title={user.status === 'active' ? 'Suspend' : 'Activate'}
                          >
                            {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                          </button>
                          <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sites' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div key={site.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{site.name}</h3>
                    <p className="text-sm text-white/50">{site.subdomain}.seofloodai.com</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    site.isRented ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {site.isRented ? 'Rented' : 'Available'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-white font-medium">{site.authority}</div>
                    <div className="text-xs text-white/50">Authority</div>
                  </div>
                  <div>
                    <div className="text-white font-medium">{site.traffic.toLocaleString()}</div>
                    <div className="text-xs text-white/50">Traffic</div>
                  </div>
                </div>
                <div className="text-sm text-white/50">Owner: {site.owner}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="space-y-4">
            {rentals.map((rental) => (
              <div key={rental.id} className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{rental.siteName}</h3>
                    <p className="text-white/50">Client: {rental.clientName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${rental.monthlyPrice}/mo</div>
                    <div className="text-sm text-white/50">Since {rental.startedAt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Platform Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Registrations', desc: 'Allow new users to sign up', enabled: true },
                  { label: 'Rental Marketplace', desc: 'Enable site rental features', enabled: true },
                  { label: 'AI Content Generation', desc: 'Allow AI-powered content creation', enabled: true },
                  { label: 'Maintenance Mode', desc: 'Put site in maintenance mode', enabled: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <div className="text-white font-medium">{setting.label}</div>
                      <div className="text-white/50 text-sm">{setting.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff375f]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
