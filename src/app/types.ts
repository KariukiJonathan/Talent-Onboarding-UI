// Core types for the Tana onboarding platform

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  createdAt: string;
}

export interface Role {
  id: string;
  companyId: string;
  title: string;
  department: string;
  description: string;
  level: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Manager';
  createdAt: string;
}

export interface Talent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  companyId: string;
  roleId: string;
  startDate: string;
  status: 'Pending' | 'Active' | 'Completed';
  progress: number; // 0-100
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  type: 'Video' | 'Reading' | 'Task' | 'Quiz' | 'Simulator' | 'Meeting';
  duration: number; // in minutes
  content: string;
  resources?: Resource[];
  aiAssistantEnabled: boolean;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Document' | 'Video' | 'Link' | 'Tool';
  url: string;
}

export interface Roadmap {
  id: string;
  companyId: string;
  roleId: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
  estimatedDuration: number; // in days
  createdAt: string;
}

export interface TalentProgress {
  id: string;
  talentId: string;
  roadmapId: string;
  completedSteps: string[]; // step IDs
  currentStepId: string;
  startedAt: string;
  lastActivityAt: string;
  overallProgress: number; // 0-100
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type UserRole = 'recruiter' | 'talent';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  talentId?: string; // if role is talent
}
