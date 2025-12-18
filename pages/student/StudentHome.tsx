
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';
import { User } from '../../types';

export const StudentHome: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(dataService.getCurrentUser());
  }, []);

  return (
    <Layout portal="student" title="Home">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="gitam-gradient p-8 rounded-[2.5rem] shadow-2xl shadow-brand-primary/20 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight">Welcome, {user?.username || 'Gitamite'}!</h2>
            <p className="text-white/80 mt-2 font-medium">Ready to enhance our campus today?</p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1">Your Impact</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{user?.ecoPoints || 0}</span>
                  <span className="text-brand-light text-xs font-bold">Eco-Points</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1">Global Rank</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">#{user?.rank || 15}</span>
                  <span className="text-brand-light text-xs font-bold">Campus Top</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 gap-6">
           <button 
             onClick={() => window.location.hash = '#/student/report'}
             className="group relative bg-slate-900 rounded-[2.5rem] p-10 text-left shadow-2xl shadow-slate-200 hover:shadow-brand-primary/30 transition-all duration-500 overflow-hidden"
           >
             <div className="relative z-10">
               <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
               </div>
               <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Report an Issue</h3>
               <p className="text-slate-400 text-base max-w-sm">Capture details or use AI to identify issues in seconds.</p>
               
               <div className="mt-8 flex items-center gap-2 text-brand-primary font-black text-sm uppercase tracking-widest">
                 Initialize Report <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
             </div>
             <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-24 -mb-24 group-hover:scale-110 transition-transform"></div>
           </button>
        </div>

        {/* Recent Updates */}
        <section>
          <div className="flex justify-between items-end mb-6">
             <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Near Your Block</h3>
               <p className="text-sm text-slate-500 font-medium">Community reports in real-time</p>
             </div>
             <button onClick={() => window.location.hash = '#/student/issues'} className="text-sm text-brand-primary font-extrabold hover:underline underline-offset-4">Explore All</button>
          </div>
          <div className="bg-white p-5 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-lg transition-shadow group">
            <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
               <img src="https://picsum.photos/200?random=10" alt="Issue" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1">
               <h4 className="font-extrabold text-slate-900 leading-tight">Library AC Malfunction</h4>
               <p className="text-xs text-slate-500 mt-1 font-medium">Main Wing • Reported by Alex S.</p>
               <div className="mt-3 flex items-center gap-2">
                 <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider">Urgent</span>
                 <span className="px-2.5 py-1 bg-brand-light text-brand-primary rounded-lg text-[10px] font-black uppercase tracking-wider">Investigating</span>
               </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};