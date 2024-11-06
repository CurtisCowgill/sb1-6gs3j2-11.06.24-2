import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Landmark,
  Building2,
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

interface City {
  id: string;
  name: string;
  totalNeighborhoods: number;
  activeProjects: number;
  population: number;
}

const mockCounty = {
  id: 'CTY001',
  name: 'Butler',
  state: 'KS',
  status: 'Active',
  population: 67380,
  totalCities: 8,
  activeProjects: 15,
  completedProjects: 85,
  inspectionJurisdiction: 'Butler County Planning & Zoning',
  lastInspection: '2024-03-01',
  nextInspection: '2024-04-01',
  projects: [
    {
      id: 'P001',
      name: 'Rose Hill - Sienna Ranch Development',
      status: 'In Progress',
      builder: 'Nies Homes',
      startDate: '2024-02-15',
      completionDate: '2024-05-15'
    },
    {
      id: 'P002',
      name: 'Andover - Brookfield Addition',
      status: 'Scheduled',
      builder: 'Nies Homes',
      startDate: '2024-03-20',
      completionDate: '2024-06-20'
    }
  ] as Project[],
  cities: [
    {
      id: 'C001',
      name: 'Rose Hill',
      totalNeighborhoods: 12,
      activeProjects: 8,
      population: 4250
    },
    {
      id: 'C002',
      name: 'Andover',
      totalNeighborhoods: 8,
      activeProjects: 5,
      population: 14892
    }
  ] as City[]
};

const CountyDetail: React.FC = () => {
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
            onClick={() => navigate('/locations/county')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Counties
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockCounty.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(mockCounty.status)
          }`}>
            {mockCounty.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Cities</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockCounty.totalCities}
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
                {mockCounty.activeProjects}
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
                {formatDate(mockCounty.nextInspection)}
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
              {mockCounty.projects.map((project) => (
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
              <p className="font-medium">{mockCounty.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Population</p>
              <p className="font-medium">{mockCounty.population.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inspection Jurisdiction</p>
              <p className="font-medium">{mockCounty.inspectionJurisdiction}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Inspection</p>
              <p className="font-medium">{formatDate(mockCounty.lastInspection)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Cities</h2>
        <div className="grid grid-cols-2 gap-6">
          {mockCounty.cities.map((city) => (
            <div
              key={city.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-4">{city.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Population:</span>
                  <span className="font-medium">{city.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Neighborhoods:</span>
                  <span className="font-medium">{city.totalNeighborhoods}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Projects:</span>
                  <span className="font-medium">{city.activeProjects}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountyDetail;