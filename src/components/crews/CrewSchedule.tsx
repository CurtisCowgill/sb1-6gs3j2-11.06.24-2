import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Crew } from '../../types';

interface CrewScheduleProps {
  crew: Crew;
}

const CrewSchedule: React.FC<CrewScheduleProps> = ({ crew }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Weekly Schedule</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Add Assignment
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="min-h-[500px] flex items-center justify-center text-gray-500">
          Calendar view will be implemented here
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Assignments</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Project Name {index + 1}</p>
                  <p className="text-sm text-gray-500">Location {index + 1}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Scheduled
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrewSchedule;