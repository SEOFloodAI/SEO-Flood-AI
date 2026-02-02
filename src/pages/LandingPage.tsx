import { Link } from 'react-router-dom';
import { 
  Rocket, Globe, Zap, TrendingUp, Users, DollarSign, 
  Shield, Sparkles, ArrowRight, CheckCircle2, Star,
  BarChart3, Target, Layers, Play, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Globe,
    title: 'Mass Page Generation',
    description: 'Generate hundreds of SEO-optimized pages targeting long-tail keywords in minutes.',
  },
  {
    icon: TrendingUp,
    title: 'Instant Rankings',
    description: 'Rank #1 for local keywords and rent those positions to businesses.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Creation',
    description: 'Free AI agents powered by Puter.js create stunning websites and content.',
  },
  {
    icon: Layers,
    title: 'Website Overlay',
    description: 'Overlay client websites on your ranked pages for instant traffic.',
  },
  {
    icon: Target,
    title: 'Campaign Manager',
    description: 'Complete marketing campaign creation with Blaze.ai-style automation.',
  },
  {
    icon: Users,
    title: 'Job Marketplace',
    description: 'Connect with freelancers and agencies for your projects.',
  },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic features',
    features: [
      '3 sites maximum',
      '5 AI tasks per day',
      'Browse marketplace',
      'Basic support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Perfect for serious builders',
    features: [
      '25 sites maximum',
      '100 AI tasks per day',
      'Full marketplace access',
      'Priority support',
      'Custom domains',
      'Advanced analytics',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For agencies and power users',
    features: [
      'Unlimited sites',
      'Unlimited AI tasks',
      'Priority placement',
      'White-label options',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'SEO Agency Owner',
    content: 'SEO Flood AI transformed my business. I went from struggling to rank clients to having 50+ ranked pages generating passive income.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Local Business Owner',
    content: 'I was ranking #87 on Google. Within 2 days of renting a page, I was #1. My phone hasnt stopped ringing since.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Freelance Developer',
    content: 'The AI website builder is incredible. I can create professional sites in minutes that would have taken days before.',
    rating: 5,
  },
];

const stats = [
  { value: '10,000+', label: 'Sites Created' },
  { value: '$2.5M+', label: 'Revenue Generated' },
  { value: '50,000+', label: 'Pages Ranked' },
  { value: '98%', label: 'Client Satisfaction' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SEO Flood AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-white/60 hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-white/60 hover:text-white transition-colors">Sign In</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff375f]/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-[#ff375f]" />
              <span className="text-sm text-white/80">Now with free AI agents powered by Puter.js</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Rank #1 on Google{' '}
              <span className="text-gradient">In Days, Not Months</span>
            </h1>
            
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Generate hundreds of SEO-optimized pages, rank for local keywords, 
              and rent those positions to businesses desperate for traffic.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Start Building Free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our proven 4-step process takes you from idea to ranked pages generating income.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Main Site', desc: 'Build your keyword-targeted main page with our AI' },
              { step: '02', title: 'Generate Pages', desc: 'Mass-create supporting pages targeting long-tail keywords' },
              { step: '03', title: 'Rank & Drive Traffic', desc: 'All pages redirect traffic to your main ranked page' },
              { step: '04', title: 'Rent & Profit', desc: 'Overlay client websites and collect monthly rent' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 h-full">
                  <div className="text-4xl font-bold text-gradient mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-white/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Dominate SEO
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A complete toolkit for building, ranking, and monetizing websites at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#ff375f]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff375f]/10 rounded-full blur-[200px]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff375f]/10 border border-[#ff375f]/20 mb-6">
                <Zap className="w-4 h-4 text-[#ff375f]" />
                <span className="text-sm text-[#ff375f]">Powered by Puter.js</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Free AI Agents for Everything
              </h2>
              <p className="text-white/60 mb-6">
                Create websites, generate content, design images, and more—all for free 
                with our Puter.js integration. No API keys needed.
              </p>
              
              <div className="space-y-4">
                {[
                  'Website generation with stunning designs',
                  'SEO-optimized content creation',
                  'Image generation for any purpose',
                  'Video scripts and marketing copy',
                  'Keyword research and analysis',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-white/40">AI Agent Console</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-green-400">$ nexus-agent create-website</div>
                <div className="text-white/60">Analyzing requirements...</div>
                <div className="text-white/60">Generating design...</div>
                <div className="text-[#ff375f]">✓ Website created successfully!</div>
                <div className="text-white/40 mt-4">$ _</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 ${tier.highlighted ? 'border-[#ff375f]/50 ring-2 ring-[#ff375f]/20' : ''}`}
              >
                {tier.highlighted && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ff375f]/20 text-[#ff375f] text-sm font-medium mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-white/50">{tier.period}</span>
                </div>
                <p className="text-white/60 mb-6">{tier.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/signup" 
                  className={`block text-center py-3 rounded-xl font-medium transition-all ${
                    tier.highlighted 
                      ? 'btn-primary' 
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by SEO Professionals
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              See what our users are saying about SEO Flood AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, ri) => (
                    <Star key={ri} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff375f]/10 to-[#ff6b35]/10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Flood Google with Your Pages?
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Join thousands of SEO professionals who are ranking #1 and 
                generating passive income with SEO Flood AI.
              </p>
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SEO Flood AI</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Support</a>
            </div>
            <div className="text-white/40 text-sm">
              © 2025 SEO Flood AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
