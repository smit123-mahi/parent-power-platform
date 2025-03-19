
export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | 'official' | 'community' | 'ngo' | 'media' | 'pta';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  parentId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  note?: string;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  date: string;
  height?: number;
  weight?: number;
  bmi?: number;
  vision?: string;
  hearing?: string;
  allergies?: string[];
  conditions?: string[];
  notes?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: 'sports' | 'arts' | 'academic' | 'community' | 'other';
  date: string;
  duration: number;
  location: string;
}

export interface StudentActivity {
  id: string;
  studentId: string;
  activityId: string;
  performance?: string;
  feedback?: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageDate: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}
