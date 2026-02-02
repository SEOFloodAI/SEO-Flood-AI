import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Globe, Plus, Search, Filter, MoreVertical,
  ExternalLink, Edit, Trash2, Eye, TrendingUp, Users,
  DollarSign, Star, CheckCircle2, XCircle, Loader2,
  Copy, BarChart3, Layers
} from 'lucide-react';
import { toast } from 'sonner';

interface Site {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  status: 'draft' | 'published' | 'rented';
  authorityScore: number;
  trafficEstimate: number;
  pageCount: number;
  monthlyPrice: number;
  isAvailableForRent: boolean;
  createdAt: string;
}

export default function SiteManager() {
  const { user } = useAppContext();
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setSites([
        {
          id: '1',
          name: 'Keto Diet Guide',
          subdomain: 'keto-diet',
          category: 'health',
          status: 'published',
          authorityScore: 78,
          trafficEstimate: 2500,
          pageCount: 47,
          monthlyPrice: 299,
          isAvailableForRent: true,
          createdAt: '2025-01-15',
        },
        {
          id: '2',
          name: 'Best Plumber Miami',
          subdomain: 'plumber-miami',
          category: 'home-services',
          status: 'rented',
          authorityScore: 85,
          trafficEstimate: 1800,
          pageCount: 32,
          monthlyPrice: 199,
          isAvailableForRent: false,
          createdAt: '2025-01-10',
        },
        {
          id: '3',
          name: 'Austin Dentist Pro',
          subdomain: 'dentist-austin',
          category: 'healthcare',
          status: 'published',
          authorityScore: 62,
          trafficEstimate: 950,
          pageCount: 28,
          monthlyPrice: 149,
          isAvailableForRent: true,
          createdAt: '2025-01-05',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || site.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (siteId: string) => {
    if (!confirm('Are you sure you want to delete this site?')) return;
    setSites(sites.filter(s => s.id !== siteId));
    toast.success('Site deleted');
  };

  const handleToggleRent = (siteId: string) => {
    setSites(sites.map(s => 
      s.id === siteId ? { ...s, isAvailableForRent: !s.isAvailableForRent } : s
    ));
    toast.success('Rent status updated');
  };

  const stats = {
    total: sites.length,
    published: sites.filter(s => s.status === 'published').length,
    rented: sites.filter(s => s.status === 'rented').length,
    totalRevenue: sites.filter(s => s.status === 'rented').reduce((acc, s) => acc + s.monthlyPrice, 0),
  };

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
                <Globe className="w-6 h-6 text-[#ff375f]" />
                My Sites
              </h1>
              <p className="text-sm text-white/50">Manage your websites and rental listings</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Site
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sites', value: stats.total, icon: Globe, color: 'text-blue-400' },
            { label: 'Published', value: stats.published, icon: CheckCircle2, color: 'text-green-400' },
            { label: 'Rented', value: stats.rented, icon: Users, color: 'text-purple-400' },
            { label: 'Monthly Revenue', value: `$${stats.totalRevenue}`, icon: DollarSign, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sites..."
              className="input-holographic pl-12 w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-holographic"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="rented">Rented</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Sites Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#ff375f] animate-spin" />
          </div>
        ) : filteredSites.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <div key={site.id} className="glass-card p-5 hover:border-[#ff375f]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{site.name}</h3>
                    <p className="text-sm text-white/50">{site.subdomain}.seofloodai.com</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    site.status === 'published' ? 'bg-green-500/20 text-green-400' :
                    site.status === 'rented' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {site.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-[#ff375f]">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">{site.authorityScore}</span>
                    </div>
                    <div className="text-xs text-white/40">Authority</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">{site.trafficEstimate}</span>
                    </div>
                    <div className="text-xs text-white/40">Traffic</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-400">
                      <Layers className="w-4 h-4" />
                      <span className="font-semibold">{site.pageCount}</span>
                    </div>
                    <div className="text-xs text-white/40">Pages</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 mb-4">
                  <div>
                    <div className="text-white font-medium">${site.monthlyPrice}/mo</div>
                    <div className="text-xs text-white/40">Rental price</div>
                  </div>
                  <button
                    onClick={() => handleToggleRent(site.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      site.isAvailableForRent 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {site.isAvailableForRent ? 'Available' : 'Not Available'}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(site.id)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No sites yet</h3>
            <p className="text-white/50 mb-6">Create your first site to start ranking</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              <Plus className="w-4 h-4 inline mr-2" /> Create Site
            </button>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Site</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Site Name</label>
                <input type="text" placeholder="e.g., Keto Diet Guide" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Subdomain</label>
                <div className="flex">
                  <input type="text" placeholder="keto-diet" className="input-holographic rounded-r-none" />
                  <span className="px-4 py-3 bg-white/10 border border-l-0 border-white/10 rounded-r-xl text-white/60">
                    .seofloodai.com
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Category</label>
                <select className="input-holographic">
                  <option value="">Select category</option>
                  <option value="health">Health & Wellness</option>
                  <option value="home-services">Home Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Monthly Rental Price</label>
                <input type="number" placeholder="299" className="input-holographic" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setShowCreateModal(false); toast.success('Site created!'); }}
                className="flex-1 btn-primary"
              >
                Create Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
