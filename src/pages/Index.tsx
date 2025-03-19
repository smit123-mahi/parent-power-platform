
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-foreground">Parent Power Platform</h1>
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-4">
              <NavigationMenuItem>
                <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/attendance")}>
                  Attendance
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/health")}>
                  Health
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/activities")}>
                  Activities
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/messages")}>
                  Messages
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-purple-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Connecting Parents, Teachers, and Students</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive platform designed to enhance communication and collaboration in your child's educational journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/login")}>Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M5 22h14"></path>
                      <path d="M5 2h14"></path>
                      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-time Attendance</h3>
                  <p className="text-muted-foreground">Track student attendance and receive immediate notifications for absences.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Health Monitoring</h3>
                  <p className="text-muted-foreground">Keep track of health records, medications, and special health needs.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M8 9h8"></path>
                      <path d="M8 13h6"></path>
                      <path d="M18 2a3 3 0 0 1 2.995 2.824L21 5v14a3 3 0 0 1-2.824 2.995L18 22H6a3 3 0 0 1-2.995-2.824L3 19V5a3 3 0 0 1 2.824-2.995L6 2h12Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Direct Messaging</h3>
                  <p className="text-muted-foreground">Communicate directly with teachers and staff in a secure environment.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of parents and teachers already using Parent Power Platform to enhance their educational community.
          </p>
          <Button size="lg" onClick={() => navigate("/login")}>
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold">Parent Power Platform</h3>
              <p className="text-sm text-muted-foreground">Empowering educational partnerships</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Parent Power Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
