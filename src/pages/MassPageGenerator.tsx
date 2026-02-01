import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Globe, Plus, Play, Download, Copy,
  CheckCircle2, Sparkles, Settings, FileText, Target,
  Upload, Eye, ExternalLink, Search, Tag, Code, X,
  Loader2, ChevronRight, Layout, Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/contexts/AppContext';
import { buildNexusPrompt } from '@/lib/api-config';

interface GeneratedPage {
  id: string;
  title: string;
  keyword: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  schemaMarkup: object;
  wordCount: number;
  status: 'generated' | 'published' | 'preview';
  previewHtml?: string;
  longTailKeywords: string[];
}

const MassPageGenerator = () => {
  const { user } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [mainKeyword, setMainKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<GeneratedPage[]>([]);
  const [previewPage, setPreviewPage] = useState<GeneratedPage | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'results'>('config');
  
  const [settings, setSettings] = useState({
    pageCount: 50,
    wordCount: 500,
    includeImages: true,
    includeSchema: true,
    redirectToMain: true,
    mainPageUrl: '',
    seoOptimization: true,
    longTailKeywords: true,
    includeContactForm: true,
    includeTestimonials: true,
  });

  // CSV/TXT Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
      
      setKeywords(prev => [...prev, ...lines.filter(k => !prev.includes(k))]);
      toast.success(`Imported ${lines.length} keywords from ${file.name}`);
    };
    reader.readAsText(file);
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const generateLongTailKeywords = () => {
    if (!mainKeyword) {
      toast.error('Please enter a main keyword');
      return;
    }
    
    const locationSuffix = location ? ` in ${location}` : '';
    const longTail = [
      `${mainKeyword} near me`,
      `${mainKeyword} services${locationSuffix}`,
      `best ${mainKeyword}${locationSuffix}`,
      `${mainKeyword} reviews${locationSuffix}`,
      `affordable ${mainKeyword}${locationSuffix}`,
      `professional ${mainKeyword}${locationSuffix}`,
      `${mainKeyword} experts${locationSuffix}`,
      `local ${mainKeyword}${locationSuffix}`,
      `top rated ${mainKeyword}${locationSuffix}`,
      `${mainKeyword} companies${locationSuffix}`,
      `cheap ${mainKeyword}${locationSuffix}`,
      `${mainKeyword} contractors${locationSuffix}`,
      `licensed ${mainKeyword}${locationSuffix}`,
      `emergency ${mainKeyword}${locationSuffix}`,
      `24 hour ${mainKeyword}${locationSuffix}`,
      `${mainKeyword} near me open now`,
      `${mainKeyword} free estimate`,
      `${mainKeyword} same day service`,
    ];
    
    setKeywords(prev => [...prev, ...longTail.filter(k => !prev.includes(k))]);
    toast.success(`Generated ${longTail.length} long-tail keywords`);
  };

  const generatePageContent = async (keyword: string, index: number): Promise<GeneratedPage> => {
    const slug = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Generate long-tail variations for this page
    const pageLongTail = settings.longTailKeywords ? [
      `${keyword} reviews`,
      `best ${keyword}`,
      `affordable ${keyword}`,
      `professional ${keyword}`,
    ] : [];
    
    return {
      id: `page-${Date.now()}-${index}`,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - ${location || 'Professional Services'}`,
      keyword,
      slug,
      content: '',
      metaTitle: `${keyword} | Best ${mainKeyword} Services ${location ? `in ${location}` : ''}`,
      metaDescription: `Looking for ${keyword}? We offer professional ${mainKeyword} services ${location ? `in ${location}` : ''}. Call now for a free quote! Serving the ${location || 'local'} area with 5-star rated service.`,
      schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `${keyword} - ${location || 'Your Area'}`,
        "description": `Professional ${mainKeyword} services`,
        "url": `https://example.com/${slug}`,
        "telephone": "+1-555-000-0000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location || "Your City",
          "addressRegion": "ST",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7128",
          "longitude": "-74.0060"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      wordCount: settings.wordCount,
      status: 'generated',
      longTailKeywords: pageLongTail,
    };
  };

  const handleGenerate = async () => {
    if (!mainKeyword || keywords.length === 0) {
      toast.error('Please enter a main keyword and at least one target keyword');
      return;
    }

    setIsGenerating(true);
    const pages: GeneratedPage[] = [];
    
    for (let i = 0; i < Math.min(settings.pageCount, keywords.length); i++) {
      const page = await generatePageContent(keywords[i], i);
      pages.push(page);
    }

    setGeneratedPages(pages);
    setIsGenerating(false);
    setActiveTab('results');
    toast.success(`Generated ${pages.length} SEO-optimized pages!`);
  };

  const generatePreviewHtml = (page: GeneratedPage): string => {
    const redirectScript = settings.redirectToMain && settings.mainPageUrl ? `
    <script>
      // Redirect to main page after 3 seconds for SEO juice
      setTimeout(() => {
        window.location.href = '${settings.mainPageUrl}';
      }, 3000);
    </script>` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.metaTitle}</title>
  <meta name="description" content="${page.metaDescription}">
  <meta name="keywords" content="${page.keyword}, ${page.longTailKeywords.join(', ')}, ${mainKeyword}, ${location || 'local'}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${page.metaTitle}">
  <meta property="og:description" content="${page.metaDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/${page.slug}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.metaTitle}">
  <meta name="twitter:description" content="${page.metaDescription}">
  
  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">${JSON.stringify(page.schemaMarkup, null, 2)}</script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
    .hero { 
      background: linear-gradient(135deg, #ff375f 0%, #ff6b35 100%); 
      color: white; 
      padding: 5rem 2rem; 
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
      background-size: 100px;
      opacity: 0.5;
    }
    .hero-content { position: relative; z-index: 1; }
    .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 800; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
    .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .section { padding: 4rem 0; }
    .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a1a2e; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .feature-card { 
      background: white; 
      padding: 2rem; 
      border-radius: 1rem; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
    .feature-card h3 { color: #ff375f; margin-bottom: 1rem; font-size: 1.5rem; }
    .cta { 
      background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); 
      padding: 4rem; 
      text-align: center; 
      border-radius: 1rem; 
      margin: 2rem 0;
      color: white;
    }
    .cta h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .btn { 
      display: inline-block; 
      background: linear-gradient(135deg, #ff375f 0%, #ff6b35 100%); 
      color: white; 
      padding: 1rem 2.5rem; 
      border-radius: 0.5rem; 
      text-decoration: none; 
      font-weight: 600;
      font-size: 1.1rem;
      transition: transform 0.3s, box-shadow 0.3s;
      border: none;
      cursor: pointer;
    }
    .btn:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(255,55,95,0.4); }
    .keywords { background: #f8f9fa; padding: 2rem; border-radius: 0.5rem; margin: 2rem 0; }
    .keywords h4 { color: #666; margin-bottom: 1rem; }
    .keyword-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .keyword-tag { background: white; padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.875rem; color: #666; border: 1px solid #ddd; }
    footer { background: #1a1a2e; color: white; padding: 3rem 2rem; text-align: center; }
    .footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; }
    .footer-links a { color: rgba(255,255,255,0.7); text-decoration: none; }
    .footer-links a:hover { color: white; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .hero p { font-size: 1rem; }
      .features { grid-template-columns: 1fr; }
    }
  </style>
  ${redirectScript}
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <h1>${page.title}</h1>
      <p>Professional ${page.keyword} services you can trust. Serving ${location || 'your local area'} with excellence.</p>
      <a href="tel:+15550000000" class="btn">Call Now: (555) 000-0000</a>
    </div>
  </section>
  
  <div class="container">
    <section class="section">
      <h2 class="section-title">Why Choose Our ${page.keyword} Services?</h2>
      <div class="features">
        <div class="feature-card">
          <h3>Experienced Professionals</h3>
          <p>Our team has years of experience providing top-quality ${page.keyword} services. We know what it takes to get the job done right.</p>
        </div>
        <div class="feature-card">
          <h3>Fast Response Time</h3>
          <p>We understand that when you need ${page.keyword}, you need it fast. That's why we offer same-day service in most cases.</p>
        </div>
        <div class="feature-card">
          <h3>Affordable Pricing</h3>
          <p>Get the best ${page.keyword} services at competitive prices. We offer free estimates and transparent pricing with no hidden fees.</p>
        </div>
      </div>
    </section>
    
    <div class="keywords">
      <h4>Related Services:</h4>
      <div class="keyword-tags">
        ${page.longTailKeywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('')}
      </div>
    </div>
    
    <div class="cta">
      <h2>Ready to Get Started?</h2>
      <p>Contact us today for a free consultation and estimate. We're here to help with all your ${mainKeyword} needs.</p>
      <a href="tel:+15550000000" class="btn">Call Now: (555) 000-0000</a>
    </div>
  </div>
  
  <footer>
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
    <p>&copy; 2025 ${page.title}. All rights reserved.</p>
    <p style="margin-top: 1rem; opacity: 0.7;">Serving ${location || 'your local area'} with pride</p>
  </footer>
</body>
</html>`;
  };

  const previewPageContent = (page: GeneratedPage) => {
    const previewHtml = generatePreviewHtml(page);
    setPreviewPage({ ...page, previewHtml });
  };

  const publishPages = async () => {
    if (!user) {
      toast.error('Please log in to publish pages');
      return;
    }

    setIsPublishing(true);
    try {
      // Create site
      const { data: site, error: siteError } = await supabase
        .from('sites')
        .insert({
          user_id: user.id,
          name: `${mainKeyword} - ${location || 'General'}`,
          category,
          status: 'published',
          is_available_for_rent: true,
        })
        .select()
        .single();
      
      if (siteError) throw siteError;

      // Save pages
      const pagesToSave = generatedPages.map(page => ({
        site_id: site.id,
        title: page.title,
        slug: page.slug,
        content: generatePreviewHtml(page),
        target_keyword: page.keyword,
        meta_title: page.metaTitle,
        meta_description: page.metaDescription,
        schema_markup: page.schemaMarkup,
        redirect_to_main: settings.redirectToMain,
        status: 'published',
      }));

      const { error: pagesError } = await supabase
        .from('site_pages')
        .insert(pagesToSave);

      if (pagesError) throw pagesError;

      toast.success(`Published ${generatedPages.length} pages to site!`);
    } catch (error) {
      console.error('Publish error:', error);
      toast.error('Failed to publish pages');
    } finally {
      setIsPublishing(false);
    }
  };

  const downloadAllPages = () => {
    generatedPages.forEach((page, index) => {
      const html = generatePreviewHtml(page);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${page.slug}.html`;
      setTimeout(() => {
        a.click();
        URL.revokeObjectURL(url);
      }, index * 100);
    });
    toast.success(`Downloading ${generatedPages.length} pages...`);
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
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'config' ? 'bg-[#ff375f] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Configuration
            </button>
            <button 
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'results' ? 'bg-[#ff375f] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Results ({generatedPages.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'config' ? (
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
                    <label className="block text-sm text-white/60 mb-2">Main Keyword *</label>
                    <input
                      type="text"
                      value={mainKeyword}
                      onChange={(e) => setMainKeyword(e.target.value)}
                      placeholder="e.g., real estate, plumber, dentist"
                      className="input-holographic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Location (optional)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Seattle, Miami"
                      className="input-holographic"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-white/60 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-holographic"
                  >
                    <option value="">Select a category</option>
                    <option value="home-services">Home Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="legal">Legal</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="automotive">Automotive</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={generateLongTailKeywords}
                    disabled={!mainKeyword}
                    className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" /> Auto-Generate Keywords
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Import CSV/TXT
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Keywords List */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#ff375f]" />
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
                    <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/80 hover:bg-white/10 transition-colors">
                      {kw}
                      <button onClick={() => removeKeyword(kw)} className="text-white/40 hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {keywords.length === 0 && (
                    <p className="text-white/40 text-sm py-4">No keywords added yet. Add manually or import from file.</p>
                  )}
                </div>
              </div>

              {/* Generation Settings */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#ff375f]" />
                  Generation Settings
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                <div className="space-y-3">
                  {[
                    { key: 'includeImages', label: 'Include AI-generated images' },
                    { key: 'includeSchema', label: 'Add schema markup for SEO' },
                    { key: 'seoOptimization', label: 'Full SEO optimization (meta tags, headings, internal links)' },
                    { key: 'longTailKeywords', label: 'Include long-tail keyword variations' },
                    { key: 'includeContactForm', label: 'Include contact form on pages' },
                    { key: 'includeTestimonials', label: 'Include testimonials section' },
                    { key: 'redirectToMain', label: 'Redirect all pages to main category page' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 text-white/60 cursor-pointer hover:text-white/80 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={settings[key as keyof typeof settings] as boolean}
                        onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                        className="rounded bg-white/5 border-white/10 w-4 h-4"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
                
                {settings.redirectToMain && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5">
                    <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" /> Main Category Page URL
                    </label>
                    <input
                      type="url"
                      value={settings.mainPageUrl}
                      onChange={(e) => setSettings({ ...settings, mainPageUrl: e.target.value })}
                      placeholder="https://yoursite.com/main-category-page"
                      className="input-holographic"
                    />
                    <p className="text-xs text-white/40 mt-2">
                      All generated pages will redirect to this main page for traffic consolidation and authority building.
                    </p>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !mainKeyword || keywords.length === 0}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
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

            {/* Help Panel */}
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#ff375f]" />
                  SEO Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ff375f] flex-shrink-0 mt-0.5" />
                    Use location-specific keywords for local SEO
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ff375f] flex-shrink-0 mt-0.5" />
                    Include service + location combinations
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ff375f] flex-shrink-0 mt-0.5" />
                    Target long-tail keywords for easier ranking
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ff375f] flex-shrink-0 mt-0.5" />
                    Create unique content for each page
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ff375f] flex-shrink-0 mt-0.5" />
                    Proper internal linking structure
                  </li>
                </ul>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-[#ff375f]" />
                  Page Structure
                </h3>
                <p className="text-sm text-white/60 mb-3">Each generated page includes:</p>
                <ul className="space-y-2 text-sm text-white/60">
                  {[
                    'Optimized title & meta description',
                    'Open Graph social tags',
                    'Schema.org structured data',
                    'Semantic HTML5 structure',
                    'Mobile-responsive design',
                    'Fast loading performance',
                    'Internal linking',
                    'Contact CTA sections',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Results Panel */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Generated Pages ({generatedPages.length})</h2>
              <div className="flex gap-2">
                <button 
                  onClick={downloadAllPages}
                  disabled={generatedPages.length === 0}
                  className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" /> Download All
                </button>
                <button 
                  onClick={() => setGeneratedPages([])}
                  disabled={generatedPages.length === 0}
                  className="btn-secondary text-sm disabled:opacity-50"
                >
                  Clear All
                </button>
                <button 
                  onClick={publishPages}
                  disabled={isPublishing || generatedPages.length === 0}
                  className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {isPublishing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  {isPublishing ? 'Publishing...' : 'Publish All'}
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedPages.map((page) => (
                <div key={page.id} className="glass-card p-4 hover:border-[#ff375f]/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm line-clamp-1" title={page.title}>{page.title}</h4>
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-white/40 mb-2 font-mono">/{page.slug}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                      {page.wordCount} words
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                      {page.keyword}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => previewPageContent(page)}
                      className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(page.slug);
                        toast.success('Slug copied!');
                      }}
                      className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewPage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0f] rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="text-white font-semibold">Preview: {previewPage.title}</h3>
                <p className="text-sm text-white/50">/{previewPage.slug}</p>
              </div>
              <button 
                onClick={() => setPreviewPage(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-white rounded-b-2xl">
              <iframe
                srcDoc={previewPage.previewHtml}
                className="w-full h-full border-0"
                title="Page Preview"
                sandbox="allow-scripts"
              />
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(previewPage.previewHtml || '');
                  toast.success('HTML copied to clipboard');
                }}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Code className="w-4 h-4" /> Copy HTML
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([previewPage.previewHtml || ''], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${previewPage.slug}.html`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MassPageGenerator;
