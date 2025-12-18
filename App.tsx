import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { StudentLogin } from './pages/student/StudentLogin';
import { StudentHome } from './pages/student/StudentHome';
import { ReportIssue } from './pages/student/ReportIssue';
import { IssueConfirmation } from './pages/student/IssueConfirmation';
import { ExistingIssues } from './pages/student/ExistingIssues';
import { EcoPoints } from './pages/student/EcoPoints';
import { Leaderboard } from './pages/student/Leaderboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageIssues } from './pages/admin/ManageIssues';
import { WorkerAssignment } from './pages/admin/WorkerAssignment';
import { IssueDetails } from './pages/student/IssueDetails';
import { Analytics } from './pages/admin/Analytics';

const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let Component = Landing;

  switch (hash) {
    // Public
    case '#/': Component = Landing; break;
    
    // Student
    case '#/student/login': Component = StudentLogin; break;
    case '#/student/home': Component = StudentHome; break;
    case '#/student/report': Component = ReportIssue; break;
    case '#/student/confirm': Component = IssueConfirmation; break;
    case '#/student/success': Component = () => {
        // Simple success redirect interstitial
        useEffect(() => { setTimeout(() => window.location.hash = '#/student/eco', 1500) }, []);
        return (
            <div className="h-screen flex items-center justify-center bg-emerald-50 text-emerald-800 flex-col">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold">Issue Reported!</h1>
                <p>+50 Eco Points Earned</p>
            </div>
        );
    }; break;
    case '#/student/issues': Component = ExistingIssues; break;
    case '#/student/issue-details': Component = IssueDetails; break;
    case '#/student/eco': Component = EcoPoints; break;
    case '#/student/leaderboard': Component = Leaderboard; break;

    // Admin
    case '#/admin/login': Component = AdminLogin; break;
    case '#/admin/dashboard': Component = AdminDashboard; break;
    case '#/admin/issues': Component = ManageIssues; break;
    case '#/admin/workers': Component = WorkerAssignment; break;
    case '#/admin/analytics': Component = Analytics; break;

    default: Component = Landing;
  }

  return <Component />;
};

export default App;