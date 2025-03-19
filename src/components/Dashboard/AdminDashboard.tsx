
import React from 'react';
import { Users, School, BarChart4, BookOpen, UserCheck, UserX, CalendarDays, ActivitySquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/authContext';
import { mockUsers, mockStudents } from '@/lib/mockData';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
}

const StatCard = ({ title, value, description, icon, change }: StatCardProps) => (
  <Card className="dashboard-item">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2">
        <p className="text-xs text-muted-foreground">{description}</p>
        {change && (
          <span className={`text-xs ${
            change.type === 'increase' 
              ? 'text-green-500' 
              : change.type === 'decrease' 
                ? 'text-red-500' 
                : 'text-muted-foreground'
          }`}>
            {change.type === 'increase' ? '↑' : change.type === 'decrease' ? '↓' : ''}
            {change.value}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Total counts by user role
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
  const totalParents = mockUsers.filter(u => u.role === 'parent').length;
  const totalAdmins = mockUsers.filter(u => u.role === 'admin').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Administration Dashboard</h2>
        <p className="text-muted-foreground">Manage school operations and monitor performance</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents.toString()}
          description="Currently enrolled"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change={{ value: '5%', type: 'increase' }}
        />
        <StatCard
          title="Total Teachers"
          value={totalTeachers.toString()}
          description="Active faculty"
          icon={<School className="h-4 w-4 text-muted-foreground" />}
          change={{ value: '2%', type: 'increase' }}
        />
        <StatCard
          title="Parents Registered"
          value={totalParents.toString()}
          description="Active accounts"
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
          change={{ value: '10%', type: 'increase' }}
        />
        <StatCard
          title="Avg. Attendance"
          value="93%"
          description="This month"
          icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
          change={{ value: '2%', type: 'decrease' }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="dashboard-item md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Active users and engagement metrics</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
              <Button variant="outline" size="sm">Yearly</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Students</span>
                    <span className="font-medium">{totalStudents}</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Teachers</span>
                    <span className="font-medium">{totalTeachers}</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Parents</span>
                    <span className="font-medium">{totalParents}</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Admins</span>
                    <span className="font-medium">{totalAdmins}</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Parent Engagement</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Target: 80% parent engagement by end of term</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item md:col-span-3">
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>Quick access to common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <School className="mr-2 h-4 w-4" />
                School Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Academic Calendar
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart4 className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ActivitySquare className="mr-2 h-4 w-4" />
                Activity Log
              </Button>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">System Stats</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-lg font-bold">24</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Disk Usage</p>
                  <p className="text-lg font-bold">45%</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">System Load</p>
                  <p className="text-lg font-bold">Normal</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Last Backup</p>
                  <p className="text-lg font-bold">2h ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-3">
                <div className="flex justify-between">
                  <p className="font-medium">New User Registered</p>
                  <span className="text-xs text-muted-foreground">10m ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Parent: James Wilson</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-3">
                <div className="flex justify-between">
                  <p className="font-medium">Attendance Updated</p>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Teacher: Robert Johnson</p>
              </div>
              <div className="border-l-2 border-green-400 pl-3">
                <div className="flex justify-between">
                  <p className="font-medium">Health Record Added</p>
                  <span className="text-xs text-muted-foreground">3h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Nurse: Martha Lewis</p>
              </div>
              <div className="border-l-2 border-yellow-400 pl-3">
                <div className="flex justify-between">
                  <p className="font-medium">Event Created</p>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Admin: Emily Davis</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Parent Engagement</CardTitle>
            <CardDescription>Monitoring parent participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Engagement Metrics</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>App Logins</span>
                      <span>78%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Message Response</span>
                      <span>62%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Meeting Attendance</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Health Form Completion</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium mb-2">Recommended Actions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                    <span>Send meeting reminder to boost attendance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                    <span>Schedule parent engagement workshop</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                    <span>Follow up with inactive parents</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Important alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                <div className="flex items-center">
                  <UserX className="h-4 w-4 text-red-500 mr-2" />
                  <p className="font-medium text-red-500">Critical Alert</p>
                </div>
                <p className="text-sm mt-1">5 parent accounts inactive for over 30 days</p>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="text-red-500 border-red-500/30 hover:bg-red-500/10">
                    Take Action
                  </Button>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3">
                <div className="flex items-center">
                  <ActivitySquare className="h-4 w-4 text-yellow-500 mr-2" />
                  <p className="font-medium text-yellow-500">Warning</p>
                </div>
                <p className="text-sm mt-1">Health records updates pending for 12 students</p>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10">
                    Review
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
                <div className="flex items-center">
                  <BarChart4 className="h-4 w-4 text-blue-500 mr-2" />
                  <p className="font-medium text-blue-500">Information</p>
                </div>
                <p className="text-sm mt-1">Monthly attendance report is ready for review</p>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="text-blue-500 border-blue-500/30 hover:bg-blue-500/10">
                    View Report
                  </Button>
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 text-green-500 mr-2" />
                  <p className="font-medium text-green-500">Success</p>
                </div>
                <p className="text-sm mt-1">Parent engagement increased by 15% this month</p>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="text-green-500 border-green-500/30 hover:bg-green-500/10">
                    See Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
