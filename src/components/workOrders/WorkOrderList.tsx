import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ChevronRight, Plus } from 'lucide-react';
import type { WorkOrder } from '../../types/workOrders';

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  onUpdate: (id: string, data: Partial<WorkOrder>) => void;
}

const WorkOrderList: React.FC<WorkOrderListProps> = ({ workOrders }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Work Orders</h2>
        <button
          onClick={() => navigate('/work-orders/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Work Order
        </button>
      </div>

      {workOrders.map((workOrder) => (
        <div
          key={workOrder.id}
          onClick={() => navigate(`/work-orders/${workOrder.id}`)}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-gray-900">{workOrder.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
                {workOrder.status}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {workOrder.scheduledStart ? new Date(workOrder.scheduledStart).toLocaleDateString() : 'Not scheduled'}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {Math.floor(workOrder.estimatedDuration / 60)}h {workOrder.estimatedDuration % 60}m
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {workOrder.defaultCrewType}
            </div>
          </div>

          {workOrder.tasks && workOrder.tasks.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500">
                {workOrder.tasks.length} task{workOrder.tasks.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkOrderList;