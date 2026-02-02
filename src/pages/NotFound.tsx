import { Link } from 'react-router-dom';
import { Rocket, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff375f]/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SEO Flood AI</span>
        </Link>

        {/* 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-white/50 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="btn-primary flex items-center gap-2">
            <Home className="w-5 h-5" /> Go to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
