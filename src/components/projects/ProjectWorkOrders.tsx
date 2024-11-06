import React from 'react';
import { Plus } from 'lucide-react';
import { STANDARD_WORK_ORDERS } from '../../data/workOrders';
import WorkOrderCard from '../WorkOrderCard';

const ProjectWorkOrders: React.FC<{ projectId?: string }> = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Work Orders</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Work Order
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {STANDARD_WORK_ORDERS.map((workOrder) => (
            <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkOrders;