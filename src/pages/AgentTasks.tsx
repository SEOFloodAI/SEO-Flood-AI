import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Bot, Plus, Play, Pause, Trash2, Edit3, 
  Clock, Sparkles, Save
} from 'lucide-react';
import { toast } from 'sonner';

interface AgentTask {
  id: string;
  name: string;
  prompt: string;
  schedule: string;
  status: 'active' | 'paused' | 'completed';
  lastRun: string;
  nextRun: string;
}

const AgentTasks = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([
    {
      id: '1',
      name: 'Daily Blog Post',
      prompt: 'Write a 500-word SEO-optimized blog post about real estate trends in Seattle. Include keywords: seattle homes, luxury real estate, property values.',
      schedule: 'Daily at 9:00 AM',
      status: 'active',
      lastRun: '2 hours ago',
      nextRun: 'Tomorrow 9:00 AM'
    },
    {
      id: '2',
      name: 'Weekly Market Report',
      prompt: 'Generate a comprehensive market analysis report for CBD industry. Include pricing trends, competitor analysis, and growth projections.',
      schedule: 'Weekly on Monday',
      status: 'paused',
      lastRun: '5 days ago',
      nextRun: 'Paused'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [, setEditingTask] = useState<AgentTask | null>(null);
  const [newTask, setNewTask] = useState({ name: '', prompt: '', schedule: 'daily' });

  const handleCreateTask = () => {
    if (!newTask.name || !newTask.prompt) {
      toast.error('Please fill in all fields');
      return;
    }

    const task: AgentTask = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTask.name,
      prompt: newTask.prompt,
      schedule: newTask.schedule === 'daily' ? 'Daily at 9:00 AM' : 
                newTask.schedule === 'weekly' ? 'Weekly on Monday' : 'Monthly on 1st',
      status: 'active',
      lastRun: 'Never',
      nextRun: 'Pending'
    };

    setTasks([...tasks, task]);
    setNewTask({ name: '', prompt: '', schedule: 'daily' });
    setShowCreateModal(false);
    toast.success('Agent task created successfully!');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success('Task deleted');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'paused' : 'active' as const } : t
    ));
    toast.success('Task status updated');
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
                AI Agent Tasks
              </h1>
              <p className="text-sm text-white/50">Configure automated AI tasks for your sites</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Card */}
        <div className="glass-card p-6 mb-8 border border-[#ff375f]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f]/20 to-[#ff6b35]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#ff375f]" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">How Agent Tasks Work</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Create AI-powered tasks that run on schedule. Your agents can write blog posts, 
                generate content, analyze competitors, and more. Each task uses your custom prompts 
                to produce exactly what you need.
              </p>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="glass-card p-6 hover:border-[#ff375f]/20 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">{task.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'active' ? 'bg-green-500/10 text-green-400' :
                      task.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{task.prompt}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2 text-white/40">
                      <Clock className="w-4 h-4" /> {task.schedule}
                    </span>
                    <span className="text-white/40">Last run: {task.lastRun}</span>
                    <span className="text-white/40">Next: {task.nextRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    {task.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setEditingTask(task)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-20">
            <Bot className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-white/50 mb-6">Create your first AI agent task to automate your workflow</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              Create Task
            </button>
          </div>
        )}
      </main>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Create New Agent Task</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Task Name</label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  placeholder="e.g., Daily Blog Post"
                  className="input-holographic"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">AI Prompt</label>
                <textarea
                  value={newTask.prompt}
                  onChange={(e) => setNewTask({ ...newTask, prompt: e.target.value })}
                  placeholder="Enter detailed instructions for the AI..."
                  rows={6}
                  className="input-holographic resize-none"
                />
                <p className="text-xs text-white/40 mt-2">
                  Be specific about what you want the AI to generate. Include keywords, tone, length, and any special requirements.
                </p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Schedule</label>
                <select
                  value={newTask.schedule}
                  onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
                  className="input-holographic"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleCreateTask} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentTasks;
