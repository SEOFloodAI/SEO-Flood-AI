import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Rocket, LayoutDashboard, Globe, Zap, TrendingUp, 
  Users, DollarSign, Settings, LogOut, Plus, ExternalLink,
  BarChart3, Target, Layers, Briefcase, Sparkles,
  ChevronRight, Star, ArrowUpRight, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalSites: number;
  publishedSites: number;
  totalPages: number;
  totalRentals: number;
  monthlyRevenue: number;
  authorityScore: number;
}

interface RecentActivity {
  id: string;
  type: 'site_created' | 'page_generated' | 'rental_started' | 'payment_received';
  title: string;
  timestamp: string;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sites', label: 'My Sites', icon: Globe },
  { path: '/mass-generator', label: 'Mass Generator', icon: Zap },
  { path: '/overlays', label: 'Overlays', icon: Layers },
  { path: '/campaigns', label: 'Campaigns', icon: Target },
  { path: '/marketplace', label: 'Marketplace', icon: Briefcase },
  { path: '/ai-agents', label: 'AI Agents', icon: Sparkles },
  { path: '/profile', label: 'Profile', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Dashboard() {
  const { user, logout, hasPermission } = useAppContext();
  const [stats, setStats] = useState<DashboardStats>({
    totalSites: 0,
    publishedSites: 0,
    totalPages: 0,
    totalRentals: 0,
    monthlyRevenue: 0,
    authorityScore: user?.authority_score || 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadData = async () => {
      setIsLoading(true);
      
      // Mock data for demo
      setTimeout(() => {
        setStats({
          totalSites: 12,
          publishedSites: 8,
          totalPages: 347,
          totalRentals: 5,
          monthlyRevenue: 2450,
          authorityScore: user?.authority_score || 78,
        });

        setRecentActivity([
          { id: '1', type: 'page_generated', title: 'Generated 50 pages for "plumber-miami"', timestamp: '2 hours ago' },
          { id: '2', type: 'rental_started', title: 'New rental: keto-diet site', timestamp: '5 hours ago' },
          { id: '3', type: 'site_created', title: 'Created new site: "best-dentist-austin"', timestamp: '1 day ago' },
          { id: '4', type: 'payment_received', title: 'Payment received: $299 from client', timestamp: '2 days ago' },
        ]);

        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, [user?.authority_score]);

  const quickActions = [
    { 
      label: 'Create New Site', 
      icon: Plus, 
      path: '/sites',
      color: 'from-[#ff375f] to-[#ff6b35]',
      description: 'Build a new website with AI'
    },
    { 
      label: 'Generate Pages', 
      icon: Zap, 
      path: '/mass-generator',
      color: 'from-blue-500 to-cyan-500',
      description: 'Mass-create SEO pages'
    },
    { 
      label: 'Browse Marketplace', 
      icon: Globe, 
      path: '/marketplace',
      color: 'from-green-500 to-emerald-500',
      description: 'Find sites to rent'
    },
    { 
      label: 'Create Campaign', 
      icon: Target, 
      path: '/campaigns',
      color: 'from-purple-500 to-pink-500',
      description: 'Launch marketing campaigns'
    },
  ];

  const statCards = [
    { label: 'Total Sites', value: stats.totalSites, icon: Globe, color: 'text-blue-400' },
    { label: 'Pages Generated', value: stats.totalPages, icon: Layers, color: 'text-green-400' },
    { label: 'Active Rentals', value: stats.totalRentals, icon: Users, color: 'text-purple-400' },
    { label: 'Monthly Revenue', value: `$${stats.monthlyRevenue}`, icon: DollarSign, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0f] border-r border-white/5 flex flex-col fixed h-full">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 p-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">SEO Flood AI</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-[#ff375f]/10 text-[#ff375f] border border-[#ff375f]/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/5">
          <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <span className="text-white font-semibold">{user?.full_name?.charAt(0) || 'U'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{user?.full_name}</div>
              <div className="text-xs text-white/50 capitalize">{user?.role}</div>
            </div>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-white/50">Welcome back, {user?.full_name?.split(' ')[0]}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">{stats.authorityScore}</span>
                <span className="text-white/50 text-sm">Authority Score</span>
              </div>
              {(user?.role === 'admin' || user?.role === 'superadmin') && (
                <Link to="/admin" className="btn-secondary text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Admin Panel
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={action.path}
                    className="block glass-card p-5 hover:border-white/20 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                      {action.label}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-white/50 text-sm">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-xs text-white/40">+12% this month</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                <button className="text-[#ff375f] text-sm hover:underline">View All</button>
              </div>
              <div className="glass-card">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-[#ff375f] border-t-transparent rounded-full mx-auto" />
                  </div>
                ) : recentActivity.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activity.type === 'site_created' ? 'bg-blue-500/20 text-blue-400' :
                          activity.type === 'page_generated' ? 'bg-green-500/20 text-green-400' :
                          activity.type === 'rental_started' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {activity.type === 'site_created' && <Globe className="w-5 h-5" />}
                          {activity.type === 'page_generated' && <Layers className="w-5 h-5" />}
                          {activity.type === 'rental_started' && <Users className="w-5 h-5" />}
                          {activity.type === 'payment_received' && <DollarSign className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-white">{activity.title}</p>
                          <p className="text-white/50 text-sm">{activity.timestamp}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/50">No recent activity</p>
                  </div>
                )}
              </div>
            </section>

            {/* Tips & Resources */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Tips & Resources</h2>
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ff375f]/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#ff375f]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Try Puter.js AI</h4>
                      <p className="text-white/50 text-sm mb-2">Generate websites and content for free with our AI agents.</p>
                      <Link to="/ai-agents" className="text-[#ff375f] text-sm hover:underline">Learn more</Link>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Increase Your Authority</h4>
                      <p className="text-white/50 text-sm mb-2">Generate more pages to boost your site's authority score.</p>
                      <Link to="/mass-generator" className="text-[#ff375f] text-sm hover:underline">Get started</Link>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Rent Your Sites</h4>
                      <p className="text-white/50 text-sm mb-2">Make your sites available for rent and earn passive income.</p>
                      <Link to="/sites" className="text-[#ff375f] text-sm hover:underline">Manage sites</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
