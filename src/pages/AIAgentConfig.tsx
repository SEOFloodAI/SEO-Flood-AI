import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Bot, Save, Sparkles, Code, Palette, 
  Wand2, Plus, Trash2, Loader2, Play, Copy, Check,
  MessageSquare, Image, Mic, Video, FileText, Search,
  Zap, Globe, Target, BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { NEXUS_BASE_PROMPT, buildNexusPrompt } from '@/lib/prompts';
import { isPuterAvailable, loadPuterScript } from '@/lib/puter';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  designStandards: string;
  isActive: boolean;
  category: 'website' | 'content' | 'seo' | 'image' | 'video' | 'voice';
}

interface PuterAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  prompt: string;
}

const puterAgents: PuterAgent[] = [
  {
    id: 'website-builder',
    name: 'Website Builder',
    description: 'Generate complete websites with HTML, CSS, and JS',
    icon: Globe,
    category: 'Website',
    prompt: 'Create a professional website for: ',
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    description: 'Write SEO-optimized blog posts and articles',
    icon: FileText,
    category: 'Content',
    prompt: 'Write SEO content about: ',
  },
  {
    id: 'image-generator',
    name: 'Image Generator',
    description: 'Create images for any purpose',
    icon: Image,
    category: 'Image',
    prompt: 'Generate an image of: ',
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    description: 'Optimize content for search engines',
    icon: Search,
    category: 'SEO',
    prompt: 'Optimize this content for SEO: ',
  },
  {
    id: 'keyword-researcher',
    name: 'Keyword Researcher',
    description: 'Find the best keywords for your niche',
    icon: Target,
    category: 'SEO',
    prompt: 'Research keywords for: ',
  },
  {
    id: 'video-script',
    name: 'Video Script Writer',
    description: 'Create engaging video scripts',
    icon: Video,
    category: 'Video',
    prompt: 'Write a video script about: ',
  },
  {
    id: 'voice-over',
    name: 'Voice Over',
    description: 'Convert text to natural speech',
    icon: Mic,
    category: 'Voice',
    prompt: 'Convert to speech: ',
  },
  {
    id: 'campaign-creator',
    name: 'Campaign Creator',
    description: 'Build complete marketing campaigns',
    icon: BarChart3,
    category: 'Marketing',
    prompt: 'Create a marketing campaign for: ',
  },
];

export default function AIAgentConfig() {
  const { user } = useAppContext();
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'puter'>('custom');
  const [puterLoaded, setPuterLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrompt: NEXUS_BASE_PROMPT,
    designStandards: '',
    category: 'website' as AIAgent['category'],
  });

  useEffect(() => {
    loadPuterScript().then(() => {
      setPuterLoaded(isPuterAvailable());
    }).catch(console.error);
    
    // Load mock agents
    setTimeout(() => {
      setAgents([
        {
          id: '1',
          name: 'Nexus Pro',
          description: 'Advanced website generator with premium designs',
          basePrompt: NEXUS_BASE_PROMPT,
          designStandards: 'Always use dark mode, modern gradients, glassmorphism effects',
          isActive: true,
          category: 'website',
        },
        {
          id: '2',
          name: 'SEO Master',
          description: 'Specialized in SEO-optimized content',
          basePrompt: NEXUS_BASE_PROMPT,
          designStandards: 'Focus on readability, keyword density, and engagement',
          isActive: true,
          category: 'content',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = async () => {
    if (!formData.name) {
      toast.error('Agent name is required');
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      if (selectedAgent) {
        setAgents(agents.map(a => a.id === selectedAgent.id ? { ...a, ...formData } : a));
        toast.success('Agent updated successfully');
      } else {
        const newAgent: AIAgent = {
          id: Date.now().toString(),
          ...formData,
          isActive: true,
        };
        setAgents([...agents, newAgent]);
        toast.success('Agent created successfully');
      }
      
      setIsCreating(false);
      setSelectedAgent(null);
      setFormData({
        name: '',
        description: '',
        basePrompt: NEXUS_BASE_PROMPT,
        designStandards: '',
        category: 'website',
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleDelete = (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    setAgents(agents.filter(a => a.id !== agentId));
    if (selectedAgent?.id === agentId) {
      setSelectedAgent(null);
      setIsCreating(false);
    }
    toast.success('Agent deleted');
  };

  const testPrompt = () => {
    const testContext = {
      clientRequest: 'Create a landing page for a plumbing business',
      designSpecs: formData.designStandards,
      categoryContext: formData.category,
    };
    
    const fullPrompt = buildNexusPrompt(testContext);
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    toast.success('Test prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const runPuterAgent = async (agent: PuterAgent) => {
    if (!puterLoaded) {
      toast.error('Puter.js is not loaded. Please refresh the page.');
      return;
    }
    
    toast.info(`Running ${agent.name}...`);
    // In production, this would call the actual puter function
    setTimeout(() => {
      toast.success(`${agent.name} completed!`);
    }, 2000);
  };

  const selectAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      description: agent.description,
      basePrompt: agent.basePrompt,
      designStandards: agent.designStandards,
      category: agent.category,
    });
    setIsCreating(false);
  };

  const createNew = () => {
    setIsCreating(true);
    setSelectedAgent(null);
    setFormData({
      name: '',
      description: '',
      basePrompt: NEXUS_BASE_PROMPT,
      designStandards: '',
      category: 'website',
    });
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
                <Bot className="w-6 h-6 text-[#ff375f]" />
                AI Agents
              </h1>
              <p className="text-sm text-white/50">Configure your AI agents and access free Puter.js tools</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'custom' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}
            >
              Custom Agents
            </button>
            <button 
              onClick={() => setActiveTab('puter')}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${activeTab === 'puter' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}
            >
              <Zap className="w-4 h-4" /> Puter.js (Free)
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'custom' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Agent List */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Your Agents</h2>
                <button onClick={createNew} className="p-2 rounded-lg bg-[#ff375f]/20 text-[#ff375f] hover:bg-[#ff375f]/30">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#ff375f] animate-spin" />
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => selectAgent(agent)}
                      className={`group p-4 rounded-xl cursor-pointer transition-all ${
                        selectedAgent?.id === agent.id 
                          ? 'bg-[#ff375f]/20 border border-[#ff375f]/50' 
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Bot className="w-5 h-5 text-[#ff375f]" />
                          <div>
                            <p className="text-white font-medium">{agent.name}</p>
                            <p className="text-white/40 text-sm line-clamp-1">{agent.description}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60 capitalize">
                              {agent.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }}
                          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {agents.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40">No agents created yet</p>
                      <button onClick={createNew} className="text-[#ff375f] text-sm mt-2 hover:underline">
                        Create your first agent
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Agent Editor */}
            <div className="lg:col-span-2">
              {(isCreating || selectedAgent) ? (
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    {isCreating ? 'Create New Agent' : 'Edit Agent'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Agent Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Nexus Pro"
                          className="input-holographic"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as AIAgent['category'] })}
                          className="input-holographic"
                        >
                          <option value="website">Website</option>
                          <option value="content">Content</option>
                          <option value="seo">SEO</option>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          <option value="voice">Voice</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Description</label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What this agent specializes in..."
                        className="input-holographic"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4" /> Base Prompt (System Identity)
                      </label>
                      <textarea
                        value={formData.basePrompt}
                        onChange={(e) => setFormData({ ...formData, basePrompt: e.target.value })}
                        rows={8}
                        className="input-holographic font-mono text-xs"
                      />
                      <p className="text-xs text-white/40 mt-1">
                        This defines the AI's core behavior and capabilities
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Design Standards (Admin Override)
                      </label>
                      <textarea
                        value={formData.designStandards}
                        onChange={(e) => setFormData({ ...formData, designStandards: e.target.value })}
                        placeholder="e.g., Always use dark mode, include hero sections, use modern gradients..."
                        rows={3}
                        className="input-holographic"
                      />
                      <p className="text-xs text-white/40 mt-1">
                        These standards will be applied to all outputs from this agent
                      </p>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {isSaving ? 'Saving...' : 'Save Agent'}
                      </button>
                      <button 
                        onClick={testPrompt}
                        className="btn-secondary flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Test Prompt'}
                      </button>
                      <button 
                        onClick={() => { setIsCreating(false); setSelectedAgent(null); }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <Bot className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 mb-4">Select an agent to edit or create a new one</p>
                  <button onClick={createNew} className="btn-primary">
                    <Plus className="w-4 h-4 inline mr-2" /> Create New Agent
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Puter.js Agents */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Free AI Agents (Puter.js)</h2>
                <p className="text-white/50">Powered by Puter.js - No API keys needed, completely free!</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm ${puterLoaded ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {puterLoaded ? '✓ Puter.js Ready' : 'Loading Puter.js...'}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {puterAgents.map((agent) => (
                <div key={agent.id} className="glass-card p-5 hover:border-[#ff375f]/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <agent.icon className="w-6 h-6 text-[#ff375f]" />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60 mb-2">
                    {agent.category}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{agent.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{agent.description}</p>
                  <button 
                    onClick={() => runPuterAgent(agent)}
                    disabled={!puterLoaded}
                    className="w-full btn-secondary text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" /> Run Agent
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What is Puter.js?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Completely Free</h4>
                  <p className="text-white/50 text-sm">No API keys, no subscriptions, no limits. Use AI agents as much as you want.</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Multiple Capabilities</h4>
                  <p className="text-white/50 text-sm">Generate websites, images, content, voice, and more with a single integration.</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Always Available</h4>
                  <p className="text-white/50 text-sm">Puter.js runs in the browser, so it's always ready when you need it.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
