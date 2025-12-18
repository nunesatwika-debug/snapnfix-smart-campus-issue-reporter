
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { User } from '../../types';
import { dataService } from '../../services/mockDataService';

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentUser = dataService.getCurrentUser();

  useEffect(() => {
    setUsers(dataService.getLeaderboard());
  }, []);

  return (
    <Layout 
      portal="student" 
      title="Leaderboard" 
      showBack 
      onBack={() => window.location.hash = '#/student/home'}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-brand-primary to-brand-primaryDark p-8 rounded-[2.5rem] text-white shadow-xl shadow-brand-primary/20">
           <h2 className="text-lg font-black opacity-80 uppercase tracking-widest">Campus Rank</h2>
           <div className="flex items-end gap-3 mt-3">
             <span className="text-6xl font-black tracking-tighter">#{currentUser?.rank || '-'}</span>
             <span className="text-lg font-bold opacity-70 mb-2">of {users.length} Citizens</span>
           </div>
           <p className="mt-6 text-xs bg-white/10 px-4 py-2 rounded-xl inline-block backdrop-blur-md font-bold uppercase tracking-wider">
             Top 5% Contributor 🚀
           </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
           {users.slice(0, 10).map((user, index) => (
             <div 
               key={user.username}
               className={`flex items-center justify-between p-6 border-b border-slate-50 last:border-0 ${user.username === currentUser?.username ? 'bg-brand-light' : ''}`}
             >
               <div className="flex items-center gap-5">
                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${index < 3 ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                   {index + 1}
                 </div>
                 <div className="flex flex-col">
                   <span className="font-black text-slate-900 tracking-tight">{user.username}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{index === 0 ? 'Eco Champion 🏆' : 'Citizen'}</span>
                 </div>
               </div>
               <div className="font-black text-brand-primary">
                 {user.ecoPoints} <span className="text-[10px] uppercase ml-0.5">PTS</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </Layout>
  );
};
