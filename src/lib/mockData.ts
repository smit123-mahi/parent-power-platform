import { User, Student, Attendance, HealthRecord, Activity, StudentActivity, Message, Notification, Conversation } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 'user2',
    name: 'Parent User',
    email: 'parent@example.com',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 'user3',
    name: 'Teacher User',
    email: 'teacher@example.com',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 'user4',
    name: 'Official User',
    email: 'official@example.com',
    role: 'official',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
    {
    id: 'user5',
    name: 'Another Teacher',
    email: 'teacher2@example.com',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'John Doe',
    grade: '10',
    section: 'A',
    rollNumber: '101',
    parentId: 'user2'
  },
  {
    id: 'student2',
    name: 'Jane Smith',
    grade: '11',
    section: 'B',
    rollNumber: '112',
    parentId: 'user2'
  }
];

// Mock Attendance
export const mockAttendance: Attendance[] = [
  {
    id: 'att1',
    studentId: 'student1',
    date: '2023-09-18',
    status: 'present'
  },
  {
    id: 'att2',
    studentId: 'student2',
    date: '2023-09-18',
    status: 'absent',
    note: 'Sick'
  }
];

// Mock HealthRecords
export const mockHealthRecords: HealthRecord[] = [
  {
    id: 'health1',
    studentId: 'student1',
    date: '2023-09-15',
    height: 160,
    weight: 55,
    bmi: 21.5,
    vision: '20/20',
    hearing: 'Normal',
    allergies: ['Pollen'],
    conditions: [],
    notes: 'General checkup'
  },
  {
    id: 'health2',
    studentId: 'student2',
    date: '2023-09-15',
    height: 165,
    weight: 60,
    bmi: 22.0,
    vision: '20/20',
    hearing: 'Normal',
    allergies: [],
    conditions: [],
    notes: 'General checkup'
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'activity1',
    name: 'Football Match',
    description: 'Inter-school football match',
    type: 'sports',
    date: '2023-09-25',
    duration: 120,
    location: 'School Ground'
  },
  {
    id: 'activity2',
    name: 'Science Fair',
    description: 'Annual science exhibition',
    type: 'academic',
    date: '2023-09-30',
    duration: 180,
    location: 'School Auditorium'
  }
];

// Mock StudentActivities
export const mockStudentActivities: StudentActivity[] = [
  {
    id: 'sa1',
    studentId: 'student1',
    activityId: 'activity1',
    performance: 'Good',
    feedback: 'Played well'
  },
  {
    id: 'sa2',
    studentId: 'student2',
    activityId: 'activity2',
    performance: 'Excellent',
    feedback: 'Great presentation'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user3',
    recipientId: 'user2',
    subject: 'Regarding John\'s Performance',
    content: 'I wanted to discuss John\'s recent improvement in Mathematics. He\'s doing very well.',
    date: '2023-09-10T10:30:00',
    read: true
  },
  {
    id: 'msg2',
    senderId: 'user2',
    recipientId: 'user3',
    subject: 'Re: John\'s Performance',
    content: 'Thank you for letting me know. We\'ve been practicing at home as well.',
    date: '2023-09-10T14:15:00',
    read: true
  },
  {
    id: 'msg3',
    senderId: 'user4',
    recipientId: 'user2',
    subject: 'Parent-Teacher Meeting',
    content: 'We\'re scheduling the next parent-teacher meeting for October 5th. Please confirm your availability.',
    date: '2023-09-15T09:00:00',
    read: false
  },
  {
    id: 'msg4',
    senderId: 'user3',
    recipientId: 'user2',
    subject: 'Reading Assignment',
    content: 'Just a reminder that John has a reading assignment due next Monday. Please ensure he completes it over the weekend.',
    date: '2023-09-16T15:45:00',
    read: false
  },
  {
    id: 'msg5',
    senderId: 'user3',
    recipientId: 'user5',
    subject: 'Curriculum Updates',
    content: 'I would like to discuss some proposed updates to the science curriculum for grade 10.',
    date: '2023-09-14T11:30:00',
    read: true
  },
  {
    id: 'msg6',
    senderId: 'user5',
    recipientId: 'user3',
    subject: 'Re: Curriculum Updates',
    content: 'I would be happy to discuss this. Let\'s schedule a meeting for next week.',
    date: '2023-09-14T14:20:00',
    read: true
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['user2', 'user3'],
    lastMessageDate: '2023-09-16T15:45:00',
    unreadCount: 1
  },
  {
    id: 'conv2',
    participants: ['user2', 'user4'],
    lastMessageDate: '2023-09-15T09:00:00',
    unreadCount: 1
  },
  {
    id: 'conv3',
    participants: ['user3', 'user5'],
    lastMessageDate: '2023-09-14T14:20:00',
    unreadCount: 0
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user2',
    title: 'Attendance Alert',
    message: 'Your child was absent today.',
    date: '2023-09-18T08:00:00',
    read: false,
    type: 'warning'
  },
  {
    id: 'notif2',
    userId: 'user3',
    title: 'Activity Update',
    message: 'Football match scheduled for next week.',
    date: '2023-09-19T10:00:00',
    read: true,
    type: 'info'
  }
];
