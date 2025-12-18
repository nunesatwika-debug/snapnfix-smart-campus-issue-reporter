
import React from 'react';

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${active ? 'text-brand-primary -translate-y-1.5' : 'text-slate-400 hover:text-slate-900'}`}
  >
    <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-brand-light shadow-lg shadow-brand-primary/10' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-[0.15em] mt-1.5 ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </button>
);

export const Navbar: React.FC = () => {
  const hash = window.location.hash;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass-card rounded-4xl shadow-2xl px-8 py-2 z-50 border border-slate-200/50">
      <div className="flex justify-between items-center">
        <NavItem 
          active={hash === '#/student/home'}
          onClick={() => window.location.hash = '#/student/home'}
          label="Hub"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
        />
        <NavItem 
          active={hash === '#/student/issues'}
          onClick={() => window.location.hash = '#/student/issues'}
          label="Log"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
        />
        <NavItem 
          active={hash === '#/student/eco'}
          onClick={() => window.location.hash = '#/student/eco'}
          label="Impact"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-5.318-3-8C7 5.8 7 8 7 8a3 3 0 0 0 3 3c2 0 3-1 3-1s-1 3-4 3-4 3"/><path d="M15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-5.318-3-8C14 5.8 14 8 14 8a3 3 0 0 0 3 3c2 0 3-1 3-1s-1 3-4 3-4 3"/></svg>}
        />
        <NavItem 
          active={hash === '#/student/leaderboard'}
          onClick={() => window.location.hash = '#/student/leaderboard'}
          label="Social"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>}
        />
      </div>
    </nav>
  );
};