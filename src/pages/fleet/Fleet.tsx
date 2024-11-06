import React, { useState } from 'react';
import { 
  Truck, 
  Wrench, 
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import FleetTable from '../../components/fleet/FleetTable';

const Fleet: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const stats = {
    totalVehicles: 12,
    totalEquipment: 24,
    inMaintenance: 3,
    scheduledServices: 5,
    monthlyExpenses: 15000
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Fleet</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalVehicles + stats.totalEquipment}
              </p>
              <p className="text-sm text-gray-500">
                {stats.totalVehicles} Vehicles, {stats.totalEquipment} Equipment
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.inMaintenance}
              </p>
              <p className="text-sm text-gray-500">
                {stats.scheduledServices} services scheduled
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.monthlyExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['all', 'vehicles', 'equipment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <FleetTable type={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Fleet;