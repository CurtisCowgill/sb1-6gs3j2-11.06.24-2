import React from 'react';

interface ScheduleItem {
  id: string;
  type: 'inspection' | 'pour';
  time: string;
  project: string;
  location: string;
}

interface UpcomingScheduleProps {
  items: ScheduleItem[];
  onUpdate: (id: string) => void;
}

const UpcomingSchedule: React.FC<UpcomingScheduleProps> = ({ items, onUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Schedule</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm ${
                item.type === 'inspection' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {item.time}
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.project}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
            <button 
              onClick={() => onUpdate(item.id)}
              className="btn btn-secondary"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedule;