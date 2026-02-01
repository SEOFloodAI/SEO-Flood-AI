import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Sparkles, Globe, TrendingUp, Users, 
  Wand2, Building2, Briefcase, Check, Star, Menu, X
} from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop';

const LandingPage = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullText = 'Build. Rank. Rent. Profit.';

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const stats = [
    { icon: Globe, value: '10K+', label: 'Sites Built' },
    { icon: TrendingUp, value: '$2.5M', label: 'Rental Revenue' },
    { icon: Users, value: '50K+', label: 'Active Users' }
  ];

  const features = [
    {
      icon: Wand2,
      title: 'AI Website Builder',
      description: 'Generate complete SEO-optimized websites with AI. Voice commands enabled with Flood assistant.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
      icon: Building2,
      title: 'Authority Rental',
      description: 'Rent high-authority sites and skip the SEO wait. Get instant visibility in your niche.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'
    },
    {
      icon: Briefcase,
      title: 'Job Marketplace',
      description: 'Connect with top SEO professionals. Post jobs or find projects that match your skills.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      features: ['3 AI-generated pages', 'Basic SEO tools', 'Community support', 'Flood Score tracking'],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: ['Unlimited AI pages', 'Full SEO suite', 'Priority support', 'Rental marketplace', 'API access'],
      cta: 'Start Pro Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: ['Everything in Pro', 'White-label options', 'Dedicated support', 'Custom integrations', 'Team collaboration'],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-lg font-bold text-white">SEOFlood.AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/rental" className="text-sm text-white/60 hover:text-white transition-colors">Authority Rental</Link>
              <Link to="/marketplace" className="text-sm text-white/60 hover:text-white transition-colors">Job Marketplace</Link>
              <Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0f] border-t border-white/5 p-4">
            <Link to="/rental" className="block py-2 text-white/60">Authority Rental</Link>
            <Link to="/marketplace" className="block py-2 text-white/60">Job Marketplace</Link>
            <Link to="/login" className="block py-2 text-white/60">Sign In</Link>
            <Link to="/signup" className="block py-2 text-[#ff375f]">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
          <div className="absolute inset-0 circuit-pattern opacity-30" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff375f]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-[#ff375f]" />
              <span className="text-sm text-white/80">AI-Powered SEO Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">The Future of</span>
              <br />
              <span className="gradient-text text-glow">SEO is Here</span>
            </h1>

            <div className="h-12 flex items-center justify-center mb-6">
              <span className="text-2xl md:text-3xl font-semibold text-white/90">
                {typedText}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </span>
            </div>

            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Create stunning AI-powered websites, monetize through our revolutionary 
              Rank & Rent authority system, and connect with top talent in our integrated 
              marketplace.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link to="/signup" className="group btn-primary flex items-center gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="w-6 h-6 text-[#ff375f] mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="gradient-text">Dominate Search</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Build, rank, and rent—all in one powerful platform designed for serious SEO professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden group hover:border-[#ff375f]/30 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#ff375f]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-white/60">Four simple steps to SEO success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Build Your Site', desc: 'Use AI to create a complete, SEO-optimized website in minutes.' },
              { step: '02', title: 'Climb Rankings', desc: 'Track your Flood Score and follow AI recommendations.' },
              { step: '03', title: 'Rent or Scale', desc: 'List your high-ranking site for rent or scale with more properties.' },
              { step: '04', title: 'Profit', desc: 'Earn passive income from rentals while your authority grows.' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <span className="text-6xl font-bold text-[#ff375f]/20">{item.step}</span>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-white/60">Start free, upgrade when you're ready to scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`glass-card rounded-2xl p-8 ${plan.highlighted ? 'neon-border relative scale-105' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff375f] text-white text-sm font-medium">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/70">
                      <Check className="w-5 h-5 text-[#ff375f]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/signup" className={`block w-full text-center py-3 rounded-xl font-medium transition-all ${
                  plan.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SEOFlood.AI</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/rental" className="text-sm text-white/50 hover:text-white">Authority Rental</Link>
              <Link to="/marketplace" className="text-sm text-white/50 hover:text-white">Job Marketplace</Link>
              <Link to="/login" className="text-sm text-white/50 hover:text-white">Sign In</Link>
            </nav>
            <p className="text-sm text-white/30">© 2024 SEOFlood.AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
