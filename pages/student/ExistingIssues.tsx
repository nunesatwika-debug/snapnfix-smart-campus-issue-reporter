
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Issue, IssueStatus, User } from '../../types';
import { dataService } from '../../services/mockDataService';
import { Badge } from '../../components/Badge';

export const ExistingIssues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filter, setFilter] = useState<IssueStatus | 'All' | 'My Reports'>('All');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIssues(dataService.getIssues());
    setCurrentUser(dataService.getCurrentUser());
  }, []);

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dataService.upvoteIssue(id);
    setIssues(dataService.getIssues()); // Refresh
  };

  const handleViewDetails = (id: string) => {
    localStorage.setItem('currentIssueId', id);
    window.location.hash = '#/student/issue-details';
  };

  const handleBack = () => {
    window.location.hash = '#/student/home';
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'All') return true;
    if (filter === 'My Reports') return currentUser && issue.reportedBy === currentUser.username;
    return issue.status === filter;
  });

  return (
    <Layout portal="student" title="Campus Log" showBack onBack={handleBack}>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
           {['All', 'My Reports', IssueStatus.PENDING, IssueStatus.IN_PROGRESS, IssueStatus.RESOLVED].map(f => (
             <button 
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${filter === f ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'}`}
             >
               {f}
             </button>
           ))}
        </div>

        {/* List */}
        <div className="space-y-4">
           {filteredIssues.length === 0 && (
             <div className="text-center py-20 bg-white rounded-4xl border border-slate-50 flex flex-col items-center justify-center text-slate-400">
               <div className="text-5xl mb-4">📭</div>
               <h3 className="text-lg font-black text-slate-900">Archive Empty</h3>
               <p className="text-sm font-medium mt-1">No logs matching this filter.</p>
               {filter === 'My Reports' && (
                 <button 
                   onClick={() => window.location.hash = '#/student/report'}
                   className="mt-6 px-8 py-3 bg-brand-light text-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
                 >
                   Start Reporting
                 </button>
               )}
             </div>
           )}
           {filteredIssues.map(issue => (
             <div 
               key={issue.id} 
               className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-50 flex gap-6 cursor-pointer hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
               onClick={() => handleViewDetails(issue.id)}
             >
               <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-slate-100 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                 <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0 py-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                     <Badge type="category" value={issue.type} />
                     <Badge type="urgency" value={issue.urgency} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 truncate tracking-tight">{issue.title}</h3>
                  <p className="text-sm text-slate-500 font-medium truncate mt-0.5">{issue.location.description}</p>
                  
                  <div className="flex items-center justify-between mt-5">
                     <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => handleUpvote(issue.id, e)}
                          className="flex items-center gap-2 bg-slate-50 hover:bg-brand-light text-slate-500 hover:text-brand-primary px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                          <span>{issue.upvotes}</span>
                        </button>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:translate-x-1 transition-transform">
                       Tracking Detail →
                     </span>
                  </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </Layout>
  );
};
