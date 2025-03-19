
import React from 'react';
import { BarChart, BarChartHorizontal, Calendar, Award, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAttendance, mockHealthRecords, mockStudentActivities } from '@/lib/mockData';
import { useAuth } from '@/lib/authContext';

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

const StudentDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // For a real app, these would be calculated from real data
  // Here we're just using mock data
  const attendanceRate = '95%';
  const healthStatus = 'Good';
  const activitiesParticipated = mockStudentActivities.length;
  const upcomingEvents = 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
        <p className="text-muted-foreground">Here's an overview of your academic journey</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Attendance Rate"
          value={attendanceRate}
          description="Last 30 days"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Health Status"
          value={healthStatus}
          description="Based on last check-up"
          icon={<BarChartHorizontal className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Activities"
          value={activitiesParticipated.toString()}
          description="Extracurricular participation"
          icon={<Award className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingEvents.toString()}
          description="In the next 2 weeks"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-item col-span-2">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance record for the current term</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Present: 57 days</span>
                  <span>Absent: 3 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
            <CardDescription>Latest health measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Height</span>
                  <span className="font-medium">165 cm</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Weight</span>
                  <span className="font-medium">55 kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>BMI</span>
                  <span className="font-medium">20.2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Vision</span>
                  <span className="font-medium">20/20</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="text-sm font-medium">Overall Status</div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Healthy</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your extracurricular participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudentActivities.map((activity, i) => (
                <div key={i} className="flex items-start">
                  <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Annual Sports Day</div>
                    <div className="text-sm text-muted-foreground">Won 1st place in 100m race</div>
                  </div>
                </div>
              ))}
              {mockStudentActivities.length === 0 && (
                <div className="text-sm text-muted-foreground">No activities found</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-item">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Mark your calendar for these events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Science Fair</div>
                  <div className="text-sm text-muted-foreground">Nov 5, 2023 • School Hall</div>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Parent-Teacher Meeting</div>
                  <div className="text-sm text-muted-foreground">Oct 12, 2023 • 4:00 PM</div>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <div className="font-medium">Field Trip</div>
                  <div className="text-sm text-muted-foreground">Oct 20, 2023 • Science Museum</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
