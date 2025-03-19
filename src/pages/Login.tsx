
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import LoginForm from "@/components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Login;
