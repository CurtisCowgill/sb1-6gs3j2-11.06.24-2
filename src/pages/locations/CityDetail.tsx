import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  FolderKanban,
  ClipboardCheck,
  Calendar,
  Users
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

interface Neighborhood {
  id: string;
  name: string;
  totalLots: number;
  availableLots: number;
  activeProjects: number;
}

const mockCity = {
  id: 'C001',
  name: 'Rose Hill',
  state: 'KS',
  county: 'Butler',
  status: 'Active',
  population: 4250,
  totalNeighborhoods: 12,
  activeProjects: 8,
  completedProjects: 45,
  inspectionJurisdiction: 'City of Rose Hill',
  lastInspection: '2024-03-01',
  nextInspection: '2024-04-01',
  projects: [
    {
      id: 'P001',
      name: 'Sienna Ranch - 3001 Cottonwood Ln',
      status: 'In Progress',
      builder: 'Nies Homes',
      startDate: '2024-02-15',
      completionDate: '2024-05-15'
    },
    {
      id: 'P002',
      name: 'Brookfield - 2505 Oak St',
      status: 'Scheduled',
      builder: 'Nies Homes',
      startDate: '2024-03-20',
      completionDate: '2024-06-20'
    }
  ] as Project[],
  neighborhoods: [
    {
      id: 'N001',
      name: 'Sienna Ranch',
      totalLots: 120,
      availableLots: 45,
      activeProjects: 5
    },
    {
      id: 'N002',
      name: 'Brookfield Addition',
      totalLots: 85,
      availableLots: 32,
      activeProjects: 3
    }
  ] as Neighborhood[]
};

const CityDetail: React.FC = () => {
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
            onClick={() => navigate('/locations/city')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cities
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockCity.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(mockCity.status)
          }`}>
            {mockCity.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Neighborhoods</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockCity.totalNeighborhoods}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FolderKanban className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockCity.activeProjects}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClipboardCheck className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Inspection</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatDate(mockCity.nextInspection)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Active Projects</h2>
            <div className="space-y-4">
              {mockCity.projects.map((project) => (
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

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{mockCity.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">County</p>
              <p className="font-medium">{mockCity.county}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Population</p>
              <p className="font-medium">{mockCity.population.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inspection Jurisdiction</p>
              <p className="font-medium">{mockCity.inspectionJurisdiction}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Inspection</p>
              <p className="font-medium">{formatDate(mockCity.lastInspection)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Neighborhoods</h2>
        <div className="grid grid-cols-2 gap-6">
          {mockCity.neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-4">{neighborhood.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Total Lots:</span>
                  <span className="font-medium">{neighborhood.totalLots}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Lots:</span>
                  <span className="font-medium">{neighborhood.availableLots}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Projects:</span>
                  <span className="font-medium">{neighborhood.activeProjects}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityDetail;