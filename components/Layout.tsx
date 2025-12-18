
import React from 'react';
import { Navbar } from './Navbar';
import { dataService } from '../services/mockDataService';

interface LayoutProps {
  children: React.ReactNode;
  portal: 'student' | 'admin' | 'public';
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, portal, title, showBack, onBack }) => {
  const isStudent = portal === 'student';
  const isAdmin = portal === 'admin';

  const handleLogout = () => {
    dataService.logout();
    window.location.hash = '#/';
  };

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-slate-50/50' : 'bg-white'} flex flex-col font-sans text-slate-800`}>
      {/* Header */}
      {(isStudent || isAdmin) && (
        <header className="sticky top-0 z-50 glass-card px-4 py-4 mb-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
             <div className="flex items-center gap-4">
               {showBack && (
                 <button onClick={onBack} className="p-2.5 rounded-2xl hover:bg-slate-100 transition-all active:scale-90">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                 </button>
               )}
               <div>
                  <h1 className={`text-xl font-extrabold tracking-tight ${isAdmin ? 'text-slate-900' : 'text-brand-primary'}`}>
                    {title || 'SnapNfix'}
                  </h1>
                  {isAdmin && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">Command Center</span>
                    </div>
                  )}
               </div>
             </div>
             
             <button 
               onClick={handleLogout}
               className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all"
             >
               <span className="hidden sm:inline">Logout</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
             </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isStudent ? 'pb-28' : 'pb-12'} w-full max-w-5xl mx-auto p-4 md:p-6`}>
        {children}
      </main>

      {/* Student Bottom Navigation */}
      {isStudent && (
        <Navbar />
      )}
    </div>
  );
};