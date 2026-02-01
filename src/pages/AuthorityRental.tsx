import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, TrendingUp, ExternalLink,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

interface RentalSite {
  id: string;
  title: string;
  location: string;
  target: string;
  volume: string;
  authority: number;
  kwValue: number;
  price: number;
  status: 'available' | 'rented';
  category: string;
  image: string;
  description: string;
}

const RENTAL_SITES: RentalSite[] = [
  {
    id: '1',
    title: 'Seattle Luxury Homes',
    location: 'Seattle, WA',
    target: 'luxury homes seattle',
    volume: '4.8K',
    authority: 85,
    kwValue: 68,
    price: 720,
    status: 'available',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    description: 'Premium real estate portal targeting high-end property buyers in Seattle metro area.'
  },
  {
    id: '2',
    title: 'Austin Real Estate Listings',
    location: 'Austin, TX',
    target: 'homes for sale austin',
    volume: '22.0K',
    authority: 82,
    kwValue: 52,
    price: 620,
    status: 'available',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
    description: 'Fast-growing Austin property marketplace with strong local SEO presence.'
  },
  {
    id: '3',
    title: 'Chicago DUI Attorney',
    location: 'Chicago, IL',
    target: 'dui lawyer chicago',
    volume: '5.4K',
    authority: 79,
    kwValue: 72,
    price: 680,
    status: 'available',
    category: 'Legal',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    description: 'High-converting legal lead generation site for DUI defense attorneys.'
  },
  {
    id: '4',
    title: 'Denver CBD Dispensary Guide',
    location: 'Denver, CO',
    target: 'cbd dispensary denver',
    volume: '8.4K',
    authority: 78,
    kwValue: 45,
    price: 495,
    status: 'available',
    category: 'CBD',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Comprehensive CBD directory with verified dispensary listings and reviews.'
  },
  {
    id: '5',
    title: 'Miami Personal Injury Lawyer',
    location: 'Miami, FL',
    target: 'personal injury lawyer miami',
    volume: '6.2K',
    authority: 75,
    kwValue: 85,
    price: 920,
    status: 'rented',
    category: 'Legal',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    description: 'Premium personal injury lead gen with high case value potential.'
  },
  {
    id: '6',
    title: 'LA Cannabis Delivery Service',
    location: 'Los Angeles, CA',
    target: 'cannabis delivery los angeles',
    volume: '12.5K',
    authority: 71,
    kwValue: 38,
    price: 395,
    status: 'available',
    category: 'CBD',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&h=400&fit=crop',
    description: 'Fast-ranking cannabis delivery directory with strong local presence.'
  },
];

const CATEGORIES = ['All', 'Real Estate', 'Legal', 'CBD', 'Finance', 'Home Services'];

const AuthorityRental = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = RENTAL_SITES.filter(site => {
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    const matchesSearch = site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRent = (site: RentalSite) => {
    toast.success(`Rental request sent for ${site.title}!`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-lg font-bold text-white">SEOFlood.AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-white/60 hover:text-white">Home</Link>
            <Link to="/marketplace" className="text-sm text-white/60 hover:text-white">Jobs</Link>
            <Link to="/login" className="btn-primary text-sm py-2 px-4">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Authority Rental Marketplace</h1>
          <p className="text-white/50 max-w-2xl mx-auto">Rent high-authority, ranking websites. Skip the SEO wait and get instant visibility.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by location, niche, or keyword..." className="input-holographic pl-12" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === cat ? 'bg-[#ff375f] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/50 mb-6">Showing <span className="text-white">{filteredSites.length}</span> sites</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <div key={site.id} className="glass-card rounded-2xl overflow-hidden group hover:border-[#ff375f]/30 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={site.image} alt={site.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    {site.status === 'available' ? (
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">Available</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/20">Rented</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-sm text-white/80">
                    <MapPin className="w-4 h-4" /> {site.location}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-1">{site.title}</h3>
                  <p className="text-sm text-[#ff375f] mb-3">Target: {site.target}</p>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{site.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/5 text-center">
                      <p className="text-xs text-white/40">Volume</p>
                      <p className="text-sm font-medium text-white">{site.volume}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-center">
                      <p className="text-xs text-white/40">Authority</p>
                      <p className="text-sm font-medium text-[#ff375f]">{site.authority}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-center">
                      <p className="text-xs text-white/40">KW Value</p>
                      <p className="text-sm font-medium text-green-400">${site.kwValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-2xl font-bold text-white">${site.price}</p>
                      <p className="text-xs text-white/40">/month</p>
                    </div>
                    <button 
                      onClick={() => handleRent(site)}
                      disabled={site.status === 'rented'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                        site.status === 'available' ? 'btn-primary' : 'bg-white/5 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      {site.status === 'available' ? <><span>Rent Now</span><ExternalLink className="w-4 h-4" /></> : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 border border-[#ff375f]/20">
            <Star className="w-12 h-12 text-[#ff375f] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Have a High-Authority Site?</h2>
            <p className="text-white/50 max-w-xl mx-auto mb-6">List your ranking website and earn passive income. Keep 85% of all rental revenue.</p>
            <Link to="/signup" className="btn-primary inline-flex items-center gap-2"><TrendingUp className="w-5 h-5" /> List Your Site</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorityRental;
