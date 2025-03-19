
import React from 'react';
import { useAuth } from '@/lib/authContext';

const ActivityTracker = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Activity Tracker</h1>
      <p>This is the Activity Tracker component, which will track student activities.</p>
    </div>
  );
};

export default ActivityTracker;
