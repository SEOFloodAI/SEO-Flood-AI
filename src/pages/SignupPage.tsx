import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext, type UserRole } from '@/contexts/AppContext';
import { 
  Rocket, Mail, Lock, User, Eye, EyeOff, ArrowRight,
  Loader2, CheckCircle2, Building2, Briefcase, UserCircle,
  Code, Globe
} from 'lucide-react';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'builder', label: 'Site Builder', icon: Code, description: 'Build and rank websites' },
  { value: 'renter', label: 'Page Renter', icon: Globe, description: 'Rent ranked pages for traffic' },
  { value: 'freelancer', label: 'Freelancer', icon: Briefcase, description: 'Offer SEO services' },
  { value: 'employer', label: 'Employer', icon: Building2, description: 'Hire SEO professionals' },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAppContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('builder');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await signup(email, password, fullName, selectedRole);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Signup failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff375f]/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SEO Flood AI</span>
        </Link>

        {/* Signup Card */}
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Create Account</h1>
          <p className="text-white/50 text-center mb-6">Start your SEO journey today</p>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-[#ff375f]' : 'bg-white/10'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-[#ff375f]' : 'bg-white/10'}`} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
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
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
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

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!fullName || !email}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-white/60 mb-2">I want to...</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setSelectedRole(role.value)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedRole === role.value
                            ? 'border-[#ff375f] bg-[#ff375f]/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <role.icon className={`w-5 h-5 mb-2 ${selectedRole === role.value ? 'text-[#ff375f]' : 'text-white/60'}`} />
                        <div className="text-sm font-medium text-white">{role.label}</div>
                        <div className="text-xs text-white/50">{role.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-holographic pl-12"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary py-3"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !password || password !== confirmPassword}
                    className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <span className="text-white/50">Already have an account? </span>
            <Link to="/login" className="text-[#ff375f] hover:underline">Sign in</Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-2">
          {[
            'Free AI agents with Puter.js',
            'No credit card required',
            'Cancel anytime',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
