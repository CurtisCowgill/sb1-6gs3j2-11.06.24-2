import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import CrewCalendar from '../components/schedule/CrewCalendar';

const crews = [
  { id: 'c1', name: 'Foundation Team A' },
  { id: 'c2', name: 'Foundation Team B' },
  { id: 'c3', name: 'Wall Team' },
  { id: 'c4', name: 'Waterproofing Team' },
  { id: 'c5', name: 'Flatwork Team' }
];

const Calendar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        </div>
        <button
          onClick={() => navigate('/work-orders/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Work Order
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <CrewCalendar crews={crews} />
      </div>
    </div>
  );
};

export default Calendar;