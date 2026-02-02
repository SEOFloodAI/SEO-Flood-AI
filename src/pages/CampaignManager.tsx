import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Target, Plus, Sparkles, FileText, Image, Video,
  Mic, BarChart3, Calendar, Clock, CheckCircle2, Loader2,
  Copy, Download, Send, Zap, Globe, TrendingUp, Users
} from 'lucide-react';
import { toast } from 'sonner';
import { isPuterAvailable, puterChat } from '@/lib/puter';
import { CAMPAIGN_GENERATION_PROMPT } from '@/lib/prompts';

interface Campaign {
  id: string;
  name: string;
  goal: string;
  targetAudience: string;
  channels: string[];
  status: 'draft' | 'generating' | 'completed';
  createdAt: string;
}

interface GeneratedContent {
  strategy: string;
  contentCalendar: string[];
  adCopy: { headlines: string[]; bodyCopy: string[]; ctas: string[] };
  socialPosts: string[];
  emailSequence: string[];
  landingPageCopy: string;
  seoRecommendations: string[];
}

export default function CampaignManager() {
  const { user } = useAppContext();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    targetAudience: '',
    channels: [] as string[],
    budget: '',
    timeline: '',
  });

  const channels = [
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'email', label: 'Email Marketing', icon: FileText },
    { id: 'ads', label: 'Paid Ads', icon: TrendingUp },
    { id: 'seo', label: 'SEO/Content', icon: BarChart3 },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'influencer', label: 'Influencer', icon: Users },
  ];

  const toggleChannel = (channelId: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(c => c !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  const generateCampaign = async () => {
    if (!formData.name || !formData.goal) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockContent: GeneratedContent = {
        strategy: `# ${formData.name} - Marketing Strategy

## Objective
${formData.goal}

## Target Audience
${formData.targetAudience}

## Key Messaging
- Primary: Transform your business with our proven solutions
- Secondary: Join 10,000+ satisfied customers
- Proof: 98% customer satisfaction rate

## Channels
${formData.channels.map(c => `- ${c}`).join('\n')}

## Success Metrics
- Website traffic: +50% in 30 days
- Lead generation: +100 qualified leads
- Conversion rate: 5%+`,

        contentCalendar: [
          'Week 1: Launch announcement + teaser content',
          'Week 2: Educational content series begins',
          'Week 3: Customer testimonials + case studies',
          'Week 4: Limited-time offer promotion',
        ],

        adCopy: {
          headlines: [
            'Transform Your Business Today',
            'Join 10,000+ Success Stories',
            'The Solution You\'ve Been Waiting For',
            'See Results in Just 30 Days',
            'Stop Struggling, Start Growing',
          ],
          bodyCopy: [
            'Discover the proven system that has helped thousands of businesses like yours achieve remarkable growth.',
            'Our comprehensive solution addresses your biggest challenges while delivering measurable results.',
          ],
          ctas: [
            'Get Started Free',
            'Book a Demo',
            'Learn More',
            'Claim Your Spot',
          ],
        },

        socialPosts: [
          '🚀 Big news! We\'re launching something special. Stay tuned for details! #Launch #Innovation',
          '💡 Did you know? 90% of businesses fail within the first year. Here\'s how to be in the 10% that succeed...',
          '📊 Case Study: How Company X increased revenue by 300% in 6 months using our solution.',
        ],

        emailSequence: [
          'Subject: Welcome! Here\'s what to expect...\n\nHi [Name],\n\nWelcome to the family! We\'re excited to help you achieve your goals.',
          'Subject: Your free resource is ready\n\nHi [Name],\n\nAs promised, here\'s your exclusive guide to [topic].',
          'Subject: Limited time: 50% off your first month\n\nHi [Name],\n\nWe\'re offering an exclusive discount just for you.',
        ],

        landingPageCopy: `# ${formData.name}

## Hero Section
Headline: Transform Your Business with ${formData.name}
Subheadline: The all-in-one solution for ${formData.targetAudience}
CTA: Start Your Free Trial

## Benefits
1. Save Time - Automate repetitive tasks
2. Increase Revenue - Proven growth strategies
3. Scale Faster - Built for expansion

## Social Proof
"This changed everything for our business" - Happy Customer

## FAQ
Q: How quickly can I see results?
A: Most customers see improvements within 30 days.

## Final CTA
Ready to get started? Join thousands of successful businesses today.`,

        seoRecommendations: [
          'Target keyword: ' + formData.goal.split(' ').slice(0, 3).join(' '),
          'Create pillar content around: ' + formData.name,
          'Build backlinks from industry publications',
          'Optimize for local search if applicable',
        ],
      };

      setGeneratedContent(mockContent);
      
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: formData.name,
        goal: formData.goal,
        targetAudience: formData.targetAudience,
        channels: formData.channels,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      
      setCampaigns([newCampaign, ...campaigns]);
      setIsGenerating(false);
      toast.success('Campaign generated successfully!');
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
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
                <Target className="w-6 h-6 text-[#ff375f]" />
                Campaign Manager
              </h1>
              <p className="text-sm text-white/50">AI-powered marketing campaign creation</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {generatedContent ? (
          /* Generated Campaign View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setGeneratedContent(null)}
                  className="btn-secondary"
                >
                  Back to Campaigns
                </button>
                <button className="btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export All
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Strategy */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#ff375f]" /> Strategy
                </h3>
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono bg-white/5 p-4 rounded-xl overflow-auto max-h-64">
                  {generatedContent.strategy}
                </pre>
                <button 
                  onClick={() => copyToClipboard(generatedContent.strategy)}
                  className="mt-3 btn-secondary text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Strategy
                </button>
              </div>

              {/* Content Calendar */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#ff375f]" /> Content Calendar
                </h3>
                <div className="space-y-3">
                  {generatedContent.contentCalendar.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                      <div className="w-6 h-6 rounded-full bg-[#ff375f]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-[#ff375f] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Copy */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#ff375f]" /> Ad Copy
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-white/60 mb-2">Headlines</h4>
                    <div className="space-y-2">
                      {generatedContent.adCopy.headlines.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                          <span className="text-white/80 flex-1">{h}</span>
                          <button onClick={() => copyToClipboard(h)} className="text-white/40 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Posts */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#ff375f]" /> Social Media Posts
                </h3>
                <div className="space-y-3">
                  {generatedContent.socialPosts.map((post, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5">
                      <p className="text-white/80 text-sm mb-2">{post}</p>
                      <button 
                        onClick={() => copyToClipboard(post)}
                        className="text-[#ff375f] text-xs hover:underline"
                      >
                        Copy to clipboard
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Sequence */}
              <div className="glass-card p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#ff375f]" /> Email Sequence
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {generatedContent.emailSequence.map((email, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5">
                      <div className="text-xs text-white/40 mb-2">Email {i + 1}</div>
                      <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono max-h-48 overflow-auto">
                        {email}
                      </pre>
                      <button 
                        onClick={() => copyToClipboard(email)}
                        className="mt-2 text-[#ff375f] text-xs hover:underline"
                      >
                        Copy email
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landing Page */}
              <div className="glass-card p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#ff375f]" /> Landing Page Copy
                </h3>
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono bg-white/5 p-4 rounded-xl overflow-auto max-h-96">
                  {generatedContent.landingPageCopy}
                </pre>
                <button 
                  onClick={() => copyToClipboard(generatedContent.landingPageCopy)}
                  className="mt-3 btn-secondary text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Landing Page
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Campaigns List */
          <div>
            {campaigns.length === 0 ? (
              <div className="text-center py-20">
                <Target className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No campaigns yet</h3>
                <p className="text-white/50 mb-6">Create your first AI-powered marketing campaign</p>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                  <Plus className="w-4 h-4 inline mr-2" /> Create Campaign
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="glass-card p-5 hover:border-[#ff375f]/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-white font-semibold">{campaign.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        campaign.status === 'generating' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-white/10 text-white/60'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm mb-4">{campaign.goal}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaign.channels.map(channel => (
                        <span key={channel} className="px-2 py-1 rounded-full bg-white/5 text-xs text-white/60">
                          {channel}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setGeneratedContent(mockContent)}
                      className="w-full btn-secondary text-sm"
                    >
                      View Campaign
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && !generatedContent && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-xl max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Campaign</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Summer Sale 2025"
                  className="input-holographic"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Campaign Goal *</label>
                <textarea
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="What do you want to achieve?"
                  rows={3}
                  className="input-holographic"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Target Audience</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="e.g., Small business owners aged 25-45"
                  className="input-holographic"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Channels</label>
                <div className="grid grid-cols-3 gap-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.channels.includes(channel.id)
                          ? 'border-[#ff375f] bg-[#ff375f]/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <channel.icon className={`w-4 h-4 mb-1 ${formData.channels.includes(channel.id) ? 'text-[#ff375f]' : 'text-white/60'}`} />
                      <span className="text-xs text-white/80">{channel.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Budget (optional)</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="$5,000"
                    className="input-holographic"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Timeline (optional)</label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="4 weeks"
                    className="input-holographic"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={generateCampaign}
                disabled={isGenerating}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock content for view button
const mockContent: GeneratedContent = {
  strategy: '',
  contentCalendar: [],
  adCopy: { headlines: [], bodyCopy: [], ctas: [] },
  socialPosts: [],
  emailSequence: [],
  landingPageCopy: '',
  seoRecommendations: [],
};
