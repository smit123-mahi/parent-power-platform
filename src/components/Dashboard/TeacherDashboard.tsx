
import React from 'react';
import { Users, Calendar, Activity, Heart, BarChart4, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/authContext';
import { mockStudents, mockAttendance } from '@/lib/mockData';

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

const TeacherDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // For a real app, these would be calculated from real data
  const totalStudents = mockStudents.length;
  const attendanceRate = '92%';
  const pendingTasks = 5;
  const upcomingEvents = 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h2>
        <p className="text-muted-foreground">Manage your class and student information</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents.toString()}
          description="In your classes"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Attendance Rate"
          value={attendanceRate}
          description="Today's attendance"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.toString()}
          description="Require attention"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingEvents.toString()}
          description="In next 2 weeks"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="dashboard-item md:col-span-4">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Mark and review student attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between mb-4">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">All</Button>
                  <Button variant="outline" size="sm">Grade 10</Button>
                  <Button variant="outline" size="sm">Grade 9</Button>
                </div>
                <Button size="sm">Mark Attendance</Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-12 bg-secondary text-xs font-medium p-2 border-b">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Grade</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Action</div>
                </div>
                
                {mockStudents.slice(0, 5).map((student, index) => {
                  const status = mockAttendance.find(
                    a => a.studentId === student.id && a.date === new Date().toISOString().split('T')[0]
                  )?.status || 'unknown';
                  
                  let statusClass = 'bg-secondary text-secondary-foreground';
                  if (status === 'present') statusClass = 'bg-green-500/10 text-green-700';
                  if (status === 'absent') statusClass = 'bg-red-500/10 text-red-700';
                  if (status === 'late') statusClass = 'bg-yellow-500/10 text-yellow-700';
                  
                  return (
                    <div key={index} className="grid grid-cols-12 text-sm p-2 border-b items-center">
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-5 font-medium">{student.name}</div>
                      <div className="col-span-2">{student.grade}-{student.section}</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>
                          {status === 'unknown' ? 'Not Marked' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex space-x-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center pt-2 text-sm text-muted-foreground">
                <div>Showing 5 of {mockStudents.length} students</div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Take Attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Update Health Records
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Log Student Activities
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart4 className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Parent Meeting
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-2">Pending Tasks</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-primary mt-0.5 mr-2"></div>
                  <div>
                    <p className="text-sm">Complete attendance reports for Grade 10</p>
                    <p className="text-xs text-muted-foreground">Due today</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-primary mt-0.5 mr-2"></div>
                  <div>
                    <p className="text-sm">Submit health screening results</p>
                    <p className="text-xs text-muted-foreground">Due Oct 15</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-primary mt-0.5 mr-2"></div>
                  <div>
                    <p className="text-sm">Prepare for parent-teacher meeting</p>
                    <p className="text-xs text-muted-foreground">Due Oct 12</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Health Records</CardTitle>
            <CardDescription>Recent health updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Pending Health Checks</h3>
                <Button variant="link" size="sm" className="h-auto p-0">View All</Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Annual checkup</p>
                  </div>
                  <Button size="sm" variant="outline">Update</Button>
                </div>
                <div className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                  <div>
                    <p className="font-medium">Alice Johnson</p>
                    <p className="text-xs text-muted-foreground">Vision test</p>
                  </div>
                  <Button size="sm" variant="outline">Update</Button>
                </div>
                <div className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                  <div>
                    <p className="font-medium">Mark Williams</p>
                    <p className="text-xs text-muted-foreground">Immunization record</p>
                  </div>
                  <Button size="sm" variant="outline">Update</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Activities Management</CardTitle>
            <CardDescription>Extracurricular participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">Upcoming Activities</h3>
                <Button variant="link" size="sm" className="h-auto p-0">View All</Button>
              </div>
              
              <div className="space-y-2">
                <div className="bg-secondary/50 p-2 rounded-md">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">Annual Sports Day</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Oct 15
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">School Grounds • 22 students registered</p>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-2 rounded-md">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">Science Fair</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Nov 5
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">School Hall • 15 students registered</p>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Communication Center</CardTitle>
            <CardDescription>Messages and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Button size="sm">New Message</Button>
                <Button size="sm" variant="outline">Announcements</Button>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Recent Communications</h3>
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="text-sm font-medium">To: Sarah Smith (Parent)</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      Regarding John's Performance in Mathematics...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Sent: 2 days ago</p>
                  </div>
                  
                  <div className="border-l-2 border-muted pl-3">
                    <p className="text-sm font-medium">To: All Parents</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      Upcoming Parent-Teacher Meeting Schedule...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Sent: 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
