import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';

export const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (username.trim() && password.trim()) {
        dataService.loginStudent(username, password);
        window.location.hash = '#/student/home';
      } else {
        setError('Please enter both username and password.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Layout portal="public">
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-8 animate-fade-in-up">
           <div className="w-20 h-20 bg-gradient-to-br from-pastel-greenDark to-teal-400 rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           </div>
           <h1 className="text-4xl font-bold text-slate-800 mb-2">SnapNfix</h1>
           <p className="text-slate-500 text-lg">Snap. Report. Fix.</p>
        </div>

        <form onSubmit={handleEnter} className="w-full max-w-sm space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-xl mb-4">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Student ID / Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. eco_warrior"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pastel-greenDark focus:border-transparent transition-all bg-slate-50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pastel-greenDark focus:border-transparent transition-all bg-slate-50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-slate-800 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-800/20"
            >
              Login / Register
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              New user? Just enter a username & password to sign up automatically.
            </p>
          </div>
          <button type="button" onClick={() => window.location.hash = '#/'} className="w-full text-center text-sm text-slate-400 mt-4 hover:text-slate-600">
            Back to Portal Selection
          </button>
        </form>
      </div>
    </Layout>
  );
};