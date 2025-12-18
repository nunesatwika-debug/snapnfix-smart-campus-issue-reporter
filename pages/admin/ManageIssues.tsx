import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Issue, IssueStatus } from '../../types';
import { dataService } from '../../services/mockDataService';
import { Badge } from '../../components/Badge';

export const ManageIssues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setIssues(dataService.getIssues());
  }, []);

  const handleStatusChange = (id: string, newStatus: IssueStatus) => {
    dataService.updateIssueStatus(id, newStatus);
    setIssues(dataService.getIssues());
  };

  return (
    <Layout portal="admin" title="All Issues" showBack onBack={() => window.location.hash = '#/admin/dashboard'}>
      <div className="space-y-4">
        {issues.map(issue => (
          <div key={issue.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5">
            <img src={issue.imageUrl} alt="Issue" className="w-full md:w-32 h-32 object-cover rounded-2xl" />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                   {issue.upvotes > 5 && (
                     <span className="text-xs font-bold text-orange-600 uppercase tracking-wide flex items-center gap-1 mb-1">
                       🔥 Multiple Students Affected ({issue.upvotes})
                     </span>
                   )}
                   <h3 className="text-lg font-bold text-slate-800">{issue.title}</h3>
                   <p className="text-slate-500 text-sm">{issue.location.description}</p>
                </div>
                <Badge type="urgency" value={issue.urgency} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-slate-600 mr-2">Status:</span>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {[IssueStatus.PENDING, IssueStatus.IN_PROGRESS, IssueStatus.RESOLVED].map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(issue.id, s)}
                      className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${issue.status === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};