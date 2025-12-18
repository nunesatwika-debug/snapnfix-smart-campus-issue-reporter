
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';
import { IssueStatus, IssueType, UrgencyLevel } from '../../types';
import { Badge } from '../../components/Badge';

export const Analytics: React.FC = () => {
  const allIssues = dataService.getIssues();
  const [selectedBlock, setSelectedBlock] = useState('All Buildings');

  const filteredIssues = useMemo(() => {
    if (selectedBlock === 'All Buildings') return allIssues;
    return allIssues.filter(issue => 
      issue.location.description.toLowerCase().includes(selectedBlock.toLowerCase())
    );
  }, [selectedBlock, allIssues]);

  const totalIssues = filteredIssues.length;
  const resolvedCount = filteredIssues.filter(i => i.status === IssueStatus.RESOLVED).length;
  const pendingCount = filteredIssues.filter(i => i.status === IssueStatus.PENDING).length;
  const inProgressCount = filteredIssues.filter(i => i.status === IssueStatus.IN_PROGRESS).length;
  const emergencyCount = filteredIssues.filter(i => i.urgency === UrgencyLevel.HIGH).length;
  
  const avgResponseTime = selectedBlock === 'CSE Block' ? "3.5 hrs" : selectedBlock === 'Library' ? "5.2 hrs" : "4.2 hrs";
  const emergencyRatio = totalIssues > 0 ? Math.round((emergencyCount / totalIssues) * 100) : 0;

  const categoryData = [
    { label: 'Plumbing', count: filteredIssues.filter(i => i.type === IssueType.PLUMBING).length, color: 'bg-brand-primary' },
    { label: 'Electrical', count: filteredIssues.filter(i => i.type === IssueType.ELECTRICAL).length, color: 'bg-amber-400' },
    { label: 'Cleanliness', count: filteredIssues.filter(i => i.type === IssueType.CLEANLINESS).length, color: 'bg-emerald-400' },
    { label: 'Infrastructure', count: filteredIssues.filter(i => i.type === IssueType.INFRASTRUCTURE).length, color: 'bg-slate-900' },
    { label: 'Other', count: filteredIssues.filter(i => i.type === IssueType.OTHER).length, color: 'bg-slate-400' },
  ];

  const resolvedPercent = totalIssues > 0 ? Math.round((resolvedCount / totalIssues) * 100) : 0;
  const inProgressPercent = totalIssues > 0 ? Math.round((inProgressCount / totalIssues) * 100) : 0;

  return (
    <Layout portal="admin" title="Operations Hub" showBack onBack={() => window.location.hash = '#/admin/dashboard'}>
      <div className="space-y-8 pb-20">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">Performance Analytics</h2>
            <p className="text-slate-400 font-medium text-sm">Real-time telemetry for <span className="text-brand-primary font-bold">Campus Infrastructure</span></p>
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="px-6 py-3 bg-white/10 border border-white/10 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-primary outline-none cursor-pointer backdrop-blur-md"
            >
              <option className="text-slate-900 font-bold">All Buildings</option>
              <option className="text-slate-900 font-bold">CSE Block</option>
              <option className="text-slate-900 font-bold">ECE Block</option>
              <option className="text-slate-900 font-bold">Library</option>
              <option className="text-slate-900 font-bold">Cafeteria</option>
            </select>
          </div>
        </div>

        {/* Core KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: 'Throughput', val: totalIssues, sub: 'Total Reports', icon: '📈' },
            { label: 'Resolved', val: resolvedCount, sub: 'Success Rate', icon: '✅', color: 'text-brand-primary' },
            { label: 'Backlog', val: pendingCount, sub: 'Pending Review', icon: '⏳', color: 'text-amber-500' },
            { label: 'Latency', val: avgResponseTime, sub: 'Avg Response', icon: '⚡' },
            { label: 'Critical', val: `${emergencyRatio}%`, sub: 'Emergency Ratio', icon: '🚨', color: 'text-red-500' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className={`text-3xl font-black ${kpi.color || 'text-slate-900'}`}>{kpi.val}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Visual Data Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Issue Taxonomy</h3>
            <div className="space-y-6">
              {totalIssues === 0 ? (
                <div className="h-48 flex items-center justify-center text-slate-400 font-bold italic">No Telemetry Recorded</div>
              ) : (
                categoryData.map(cat => {
                  const percentage = totalIssues > 0 ? (cat.count / totalIssues) * 100 : 0;
                  return (
                    <div key={cat.label} className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-extrabold text-slate-700">{cat.label}</span>
                        <span className="text-sm font-black text-brand-primary">{cat.count}</span>
                      </div>
                      <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                        <div 
                          className={`h-full ${cat.color} transition-all duration-1000 ease-in-out`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight w-full">Resolution Status</h3>
            {totalIssues === 0 ? (
               <div className="h-48 flex items-center justify-center text-slate-400 font-bold italic">Offline</div>
            ) : (
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-slate-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-brand-primary transition-all duration-1000" strokeDasharray={`${resolvedPercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-brand-light transition-all duration-1000" strokeDashoffset={-resolvedPercent} strokeDasharray={`${inProgressPercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-900">{resolvedPercent}%</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
                </div>
              </div>
            )}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-primary"><div className="w-2.5 h-2.5 rounded-full bg-brand-primary"></div> Resolved</div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-light"><div className="w-2.5 h-2.5 rounded-full bg-brand-light"></div> Active</div>
            </div>
          </div>
        </div>

        {/* Hotspots Map/Insights Simulation */}
        <div className="bg-brand-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-brand-primary/40 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl font-black leading-none">Smart Hotspot Detection</h3>
            <p className="text-brand-light/80 font-medium">Our AI has flagged <span className="text-white font-bold">{selectedBlock}</span> as a recurring area for electrical anomalies. Pre-emptive maintenance is recommended.</p>
            <button className="px-8 py-3 bg-white text-brand-primary rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-brand-light transition-all active:scale-95">
              Launch Diagnostic
            </button>
          </div>
          <div className="hidden md:block w-48 h-48 bg-white/10 rounded-4xl border border-white/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
             <div className="w-full h-full absolute inset-0 opacity-20">
                <div className="w-full h-0.5 bg-white absolute top-1/2 -translate-y-1/2"></div>
                <div className="h-full w-0.5 bg-white absolute left-1/2 -translate-x-1/2"></div>
             </div>
             <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
             <div className="w-3 h-3 bg-red-500 rounded-full absolute"></div>
          </div>
        </div>

      </div>
    </Layout>
  );
};