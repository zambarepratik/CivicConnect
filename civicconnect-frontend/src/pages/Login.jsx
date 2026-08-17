import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import { LogIn, Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user?.role;

      if (role === 'super_admin' || role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'officer') {
        navigate('/officer-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed! Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <LogIn size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Portal Login</h2>
            <p className="text-xs text-slate-500 mt-1">Access for Citizens, Officers & Administration</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@civicconnect.com"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg shadow-md transition duration-200 mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
            <span>Secure Role-Based Access Control</span>
          </div>

          <p className="text-center text-xs text-slate-600 mt-4">
            New Citizen?{' '}
            <Link to="/signup" className="text-blue-900 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;