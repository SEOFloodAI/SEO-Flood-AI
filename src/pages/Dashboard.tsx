import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  LayoutDashboard, Globe, TrendingUp, Building2, Users, 
  Settings, LogOut, Plus, ArrowUpRight, Bell, Sparkles,
  Wand2, Bot, Share2, BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout } = useAppContext();

  const stats = [
    { label: 'Flood Score', value: user?.authorityScore || 0, change: '+12', icon: Sparkles, color: 'text-[#ff375f]' },
    { label: 'Active Sites', value: '5', change: '+2', icon: Globe, color: 'text-blue-400' },
    { label: 'Total Clicks', value: '12.4K', change: '+24%', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Rental Income', value: '$2,840', change: '+18%', icon: Building2, color: 'text-yellow-400' },
  ];

  const quickActions = [
    { label: 'Build New Site', desc: 'AI-powered website builder', icon: Wand2, href: '/builder', color: 'from-[#ff375f] to-[#ff6b35]' },
    { label: 'Manage Agents', desc: 'Configure AI agent tasks', icon: Bot, href: '/agents', color: 'from-purple-500 to-pink-500' },
    { label: 'Mass Generator', desc: 'Generate 100s of SEO pages', icon: Globe, href: '/mass-generator', color: 'from-blue-500 to-cyan-500' },
    { label: 'Social Marketing', desc: 'Schedule posts & promotions', icon: Share2, href: '/social', color: 'from-green-500 to-emerald-500' },
  ];

  const recentSites = [
    { id: 1, name: 'Seattle Luxury Homes', status: 'published', score: 85, traffic: '2.4K' },
    { id: 2, name: 'Austin Real Estate', status: 'draft', score: 72, traffic: '0' },
    { id: 3, name: 'Denver CBD Guide', status: 'published', score: 78, traffic: '1.8K' },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d12] border-r border-white/5 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-lg font-bold text-white">SEOFlood</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#ff375f] bg-[#ff375f]/10">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/builder" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Wand2 className="w-5 h-5" /> Website Builder
          </Link>
          <Link to="/agents" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Bot className="w-5 h-5" /> AI Agents
          </Link>
          <Link to="/mass-generator" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Globe className="w-5 h-5" /> Mass Generator
          </Link>
          <Link to="/social" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Share2 className="w-5 h-5" /> Social Marketing
          </Link>
          <Link to="/rental" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Building2 className="w-5 h-5" /> Authority Rental
          </Link>
          <Link to="/marketplace" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Users className="w-5 h-5" /> Job Marketplace
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          {(user?.role === 'admin' || user?.role === 'superadmin') && (
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <BarChart3 className="w-5 h-5" /> Admin Panel
            </Link>
          )}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
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
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-white/50">Welcome back, {user?.fullName}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff375f] rounded-full" />
              </button>
              <Link to="/builder" className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
                <Plus className="w-4 h-4" /> New Site
              </Link>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className={`text-xs flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    <ArrowUpRight className="w-3 h-3" /> {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.href}
                  className="glass-card p-5 hover:border-[#ff375f]/30 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{action.label}</h3>
                  <p className="text-sm text-white/50">{action.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Sites */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Recent Sites</h2>
                <Link to="/builder" className="text-sm text-[#ff375f] hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentSites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#ff375f]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{site.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${site.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {site.status}
                          </span>
                          <span className="text-xs text-white/40">Score: {site.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">{site.traffic} clicks</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/builder" className="mt-4 w-full py-3 rounded-xl border border-dashed border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Create New Site
              </Link>
            </div>

            {/* Pro Tip */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Pro Tip</h2>
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#ff375f]/10 to-[#ff6b35]/10 border border-[#ff375f]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#ff375f]" />
                  <span className="text-sm font-medium text-white">Increase Your Authority</span>
                </div>
                <p className="text-sm text-white/60">
                  Sites with Flood Score 80+ get 3x more rental inquiries. Keep publishing quality content!
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-white mb-3">Your Plan</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
                  <div>
                    <p className="font-medium text-white capitalize">{user?.subscriptionTier}</p>
                    <p className="text-xs text-white/40">{user?.role} account</p>
                  </div>
                  <Link to="/settings" className="text-sm text-[#ff375f] hover:underline">Upgrade</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
