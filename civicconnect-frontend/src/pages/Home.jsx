import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  ShieldCheck, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Megaphone, 
  Globe,
  Building2
} from 'lucide-react';

const Home = () => {
  const [trackId, setTrackId] = useState('');
  const navigate = useNavigate();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackId.trim()) {
      navigate(`/login?trackRef=${encodeURIComponent(trackId)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* 1. Official Government Top Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Government of India • Municipal Governance
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">Toll-Free Control Room: <strong>1800-111-2026</strong></span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-300">
          <button className="flex items-center gap-1 hover:text-white font-medium">
            <Globe size={13} strokeWidth={2} className="text-amber-400" /> English / हिंदी
          </button>
        </div>
      </div>

      <Navbar />

      {/* 2. Hero Section with Real Background & Balanced Tone */}
      <section className="relative bg-slate-900 text-white py-16 px-6 border-b-4 border-amber-500 overflow-hidden">
        {/* Background Overlay Image for Real Feeling */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80" 
            alt="City Infrastructure" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/90 border border-slate-700 text-amber-400 text-xs font-semibold rounded-md">
              <ShieldCheck size={16} /> Official Public Grievance Portal
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Report Infrastructure Issues. <br />
              <span className="text-amber-400">Track Time-Bound Resolution.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Directly submit municipal complaints regarding streetlights, roads, water supply, and garbage collection to your local Ward Officer.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-md"
              >
                <AlertCircle size={20} />
                Lodge Grievance
              </Link>
              <a
                href="#quick-track"
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-all"
              >
                <Search size={16} className="text-amber-400" />
                Track Existing Ticket
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" /> Geo-Tagged Photos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" /> Direct Officer SLA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" /> Transparent Escalation
              </span>
            </div>
          </div>

          {/* Right Track Box (Clean Dark Card) */}
          <div id="quick-track" className="lg:col-span-5 bg-slate-800/95 border border-slate-700 p-6 rounded-xl space-y-4 shadow-xl">
            <div className="border-b border-slate-700 pb-3">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Search size={18} className="text-amber-400" /> Quick Status Tracker
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Enter your Ticket Ref Number (e.g. MC-2026-8941)
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ticket Reference ID
                </label>
                <input
                  type="text"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="Enter Ref Number..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Search Status <ArrowRight size={15} />
              </button>
            </form>

            <div className="pt-2 border-t border-slate-700 text-xs text-slate-400 flex justify-between">
              <span>Average Resolution SLA: <strong>36 Hours</strong></span>
              <span className="text-emerald-400 font-semibold">95.2% Resolved</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Real Photo-Based Department Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-1 rounded">
            Municipal Operations
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Key Resolution Departments
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">Select a category to view operational timelines and file a ticket.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Electrical */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className="h-36 relative overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" 
                alt="Streetlight Maintenance" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                SLA: 24h
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Street Lighting</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Defective streetlights, dark public roads, or exposed wiring poles.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>File Lighting Complaint</span>
                <ArrowRight size={14} className="text-amber-600" />
              </div>
            </div>
          </div>

          {/* Card 2: Roads */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className="h-36 relative overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80" 
                alt="Road Repair Work" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                SLA: 48h
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Roads & Footpaths</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Potholes, broken paving blocks, or hazardous missing manholes.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>File Road Repair</span>
                <ArrowRight size={14} className="text-amber-600" />
              </div>
            </div>
          </div>

          {/* Card 3: Water */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className="h-36 relative overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80" 
                alt="Water Supply Repair" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                SLA: 12h
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Water & Sewage</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Main pipeline leaks, dirty water contamination, or drainage overflow.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>File Water Issue</span>
                <ArrowRight size={14} className="text-amber-600" />
              </div>
            </div>
          </div>

          {/* Card 4: Waste */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className="h-36 relative overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80" 
                alt="Garbage Management" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                SLA: 24h
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Solid Waste Management</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Uncleared street garbage bins, missed collection, or illegal dumping.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>File Waste Complaint</span>
                <ArrowRight size={14} className="text-amber-600" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Simple 4-Step Process Section */}
      <section className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white">Resolution Process Cycle</h2>
            <p className="text-slate-400 text-xs mt-0.5">Transparent lifecycle for every reported grievance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-xs font-bold text-amber-400">Step 1</span>
              <h4 className="font-semibold text-white text-sm mt-1">Lodge Ticket</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Citizen submits photo proof with automatic location details.</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-xs font-bold text-amber-400">Step 2</span>
              <h4 className="font-semibold text-white text-sm mt-1">Ward Assignment</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Routed automatically to the designated local Ward Officer.</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-xs font-bold text-amber-400">Step 3</span>
              <h4 className="font-semibold text-white text-sm mt-1">Field Action</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Ground crew inspects and resolves the reported physical issue.</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-xs font-bold text-emerald-400">Step 4</span>
              <h4 className="font-semibold text-white text-sm mt-1">Photo Closure</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Resolved photo proof uploaded for citizen audit and closure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Official Notices & Commissioner Note */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Advisories */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
            <Megaphone size={18} className="text-slate-700" /> Official Advisories & Gazette
          </h3>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">
              Monsoon Advisory
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Monsoon Drain Clearing Drive Active</h4>
            <p className="text-xs text-slate-600">Citizens can report clogged drains for priority fast-track clearance before heavy rains.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">
              Notice #2026/08
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Property Tax Receipt Digital Verification</h4>
            <p className="text-xs text-slate-600">Download digitally signed tax payment receipts directly using your Property ID.</p>
          </div>
        </div>

        {/* Executive Note */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building2 size={16} className="text-slate-700" /> Executive Administration
          </h3>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs flex-shrink-0">
              IAS
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Shri A. K. Sharma, IAS</h4>
              <p className="text-[11px] text-slate-500">Municipal Commissioner</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-100 italic">
            "Ensuring clean, safe, and accountable city infrastructure through direct digital citizen participation."
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-8 px-6 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-white">Municipal Grievance Redressal Engine</p>
            <p className="mt-0.5 text-slate-500">Official Portal for Public Infrastructure Maintenance.</p>
          </div>
          <div className="flex gap-4 text-slate-300 font-medium">
            <Link to="/login" className="hover:text-amber-400">Track Ticket</Link>
            <span>•</span>
            <Link to="/signup" className="hover:text-amber-400">File Grievance</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;