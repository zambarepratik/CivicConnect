import { useState } from 'react';
import { ShieldAlert, CheckCircle2, Clock, ArrowRight, CheckSquare } from 'lucide-react';

const OfficerDashboard = () => {
  // Static Dummy Data for UI Testing
  const [tasks, setTasks] = useState([
    {
      id: 'GRV-2026-0891',
      title: 'Water Pipe Leakage near Sector 4',
      category: 'Water Supply',
      ward: 'Ward No. 12',
      address: 'Near Water Tank, Main Road',
      status: 'IN_PROGRESS',
      reportedBy: 'Rajesh Kumar (9876543210)',
      createdAt: '2026-08-15'
    },
    {
      id: 'GRV-2026-0902',
      title: 'Contaminated Water in Supply Line',
      category: 'Water Supply',
      ward: 'Ward No. 12',
      address: 'Plot 45, Green Avenue',
      status: 'PENDING',
      reportedBy: 'Amit Sharma (9123456789)',
      createdAt: '2026-08-17'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase mb-2">
              <ShieldAlert size={14} /> Departmental Officer Panel
            </div>
            <h1 className="text-2xl font-bold">Water Supply Department Workspace</h1>
            <p className="text-xs text-slate-400 mt-1">Ward 12 Assigned Complaints & Field Action Queue</p>
          </div>
        </div>

        {/* Action Queue List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Assigned Grievance Queue</h2>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-blue-900 text-base">{task.id}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {task.ward}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {task.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        <Clock size={14} /> Pending Action
                      </span>
                    )}
                    {task.status === 'IN_PROGRESS' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                        <ArrowRight size={14} /> In Progress
                      </span>
                    )}
                    {task.status === 'RESOLVED' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 size={14} /> Resolved
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{task.title}</h3>
                  <p className="text-xs text-slate-500 mt-1"><strong>Location:</strong> {task.address}</p>
                  <p className="text-xs text-slate-500 mt-0.5"><strong>Complainant:</strong> {task.reportedBy}</p>
                </div>

                {/* Status Update Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">Filed Date: {task.createdAt}</span>

                  <div className="flex items-center gap-2">
                    {task.status === 'PENDING' && (
                      <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors">
                        Mark In-Progress
                      </button>
                    )}
                    {task.status !== 'RESOLVED' && (
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors">
                        <CheckSquare size={14} /> Resolve Grievance
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OfficerDashboard;