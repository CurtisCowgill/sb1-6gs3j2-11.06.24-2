import React from 'react';

const CrewFilters: React.FC = () => {
  return (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Specialty</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Specialties</option>
            <option value="Foundation">Foundation</option>
            <option value="Waterproofing">Waterproofing</option>
            <option value="Flatwork">Flatwork</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Any Equipment</option>
            <option value="Concrete Mixer">Concrete Mixer</option>
            <option value="Foundation Forms">Foundation Forms</option>
            <option value="Safety Equipment">Safety Equipment</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CrewFilters;