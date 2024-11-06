import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Truck,
  Calendar,
  FileText,
  DollarSign,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import TabNavigation from '../../components/TabNavigation';

interface Vehicle {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: string;
  mileage: number;
  fuelType: string;
  lastService: string;
  nextService: string;
  maintenanceHistory: MaintenanceRecord[];
  documents: Document[];
}

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  technician: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const mockVehicle: Vehicle = {
  id: 'V001',
  type: 'Truck',
  make: 'Ford',
  model: 'F-250',
  year: 2022,
  vin: '1FTBF2B65NEE12345',
  licensePlate: 'ABC-1234',
  status: 'Available',
  mileage: 25000,
  fuelType: 'Diesel',
  lastService: '2024-02-15',
  nextService: '2024-03-15',
  maintenanceHistory: [
    {
      id: 'M001',
      date: '2024-02-15',
      type: 'Routine',
      description: 'Oil change and inspection',
      cost: 150,
      technician: 'John Smith'
    }
  ],
  documents: [
    {
      id: 'D001',
      name: 'Registration.pdf',
      type: 'PDF',
      date: '2024-01-01',
      size: '1.2 MB'
    }
  ]
};

const VehicleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicle] = useState<Vehicle>(mockVehicle);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Truck },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'financial', label: 'Financial', icon: DollarSign }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Use':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/fleet/vehicles')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-sm text-gray-500">
              VIN: {vehicle.vin} • License: {vehicle.licensePlate}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Last Service</p>
              <p className="font-medium">{vehicle.lastService}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Wrench className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Next Service Due</p>
              <p className="font-medium">{vehicle.nextService}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium">{vehicle.mileage.toLocaleString()} miles</p>
            </div>
          </div>
        </div>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {/* Tab content will be implemented in separate components */}
      </div>
    </div>
  );
};

export default VehicleDetail;