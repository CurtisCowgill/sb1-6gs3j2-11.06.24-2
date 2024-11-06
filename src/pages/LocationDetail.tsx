import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Briefcase, FileText } from 'lucide-react';

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = {
    id: Number(id),
    name: 'Downtown District',
    type: 'Neighborhood',
    parent: 'Central City',
    status: 'Active',
    description: 'Major commercial and residential district in Central City',
    projects: [
      {
        id: 1,
        name: 'Downtown Foundation Repair',
        status: 'In Progress',
        address: '123 Main St',
      },
      {
        id: 2,
        name: 'Office Complex Foundation',
        status: 'Planning',
        address: '456 Oak Ave',
      },
    ],
    inspections: [
      {
        id: 1,
        type: 'Building Code',
        authority: 'City Building Department',
        frequency: 'Quarterly',
        nextDue: '2024-04-15',
      },
      {
        id: 2,
        type: 'Safety Compliance',
        authority: 'OSHA',
        frequency: 'Semi-Annual',
        nextDue: '2024-06-30',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/locations')}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Locations
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{location.name}</h1>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                location.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {location.status}
            </span>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Location Information</h3>
                <div className="mt-3 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    Type: {location.type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2" />
                    Parent: {location.parent}
                  </div>
                  <p className="text-gray-600 mt-2">{location.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Active Projects</h3>
                <div className="mt-3 space-y-3">
                  {location.projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.address}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Inspection Requirements</h3>
              <div className="space-y-4">
                {location.inspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {inspection.type}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Authority: {inspection.authority}</p>
                      <p>Frequency: {inspection.frequency}</p>
                      <p>Next Due: {inspection.nextDue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;