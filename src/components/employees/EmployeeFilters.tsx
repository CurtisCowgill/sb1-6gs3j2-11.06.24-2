import React from 'react';

const EmployeeFilters: React.FC = () => {
  return (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Roles</option>
            <option value="Foundation Specialist">Foundation Specialist</option>
            <option value="Waterproofing Expert">Waterproofing Expert</option>
            <option value="Site Manager">Site Manager</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Crew</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Crews</option>
            <option value="Team Alpha">Team Alpha</option>
            <option value="Team Beta">Team Beta</option>
            <option value="Team Gamma">Team Gamma</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Any Skill</option>
            <option value="Concrete Work">Concrete Work</option>
            <option value="Foundation Repair">Foundation Repair</option>
            <option value="Site Preparation">Site Preparation</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;