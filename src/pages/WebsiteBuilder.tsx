import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Wand2, Check, ChevronRight,
  Eye, Save
} from 'lucide-react';
import { toast } from 'sonner';

const WebsiteBuilder = () => {
  const [step, setStep] = useState<'template' | 'content' | 'customize' | 'publish'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [siteName, setSiteName] = useState('');
  const [niche, setNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', color: 'from-blue-500 to-cyan-400' },
    { id: 'legal', name: 'Legal Services', icon: '⚖️', color: 'from-purple-500 to-pink-400' },
    { id: 'cbd', name: 'CBD/Cannabis', icon: '🌿', color: 'from-green-500 to-emerald-400' },
    { id: 'finance', name: 'Finance', icon: '💰', color: 'from-yellow-500 to-orange-400' },
    { id: 'health', name: 'Health & Wellness', icon: '💪', color: 'from-red-500 to-rose-400' },
    { id: 'tech', name: 'Technology', icon: '💻', color: 'from-indigo-500 to-blue-400' },
  ];

  const niches = [
    'Luxury Homes', 'Personal Injury Law', 'CBD Products', 
    'Financial Planning', 'Fitness Training', 'SaaS Products'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setStep('customize');
    toast.success('Website generated successfully!');
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
              <h1 className="text-lg font-semibold text-white">AI Website Builder</h1>
              <p className="text-sm text-white/50">Create SEO-optimized sites in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'template', label: 'Template' },
              { id: 'content', label: 'Content' },
              { id: 'customize', label: 'Customize' },
              { id: 'publish', label: 'Publish' },
            ].map((s, i) => (
              <div key={s.id} className={`flex items-center ${step === s.id ? 'text-[#ff375f]' : 'text-white/40'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs border border-current">{i + 1}</span>
                <span className="ml-1 text-xs hidden sm:inline">{s.label}</span>
                {i < 3 && <ChevronRight className="w-4 h-4 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {step === 'template' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Choose a Template</h2>
              <p className="text-white/50">Select a starting point for your AI-generated website</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedTemplate === template.id
                      ? 'border-[#ff375f] bg-[#ff375f]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-2xl mb-4`}>
                    {template.icon}
                  </div>
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  <p className="text-sm text-white/50 mt-1">SEO-optimized template</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep('content')} disabled={!selectedTemplate} className="btn-primary disabled:opacity-50">
                Continue <ChevronRight className="w-5 h-5 inline" />
              </button>
            </div>
          </div>
        )}

        {step === 'content' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Tell Us About Your Site</h2>
              <p className="text-white/50">Our AI will generate content tailored to your business</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Site Name</label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="e.g., Seattle Luxury Homes" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Select Your Niche</label>
                <div className="flex flex-wrap gap-2">
                  {niches.map((n) => (
                    <button key={n} onClick={() => setNiche(n)} className={`px-4 py-2 rounded-full text-sm transition-all ${niche === n ? 'bg-[#ff375f] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep('template')} className="btn-secondary">Back</button>
              <button onClick={handleGenerate} disabled={!siteName || !niche || isGenerating} className="btn-primary disabled:opacity-50">
                {isGenerating ? 'Generating...' : <><Wand2 className="w-5 h-5 inline mr-2" /> Generate Site</>}
              </button>
            </div>
          </div>
        )}

        {step === 'customize' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Customize Your Site</h2>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">Generated</span>
            </div>
            <div className="glass-card p-4">
              <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">{siteName}</h1>
                  <p className="text-white/60 mb-6">Your trusted {niche.toLowerCase()} experts</p>
                  <div className="flex justify-center gap-4">
                    <span className="px-4 py-2 rounded-lg bg-[#ff375f]/20 text-[#ff375f]">Get Started</span>
                    <span className="px-4 py-2 rounded-lg bg-white/10 text-white">Learn More</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep('content')} className="btn-secondary">Back</button>
              <button onClick={() => setStep('publish')} className="btn-primary"><Save className="w-5 h-5 inline mr-2" /> Save & Publish</button>
            </div>
          </div>
        )}

        {step === 'publish' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Site Published!</h2>
            <p className="text-white/50 mb-6">Your website is now live and ready to rank.</p>
            <div className="glass-card p-4 max-w-md mx-auto mb-6">
              <p className="text-sm text-white/40 mb-1">Your URL</p>
              <p className="text-[#ff375f] font-medium">https://{siteName.toLowerCase().replace(/\s+/g, '-')}.seoflood.ai</p>
            </div>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
              <button className="btn-secondary flex items-center gap-2"><Eye className="w-4 h-4" /> View Site</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebsiteBuilder;
