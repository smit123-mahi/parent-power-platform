
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/lib/authContext';
import { mockNotifications } from '@/lib/mockData';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const unreadNotifications = user ? mockNotifications.filter(
    notification => notification.userId === user.id && !notification.read
  ) : [];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getNavLinks = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Attendance', path: '/attendance' },
          { name: 'Health', path: '/health' },
          { name: 'Activities', path: '/activities' },
          { name: 'Messages', path: '/messages' },
        ];
      case 'parent':
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'My Children', path: '/children' },
          { name: 'Messages', path: '/messages' },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Students', path: '/students' },
          { name: 'Attendance', path: '/attendance' },
          { name: 'Health Records', path: '/health' },
          { name: 'Activities', path: '/activities' },
          { name: 'Messages', path: '/messages' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Users', path: '/users' },
          { name: 'Reports', path: '/reports' },
          { name: 'Settings', path: '/settings' },
        ];
      default:
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Messages', path: '/messages' },
        ];
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-border/30 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                ParentPower
              </span>
            </Link>
          </div>
          
          {user && (
            <>
              <div className="hidden md:flex items-center space-x-4">
                {getNavLinks().map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications.length > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {unreadNotifications.length > 0 ? (
                      unreadNotifications.map(notification => (
                        <DropdownMenuItem key={notification.id} className="cursor-pointer py-3">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                        No new notifications
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex md:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </>
          )}

          {!user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Login
              </Link>
              <Link to="/login" className="hidden sm:block">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in border-t border-border/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {getNavLinks().map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
                onClick={toggleMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start pl-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
