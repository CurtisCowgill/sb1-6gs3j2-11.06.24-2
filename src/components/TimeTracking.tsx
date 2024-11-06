import React from 'react';
import { Clock } from 'lucide-react';

const TimeTracking: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Time Tracking</h2>
      
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No time entries yet</p>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;