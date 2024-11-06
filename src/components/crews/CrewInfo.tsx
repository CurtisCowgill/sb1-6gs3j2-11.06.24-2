import React from 'react';
import { 
  Users, 
  Wrench, 
  HardHat,
  Briefcase,
  MapPin 
} from 'lucide-react';

interface CrewInfoProps {
  crew: {
    name: string;
    lead: string;
    size: number;
    specialty: string;
    location: string;
    status: string;
  };
  onEdit?: () => void;
}

const CrewInfo: React.FC<CrewInfoProps> = ({ crew, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{crew.name}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Edit Details
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <HardHat className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Crew Lead</p>
              <p className="font-medium">{crew.lead}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Team Size</p>
              <p className="font-medium">{crew.size} members</p>
            </div>
          </div>

          <div className="flex items-center">
            <Wrench className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <p className="font-medium">{crew.specialty}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-medium">{crew.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                crew.status === 'Available' 
                  ? 'bg-green-100 text-green-800'
                  : crew.status === 'Assigned'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {crew.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewInfo;