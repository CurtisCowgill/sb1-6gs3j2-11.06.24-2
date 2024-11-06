import React from 'react';
import type { WorkOrder } from '../types';
import WorkOrderCard from './WorkOrderCard';

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  onUpdate: (id: string, data: Partial<WorkOrder>) => void;
}

const WorkOrderList: React.FC<WorkOrderListProps> = ({ workOrders, onUpdate }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Work Orders</h2>
      <div className="space-y-4">
        {workOrders.map((workOrder) => (
          <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
        ))}
      </div>
    </div>
  );
};

export default WorkOrderList;