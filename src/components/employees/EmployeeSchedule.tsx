import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/format';

interface ScheduleEntry {
  id: string;
  date: string;
  projectName: string;
  location: string;
  workOrder: string;
  startTime: string;
  endTime: string;
}

interface EmployeeScheduleProps {
  employeeId: string;
}

const mockSchedule: ScheduleEntry[] = [
  {
    id: '1',
    date: '2024-03-15',
    projectName: 'Downtown Foundation Repair',
    location: '123 Main St',
    workOrder: 'Site Preparation',
    startTime: '07:00',
    endTime: '15:30'
  },
  {
    id: '2',
    date: '2024-03-16',
    projectName: 'Residential Foundation',
    location: '456 Oak Ave',
    workOrder: 'Footings',
    startTime: '07:00',
    endTime: '15:30'
  }
];

const EmployeeSchedule: React.FC<EmployeeScheduleProps> = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Upcoming Schedule</h2>
        
        <div className="space-y-4">
          {mockSchedule.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{formatDate(entry.date)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{entry.startTime} - {entry.endTime}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {entry.projectName}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {entry.location}
                </div>
                <div className="text-sm text-gray-500">
                  Work Order: {entry.workOrder}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSchedule;