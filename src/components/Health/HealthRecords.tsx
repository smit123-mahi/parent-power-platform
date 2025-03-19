
import React from 'react';
import { useAuth } from '@/lib/authContext';

const HealthRecords = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Health Records</h1>
      <p>This is the Health Records component, which will display health information for students.</p>
    </div>
  );
};

export default HealthRecords;
