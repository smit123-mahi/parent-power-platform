
import React from 'react';
import { Users, BookOpen, Bell, Calendar, Activity, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/authContext';
import { mockStudents, mockAttendance, mockHealthRecords, mockMessages, mockNotifications } from '@/lib/mockData';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card className="dashboard-item">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ParentDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Filter mockData based on the current parent
  const children = mockStudents.filter(student => student.parentId === user.id);
  
  // Get attendance for all children
  const childrenIds = children.map(child => child.id);
  const attendanceRecords = mockAttendance.filter(record => 
    childrenIds.includes(record.studentId)
  );
  
  // Calculate attendance percentage
  const attendancePercentage = attendanceRecords.length > 0
    ? Math.round((attendanceRecords.filter(record => record.status === 'present').length / attendanceRecords.length) * 100)
    : 0;
  
  // Count unread notifications
  const unreadNotifications = mockNotifications.filter(
    notification => notification.userId === user.id && !notification.read
  ).length;
  
  // Count unread messages
  const unreadMessages = mockMessages.filter(
    message => message.recipientId === user.id && !message.read
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h2>
        <p className="text-muted-foreground">Stay informed about your child's education</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Children"
          value={children.length.toString()}
          description="Enrolled in the system"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Average Attendance"
          value={`${attendancePercentage}%`}
          description="Last 30 days"
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Notifications"
          value={unreadNotifications.toString()}
          description="Unread alerts"
          icon={<Bell className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Messages"
          value={unreadMessages.toString()}
          description="From teachers & staff"
          icon={<Bell className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Children's Profiles</CardTitle>
            <CardDescription>Quick access to your children's information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-md bg-secondary/50">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">Grade {child.grade}-{child.section}, Roll #{child.rollNumber}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                    </button>
                    <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Heart className="h-4 w-4 text-primary" />
                    </button>
                    <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Activity className="h-4 w-4 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
              
              {children.length === 0 && (
                <div className="text-center py-6">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium text-muted-foreground">No children found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Contact school administration to add your children.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Card className="dashboard-item">
            <CardHeader className="pb-3">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with important alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications
                  .filter(notification => notification.userId === user.id)
                  .slice(0, 3)
                  .map((notification, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-2 rounded-md ${notification.read ? 'opacity-70' : 'bg-primary/5'}`}>
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                
                {mockNotifications.filter(notification => notification.userId === user.id).length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">No notifications</div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-item">
            <CardHeader className="pb-3">
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Communication from teachers and staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMessages
                  .filter(message => message.recipientId === user.id)
                  .slice(0, 3)
                  .map((message, index) => (
                    <div key={index} className={`border-l-2 ${message.read ? 'border-muted' : 'border-primary'} pl-3 py-1`}>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                
                {mockMessages.filter(message => message.recipientId === user.id).length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">No messages</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Last 7 days of attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.length > 0 ? (
                children.slice(0, 1).map((child, childIndex) => (
                  <div key={childIndex}>
                    <h4 className="font-medium mb-2">{child.name}</h4>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - dayIndex));
                        
                        const dateString = date.toISOString().split('T')[0];
                        const record = mockAttendance.find(a => 
                          a.studentId === child.id && a.date === dateString
                        );
                        
                        let statusColor = 'bg-secondary';
                        if (record) {
                          statusColor = record.status === 'present' 
                            ? 'bg-green-500' 
                            : record.status === 'absent'
                              ? 'bg-red-500'
                              : 'bg-yellow-500';
                        }
                        
                        return (
                          <div key={dayIndex} className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full ${statusColor}`}></div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {date.getDate()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <span>Present</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                        <span>Late</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Absent</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">No attendance data</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Health Updates</CardTitle>
            <CardDescription>Latest health records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.length > 0 ? (
                children.slice(0, 1).map((child, childIndex) => {
                  const healthRecord = mockHealthRecords.find(record => record.studentId === child.id);
                  
                  return (
                    <div key={childIndex}>
                      <h4 className="font-medium mb-2">{child.name}</h4>
                      {healthRecord ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Height</span>
                            <span>{healthRecord.height} cm</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Weight</span>
                            <span>{healthRecord.weight} kg</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>BMI</span>
                            <span>{healthRecord.bmi}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Vision</span>
                            <span>{healthRecord.vision}</span>
                          </div>
                          {healthRecord.allergies && healthRecord.allergies.length > 0 && (
                            <div className="pt-2 border-t border-border mt-2">
                              <p className="text-sm font-medium">Allergies</p>
                              <p className="text-sm text-muted-foreground">{healthRecord.allergies.join(', ')}</p>
                            </div>
                          )}
                          {healthRecord.notes && (
                            <div className="pt-2 border-t border-border mt-2">
                              <p className="text-sm font-medium">Notes</p>
                              <p className="text-sm text-muted-foreground">{healthRecord.notes}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-4">No health data available</div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">No health data</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Upcoming Activities</CardTitle>
            <CardDescription>Activities and events calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 text-center">
                  <p className="text-sm font-medium">Oct 15</p>
                </div>
                <div className="flex-grow bg-secondary/50 p-2 rounded-md">
                  <p className="font-medium">Annual Sports Day</p>
                  <p className="text-sm text-muted-foreground">School Grounds • 8:00 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 text-center">
                  <p className="text-sm font-medium">Nov 5</p>
                </div>
                <div className="flex-grow bg-secondary/50 p-2 rounded-md">
                  <p className="font-medium">Science Fair</p>
                  <p className="text-sm text-muted-foreground">School Hall • 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 text-center">
                  <p className="text-sm font-medium">Oct 12</p>
                </div>
                <div className="flex-grow bg-secondary/50 p-2 rounded-md">
                  <p className="font-medium">Parent-Teacher Meeting</p>
                  <p className="text-sm text-muted-foreground">All Classrooms • 4:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
