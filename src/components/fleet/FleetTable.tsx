import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Wrench, Settings, AlertCircle } from 'lucide-react';
import type { Vehicle, Equipment } from '../../types';

interface FleetTableProps {
  type: 'all' | 'vehicles' | 'equipment';
}

const mockVehicles: Vehicle[] = [
  {
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
    maintenanceHistory: [],
    documents: []
  }
];

const mockEquipment: Equipment[] = [
  {
    id: 'E001',
    name: 'Concrete Mixer',
    type: 'Heavy Equipment',
    manufacturer: 'CAT',
    model: 'CM2000',
    serialNumber: 'CM2000-123',
    status: 'Available',
    hoursUsed: 1200,
    lastService: '2024-02-01',
    nextService: '2024-03-01',
    maintenanceHistory: [],
    documents: []
  }
];

const FleetTable: React.FC<FleetTableProps> = ({ type }) => {
  const navigate = useNavigate();

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

  const renderVehicles = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Vehicle
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Details
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Service
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Next Service
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {mockVehicles.map((vehicle) => (
          <tr
            key={vehicle.id}
            onClick={() => navigate(`/fleet/vehicles/${vehicle.id}`)}
            className="hover:bg-gray-50 cursor-pointer"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </div>
                  <div className="text-sm text-gray-500">
                    {vehicle.licensePlate}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">VIN: {vehicle.vin}</div>
              <div className="text-sm text-gray-500">{vehicle.fuelType}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {vehicle.lastService}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {vehicle.nextService}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEquipment = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Equipment
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Details
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hours Used
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Next Service
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {mockEquipment.map((equipment) => (
          <tr
            key={equipment.id}
            onClick={() => navigate(`/fleet/equipment/${equipment.id}`)}
            className="hover:bg-gray-50 cursor-pointer"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {equipment.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {equipment.manufacturer} {equipment.model}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">S/N: {equipment.serialNumber}</div>
              <div className="text-sm text-gray-500">{equipment.type}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                {equipment.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {equipment.hoursUsed} hrs
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {equipment.nextService}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (type === 'vehicles') return renderVehicles();
  if (type === 'equipment') return renderEquipment();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicles</h3>
        {renderVehicles()}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment</h3>
        {renderEquipment()}
      </div>
    </div>
  );
};

export default FleetTable;