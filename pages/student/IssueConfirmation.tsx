
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../../components/Layout';
import { IssueType, UrgencyLevel } from '../../types';
import { dataService } from '../../services/mockDataService';

const CAMPUS_BLOCKS = [
  'Select Block/Area...',
  'CSE Block',
  'ECE Block',
  'Mechanical Block',
  'Library',
  'Main Gym',
  'Cafeteria',
  'Admin Building',
  'Hostel A (Boys)',
  'Hostel B (Girls)',
  'Campus Gardens',
  'Parking Lot',
  'Other'
];

export const IssueConfirmation: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [manualTitle, setManualTitle] = useState(''); // Only used if no AI title
  const [detectedType, setDetectedType] = useState<IssueType>(IssueType.OTHER);
  const [urgency, setUrgency] = useState<UrgencyLevel>(UrgencyLevel.LOW);
  
  // Location State
  const [selectedBlock, setSelectedBlock] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  
  const [comment, setComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isManualMode = !imageSrc;

  useEffect(() => {
    const src = localStorage.getItem('tempIssueImage');
    
    if (src) {
      // Photo Flow
      setImageSrc(src);
      setAnalyzing(true);
      
      // Simulate AI Analysis
      setTimeout(() => {
        setAnalyzing(false);
        setDetectedType(IssueType.PLUMBING); 
        setUrgency(UrgencyLevel.HIGH); 
        setSelectedBlock('CSE Block');
        setSpecificLocation('2nd Floor, Gents Washroom'); 
      }, 2000);
    } else {
      // Manual Flow
      setAnalyzing(false);
      setImageSrc(''); 
      setSelectedBlock('');
      setSpecificLocation('');
    }
  }, []);

  const handleSubmit = () => {
    if (isManualMode && !manualTitle.trim()) {
      alert("Please provide a brief title for this report.");
      return;
    }
    if (!selectedBlock || selectedBlock === 'Select Block/Area...') {
      alert("Please select a Campus Block.");
      return;
    }
    if (!specificLocation.trim()) {
      alert("Please enter specific location details (e.g. Room number).");
      return;
    }

    const finalLocationString = selectedBlock === 'Other' 
      ? specificLocation 
      : `${selectedBlock}, ${specificLocation}`;

    dataService.reportIssue({
      title: isManualMode ? manualTitle : `${detectedType} Issue`,
      description: comment || 'Reported via app',
      type: detectedType,
      urgency: urgency,
      location: { latitude: 0, longitude: 0, description: finalLocationString },
      imageUrl: imageSrc || 'https://via.placeholder.com/400x300?text=Manual+Report',
      comments: comment,
    });
    window.location.hash = '#/student/success';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageSrc(url);
    }
  };

  const handleBack = () => {
    window.location.hash = '#/student/report';
  };

  if (analyzing) {
    return (
      <Layout portal="student" title="AI Processing...">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
           <div className="w-24 h-24 border-[6px] border-brand-light border-t-brand-primary rounded-full animate-spin mb-8 shadow-xl shadow-brand-primary/10"></div>
           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Detecting Anomalies...</h3>
           <p className="text-slate-400 font-medium mt-2">Neural networks are analyzing your capture</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout portal="student" title={isManualMode ? "Manual Report" : "Verify Details"} showBack onBack={handleBack}>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Image Section */}
          <div className="relative mb-6 group">
            {imageSrc ? (
              <img src={imageSrc} alt="Preview" className="w-full h-56 object-cover rounded-3xl bg-slate-50 border border-slate-100" />
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-56 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">📷</div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Add Optional Photo</span>
              </div>
            )}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 bg-slate-900/40 text-white p-3 rounded-2xl hover:bg-slate-900/60 backdrop-blur-md transition-all border border-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          
          <div className="space-y-6">
            {/* Manual Title (Only for manual reports) */}
            {isManualMode && (
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Report Subject</label>
                <input 
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Broken Table in Library"
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
            )}

            {/* Category & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Issue Category</label>
                <select 
                  value={detectedType}
                  onChange={(e) => setDetectedType(e.target.value as IssueType)}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                >
                  {Object.values(IssueType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Priority Level</label>
                <select 
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                  className={`w-full p-4 rounded-2xl border-none font-bold focus:ring-2 focus:ring-brand-primary outline-none transition-all ${urgency === UrgencyLevel.HIGH ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-brand-primary'}`}
                >
                  <option value={UrgencyLevel.LOW}>Routine Maintenance</option>
                  <option value={UrgencyLevel.HIGH}>Immediate Action Required</option>
                </select>
              </div>
            </div>

            {/* Structured Location Input */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0 block ml-1">Precise Location</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🏢</div>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-brand-primary outline-none appearance-none transition-all"
                >
                  {CAMPUS_BLOCKS.map(block => (
                    <option key={block} value={block} disabled={block.startsWith('Select')}>{block}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">📍</div>
                <input
                  type="text"
                  value={specificLocation}
                  onChange={(e) => setSpecificLocation(e.target.value)}
                  placeholder={selectedBlock === 'Other' ? "Full location address..." : "Room, Floor, or Landmark..."}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-brand-primary outline-none placeholder:text-slate-300 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Additional Details</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Briefly describe the findings..."
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-medium focus:ring-2 focus:ring-brand-primary outline-none placeholder:text-slate-300 transition-all min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2 pb-10">
           <button 
             onClick={handleBack}
             className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
           >
             Cancel
           </button>
           <button 
             onClick={handleSubmit}
             className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-primaryDark shadow-xl shadow-brand-primary/20 transition-all active:scale-95"
           >
             Finalize Report
           </button>
        </div>
      </div>
    </Layout>
  );
};
