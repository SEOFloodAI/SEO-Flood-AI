import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/sonner';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import Dashboard from '@/pages/Dashboard';
import WebsiteBuilder from '@/pages/WebsiteBuilder';
import AuthorityRental from '@/pages/AuthorityRental';
import JobMarketplace from '@/pages/JobMarketplace';
import AgentTasks from '@/pages/AgentTasks';
import MassPageGenerator from '@/pages/MassPageGenerator';
import SocialMarketing from '@/pages/SocialMarketing';
import UserManagement from '@/pages/UserManagement';
import Settings from '@/pages/Settings';
import AdminPanel from '@/pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) => {
  const { isAuthenticated, user, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#ff375f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin' && user?.role !== 'superadmin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/rental" element={<AuthorityRental />} />
          <Route path="/marketplace" element={<JobMarketplace />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/builder" element={
            <ProtectedRoute><WebsiteBuilder /></ProtectedRoute>
          } />
          <Route path="/agents" element={
            <ProtectedRoute><AgentTasks /></ProtectedRoute>
          } />
          <Route path="/mass-generator" element={
            <ProtectedRoute><MassPageGenerator /></ProtectedRoute>
          } />
          <Route path="/social" element={
            <ProtectedRoute><SocialMarketing /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute>
          } />

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
