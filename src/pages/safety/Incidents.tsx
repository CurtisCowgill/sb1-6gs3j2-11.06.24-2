import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react';
import type { SafetyIncident } from '../../types';
import { formatDate } from '../../utils/format';

const mockIncidents: SafetyIncident[] = [
  {
    id: 'INC001',
    date: '2024-03-01',
    location: 'Project Site A',
    projectId: 'PRJ001',
    type: 'Near Miss',
    description: 'Equipment nearly fell from scaffolding',
    employees: ['EMP001', 'EMP002'],
    witnesses: ['EMP003'],
    rootCause: 'Improper securing of equipment',
    correctiveActions: ['Updated equipment securing procedure', 'Additional training'],
    status: 'Closed'
  },
  {
    id: 'INC002',
    date: '2024-03-05',
    location: 'Project Site B',
    projectId: 'PRJ002',
    type: 'First Aid',
    description: 'Minor cut while handling materials',
    employees: ['EMP004'],
    witnesses: ['EMP005'],
    rootCause: 'Not wearing proper gloves',
    correctiveActions: ['Reinforced PPE requirements'],
    status: 'Under Investigation'
  }
];

const Incidents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status: SafetyIncident['status']) => {
    switch (status) {
      case 'Closed':
        return 'bg-green-100 text-green-800';
      case 'Under Investigation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Open':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: SafetyIncident['type']) => {
    switch (type) {
      case 'Near Miss':
        return 'bg-blue-100 text-blue-800';
      case 'First Aid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Recordable':
        return 'bg-orange-100 text-orange-800';
      case 'Lost Time':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Safety Incidents</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Report Incident
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="ml-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {mockIncidents.map((incident) => (
              <div
                key={incident.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {incident.type} - {incident.location}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {incident.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Date: {formatDate(incident.date)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                        {incident.type}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;