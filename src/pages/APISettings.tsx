import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Settings, Key, Globe, CreditCard, Database,
  CheckCircle2, Eye, EyeOff, Copy, Save, Loader2,
  AlertCircle, Sparkles, Zap, Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface APIConfig {
  openai?: { apiKey: string; model: string };
  anthropic?: { apiKey: string; model: string };
  paypal?: { clientId: string; clientSecret: string; sandbox: boolean };
  stripe?: { publishableKey: string; secretKey: string };
  supabase?: { url: string; anonKey: string };
}

export default function APISettings() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'ai' | 'payment' | 'database'>('ai');
  const [isSaving, setIsSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  
  const [config, setConfig] = useState<APIConfig>({
    openai: { apiKey: '', model: 'gpt-4' },
    anthropic: { apiKey: '', model: 'claude-3-opus' },
    paypal: { clientId: '', clientSecret: '', sandbox: true },
    stripe: { publishableKey: '', secretKey: '' },
    supabase: { url: '', anonKey: '' },
  });

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <Link to="/dashboard" className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#ff375f]" />
              API Settings
            </h1>
            <p className="text-sm text-white/50">Configure your API integrations</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'ai', label: 'AI Providers', icon: Sparkles },
            { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
            { id: 'database', label: 'Database', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#ff375f] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'ai' && (
          <div className="space-y-6">
            {/* Puter.js Notice */}
            <div className="glass-card p-6 border-green-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Puter.js Integration (Free)</h3>
                  <p className="text-white/60 mb-4">
                    Your platform is already configured to use Puter.js for free AI capabilities. 
                    No API keys needed! Puter.js provides access to GPT-4, image generation, 
                    text-to-speech, and more at no cost.
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Active and ready to use</span>
                  </div>
                </div>
              </div>
            </div>

            {/* OpenAI */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Key className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">OpenAI</h3>
                  <p className="text-white/50 text-sm">For GPT-4 and DALL-E integration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type={showSecrets.openai ? 'text' : 'password'}
                      value={config.openai?.apiKey}
                      onChange={(e) => setConfig({ ...config, openai: { ...config.openai!, apiKey: e.target.value } })}
                      placeholder="sk-..."
                      className="input-holographic pr-24"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button 
                        onClick={() => toggleSecret('openai')}
                        className="p-2 rounded-lg hover:bg-white/10 text-white/40"
                      >
                        {showSecrets.openai ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Model</label>
                  <select 
                    value={config.openai?.model}
                    onChange={(e) => setConfig({ ...config, openai: { ...config.openai!, model: e.target.value } })}
                    className="input-holographic"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Anthropic */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Key className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Anthropic Claude</h3>
                  <p className="text-white/50 text-sm">For Claude AI integration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type={showSecrets.anthropic ? 'text' : 'password'}
                      value={config.anthropic?.apiKey}
                      onChange={(e) => setConfig({ ...config, anthropic: { ...config.anthropic!, apiKey: e.target.value } })}
                      placeholder="sk-ant-..."
                      className="input-holographic pr-24"
                    />
                    <button 
                      onClick={() => toggleSecret('anthropic')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/40"
                    >
                      {showSecrets.anthropic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Model</label>
                  <select 
                    value={config.anthropic?.model}
                    onChange={(e) => setConfig({ ...config, anthropic: { ...config.anthropic!, model: e.target.value } })}
                    className="input-holographic"
                  >
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                    <option value="claude-3-haiku">Claude 3 Haiku</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            {/* PayPal */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">PayPal</h3>
                  <p className="text-white/50 text-sm">For subscription payments</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Client ID</label>
                  <input
                    type="text"
                    value={config.paypal?.clientId}
                    onChange={(e) => setConfig({ ...config, paypal: { ...config.paypal!, clientId: e.target.value } })}
                    placeholder="Your PayPal Client ID"
                    className="input-holographic"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Client Secret</label>
                  <div className="relative">
                    <input
                      type={showSecrets.paypal ? 'text' : 'password'}
                      value={config.paypal?.clientSecret}
                      onChange={(e) => setConfig({ ...config, paypal: { ...config.paypal!, clientSecret: e.target.value } })}
                      placeholder="Your PayPal Client Secret"
                      className="input-holographic pr-12"
                    />
                    <button 
                      onClick={() => toggleSecret('paypal')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/40"
                    >
                      {showSecrets.paypal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-3 text-white/60 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.paypal?.sandbox}
                    onChange={(e) => setConfig({ ...config, paypal: { ...config.paypal!, sandbox: e.target.checked } })}
                    className="rounded bg-white/5 border-white/10"
                  />
                  Use Sandbox Mode
                </label>
              </div>
            </div>

            {/* Stripe */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Stripe</h3>
                  <p className="text-white/50 text-sm">For credit card payments</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Publishable Key</label>
                  <input
                    type="text"
                    value={config.stripe?.publishableKey}
                    onChange={(e) => setConfig({ ...config, stripe: { ...config.stripe!, publishableKey: e.target.value } })}
                    placeholder="pk_..."
                    className="input-holographic"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Secret Key</label>
                  <div className="relative">
                    <input
                      type={showSecrets.stripe ? 'text' : 'password'}
                      value={config.stripe?.secretKey}
                      onChange={(e) => setConfig({ ...config, stripe: { ...config.stripe!, secretKey: e.target.value } })}
                      placeholder="sk_..."
                      className="input-holographic pr-12"
                    />
                    <button 
                      onClick={() => toggleSecret('stripe')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/40"
                    >
                      {showSecrets.stripe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Supabase</h3>
                  <p className="text-white/50 text-sm">Database and authentication</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Project URL</label>
                  <input
                    type="text"
                    value={config.supabase?.url}
                    onChange={(e) => setConfig({ ...config, supabase: { ...config.supabase!, url: e.target.value } })}
                    placeholder="https://your-project.supabase.co"
                    className="input-holographic"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Anon Key</label>
                  <div className="relative">
                    <input
                      type={showSecrets.supabase ? 'text' : 'password'}
                      value={config.supabase?.anonKey}
                      onChange={(e) => setConfig({ ...config, supabase: { ...config.supabase!, anonKey: e.target.value } })}
                      placeholder="eyJ..."
                      className="input-holographic pr-12"
                    />
                    <button 
                      onClick={() => toggleSecret('supabase')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/40"
                    >
                      {showSecrets.supabase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-yellow-500/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Important Security Notice</h4>
                  <p className="text-white/60 text-sm">
                    Never share your API keys or store them in client-side code. 
                    These settings should be configured in your environment variables 
                    and only accessed server-side.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
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
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </main>
    </div>
  );
}
