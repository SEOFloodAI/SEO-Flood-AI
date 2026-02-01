import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Globe, Plus, Minus, Play, Download, Copy,
  CheckCircle2, Sparkles, Settings, FileText, Target
} from 'lucide-react';
import { toast } from 'sonner';

const MassPageGenerator = () => {
  const [mainKeyword, setMainKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    pageCount: 50,
    wordCount: 500,
    includeImages: true,
    includeSchema: true,
    redirectToMain: true,
  });

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const generateKeywords = () => {
    if (!mainKeyword) {
      toast.error('Please enter a main keyword');
      return;
    }
    
    // Simulate keyword generation
    const generated = [
      `${mainKeyword} near me`,
      `${mainKeyword} services`,
      `best ${mainKeyword}`,
      `${mainKeyword} reviews`,
      `affordable ${mainKeyword}`,
      `${mainKeyword} ${location || 'nearby'}`,
      `professional ${mainKeyword}`,
      `${mainKeyword} experts`,
      `local ${mainKeyword}`,
      `top rated ${mainKeyword}`,
    ];
    
    setKeywords([...keywords, ...generated.filter(k => !keywords.includes(k))]);
    toast.success(`Generated ${generated.length} keywords`);
  };

  const handleGenerate = async () => {
    if (!mainKeyword || keywords.length === 0) {
      toast.error('Please enter a main keyword and at least one target keyword');
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const pages = keywords.slice(0, settings.pageCount).map((kw, i) => ({
      id: i + 1,
      title: `${kw.charAt(0).toUpperCase() + kw.slice(1)} - ${location || 'Your Area'}`,
      keyword: kw,
      url: `/${kw.toLowerCase().replace(/\s+/g, '-')}`,
      wordCount: settings.wordCount,
      status: 'generated'
    }));

    setGeneratedPages(pages);
    setIsGenerating(false);
    toast.success(`Generated ${pages.length} SEO pages!`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
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
                Mass Page Generator
              </h1>
              <p className="text-sm text-white/50">Generate 100s of SEO-optimized pages for your keywords</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Settings */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#ff375f]" />
                Target Configuration
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Main Keyword</label>
                  <input
                    type="text"
                    value={mainKeyword}
                    onChange={(e) => setMainKeyword(e.target.value)}
                    placeholder="e.g., real estate"
                    className="input-holographic"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Location (optional)</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Seattle"
                    className="input-holographic"
                  />
                </div>
              </div>

              <button 
                onClick={generateKeywords}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Auto-Generate Keywords
              </button>
            </div>

            {/* Keywords List */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff375f]" />
                Target Keywords ({keywords.length})
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  placeholder="Add a keyword..."
                  className="input-holographic flex-1"
                />
                <button onClick={addKeyword} className="btn-primary px-4">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {keywords.map((kw, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/80">
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="text-white/40 hover:text-red-400">
                      <Minus className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Generation Settings */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#ff375f]" />
                Generation Settings
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Pages to Generate</label>
                  <input
                    type="number"
                    value={settings.pageCount}
                    onChange={(e) => setSettings({ ...settings, pageCount: parseInt(e.target.value) })}
                    min="1"
                    max="500"
                    className="input-holographic"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Words per Page</label>
                  <input
                    type="number"
                    value={settings.wordCount}
                    onChange={(e) => setSettings({ ...settings, wordCount: parseInt(e.target.value) })}
                    min="100"
                    max="5000"
                    className="input-holographic"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-3 text-white/60 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.includeImages}
                    onChange={(e) => setSettings({ ...settings, includeImages: e.target.checked })}
                    className="rounded bg-white/5 border-white/10"
                  />
                  Include AI-generated images
                </label>
                <label className="flex items-center gap-3 text-white/60 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.includeSchema}
                    onChange={(e) => setSettings({ ...settings, includeSchema: e.target.checked })}
                    className="rounded bg-white/5 border-white/10"
                  />
                  Add schema markup for SEO
                </label>
                <label className="flex items-center gap-3 text-white/60 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.redirectToMain}
                    onChange={(e) => setSettings({ ...settings, redirectToMain: e.target.checked })}
                    className="rounded bg-white/5 border-white/10"
                  />
                  Redirect all pages to main site
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !mainKeyword || keywords.length === 0}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating {settings.pageCount} Pages...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Generate {Math.min(settings.pageCount, keywords.length)} SEO Pages
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Generated Pages</h2>
            
            {generatedPages.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {generatedPages.map((page) => (
                  <div key={page.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm line-clamp-1">{page.title}</h4>
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-white/40 mb-2">{page.url}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{page.wordCount} words</span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => copyToClipboard(page.url)}
                          className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-white/10">
                  <button className="w-full btn-secondary flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download All Pages
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40">No pages generated yet</p>
                <p className="text-white/30 text-sm mt-1">Configure and click generate</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MassPageGenerator;
