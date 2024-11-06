import React from 'react';
import { MapPin } from 'lucide-react';

interface CustomerMapProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const CustomerMap: React.FC<CustomerMapProps> = ({ address }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center p-6">
      <div className="text-center">
        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Map View</p>
        <p className="text-xs text-gray-400 mt-1">{address.street}</p>
        <p className="text-xs text-gray-400">{address.city}, {address.state} {address.zip}</p>
      </div>
    </div>
  );
};

export default CustomerMap;