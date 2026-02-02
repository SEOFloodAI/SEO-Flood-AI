import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Layers, Plus, Search, ExternalLink, Eye, EyeOff,
  DollarSign, Calendar, CheckCircle2, XCircle, Loader2,
  Copy, MoreVertical, Edit, Trash2, Globe, User,
  CreditCard, Clock, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Overlay {
  id: string;
  siteName: string;
  siteSubdomain: string;
  clientName: string;
  clientEmail: string;
  clientWebsite: string;
  monthlyPrice: number;
  status: 'trial' | 'active' | 'expired' | 'cancelled';
  trialEndsAt: string;
  subscriptionEndsAt?: string;
  startedAt: string;
  trafficRedirected: number;
}

export default function OverlayManager() {
  const { user } = useAppContext();
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewOverlay, setPreviewOverlay] = useState<Overlay | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOverlays([
        {
          id: '1',
          siteName: 'Best Plumber Miami',
          siteSubdomain: 'plumber-miami',
          clientName: 'Mike\'s Plumbing',
          clientEmail: 'mike@mikesplumbing.com',
          clientWebsite: 'https://mikesplumbing.com',
          monthlyPrice: 199,
          status: 'active',
          trialEndsAt: '2025-01-20',
          startedAt: '2025-01-15',
          trafficRedirected: 1250,
        },
        {
          id: '2',
          siteName: 'Austin Dentist Pro',
          siteSubdomain: 'dentist-austin',
          clientName: 'Smile Dental',
          clientEmail: 'info@smiledental.com',
          clientWebsite: 'https://smiledental.com',
          monthlyPrice: 149,
          status: 'trial',
          trialEndsAt: '2025-02-05',
          startedAt: '2025-01-25',
          trafficRedirected: 340,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOverlays = overlays.filter(o => 
    o.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: overlays.length,
    active: overlays.filter(o => o.status === 'active').length,
    trial: overlays.filter(o => o.status === 'trial').length,
    monthlyRevenue: overlays.filter(o => o.status === 'active').reduce((acc, o) => acc + o.monthlyPrice, 0),
    totalTraffic: overlays.reduce((acc, o) => acc + o.trafficRedirected, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'trial': return 'bg-blue-500/20 text-blue-400';
      case 'expired': return 'bg-red-500/20 text-red-400';
      default: return 'bg-white/10 text-white/60';
    }
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
                <Layers className="w-6 h-6 text-[#ff375f]" />
                Website Overlays
              </h1>
              <p className="text-sm text-white/50">Manage client website overlays on your ranked pages</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Overlay
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Overlays', value: stats.total, icon: Layers },
            { label: 'Active', value: stats.active, icon: CheckCircle2 },
            { label: 'Monthly Revenue', value: `$${stats.monthlyRevenue}`, icon: DollarSign },
            { label: 'Traffic Redirected', value: stats.totalTraffic.toLocaleString(), icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-6 h-6 text-[#ff375f]" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search overlays..."
            className="input-holographic pl-12 w-full"
          />
        </div>

        {/* Overlays List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#ff375f] animate-spin" />
          </div>
        ) : filteredOverlays.length > 0 ? (
          <div className="space-y-4">
            {filteredOverlays.map((overlay) => (
              <div key={overlay.id} className="glass-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#ff375f]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{overlay.siteName}</h3>
                      <p className="text-sm text-white/50">{overlay.siteSubdomain}.seofloodai.com</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(overlay.status)}`}>
                          {overlay.status}
                        </span>
                        <span className="text-xs text-white/40">
                          {overlay.status === 'trial' ? `Trial ends ${overlay.trialEndsAt}` : `Since ${overlay.startedAt}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-white font-semibold">{overlay.clientName}</div>
                      <div className="text-sm text-white/50">{overlay.clientEmail}</div>
                      <a href={overlay.clientWebsite} target="_blank" rel="noopener" className="text-sm text-[#ff375f] hover:underline flex items-center gap-1">
                        {overlay.clientWebsite} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="text-right">
                      <div className="text-white font-semibold">${overlay.monthlyPrice}/mo</div>
                      <div className="text-sm text-white/50">{overlay.trafficRedirected.toLocaleString()} visitors</div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPreviewOverlay(overlay)}
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white"
                        title="Preview Overlay"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Layers className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No overlays yet</h3>
            <p className="text-white/50 mb-6">Add a client website overlay to start earning</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              <Plus className="w-4 h-4 inline mr-2" /> Add Overlay
            </button>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Add Website Overlay</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Select Site</label>
                <select className="input-holographic">
                  <option value="">Choose a site...</option>
                  <option value="1">Keto Diet Guide (keto-diet.seofloodai.com)</option>
                  <option value="2">Austin Dentist Pro (dentist-austin.seofloodai.com)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Client Name</label>
                <input type="text" placeholder="Business name" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Client Email</label>
                <input type="email" placeholder="client@example.com" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Client Website URL</label>
                <input type="url" placeholder="https://client-website.com" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Monthly Price</label>
                <input type="number" placeholder="299" className="input-holographic" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white text-sm">Start with 7-day free trial</div>
                  <div className="text-white/50 text-xs">Client can cancel anytime during trial</div>
                </div>
                <input type="checkbox" defaultChecked className="ml-auto rounded bg-white/5 border-white/10" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">Cancel</button>
              <button 
                onClick={() => { setShowCreateModal(false); toast.success('Overlay added!'); }}
                className="flex-1 btn-primary"
              >
                Add Overlay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewOverlay && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0f] rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-white font-semibold">Overlay Preview: {previewOverlay.siteName}</h3>
                <p className="text-sm text-white/50">Client: {previewOverlay.clientName}</p>
              </div>
              <button onClick={() => setPreviewOverlay(null)} className="p-2 rounded-lg hover:bg-white/10 text-white/60">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex">
                {/* Your ranked page */}
                <div className="w-1/2 border-r border-white/10 p-4 overflow-auto">
                  <div className="text-xs text-white/40 mb-2">Your Ranked Page</div>
                  <div className="bg-white text-black p-8 rounded-lg">
                    <h1 className="text-3xl font-bold mb-4">{previewOverlay.siteName}</h1>
                    <p className="mb-4">Professional services you can trust.</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded">Call Now</button>
                  </div>
                </div>
                {/* Client overlay */}
                <div className="w-1/2 p-4 overflow-auto">
                  <div className="text-xs text-white/40 mb-2">Client Website Overlay</div>
                  <iframe 
                    src={previewOverlay.clientWebsite} 
                    className="w-full h-full rounded-lg border-0 bg-white"
                    title="Client Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
