import { Link } from 'react-router-dom';
import { Building2, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm font-sans sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto py-3.5 px-6 flex justify-between items-center">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-blue-900 text-amber-400 p-2.5 rounded-xl shadow-md group-hover:bg-blue-950 transition-colors">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              CivicConnect
            </h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">
              Municipal Corporation
            </p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <LogIn size={16} />
            Login
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md transition-colors"
          >
            <UserPlus size={16} />
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;