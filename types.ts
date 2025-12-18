export enum IssueType {
  PLUMBING = 'Plumbing',
  ELECTRICAL = 'Electrical',
  CLEANLINESS = 'Cleanliness',
  LANDSCAPING = 'Landscaping',
  DAMAGED_PLANTS = 'Damaged Plants',
  INFRASTRUCTURE = 'Infrastructure',
  OTHER = 'Other'
}

export enum IssueStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export enum UrgencyLevel {
  LOW = 'Non-Emergency',
  HIGH = 'Emergency'
}

export interface Location {
  latitude: number;
  longitude: number;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  urgency: UrgencyLevel;
  location: Location;
  imageUrl: string;
  upvotes: number;
  reportedBy: string; // username
  reportedAt: Date;
  assignedWorkerId?: string;
  comments?: string;
}

export interface Worker {
  id: string;
  name: string;
  specialization: IssueType;
  available: boolean;
  currentTasks: number;
}

export interface User {
  username: string;
  password?: string; // Added password field
  ecoPoints: number;
  rank: number;
  isAdmin?: boolean;
}