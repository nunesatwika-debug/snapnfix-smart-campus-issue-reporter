import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';
import { Badge } from '../../components/Badge';

export const WorkerAssignment: React.FC = () => {
  const workers = dataService.getWorkers();
  const issues = dataService.getIssues().filter(i => !i.assignedWorkerId && i.status !== 'Resolved');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const handleAssign = (workerId: string) => {
    if (selectedIssueId) {
      dataService.assignWorker(selectedIssueId, workerId);
      setSelectedIssueId(null);
      alert("Worker Assigned Successfully!");
      // Force update
      window.location.reload(); 
    }
  };

  return (
    <Layout portal="admin" title="Workforce" showBack onBack={() => window.location.hash = '#/admin/dashboard'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Unassigned Issues */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Unassigned Issues</h2>
          <div className="space-y-3">
             {issues.length === 0 && <p className="text-slate-400">No pending unassigned issues.</p>}
             {issues.map(issue => (
               <div 
                 key={issue.id} 
                 onClick={() => setSelectedIssueId(issue.id)}
                 className={`p-4 bg-white rounded-2xl border cursor-pointer transition-all ${selectedIssueId === issue.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
               >
                 <div className="flex justify-between items-start">
                   <h4 className="font-bold text-slate-800">{issue.title}</h4>
                   <Badge type="category" value={issue.type} />
                 </div>
                 <p className="text-xs text-slate-500 mt-1">{issue.location.description}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Workers List */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Available Workers</h2>
          <div className="space-y-3">
            {workers.map(worker => (
              <div key={worker.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                 <div>
                    <h4 className="font-bold text-slate-800">{worker.name}</h4>
                    <p className="text-xs text-slate-500">{worker.specialization} • {worker.currentTasks} Active Tasks</p>
                 </div>
                 
                 {selectedIssueId ? (
                   <button 
                     onClick={() => handleAssign(worker.id)}
                     className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors"
                   >
                     Assign
                   </button>
                 ) : (
                    <span className={`w-3 h-3 rounded-full ${worker.available ? 'bg-green-400' : 'bg-red-400'}`}></span>
                 )}
              </div>
            ))}
          </div>
          {!selectedIssueId && <p className="text-xs text-slate-400 mt-4 text-center">Select an issue on the left to assign a worker.</p>}
        </div>

      </div>
    </Layout>
  );
};