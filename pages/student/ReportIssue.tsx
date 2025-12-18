
import React, { useRef } from 'react';
import { Layout } from '../../components/Layout';

export const ReportIssue: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      localStorage.setItem('tempIssueImage', url);
      window.location.hash = '#/student/confirm';
    }
  };

  const handleManualReport = () => {
    localStorage.removeItem('tempIssueImage'); // Clear any temp image to signal manual mode
    window.location.hash = '#/student/confirm';
  };

  return (
    <Layout portal="student" title="Report Issue" showBack onBack={() => window.location.hash = '#/student/home'}>
      <div className="space-y-6 pt-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">New Report</h2>
          <p className="text-slate-500 font-medium">Select your preferred method</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="group flex items-center p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 gap-6 text-left shadow-sm"
          >
            <div className="w-16 h-16 bg-brand-light rounded-3xl flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-slate-900">AI-Smart Capture</h3>
              <p className="text-sm text-slate-400 font-medium">Auto-detect issue type & severity</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
            />
          </button>

          <button 
             onClick={() => {
               alert("QR Scanner initialization: Location 'Academic Block A' detected.");
               localStorage.setItem('tempIssueImage', 'https://picsum.photos/400/300?random=qr'); 
               window.location.hash = '#/student/confirm';
             }}
            className="group flex items-center p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 gap-6 text-left shadow-sm"
          >
            <div className="w-16 h-16 bg-brand-light rounded-3xl flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:-rotate-3 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-slate-900">QR Diagnostics</h3>
              <p className="text-sm text-slate-400 font-medium">Scan asset tags for instant logs</p>
            </div>
          </button>

          <button 
            onClick={handleManualReport}
            className="group flex items-center p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 gap-6 text-left shadow-sm"
          >
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-white">Manual Input</h3>
              <p className="text-sm text-slate-500 font-medium">Define details from scratch</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};
