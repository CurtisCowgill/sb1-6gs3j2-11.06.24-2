import React from 'react';
import { Plus, Clock, Calendar, User } from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  employee: string;
  hours: number;
  workOrder: string;
  notes?: string;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: 'TE001',
    date: '2024-03-15',
    employee: 'John Doe',
    hours: 8,
    workOrder: 'Site Visit / Stake Out',
    notes: 'Completed initial site survey'
  },
  {
    id: 'TE002',
    date: '2024-03-15',
    employee: 'Jane Smith',
    hours: 6,
    workOrder: 'Footings',
    notes: 'Started foundation work'
  },
  {
    id: 'TE003',
    date: '2024-03-14',
    employee: 'Mike Johnson',
    hours: 7.5,
    workOrder: 'Site Visit / Stake Out',
    notes: 'Site preparation and layout'
  }
];

const ProjectTime: React.FC<{ projectId?: string }> = () => {
  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Time Entries</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Time Entry
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-blue-900">Total Hours</p>
            <p className="text-2xl font-semibold text-blue-900">{totalHours}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {mockTimeEntries.map((entry) => (
          <div key={entry.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">{entry.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">{entry.employee}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">{entry.hours} hours</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Work Order: {entry.workOrder}</p>
              {entry.notes && (
                <p className="text-sm text-gray-500">{entry.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTime;