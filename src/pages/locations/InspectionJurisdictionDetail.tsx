import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ClipboardCheck,
  Building2,
  FolderKanban,
  Calendar,
  Users,
  CheckCircle
} from 'lucide-react';
import { formatDate } from '../../utils/format';

interface Inspection {
  id: string;
  projectName: string;
  type: string;
  status: string;
  scheduledDate: string;
  inspector: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
  builder: string;
  nextInspection: string;
}

const mockJurisdiction = {
  id: 'IJ001',
  name: 'City of Rose Hill',
  type: 'City',
  status: 'Active',
  activeProjects: 8,
  totalInspections: 45,
  completedInspections: 38,
  inspectionTypes: ['Foundation', 'Waterproofing', 'Final'],
  contactPerson: 'John Smith',
  contactEmail: 'john.smith@rosehillks.gov',
  contactPhone: '(316) 555-0123',
  lastInspection: '2024-03-01',
  nextInspection: '2024-03-15',
  inspections: [
    {
      id: 'INS001',
      projectName: 'Sienna Ranch - 3001 Cottonwood Ln',
      type: 'Foundation',
      status: 'Scheduled',
      scheduledDate: '2024-03-15',
      inspector: 'Mike Johnson'
    },
    {
      id: 'INS002',
      projectName: 'Brookfield - 2505 Oak St',
      type: 'Waterproofing',
      status: 'Completed',
      scheduledDate: '2024-03-10',
      inspector: 'Sarah Wilson'
    }
  ] as Inspection[],
  projects: [
    {
      id: 'P001',
      name: 'Sienna Ranch Development',
      status: 'In Progress',
      builder: 'Nies Homes',
      nextInspection: '2024-03-15'
    },
    {
      id: 'P002',
      name: 'Brookfield Addition',
      status: 'Active',
      builder: 'Nies Homes',
      nextInspection: '2024-03-20'
    }
  ] as Project[]
};

const InspectionJurisdictionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 <boltAction type="file" filePath="src/pages/locations/InspectionJurisdictionDetail.tsx">text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/locations/inspection')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jurisdictions
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockJurisdiction.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(mockJurisdiction.status)
          }`}>
            {mockJurisdiction.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockJurisdiction.activeProjects}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed Inspections</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockJurisdiction.completedInspections} / {mockJurisdiction.totalInspections}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Inspection</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatDate(mockJurisdiction.nextInspection)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Upcoming Inspections</h2>
            <div className="space-y-4">
              {mockJurisdiction.inspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{inspection.projectName}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(inspection.status)
                    }`}>
                      {inspection.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      {inspection.type} Inspection
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Inspector: {inspection.inspector}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(inspection.scheduledDate)}
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
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{mockJurisdiction.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Person</p>
              <p className="font-medium">{mockJurisdiction.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="font-medium">{mockJurisdiction.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Phone</p>
              <p className="font-medium">{mockJurisdiction.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Inspection</p>
              <p className="font-medium">{formatDate(mockJurisdiction.lastInspection)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Active Projects</h2>
        <div className="grid grid-cols-2 gap-6">
          {mockJurisdiction.projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-4">{project.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusColor(project.status)
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Builder:</span>
                  <span className="font-medium">{project.builder}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Inspection:</span>
                  <span className="font-medium">{formatDate(project.nextInspection)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectionJurisdictionDetail;