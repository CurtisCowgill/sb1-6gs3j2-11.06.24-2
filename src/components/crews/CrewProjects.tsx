import React from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  location: string;
  startDate: string;
  status: string;
  progress: number;
}

interface CrewProjectsProps {
  crewId: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Downtown Foundation Repair',
    location: '123 Main St',
    startDate: '2024-03-15',
    status: 'In Progress',
    progress: 45
  },
  {
    id: '2',
    name: 'Residential Foundation',
    location: '456 Oak Ave',
    startDate: '2024-03-20',
    status: 'Scheduled',
    progress: 0
  }
];

const CrewProjects: React.FC<CrewProjectsProps> = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Projects</h2>

      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">
                {project.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Start Date: {project.startDate}
              </div>
              {project.progress > 0 && (
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Progress
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{project.progress}% Complete</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewProjects;