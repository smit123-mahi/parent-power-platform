
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import ActivityTracker from "@/components/Activities/ActivityTracker";
import { useAuth } from "@/lib/authContext";

const Activities = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 page-container">
          <ActivityTracker />
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Activities;
