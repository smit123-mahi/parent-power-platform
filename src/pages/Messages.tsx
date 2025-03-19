
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import MessageCenter from "@/components/Communication/MessageCenter";
import { useAuth } from "@/lib/authContext";

const Messages = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 page-container">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Please log in</h1>
              <p className="text-muted-foreground">
                You need to be logged in to access the messaging system.
              </p>
            </div>
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 page-container">
          <MessageCenter />
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Messages;
