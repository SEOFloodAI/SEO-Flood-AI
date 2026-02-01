import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext, type UserRole } from '@/contexts/AppContext';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: 'builder', label: 'Site Builder', description: 'I want to build and rank websites' },
  { value: 'renter', label: 'Site Renter', description: 'I want to rent high-authority sites' },
  { value: 'freelancer', label: 'Freelancer', description: 'I offer SEO and web development services' },
  { value: 'employer', label: 'Employer', description: 'I want to hire SEO professionals' },
];

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('builder');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await signup(email, password, fullName, role);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Something went wrong');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff375f]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-[150px]" />
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Create Your Account</h1>
          <p className="text-white/50 mt-2">Start flooding the web with authority</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="input-holographic pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-holographic pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-holographic pl-12 pr-12"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-xl text-left text-sm transition-all ${
                      role === r.value
                        ? 'bg-[#ff375f]/10 border border-[#ff375f]/30 text-white'
                        : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-xs opacity-60 mt-1">{r.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/50">
              <input type="checkbox" required className="rounded bg-white/5 border-white/10" />
              I agree to the <Link to="#" className="text-[#ff375f] hover:underline">Terms</Link> and{' '}
              <Link to="#" className="text-[#ff375f] hover:underline">Privacy Policy</Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              Already have an account?{' '}
              <Link to="/login" className="text-[#ff375f] hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
