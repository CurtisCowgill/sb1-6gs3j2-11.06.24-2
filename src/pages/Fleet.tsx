import React, { useState } from 'react';
import { 
  Truck, 
  Wrench, 
  DollarSign,
  AlertTriangle,
  Calendar,
  Settings 
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Truck },
  { id: 'vehicles', label: 'Vehicles', icon: Truck },
  { id: 'equipment', label: 'Equipment', icon: Settings }
];

const Fleet: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalVehicles: 12,
    totalEquipment: 45,
    maintenanceDue: 3,
    totalValue: 850000,
    utilizationRate: 85,
    maintenanceCosts: 25000
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles & Equipment</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Assets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalVehicles + stats.totalEquipment}
              </p>
              <p className="text-sm text-gray-500">
                {stats.totalVehicles} Vehicles • {stats.totalEquipment} Equipment
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.totalValue)}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(stats.maintenanceCosts)} maintenance YTD
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Maintenance Due</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.maintenanceDue}
              </p>
              <p className="text-sm text-gray-500">
                {stats.utilizationRate}% utilization rate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Maintenance</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {/* Add upcoming maintenance list */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Issues</h2>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {/* Add recent issues list */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;