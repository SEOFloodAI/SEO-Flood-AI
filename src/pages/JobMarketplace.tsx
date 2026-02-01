import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, PenTool, Clock, DollarSign, Star, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

type JobType = 'build' | 'content';
type JobStatus = 'open' | 'in-progress' | 'completed';

interface Job {
  id: string;
  title: string;
  type: JobType;
  description: string;
  budget: string;
  postedBy: string;
  postedAt: string;
  deadline: string;
  skills: string[];
  proposals: number;
  status: JobStatus;
}

const JOBS: Job[] = [
  {
    id: '1',
    title: 'Build CBD E-commerce Site with 50 Products',
    type: 'build',
    description: 'Need a fully functional CBD e-commerce website with product pages, cart, checkout, and payment integration.',
    budget: '$2,500 - $4,000',
    postedBy: 'GreenLeaf CBD Co.',
    postedAt: '2 hours ago',
    deadline: '14 days',
    skills: ['React', 'Shopify', 'SEO', 'E-commerce'],
    proposals: 12,
    status: 'open',
  },
  {
    id: '2',
    title: 'Write 20 Real Estate Blog Posts',
    type: 'content',
    description: 'Looking for experienced real estate content writer. Topics include market trends, buying guides.',
    budget: '$800 - $1,200',
    postedBy: 'Austin Realty Group',
    postedAt: '5 hours ago',
    deadline: '7 days',
    skills: ['Real Estate', 'SEO Writing', 'Research'],
    proposals: 8,
    status: 'open',
  },
  {
    id: '3',
    title: 'Legal Website Redesign & SEO',
    type: 'build',
    description: 'Redesign existing personal injury law firm website. Improve conversions and local SEO.',
    budget: '$3,000 - $5,000',
    postedBy: 'Johnson & Associates Law',
    postedAt: '1 day ago',
    deadline: '21 days',
    skills: ['Web Design', 'WordPress', 'Legal SEO'],
    proposals: 15,
    status: 'open',
  },
];

const FREELANCERS = [
  { id: '1', name: 'Sarah Chen', role: 'Web Developer', rating: 4.9, completedJobs: 47, skills: ['React', 'Next.js', 'SEO'], hourlyRate: '$85/hr', avatar: 'SC' },
  { id: '2', name: 'Marcus Johnson', role: 'Content Writer', rating: 4.8, completedJobs: 89, skills: ['Legal', 'Real Estate', 'Finance'], hourlyRate: '$65/hr', avatar: 'MJ' },
  { id: '3', name: 'Emily Rodriguez', role: 'SEO Specialist', rating: 5.0, completedJobs: 34, skills: ['Local SEO', 'Technical SEO'], hourlyRate: '$95/hr', avatar: 'ER' },
];

const JobMarketplace = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'freelancers'>('jobs');
  const [jobType, setJobType] = useState<JobType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = JOBS.filter(job => {
    const matchesType = jobType === 'all' || job.type === jobType;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleApply = (job: Job) => {
    toast.success(`Application sent for: ${job.title}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-lg font-bold text-white">SEOFlood.AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-white/60 hover:text-white">Home</Link>
            <Link to="/rental" className="text-sm text-white/60 hover:text-white">Rental</Link>
            <Link to="/login" className="btn-primary text-sm py-2 px-4">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Job Marketplace</h1>
          <p className="text-white/50 max-w-2xl mx-auto">Connect with top SEO professionals or find your next project.</p>
        </div>
      </section>

      {/* Tabs & Search */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-xl bg-white/5">
              <button onClick={() => setActiveTab('jobs')} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'jobs' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}>Find Work</button>
              <button onClick={() => setActiveTab('freelancers')} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'freelancers' ? 'bg-[#ff375f] text-white' : 'text-white/60'}`}>Find Talent</button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={activeTab === 'jobs' ? "Search jobs..." : "Search freelancers..."} className="input-holographic pl-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'jobs' ? (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { value: 'all', label: 'All Jobs', icon: Briefcase },
                  { value: 'build', label: 'Build My Site', icon: Briefcase },
                  { value: 'content', label: 'Write Content', icon: PenTool },
                ].map((type) => (
                  <button key={type.value} onClick={() => setJobType(type.value as JobType | 'all')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${jobType === type.value ? 'bg-[#ff375f] text-white' : 'bg-white/5 text-white/60'}`}>
                    <type.icon className="w-4 h-4" /> {type.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="glass-card p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${job.type === 'build' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                            {job.type === 'build' ? 'Build My Site' : 'Write Content'}
                          </span>
                          <span className="text-xs text-white/40">{job.postedAt}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>
                        <p className="text-white/50 text-sm mb-4">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-white/60"><DollarSign className="w-4 h-4 text-[#ff375f]" /> {job.budget}</span>
                          <span className="flex items-center gap-1.5 text-white/60"><Clock className="w-4 h-4" /> {job.deadline}</span>
                          <span className="flex items-center gap-1.5 text-white/60"><Briefcase className="w-4 h-4" /> {job.proposals} proposals</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.skills.map((skill, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => handleApply(job)} className="btn-primary text-sm py-2 px-4">Apply Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FREELANCERS.map((freelancer) => (
                <div key={freelancer.id} className="glass-card p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{freelancer.avatar}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{freelancer.name}</h3>
                  <p className="text-sm text-[#ff375f] mb-3">{freelancer.role}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{freelancer.rating}</span>
                    <span className="text-white/40 text-sm">({freelancer.completedJobs} jobs)</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {freelancer.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-white font-medium">{freelancer.hourlyRate}</span>
                    <button className="text-sm text-[#ff375f] hover:underline">Hire</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8">
            <CheckCircle2 className="w-12 h-12 text-[#ff375f] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h2>
            <p className="text-white/50 max-w-xl mx-auto mb-6">Join thousands of freelancers and businesses on the SEO Flood marketplace.</p>
            <Link to="/signup" className="btn-primary">Create Free Account</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobMarketplace;
