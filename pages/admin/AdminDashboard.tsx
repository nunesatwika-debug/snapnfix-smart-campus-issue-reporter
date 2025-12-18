import React from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';
import { IssueStatus, UrgencyLevel } from '../../types';

export const AdminDashboard: React.FC = () => {
  const issues = dataService.getIssues();
  const emergencyCount = issues.filter(i => i.urgency === UrgencyLevel.HIGH && i.status !== IssueStatus.RESOLVED).length;
  const activeCount = issues.filter(i => i.status !== IssueStatus.RESOLVED).length;
  const resolvedCount = issues.filter(i => i.status === IssueStatus.RESOLVED).length;

  return (
    <Layout portal="admin" title="Dashboard">
      <div className="space-y-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm flex flex-col">
             <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Emergency Issues</span>
             <span className="text-4xl font-bold text-red-600 mt-2">{emergencyCount}</span>
             <span className="text-xs text-red-400 mt-1">Requires immediate attention</span>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex flex-col">
             <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Active Issues</span>
             <span className="text-4xl font-bold text-blue-600 mt-2">{activeCount}</span>
             <span className="text-xs text-blue-400 mt-1">Total pending works</span>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col">
             <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Resolved</span>
             <span className="text-4xl font-bold text-emerald-600 mt-2">{resolvedCount}</span>
             <span className="text-xs text-emerald-400 mt-1">This month</span>
           </div>
        </div>

        {/* Navigation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <button 
             onClick={() => window.location.hash = '#/admin/issues'}
             className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-lg transition-all text-left group"
           >
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
             </div>
             <h3 className="text-lg font-bold text-slate-800">Manage Issues</h3>
             <p className="text-slate-500 text-sm">Update status & prioritize</p>
           </button>

           <button 
             onClick={() => window.location.hash = '#/admin/workers'}
             className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-lg transition-all text-left group"
           >
             <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
             </div>
             <h3 className="text-lg font-bold text-slate-800">Assign Workers</h3>
             <p className="text-slate-500 text-sm">View staff availability</p>
           </button>

           <button 
             onClick={() => window.location.hash = '#/admin/analytics'}
             className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-lg transition-all text-left group"
           >
             <div className="w-12 h-12 bg-pastel-blue text-pastel-blueDark rounded-full flex items-center justify-center mb-4 group-hover:bg-pastel-blueDark group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
             </div>
             <h3 className="text-lg font-bold text-slate-800">Analytics</h3>
             <p className="text-slate-500 text-sm">Trends & Performance</p>
           </button>
        </div>
      </div>
    </Layout>
  );
};