import React from 'react';
import { Clock, Calendar, FileText } from 'lucide-react';
import { formatDate } from '../../utils/format';

interface TimesheetEntry {
  id: string;
  date: string;
  projectName: string;
  workOrder: string;
  hoursWorked: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

interface EmployeeTimesheetProps {
  employeeId: string;
}

const mockTimesheet: TimesheetEntry[] = [
  {
    id: '1',
    date: '2024-03-14',
    projectName: 'Downtown Foundation Repair',
    workOrder: 'Site Preparation',
    hoursWorked: 8,
    status: 'Approved',
    notes: 'Completed initial site clearing'
  },
  {
    id: '2',
    date: '2024-03-13',
    projectName: 'Residential Foundation',
    workOrder: 'Footings',
    hoursWorked: 7.5,
    status: 'Pending'
  }
];

const EmployeeTimesheet: React.FC<EmployeeTimesheetProps> = () => {
  const getStatusColor = (status: TimesheetEntry['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const totalHours = mockTimesheet.reduce((sum, entry) => sum + entry.hoursWorked, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Time Entries</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Clock className="h-4 w-4 mr-2" />
            Add Time Entry
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-sm font-medium text-blue-900">Total Hours</h3>
            </div>
            <p className="mt-2 text-2xl font-semibold text-blue-900">{totalHours}</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockTimesheet.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{formatDate(entry.date)}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {entry.projectName}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  {entry.workOrder}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {entry.hoursWorked} hours
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-500">{entry.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTimesheet;