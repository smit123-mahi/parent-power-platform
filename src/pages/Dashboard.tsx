
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import ParentDashboard from "@/components/Dashboard/ParentDashboard";
import TeacherDashboard from "@/components/Dashboard/TeacherDashboard";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { useAuth } from "@/lib/authContext";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
              <p className="text-muted-foreground">
                Your dashboard is under construction.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 page-container">
          {renderDashboard()}
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Dashboard;
