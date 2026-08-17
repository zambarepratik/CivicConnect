import { useState, useEffect } from 'react';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import { 
  User, 
  Mail, 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  Loader2 
} from 'lucide-react';

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // 1. API Integration: GET /api/auth/me
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/auth/me');
        if (res.data.success) {
          setUserProfile(res.data.user);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* User Profile Header Banner */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Shield size={16} /> Citizen Portal
            </div>
            <h1 className="text-2xl font-bold mt-1">
              Welcome, {profileLoading ? 'Loading Profile...' : userProfile?.full_name || 'Citizen'}
            </h1>
            <p className="text-xs text-blue-200 mt-1 flex items-center gap-2">
              <Mail size={14} /> {userProfile?.email || '—'}
            </p>
          </div>

          <div className="bg-blue-800/60 border border-blue-700/50 px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] text-blue-300 block uppercase">Account Role</span>
            <span className="text-sm font-bold uppercase text-amber-400">
              {userProfile?.role || 'user'}
            </span>
          </div>
        </div>

        {/* Complaints Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Pending Grievances</p>
              <p className="text-xl font-bold text-slate-900">0</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">In Progress</p>
              <p className="text-xl font-bold text-slate-900">0</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Resolved</p>
              <p className="text-xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>

        {/* Action & Grievance History Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 text-center py-12">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Grievances Submitted Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            File a civic complaint regarding roads, sanitation, electricity, or water supply to track its status in real-time.
          </p>
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs inline-flex items-center gap-2 transition">
            <PlusCircle size={16} /> File New Complaint
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;