import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Building2,
  FolderKanban,
  Calendar,
  Users,
  Star
} from 'lucide-react';
import { formatDate } from '../../utils/format';

interface Project {
  id: string;
  name: string;
  status: string;
  builder: string;
  startDate: string;
  completionDate: string;
}

interface Builder {
  id: string;
  name: string;
  projectsCompleted: number;
  activeProjects: number;
  rating: number;
  lastProject: string;
}

const mockNeighborhood = {
  id: 'N001',
  name: 'Sienna Ranch',
  city: 'Rose Hill',
  county: 'Butler',
  status: 'Active',
  totalLots: 120,
  activeProjects: 5,
  completedProjects: 45,
  inspectionJurisdiction: 'City of Rose Hill',
  lastInspection: '2024-03-01',
  projects: [
    {
      id: 'P001',
      name: '3001 Cottonwood Ln',
      status: 'In Progress',
      builder: 'Nies Homes',
      startDate: '2024-02-15',
      completionDate: '2024-05-15'
    },
    {
      id: 'P002',
      name: '3005 Cottonwood Ln',
      status: 'Scheduled',
      builder: 'Nies Homes',
      startDate: '2024-03-20',
      completionDate: '2024-06-20'
    }
  ] as Project[],
  builders: [
    {
      id: 'B001',
      name: 'Nies Homes',
      projectsCompleted: 25,
      activeProjects: 3,
      rating: 4.8,
      lastProject: '2024-02-15'
    },
    {
      id: 'B002',
      name: 'Craig Sharp Homes',
      projectsCompleted: 18,
      activeProjects: 2,
      rating: 4.6,
      lastProject: '2024-01-20'
    }
  ] as Builder[]
};

const NeighborhoodDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/locations/neighborhood')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Neighborhoods
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockNeighborhood.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(mockNeighborhood.status)
          }`}>
            {mockNeighborhood.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <FolderKanban className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Projects</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockNeighborhood.activeProjects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Projects</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockNeighborhood.activeProjects + mockNeighborhood.completedProjects}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Map View</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Active Projects</h2>
            <div className="space-y-4">
              {mockNeighborhood.projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(project.status)
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {project.builder}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(project.startDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{mockNeighborhood.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">County</p>
                <p className="font-medium">{mockNeighborhood.county}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Lots</p>
                <p className="font-medium">{mockNeighborhood.totalLots}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Inspection Jurisdiction</p>
                <p className="font-medium">{mockNeighborhood.inspectionJurisdiction}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Inspection</p>
                <p className="font-medium">{formatDate(mockNeighborhood.lastInspection)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Active Builders</h2>
            <div className="space-y-4">
              {mockNeighborhood.builders.map((builder) => (
                <div
                  key={builder.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{builder.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{builder.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Projects Completed:</span>
                      <span className="font-medium">{builder.projectsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Projects:</span>
                      <span className="font-medium">{builder.activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Project:</span>
                      <span className="font-medium">{formatDate(builder.lastProject)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodDetail;