
import React from 'react';
import { Layout } from '../components/Layout';

export const Landing: React.FC = () => {
  return (
    <Layout portal="public">
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
        
        {/* Animated Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="mb-12 animate-fade-in">
           <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-light border border-brand-primary/20 text-brand-primary text-xs font-extrabold uppercase tracking-widest">
             AI-Powered Campus Care
           </div>
           <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
             Snap<span className="text-brand-primary">N</span>fix
           </h1>
           <p className="text-xl text-slate-500 mt-6 max-w-lg mx-auto leading-relaxed">
             The intelligent link between campus voices and maintenance excellence. 
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
           <button 
             onClick={() => window.location.hash = '#/student/login'}
             className="group relative flex flex-col items-center text-center p-10 bg-white rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
           >
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition-transform">🎓</div>
             <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">Student Portal</h2>
             <p className="text-slate-500 text-sm">Empower your campus. Report issues, track progress, and earn rewards.</p>
             <div className="mt-8 px-6 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-400 group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
               Access Member Space →
             </div>
           </button>

           <button 
             onClick={() => window.location.hash = '#/admin/login'}
             className="group relative flex flex-col items-center text-center p-10 bg-slate-900 rounded-4xl border border-slate-800 shadow-2xl shadow-black/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
           >
             <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent opacity-50"></div>
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:-rotate-6 transition-transform">⚙️</div>
             <h2 className="text-2xl font-black text-white mb-3">Staff & Admin</h2>
             <p className="text-slate-400 text-sm">Command center for maintenance teams. Orchestrate repairs and analyze data.</p>
             <div className="mt-8 px-6 py-2 rounded-full border border-white/10 text-xs font-bold text-slate-500 group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
               Admin Login →
             </div>
           </button>
        </div>
      </div>
    </Layout>
  );
};