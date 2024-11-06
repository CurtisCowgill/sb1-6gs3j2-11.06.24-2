import React from 'react';

const CrewCalendarHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return (
          <div key={i} className="p-4 text-center border-r border-gray-200">
            <div className="font-medium">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-sm text-gray-500">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CrewCalendarHeader;