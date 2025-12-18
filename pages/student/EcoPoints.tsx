
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';

export const EcoPoints: React.FC = () => {
  const user = dataService.getCurrentUser();
  const points = user?.ecoPoints || 0;
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const rewards = [
    {
      id: 'r1',
      title: 'Canteen Starter',
      desc: '5% Discount on all meals',
      req: '🌱 Eco Helper Badge',
      minPoints: 50,
      icon: '🍱',
      unlocked: points >= 50
    },
    {
      id: 'r2',
      title: 'Premium Refresh',
      desc: '10% Discount + Free Coffee',
      req: '⭐ Eco Champion Badge',
      minPoints: 500,
      icon: '☕',
      unlocked: points >= 500
    },
    {
      id: 'r3',
      title: 'Scholar Pack',
      desc: '15% Off Bookstore & Stationery',
      req: '🛡️ Guardian Badge',
      minPoints: 1000,
      icon: '📚',
      unlocked: points >= 1000
    },
    {
      id: 'r4',
      title: 'Elite Campus Access',
      desc: 'VIP Library Room + 20% Off All Outlets',
      req: '👑 Legend Badge',
      minPoints: 2000,
      icon: '🎟️',
      unlocked: points >= 2000
    }
  ];

  const handleClaim = (reward: any) => {
    if (!reward.unlocked) return;
    const code = `SNF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setClaimedReward(code);
  };

  return (
    <Layout 
      portal="student" 
      title="Eco Rewards" 
      showBack 
      onBack={() => window.location.hash = '#/student/home'}
    >
      <div className="space-y-8 pb-10">
        
        {/* Points Hero */}
        <div className="gitam-gradient p-10 rounded-[3rem] shadow-2xl shadow-brand-primary/20 text-white text-center relative overflow-hidden">
           <div className="relative z-10">
             <div className="inline-block p-4 rounded-3xl bg-white/10 backdrop-blur-xl mb-4 border border-white/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-5.318-3-8C7 5.8 7 8 7 8a3 3 0 0 0 3 3c2 0 3-1 3-1s-1 3-4 3-4 3"/><path d="M15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-5.318-3-8C14 5.8 14 8 14 8a3 3 0 0 0 3 3c2 0 3-1 3-1s-1 3-4 3-4 3"/></svg>
             </div>
             <h2 className="text-6xl font-black tracking-tighter">{points}</h2>
             <p className="text-brand-light font-black uppercase tracking-widest text-[10px] mt-2">Current Eco Telemetry</p>
           </div>
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Badges Section */}
        <section>
          <div className="flex justify-between items-end mb-6">
             <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Your Achievements</h3>
               <p className="text-sm text-slate-500 font-medium">Earned through campus care</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-4xl border transition-all ${points >= 50 ? 'bg-white border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
               <div className="text-4xl mb-3">🌱</div>
               <h4 className="font-black text-slate-900 text-sm">Eco Helper</h4>
               <p className="text-[10px] font-bold text-slate-400 mt-1">Reported 1st issue</p>
            </div>
            <div className={`p-6 rounded-4xl border transition-all ${points >= 500 ? 'bg-white border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
               <div className="text-4xl mb-3">⭐</div>
               <h4 className="font-black text-slate-900 text-sm">Eco Champion</h4>
               <p className="text-[10px] font-bold text-slate-400 mt-1">500+ Points Milestone</p>
            </div>
             <div className={`p-6 rounded-4xl border transition-all ${points >= 1000 ? 'bg-white border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
               <div className="text-4xl mb-3">🛡️</div>
               <h4 className="font-black text-slate-900 text-sm">Guardian</h4>
               <p className="text-[10px] font-bold text-slate-400 mt-1">1000+ Points Milestone</p>
            </div>
             <div className={`p-6 rounded-4xl border transition-all ${points >= 2000 ? 'bg-white border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
               <div className="text-4xl mb-3">👑</div>
               <h4 className="font-black text-slate-900 text-sm">Legend</h4>
               <p className="text-[10px] font-bold text-slate-400 mt-1">Top Campus Contributor</p>
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section>
          <div className="flex justify-between items-end mb-6">
             <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Redeem Privileges</h3>
               <p className="text-sm text-slate-500 font-medium">Use your points for campus perks</p>
             </div>
          </div>
          <div className="space-y-4">
             {rewards.map(reward => (
               <div key={reward.id} className={`group relative bg-white p-6 rounded-4xl border transition-all flex items-center gap-5 ${reward.unlocked ? 'border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1' : 'border-slate-50 opacity-60'}`}>
                 <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-3xl transition-transform group-hover:rotate-6 ${reward.unlocked ? 'bg-brand-light' : 'bg-slate-100'}`}>
                   {reward.icon}
                 </div>
                 <div className="flex-1">
                   <h4 className="font-black text-slate-900 leading-tight">{reward.title}</h4>
                   <p className="text-xs text-slate-500 mt-0.5 font-medium">{reward.desc}</p>
                   <div className="flex items-center gap-1.5 mt-2">
                     <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${reward.unlocked ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                       {reward.unlocked ? 'Unlocked' : reward.req}
                     </span>
                   </div>
                 </div>
                 <button 
                   onClick={() => handleClaim(reward)}
                   disabled={!reward.unlocked}
                   className={`px-6 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${reward.unlocked ? 'bg-brand-primary text-white hover:bg-brand-primaryDark shadow-lg shadow-brand-primary/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                 >
                   {reward.unlocked ? 'Claim' : 'Locked'}
                 </button>
               </div>
             ))}
          </div>
        </section>

        {claimedReward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white p-10 rounded-[3rem] w-full max-w-sm text-center shadow-2xl relative overflow-hidden">
               <div className="gitam-gradient absolute top-0 left-0 w-full h-2"></div>
               <div className="text-5xl mb-6">🎟️</div>
               <h3 className="text-2xl font-black text-slate-900">Your Voucher</h3>
               <p className="text-slate-500 text-sm mt-2 mb-8">Show this code at the campus counter to redeem your reward.</p>
               <div className="bg-slate-50 py-4 rounded-3xl border-2 border-dashed border-slate-200 mb-8">
                  <span className="text-3xl font-black tracking-widest text-brand-primary font-mono">{claimedReward}</span>
               </div>
               <button 
                 onClick={() => setClaimedReward(null)}
                 className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
               >
                 Dismiss
               </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
