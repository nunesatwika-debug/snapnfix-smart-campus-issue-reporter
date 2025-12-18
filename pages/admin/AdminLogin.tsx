import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { dataService } from '../../services/mockDataService';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In this demo, we are only validating password against the stored admin user.
    // Default password is 'admin123'
    if (dataService.validateAdmin(password)) {
      window.location.hash = '#/admin/dashboard';
    } else {
      setError('Invalid credentials. Default password is: admin123');
    }
  };

  return (
    <Layout portal="public">
      <div className="flex items-center justify-center min-h-[80vh] bg-pastel-blue/20 -m-4">
        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
           <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
              <p className="text-sm text-slate-500 mt-1">Authorized Maintenance Access Only</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-6">
             {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
               <input 
                 type="text" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                 placeholder="admin"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                 placeholder="•••••"
               />
             </div>
             <button type="submit" className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors">
               Login
             </button>
           </form>
           
           <div className="mt-6 text-center">
             <a href="#/" className="text-sm text-slate-400 hover:text-slate-600">Back to Portal Selection</a>
           </div>
        </div>
      </div>
    </Layout>
  );
};