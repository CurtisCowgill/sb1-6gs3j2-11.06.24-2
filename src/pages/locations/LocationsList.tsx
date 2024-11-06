import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Landmark, ClipboardCheck } from 'lucide-react';

const LocationsList: React.FC = () => {
  const navigate = useNavigate();

  const locationTypes = [
    {
      id: 'neighborhood',
      name: 'Neighborhoods',
      icon: MapPin,
      description: 'Manage residential and commercial neighborhoods',
      count: 24
    },
    {
      id: 'city',
      name: 'Cities',
      icon: Building2,
      description: 'City-wide project management and regulations',
      count: 8
    },
    {
      id: 'county',
      name: 'Counties',
      icon: Landmark,
      description: 'County-level operations and compliance',
      count: 3
    },
    {
      id: 'inspection',
      name: 'Inspection Jurisdictions',
      icon: ClipboardCheck,
      description: 'Manage inspection authorities and requirements',
      count: 12
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Locations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locationTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => navigate(`/locations/${type.id}`)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <type.icon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{type.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {type.count}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsList;