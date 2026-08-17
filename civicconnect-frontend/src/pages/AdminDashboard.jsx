import { useState, useEffect } from 'react';
import API from '../utils/api';
import { UserPlus, Users, ShieldCheck, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [officerForm, setOfficerForm] = useState({
    fullName: '',
    email: '',
    password: '',
    department: 'Water Supply'
  });

  // 2. CALL API: GET /api/auth/users
  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await API.get('/auth/users');
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch platform users');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleInputChange = (e) => {
    setOfficerForm({ ...officerForm, [e.target.name]: e.target.value });
  };

  // 3. CALL API: POST /api/auth/create-officer
  const handleCreateOfficer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/auth/create-officer', officerForm);
      alert(res.data.message || 'Officer account created successfully!');

      setOfficerForm({
        fullName: '',
        email: '',
        password: '',
        department: 'Water Supply'
      });

      // Refresh list after creation
      fetchAllUsers();
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || 'Failed to create officer');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-amber-400" /> Admin Command Center
            </h1>
            <p className="text-xs text-blue-200 mt-1">Manage Officers & Platform User Directory</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Create Officer Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserPlus className="text-blue-900" size={20} /> Create Officer Account
            </h2>

            <form onSubmit={handleCreateOfficer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={officerForm.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Ramesh Varma"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Official Email</label>
                <input
                  type="email"
                  name="email"
                  value={officerForm.email}
                  onChange={handleInputChange}
                  required
                  placeholder="officer@civicconnect.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={officerForm.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Department</label>
                <select
                  name="department"
                  value={officerForm.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option>Water Supply</option>
                  <option>Sanitation & Garbage</option>
                  <option>Street Lighting</option>
                  <option>Roads & Drainage</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? 'Creating...' : 'Register Officer'}
              </button>
            </form>
          </div>

          {/* Users List Table Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="text-blue-900" size={20} /> User Directory ({users.length})
            </h2>

            {loadingUsers ? (
              <div className="flex justify-center p-8">
                <Loader2 size={24} className="animate-spin text-blue-900" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase border-b border-slate-200">
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Department</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{u.full_name}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                            u.role === 'officer' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{u.department || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;