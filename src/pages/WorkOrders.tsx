import React, { useState } from 'react';
import { 
  Plus, 
  ClipboardList, 
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  X,
  Settings
} from 'lucide-react';
import TabNavigation from '../components/TabNavigation';
import WorkOrderList from '../components/workOrders/WorkOrderList';
import WorkOrderTypeList from '../components/workOrders/WorkOrderTypeList';
import WorkOrderForm from '../components/workOrders/WorkOrderForm';
import { WorkOrder } from '../types/workOrders';
import { mockWorkOrders } from '../data/mockWorkOrders';

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'completed', label: 'Completed' },
  { id: 'types', label: 'WO Types', icon: Settings }
];

const mockMetrics = {
  activeOrders: 12,
  scheduledOrders: 8,
  completedOrders: 45,
  totalHours: 320,
  laborCost: 15000,
  materialCost: 25000
};

const WorkOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [workOrders] = useState<WorkOrder[]>(mockWorkOrders);

  const handleCreateWorkOrder = (data: WorkOrder) => {
    console.log('Creating work order:', data);
    setShowNewOrderForm(false);
  };

  const handleUpdateWorkOrder = (id: string, data: Partial<WorkOrder>) => {
    console.log('Updating work order:', id, data);
  };

  const filteredWorkOrders = workOrders.filter(wo => {
    switch (activeTab) {
      case 'active':
        return wo.status === 'in_progress';
      case 'scheduled':
        return wo.status === 'scheduled';
      case 'completed':
        return wo.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        {activeTab !== 'types' && (
          <button
            onClick={() => setShowNewOrderForm(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Work Order
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.activeOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.scheduledOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.completedOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Hours</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.totalHours}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Labor Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${mockMetrics.laborCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Material Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${mockMetrics.materialCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'types' ? (
          <WorkOrderTypeList />
        ) : (
          <WorkOrderList
            workOrders={filteredWorkOrders}
            onUpdate={handleUpdateWorkOrder}
          />
        )}
      </div>

      {showNewOrderForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Create Work Order</h2>
              <button
                onClick={() => setShowNewOrderForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <WorkOrderForm
              onSubmit={handleCreateWorkOrder}
              onCancel={() => setShowNewOrderForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;