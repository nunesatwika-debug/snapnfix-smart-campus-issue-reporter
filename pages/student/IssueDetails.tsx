
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Issue, IssueStatus } from '../../types';
import { dataService } from '../../services/mockDataService';
import { Badge } from '../../components/Badge';

export const IssueDetails: React.FC = () => {
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('currentIssueId');
    const allIssues = dataService.getIssues();
    const found = allIssues.find(i => i.id === id);
    setIssue(found || null);
  }, []);

  const handleBack = () => {
    window.location.hash = '#/student/issues';
  };

  if (!issue) {
    return (
      <Layout portal="student" title="Telemetry Details" showBack onBack={handleBack}>
        <div className="text-center py-20 text-slate-400 font-bold italic">Node not found in local log.</div>
      </Layout>
    );
  }

  const isInProgress = issue.status === IssueStatus.IN_PROGRESS || issue.status === IssueStatus.RESOLVED;
  const isResolved = issue.status === IssueStatus.RESOLVED;

  return (
    <Layout portal="student" title="Track Status" showBack onBack={handleBack}>
      <div className="space-y-6">
        
        {/* Header Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
           <img src={issue.imageUrl} className="w-32 h-32 rounded-[2rem] object-cover bg-slate-50 shadow-xl shadow-slate-200" alt="Issue" />
           <div className="flex-1">
             <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
               <Badge type="category" value={issue.type} />
               <Badge type="urgency" value={issue.urgency} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2">{issue.title}</h2>
             <p className="text-sm text-slate-500 font-medium mb-4">{issue.location.description}</p>
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Status: {issue.status}</span>
             </div>
           </div>
        </div>

        {/* Vertical Tracker */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 mb-10 tracking-tight">Lifecycle Telemetry</h3>
          
          <div className="relative pl-6">
            
            {/* Step 1: Reported */}
            <div className="relative pb-12 border-l-[3px] border-brand-primary">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-brand-primary ring-[6px] ring-brand-light"></div>
              <div className="pl-8">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Milestone 1</span>
                <h4 className="font-black text-slate-900 text-lg tracking-tight mt-1">Transmission Received</h4>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Verified on {new Date(issue.reportedAt).toLocaleDateString()} at {new Date(issue.reportedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>

            {/* Step 2: Admin Review / Assignment */}
            <div className={`relative pb-12 border-l-[3px] ${isInProgress ? 'border-brand-primary' : 'border-slate-100'}`}>
              <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full transition-all duration-500 ${isInProgress ? 'bg-brand-primary ring-[6px] ring-brand-light' : 'bg-slate-200 ring-[6px] ring-white'}`}></div>
              <div className="pl-8">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isInProgress ? 'text-brand-primary' : 'text-slate-300'}`}>Milestone 2</span>
                <h4 className={`font-black text-lg tracking-tight mt-1 ${isInProgress ? 'text-slate-900' : 'text-slate-300'}`}>
                  Specialist Dispatched
                </h4>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  {issue.assignedWorkerId 
                    ? "Asset maintenance crew has been deployed to coordinates." 
                    : "Awaiting administrative dispatch protocols."}
                </p>
              </div>
            </div>

             {/* Step 3: Work in Progress */}
             <div className={`relative pb-12 border-l-[3px] ${isInProgress ? 'border-brand-primary' : 'border-slate-100'}`}>
              <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full transition-all duration-500 ${isInProgress ? 'bg-brand-primary ring-[6px] ring-brand-light' : 'bg-slate-200 ring-[6px] ring-white'}`}></div>
              <div className="pl-8">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isInProgress ? 'text-brand-primary' : 'text-slate-300'}`}>Milestone 3</span>
                <h4 className={`font-black text-lg tracking-tight mt-1 ${isInProgress ? 'text-slate-900' : 'text-slate-300'}`}>
                  Operational Fix
                </h4>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Maintenance teams are performing standard recovery procedures.
                </p>
              </div>
            </div>

            {/* Step 4: Resolved */}
            <div className="relative">
              <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full transition-all duration-500 ${isResolved ? 'bg-brand-primary ring-[6px] ring-brand-light' : 'bg-slate-200 ring-[6px] ring-white'}`}></div>
              <div className="pl-8">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isResolved ? 'text-brand-primary' : 'text-slate-300'}`}>Final Node</span>
                <h4 className={`font-black text-lg tracking-tight mt-1 ${isResolved ? 'text-slate-900' : 'text-slate-300'}`}>
                  System Integrity Restored
                </h4>
                <p className="text-slate-500 text-sm font-medium mt-1">
                   {isResolved ? "Incident closed. Integrity verified by maintenance leads." : "Pending final resolution signature."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};
