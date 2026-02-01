import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, Bot, Save, Sparkles, Code, Palette, 
  Wand2, Plus, Trash2, Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import { NEXUS_SYSTEM_PROMPT, buildNexusPrompt } from '@/lib/api-config';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  designStandards: string;
  isActive: boolean;
}

const AIAgentConfig = () => {
  const { user } = useAppContext();
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrompt: NEXUS_SYSTEM_PROMPT,
    designStandards: '',
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load agents');
      setIsLoading(false);
      return;
    }
    
    setAgents(data || []);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error('Agent name is required');
      return;
    }

    setIsSaving(true);
    try {
      if (selectedAgent) {
        const { error } = await supabase
          .from('ai_agents')
          .update({
            name: formData.name,
            description: formData.description,
            base_prompt: formData.basePrompt,
            design_standards: formData.designStandards,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedAgent.id);
        
        if (error) throw error;
        toast.success('Agent updated successfully');
      } else {
        const { error } = await supabase
          .from('ai_agents')
          .insert({
            user_id: user?.id,
            name: formData.name,
            description: formData.description,
            base_prompt: formData.basePrompt,
            design_standards: formData.designStandards,
          });
        
        if (error) throw error;
        toast.success('Agent created successfully');
      }
      
      fetchAgents();
      setIsCreating(false);
      setSelectedAgent(null);
      setFormData({
        name: '',
        description: '',
        basePrompt: NEXUS_SYSTEM_PROMPT,
        designStandards: '',
      });
    } catch (error) {
      console.error('Save agent error:', error);
      toast.error('Failed to save agent');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (agentId: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    
    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', agentId);
      
      if (error) throw error;
      
      toast.success('Agent deleted');
      fetchAgents();
      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete agent');
    }
  };

  const testPrompt = () => {
    const testContext = {
      clientRequest: 'Create a landing page for a plumbing business',
      designSpecs: 'Blue and white colors, professional look',
      adminOverride: formData.designStandards,
      categoryContext: 'Local service business',
    };
    
    const fullPrompt = buildNexusPrompt(testContext);
    
    navigator.clipboard.writeText(fullPrompt);
    toast.success('Test prompt copied to clipboard');
  };

  const selectAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      description: agent.description,
      basePrompt: agent.basePrompt,
      designStandards: agent.designStandards,
    });
    setIsCreating(false);
  };

  const createNew = () => {
    setIsCreating(true);
    setSelectedAgent(null);
    setFormData({
      name: '',
      description: '',
      basePrompt: NEXUS_SYSTEM_PROMPT,
      designStandards: '',
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
                AI Agent Configuration
              </h1>
              <p className="text-sm text-white/50">Configure your AI agents for website generation</p>
            </div>
          </div>
          <button 
            onClick={createNew}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Agent
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agent List */}
          <div className="glass-card p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Your Agents</h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-[#ff375f] animate-spin" />
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`group p-4 rounded-xl cursor-pointer transition-all ${
                      selectedAgent?.id === agent.id 
                        ? 'bg-[#ff375f]/20 border border-[#ff375f]/50' 
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div 
                        onClick={() => selectAgent(agent)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <Bot className="w-5 h-5 text-[#ff375f]" />
                        <div>
                          <p className="text-white font-medium">{agent.name}</p>
                          <p className="text-white/40 text-sm line-clamp-1">{agent.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(agent.id)}
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
                      rows={12}
                      className="input-holographic font-mono text-xs"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      This defines the AI's core behavior and capabilities. Modify with caution.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" /> Design Standards (Admin Override)
                    </label>
                    <textarea
                      value={formData.designStandards}
                      onChange={(e) => setFormData({ ...formData, designStandards: e.target.value })}
                      placeholder="e.g., Always use dark mode, include hero sections, use modern gradients, ensure mobile-first design..."
                      rows={4}
                      className="input-holographic"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      These standards will be applied to all websites this agent creates
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
                      <Wand2 className="w-4 h-4" /> Test Prompt
                    </button>
                    <button 
                      onClick={() => {
                        setIsCreating(false);
                        setSelectedAgent(null);
                      }}
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
      </main>
    </div>
  );
};

export default AIAgentConfig;
