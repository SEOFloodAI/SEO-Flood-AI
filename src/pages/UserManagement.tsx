import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowLeft, Users, Search, Filter, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  tier: string;
  sites: number;
  status: 'active' | 'pending' | 'suspended';
  joined: string;
}

const MOCK_USERS: UserData[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'builder', tier: 'pro', sites: 5, status: 'active', joined: '2 hours ago' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@agency.com', role: 'freelancer', tier: 'enterprise', sites: 8, status: 'active', joined: '5 hours ago' },
  { id: '3', name: 'Mike Johnson', email: 'mike@seo.com', role: 'renter', tier: 'free', sites: 0, status: 'pending', joined: '1 day ago' },
  { id: '4', name: 'Emily Davis', email: 'emily@legal.com', role: 'employer', tier: 'pro', sites: 2, status: 'active', joined: '2 days ago' },
  { id: '5', name: 'Alex Wong', email: 'alex@tech.com', role: 'builder', tier: 'enterprise', sites: 12, status: 'active', joined: '3 days ago' },
];

const UserManagement = () => {
  useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success('User role updated');
  };

  const handleTierChange = (userId: string, newTier: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, tier: newTier } : u));
    toast.success('User tier updated');
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'pending' | 'suspended') => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    toast.success('User status updated');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-[#ff375f]" />
                User Management
              </h1>
              <p className="text-sm text-white/50">Manage all platform users</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: users.length, color: 'text-[#ff375f]' },
            { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'text-green-400' },
            { label: 'Pending', value: users.filter(u => u.status === 'pending').length, color: 'text-yellow-400' },
            { label: 'Pro/Enterprise', value: users.filter(u => u.tier !== 'free').length, color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="glass-card p-4 mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff375f]/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Users Table */}
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Role</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Plan</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Sites</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff375f] to-[#ff6b35] flex items-center justify-center text-white text-sm font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-white">{u.name}</p>
                        <p className="text-xs text-white/40">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      <option value="user">User</option>
                      <option value="builder">Builder</option>
                      <option value="renter">Renter</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="employer">Employer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.tier}
                      onChange={(e) => handleTierChange(u.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/60">{u.sites}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleStatusChange(u.id, u.status === 'active' ? 'suspended' : 'active')}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        u.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : u.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {u.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {u.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
