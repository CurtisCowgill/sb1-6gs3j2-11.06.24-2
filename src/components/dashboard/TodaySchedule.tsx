import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const TodaySchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 md:gap-4">
        {/* Schedule columns */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Stake Out</h3>
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-blue-500 mr-1" />
              <span>7:00 AM</span>
            </div>
            <p className="text-sm font-medium mt-1">Riverside Project</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Footings</h3>
          <div className="bg-green-50 p-2 rounded-lg">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-green-500 mr-1" />
              <span>2:00 PM</span>
            </div>
            <p className="text-sm font-medium mt-1">East Mall Project</p>
          </div>
        </div>

        {/* Add more schedule columns as needed */}
      </div>
    </div>
  );
};

export default TodaySchedule;