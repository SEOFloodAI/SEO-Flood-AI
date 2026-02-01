import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Share2, Plus, Calendar, Clock, Send, 
  Twitter, Facebook, Linkedin, Instagram, Trash2,
  Image as ImageIcon, Sparkles, CheckCircle2, BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledAt: string;
  status: 'draft' | 'scheduled' | 'published';
  image?: string;
}

const SocialMarketing = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      content: 'Just launched a new luxury real estate site in Seattle! Check it out and let me know what you think. 🏠✨',
      platforms: ['twitter', 'linkedin'],
      scheduledAt: '2024-01-15 09:00',
      status: 'scheduled'
    },
    {
      id: '2',
      content: 'SEO tip of the day: Focus on long-tail keywords for better conversion rates. Quality over quantity! 📈',
      platforms: ['twitter', 'facebook', 'linkedin'],
      scheduledAt: '2024-01-16 14:00',
      status: 'draft'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledDate: '',
    scheduledTime: ''
  });

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
  ];

  const togglePlatform = (platformId: string) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.content || newPost.platforms.length === 0) {
      toast.error('Please add content and select at least one platform');
      return;
    }

    const post: ScheduledPost = {
      id: Math.random().toString(36).substr(2, 9),
      content: newPost.content,
      platforms: newPost.platforms,
      scheduledAt: `${newPost.scheduledDate} ${newPost.scheduledTime || '09:00'}`,
      status: 'scheduled'
    };

    setPosts([...posts, post]);
    setNewPost({ content: '', platforms: [], scheduledDate: '', scheduledTime: '' });
    setShowCreateModal(false);
    toast.success('Post scheduled successfully!');
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast.success('Post deleted');
  };

  const generateContent = () => {
    const templates = [
      '🚀 New site launch alert! Check out our latest project and share your thoughts.',
      '📊 SEO results update: Our clients are seeing 300% traffic increases! Here\'s how...',
      '💡 Pro tip: Consistent content publishing is key to building authority. Start today!',
      '🏆 Milestone reached: 100+ high-authority sites in our rental marketplace!',
    ];
    setNewPost({ ...newPost, content: templates[Math.floor(Math.random() * templates.length)] });
    toast.success('AI-generated content ready!');
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
                <Share2 className="w-6 h-6 text-[#ff375f]" />
                Social Marketing
              </h1>
              <p className="text-sm text-white/50">Schedule posts and promote your sites</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-4">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2.4K</p>
                  <p className="text-sm text-white/50">Followers</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-700/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">856</p>
                  <p className="text-sm text-white/50">Connections</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12.8K</p>
                  <p className="text-sm text-white/50">Total Reach</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#ff375f]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#ff375f]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">48</p>
                  <p className="text-sm text-white/50">Posts This Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">Scheduled Posts</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="glass-card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      {post.platforms.map(p => {
                        const platform = platforms.find(pl => pl.id === p);
                        return platform ? (
                          <div key={p} className={`w-8 h-8 rounded-lg ${platform.color} flex items-center justify-center`}>
                            <platform.icon className="w-4 h-4 text-white" />
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                        post.status === 'published' ? 'bg-green-500/10 text-green-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {post.status}
                      </span>
                      <button onClick={() => deletePost(post.id)} className="p-2 text-white/40 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {post.scheduledAt.split(' ')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {post.scheduledAt.split(' ')[1]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="w-full p-4 rounded-xl bg-white/5 hover:bg-[#ff375f]/10 hover:border-[#ff375f]/30 border border-transparent transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-[#ff375f]" />
                    <div>
                      <p className="font-medium text-white">Create Post</p>
                      <p className="text-xs text-white/50">Schedule new content</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">Analytics</p>
                      <p className="text-xs text-white/50">View performance</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Connected Accounts</h3>
              <div className="space-y-3">
                {platforms.map(platform => (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${platform.color} flex items-center justify-center`}>
                        <platform.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/80">{platform.name}</span>
                    </div>
                    <span className="text-xs text-green-400">Connected</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="glass-card w-full max-w-xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Create New Post</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Select Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        newPost.platforms.includes(platform.id)
                          ? `${platform.color} text-white`
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <platform.icon className="w-4 h-4" />
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-white/60">Content</label>
                  <button onClick={generateContent} className="text-xs text-[#ff375f] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Generate
                  </button>
                </div>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What's on your mind?"
                  rows={4}
                  className="input-holographic resize-none"
                />
                <p className="text-xs text-white/40 mt-1 text-right">{newPost.content.length}/280</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Image (optional)</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#ff375f]/30 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-white/30 mx-auto mb-2" />
                  <p className="text-sm text-white/50">Click to upload or drag and drop</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Date</label>
                  <input
                    type="date"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    className="input-holographic"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Time</label>
                  <input
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                    className="input-holographic"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleCreatePost} className="btn-primary flex items-center gap-2">
                <Send className="w-4 h-4" /> Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMarketing;
