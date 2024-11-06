import React, { useState } from 'react';
import { Plus, Search, Filter, Video, Users } from 'lucide-react';
import type { ToolboxTalk } from '../../types';
import { formatDate } from '../../utils/format';

const mockTalks: ToolboxTalk[] = [
  {
    id: 'TT001',
    title: 'Proper Lifting Techniques',
    description: 'Learn safe lifting procedures to prevent injuries',
    videoUrl: '/safety/videos/lifting.mp4',
    duration: '5:30',
    category: 'Ergonomics',
    requiredFor: ['Foundation Team', 'Wall Team'],
    completions: [
      {
        employeeId: 'EMP001',
        completedAt: '2024-03-01',
        signature: 'John Doe'
      }
    ]
  },
  {
    id: 'TT002',
    title: 'Fall Protection',
    description: 'Essential fall protection guidelines and equipment usage',
    videoUrl: '/safety/videos/fall-protection.mp4',
    duration: '8:15',
    category: 'PPE',
    requiredFor: ['All Crews'],
    completions: []
  }
];

const ToolboxTalks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Toolbox Talks</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Talk
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search talks..."
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
            {mockTalks.map((talk) => (
              <div
                key={talk.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <Video className="h-5 w-5 text-blue-500 mt-1" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {talk.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {talk.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Duration: {talk.duration}
                      </span>
                      <span className="text-gray-500">
                        Category: {talk.category}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {talk.completions.length} completion{talk.completions.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800">
                    Start Talk
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

export default ToolboxTalks;