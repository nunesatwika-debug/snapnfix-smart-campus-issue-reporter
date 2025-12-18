import { Issue, IssueStatus, IssueType, UrgencyLevel, Worker, User } from '../types';

// Initial Mock Data (Used only if LocalStorage is empty)
const INITIAL_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Leaking Pipe in Library',
    description: 'Water is dripping constantly near the history section.',
    type: IssueType.PLUMBING,
    status: IssueStatus.PENDING,
    urgency: UrgencyLevel.LOW,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'Library, 2nd Floor' },
    imageUrl: 'https://picsum.photos/400/300?random=1',
    upvotes: 12,
    reportedBy: 'alex_student',
    reportedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '2',
    title: 'Exposed Wire in Cafeteria',
    description: 'Dangerous live wire hanging from the ceiling.',
    type: IssueType.ELECTRICAL,
    status: IssueStatus.IN_PROGRESS,
    urgency: UrgencyLevel.HIGH,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'Cafeteria, Main Hall' },
    imageUrl: 'https://picsum.photos/400/300?random=2',
    upvotes: 45,
    reportedBy: 'sam_eco',
    reportedAt: new Date(Date.now() - 3600000), // 1 hour ago
    assignedWorkerId: 'w2'
  },
  {
    id: '3',
    title: 'Overflowing Trash Can',
    description: 'Trash is piling up outside the gym.',
    type: IssueType.CLEANLINESS,
    status: IssueStatus.RESOLVED,
    urgency: UrgencyLevel.LOW,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'Main Gym, Side Entrance' },
    imageUrl: 'https://picsum.photos/400/300?random=3',
    upvotes: 5,
    reportedBy: 'jordan_green',
    reportedAt: new Date(Date.now() - 172800000), // 2 days ago
    assignedWorkerId: 'w3'
  },
  {
    id: '4',
    title: 'AC Not Working',
    description: 'The server room is overheating.',
    type: IssueType.ELECTRICAL,
    status: IssueStatus.PENDING,
    urgency: UrgencyLevel.HIGH,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'CSE Block, Server Room' },
    imageUrl: 'https://picsum.photos/400/300?random=4',
    upvotes: 28,
    reportedBy: 'tech_guru',
    reportedAt: new Date(Date.now() - 43200000), // 12 hours ago
  },
  {
    id: '5',
    title: 'Broken Bench',
    description: 'Wooden bench is cracked and dangerous.',
    type: IssueType.INFRASTRUCTURE,
    status: IssueStatus.PENDING,
    urgency: UrgencyLevel.LOW,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'CSE Block, Courtyard' },
    imageUrl: 'https://picsum.photos/400/300?random=5',
    upvotes: 3,
    reportedBy: 'alex_student',
    reportedAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '6',
    title: 'Clogged Drain',
    description: 'Water pooling in the washroom.',
    type: IssueType.PLUMBING,
    status: IssueStatus.RESOLVED,
    urgency: UrgencyLevel.LOW,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'ECE Block, Ground Floor' },
    imageUrl: 'https://picsum.photos/400/300?random=6',
    upvotes: 8,
    reportedBy: 'sam_eco',
    reportedAt: new Date(Date.now() - 345600000), // 4 days ago
    assignedWorkerId: 'w1'
  },
  {
    id: '7',
    title: 'Flickering Lights',
    description: 'Lights in the corridor keep going on and off.',
    type: IssueType.ELECTRICAL,
    status: IssueStatus.IN_PROGRESS,
    urgency: UrgencyLevel.LOW,
    location: { latitude: 34.0522, longitude: -118.2437, description: 'Library, Study Area' },
    imageUrl: 'https://picsum.photos/400/300?random=7',
    upvotes: 15,
    reportedBy: 'book_worm',
    reportedAt: new Date(Date.now() - 18000000), // 5 hours ago
    assignedWorkerId: 'w2'
  }
];

const WORKERS: Worker[] = [
  { id: 'w1', name: 'Mike Plumber', specialization: IssueType.PLUMBING, available: true, currentTasks: 0 },
  { id: 'w2', name: 'Sarah Spark', specialization: IssueType.ELECTRICAL, available: false, currentTasks: 2 },
  { id: 'w3', name: 'Clean Team Alpha', specialization: IssueType.CLEANLINESS, available: true, currentTasks: 1 },
  { id: 'w4', name: 'Gary Gardener', specialization: IssueType.LANDSCAPING, available: true, currentTasks: 0 },
  { id: 'w5', name: 'Fiona Flora', specialization: IssueType.DAMAGED_PLANTS, available: true, currentTasks: 0 },
];

const LEADERBOARD: User[] = [
  { username: 'eco_warrior_99', password: 'password', ecoPoints: 1250, rank: 1 },
  { username: 'green_campus_fan', password: 'password', ecoPoints: 980, rank: 2 },
  { username: 'recycle_rick', password: 'password', ecoPoints: 850, rank: 3 },
  { username: 'solar_sally', password: 'password', ecoPoints: 720, rank: 4 },
  { username: 'alex_student', password: 'password', ecoPoints: 300, rank: 15 },
];

const ADMIN_USER: User = {
  username: 'admin',
  password: 'admin123',
  ecoPoints: 0,
  rank: 0,
  isAdmin: true
};

class MockDataService {
  private issues: Issue[];
  private workers: Worker[];
  private users: User[]; // Combined list of students
  private admin: User;
  private currentUser: User | null = null;

  constructor() {
    this.issues = this.loadData('snf_issues', INITIAL_ISSUES, true);
    this.workers = this.loadData('snf_workers', WORKERS);
    this.users = this.loadData('snf_users', LEADERBOARD);
    this.admin = this.loadData('snf_admin', ADMIN_USER);
  }

  // Helper to load from LocalStorage with fallback
  private loadData<T>(key: string, fallback: T, isIssue = false): T {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        // Revive Dates if loading issues
        if (isIssue) {
          return JSON.parse(data, (key, value) => {
            if (key === 'reportedAt') return new Date(value);
            return value;
          });
        }
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading data from local storage', e);
    }
    return fallback;
  }

  // Helper to save to LocalStorage
  private saveData() {
    try {
      localStorage.setItem('snf_issues', JSON.stringify(this.issues));
      localStorage.setItem('snf_workers', JSON.stringify(this.workers));
      localStorage.setItem('snf_users', JSON.stringify(this.users));
      localStorage.setItem('snf_admin', JSON.stringify(this.admin));
    } catch (e) {
      console.error('Error saving data to local storage', e);
    }
  }

  // Authentication
  
  // Returns user if successful, throws error string if failed
  loginStudent(username: string, password?: string): User {
    let user = this.users.find(u => u.username === username);
    
    if (user) {
      // User exists, check password
      if (user.password !== password) {
        throw new Error("Invalid password");
      }
    } else {
      // Register new user automatically (Demo feature)
      if (!password) throw new Error("Password required for new user");
      
      user = { 
        username, 
        password, 
        ecoPoints: 0, 
        rank: this.users.length + 1 
      };
      this.users.push(user);
      this.saveData();
    }
    
    this.currentUser = user;
    return user;
  }

  validateAdmin(password: string): boolean {
    // In a real app, we'd check username too, but simplified here as per UI
    return password === this.admin.password;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  getIssues() {
    return [...this.issues];
  }

  reportIssue(issue: Omit<Issue, 'id' | 'reportedAt' | 'upvotes' | 'status' | 'assignedWorkerId' | 'reportedBy'>) {
    const newIssue: Issue = {
      ...issue,
      id: Math.random().toString(36).substr(2, 9),
      reportedAt: new Date(),
      upvotes: 1,
      status: IssueStatus.PENDING,
      reportedBy: this.currentUser?.username || 'anonymous'
    };
    
    this.issues.unshift(newIssue);
    
    // Award points
    if (this.currentUser) {
      const userInList = this.users.find(u => u.username === this.currentUser?.username);
      if (userInList) {
        userInList.ecoPoints += 50;
        this.currentUser.ecoPoints = userInList.ecoPoints; // Sync local object
      }
    }
    
    this.saveData();
    return newIssue;
  }

  upvoteIssue(issueId: string) {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.upvotes += 1;
      
      // Small reward for engagement
      if (this.currentUser) {
        const userInList = this.users.find(u => u.username === this.currentUser?.username);
        if (userInList) {
          userInList.ecoPoints += 5;
          this.currentUser.ecoPoints = userInList.ecoPoints;
        }
      }
      this.saveData();
    }
  }

  // Admin Actions
  getWorkers() {
    return [...this.workers];
  }

  updateIssueStatus(issueId: string, status: IssueStatus) {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.status = status;
      this.saveData();
    }
  }

  assignWorker(issueId: string, workerId: string) {
    const issue = this.issues.find(i => i.id === issueId);
    const worker = this.workers.find(w => w.id === workerId);
    if (issue && worker) {
      issue.assignedWorkerId = workerId;
      issue.status = IssueStatus.IN_PROGRESS;
      worker.currentTasks += 1;
      this.saveData();
    }
  }

  getLeaderboard() {
    return [...this.users].sort((a, b) => b.ecoPoints - a.ecoPoints);
  }
}

export const dataService = new MockDataService();