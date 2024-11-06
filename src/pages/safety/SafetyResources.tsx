import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Download } from 'lucide-react';
import type { SafetyResource } from '../../types';

const mockResources: SafetyResource[] = [
  {
    id: 'SR001',
    title: 'Safety Manual 2024',
    category: 'Documentation',
    description: 'Complete company safety procedures and guidelines',
    fileUrl: '/safety/manual-2024.pdf',
    fileType: 'PDF',
    uploadedAt: '2024-01-01',
    lastUpdated: '2024-03-01'
  },
  {
    id: 'SR002',
    title: 'Emergency Response Plan',
    category: 'Procedures',
    description: 'Step-by-step emergency response procedures',
    fileUrl: '/safety/emergency-response.pdf',
    fileType: 'PDF',
    uploadedAt: '2024-02-15',
    lastUpdated: '2024-02-15'
  }
];

const SafetyResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Safety Resources</h1>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search resources..."
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
            {mockResources.map((resource) => (
              <div
                key={resource.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-1" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {resource.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Category: {resource.category}
                      </span>
                      <span className="text-gray-500">
                        Last updated: {resource.lastUpdated}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800">
                    Download
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

export default SafetyResources;