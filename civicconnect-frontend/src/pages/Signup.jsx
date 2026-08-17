import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import { UserPlus, User, Mail, Lock, Phone, Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Key name mapped to 'fullName' to match backend controller
      await API.post('/auth/signup', {
        fullName: formData.name,
        email: formData.email,
        password: formData.password
      });

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || 'Registration failed!');
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
              <UserPlus size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Citizen Registration</h2>
            <p className="text-xs text-slate-500 mt-1">Create an account to track & file grievances</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Rajesh Kumar"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@email.com"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Mobile Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="9876543210"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              {loading ? 'Registering...' : 'Register Account'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Already registered?{' '}
            <Link to="/login" className="text-blue-900 font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;