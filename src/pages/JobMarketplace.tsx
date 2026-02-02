import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ArrowLeft, Briefcase, Search, Filter, Plus, MapPin,
  DollarSign, Clock, Star, CheckCircle2, Loader2,
  Send, User, Building2, MoreHorizontal, Bookmark,
  TrendingUp, Users, Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  title: string;
  description: string;
  employerName: string;
  employerAvatar?: string;
  jobType: 'build' | 'content' | 'seo' | 'marketing';
  budgetMin: number;
  budgetMax: number;
  location: string;
  skills: string[];
  postedAt: string;
  proposalsCount: number;
}

interface Freelancer {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  skills: string[];
  completedJobs: number;
}

export default function JobMarketplace() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'jobs' | 'talent'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        {
          id: '1',
          title: 'SEO Website Build for Dental Practice',
          description: 'Looking for an experienced developer to build a complete SEO-optimized website for a dental practice in Miami. Needs 20+ location pages.',
          employerName: 'Smile Dental Miami',
          jobType: 'build',
          budgetMin: 500,
          budgetMax: 1500,
          location: 'Remote',
          skills: ['React', 'SEO', 'Next.js'],
          postedAt: '2 hours ago',
          proposalsCount: 8,
        },
        {
          id: '2',
          title: 'Content Writer for Keto Diet Blog',
          description: 'Need 10 high-quality articles (1500+ words each) about keto diet, recipes, and success stories. Must be SEO-optimized.',
          employerName: 'KetoLife Magazine',
          jobType: 'content',
          budgetMin: 300,
          budgetMax: 600,
          location: 'Remote',
          skills: ['Content Writing', 'SEO', 'Health & Wellness'],
          postedAt: '5 hours ago',
          proposalsCount: 15,
        },
        {
          id: '3',
          title: 'Local SEO Optimization for Plumber',
          description: 'Need help optimizing Google Business Profile and building local citations for a plumbing business in Austin.',
          employerName: 'Austin Pro Plumbing',
          jobType: 'seo',
          budgetMin: 200,
          budgetMax: 500,
          location: 'Austin, TX',
          skills: ['Local SEO', 'Google Business', 'Citations'],
          postedAt: '1 day ago',
          proposalsCount: 6,
        },
        {
          id: '4',
          title: 'Marketing Campaign for New Product Launch',
          description: 'Looking for a marketing expert to create and execute a campaign for our new fitness app launch.',
          employerName: 'FitTech Startup',
          jobType: 'marketing',
          budgetMin: 1000,
          budgetMax: 3000,
          location: 'Remote',
          skills: ['Marketing', 'Social Media', 'Ads'],
          postedAt: '2 days ago',
          proposalsCount: 12,
        },
      ]);

      setFreelancers([
        {
          id: '1',
          name: 'Sarah Johnson',
          title: 'SEO Specialist & Content Writer',
          hourlyRate: 75,
          rating: 4.9,
          reviewCount: 127,
          skills: ['SEO', 'Content Writing', 'Keyword Research'],
          completedJobs: 89,
        },
        {
          id: '2',
          name: 'Mike Chen',
          title: 'Full-Stack Web Developer',
          hourlyRate: 95,
          rating: 5.0,
          reviewCount: 84,
          skills: ['React', 'Next.js', 'Node.js', 'SEO'],
          completedJobs: 67,
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          title: 'Digital Marketing Expert',
          hourlyRate: 85,
          rating: 4.8,
          reviewCount: 56,
          skills: ['Marketing', 'Google Ads', 'Social Media'],
          completedJobs: 43,
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFreelancers = freelancers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'build': return <Zap className="w-4 h-4" />;
      case 'content': return <Briefcase className="w-4 h-4" />;
      case 'seo': return <TrendingUp className="w-4 h-4" />;
      case 'marketing': return <Users className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
  };

  const submitProposal = () => {
    toast.success('Proposal submitted successfully!');
    setSelectedJob(null);
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
                <Briefcase className="w-6 h-6 text-[#ff375f]" />
                Marketplace
              </h1>
              <p className="text-sm text-white/50">Find jobs or hire talent</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'jobs' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}
            >
              Find Work
            </button>
            <button 
              onClick={() => setActiveTab('talent')}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'talent' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}
            >
              Find Talent
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'jobs' ? "Search jobs..." : "Search freelancers..."}
              className="input-holographic pl-12 w-full"
            />
          </div>
          {activeTab === 'jobs' && (
            <button 
              onClick={() => setShowPostJobModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#ff375f] animate-spin" />
          </div>
        ) : activeTab === 'jobs' ? (
          /* Jobs List */
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="glass-card p-5 hover:border-[#ff375f]/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <span className="px-2 py-1 rounded-full bg-white/10 text-xs text-white/60 flex items-center gap-1">
                        {getJobTypeIcon(job.jobType)}
                        {job.jobType}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-white/50">
                        <Building2 className="w-4 h-4" />
                        {job.employerName}
                      </div>
                      <div className="flex items-center gap-1 text-white/50">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        ${job.budgetMin}-${job.budgetMax}
                      </div>
                      <div className="flex items-center gap-1 text-white/50">
                        <Clock className="w-4 h-4" />
                        {job.postedAt}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 ml-6">
                    <div className="text-sm text-white/50">
                      {job.proposalsCount} proposals
                    </div>
                    <button 
                      onClick={() => handleApply(job)}
                      className="btn-primary text-sm"
                    >
                      Apply Now
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Freelancers List */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="glass-card p-5 hover:border-[#ff375f]/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{freelancer.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{freelancer.name}</h3>
                    <p className="text-white/50 text-sm">{freelancer.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{freelancer.rating}</span>
                      <span className="text-white/50">({freelancer.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-white">${freelancer.hourlyRate}</div>
                    <div className="text-xs text-white/50">per hour</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{freelancer.completedJobs}</div>
                    <div className="text-xs text-white/50">jobs completed</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-white/5 text-xs text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full btn-secondary text-sm">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Post a New Job</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Job Title</label>
                <input type="text" placeholder="e.g., SEO Website Build" className="input-holographic" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Description</label>
                <textarea rows={4} placeholder="Describe the project..." className="input-holographic" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Budget Min</label>
                  <input type="number" placeholder="500" className="input-holographic" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Budget Max</label>
                  <input type="number" placeholder="1500" className="input-holographic" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Skills Required</label>
                <input type="text" placeholder="React, SEO, Content Writing..." className="input-holographic" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPostJobModal(false)} className="flex-1 btn-secondary">Cancel</button>
              <button 
                onClick={() => { setShowPostJobModal(false); toast.success('Job posted!'); }}
                className="flex-1 btn-primary"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Apply for: {selectedJob.title}</h2>
            <p className="text-white/50 text-sm mb-4">{selectedJob.employerName}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Cover Letter</label>
                <textarea 
                  rows={5} 
                  placeholder="Introduce yourself and explain why you're a good fit..."
                  className="input-holographic"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Proposed Budget</label>
                <input type="number" placeholder="Your bid" className="input-holographic" />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedJob(null)} className="flex-1 btn-secondary">Cancel</button>
              <button 
                onClick={submitProposal}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
