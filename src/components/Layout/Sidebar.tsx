
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  Activity, 
  Heart, 
  MessageSquare, 
  Settings, 
  User,
  BarChart4,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/authContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user.role) {
      case 'student':
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'Attendance', icon: Calendar, href: '/attendance' },
          { label: 'Health', icon: Heart, href: '/health' },
          { label: 'Activities', icon: Activity, href: '/activities' },
          { label: 'Messages', icon: MessageSquare, href: '/messages' },
        ];
      case 'parent':
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'My Children', icon: Users, href: '/children' },
          { label: 'Health', icon: Heart, href: '/health' },
          { label: 'Activities', icon: Activity, href: '/activities' },
          { label: 'Messages', icon: MessageSquare, href: '/messages' },
        ];
      case 'teacher':
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'Students', icon: Users, href: '/students' },
          { label: 'Attendance', icon: Calendar, href: '/attendance' },
          { label: 'Health', icon: Heart, href: '/health' },
          { label: 'Activities', icon: Activity, href: '/activities' },
          { label: 'Messages', icon: MessageSquare, href: '/messages' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'Users', icon: Users, href: '/users' },
          { label: 'Reports', icon: BarChart4, href: '/reports' },
          { label: 'Settings', icon: Settings, href: '/settings' },
        ];
      case 'official':
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'Schools', icon: BookOpen, href: '/schools' },
          { label: 'Reports', icon: BarChart4, href: '/reports' },
          { label: 'Messages', icon: MessageSquare, href: '/messages' },
        ];
      default:
        return [
          { label: 'Dashboard', icon: Home, href: '/dashboard' },
          { label: 'Profile', icon: User, href: '/profile' },
          { label: 'Messages', icon: MessageSquare, href: '/messages' },
        ];
    }
  };
  
  const navItems = getNavItems();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col flex-1 p-4 space-y-4">
        <div className="flex items-center justify-center p-2">
          <span className="text-lg font-semibold">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal</span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <User className="h-8 w-8 rounded-full bg-sidebar-accent p-1" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
