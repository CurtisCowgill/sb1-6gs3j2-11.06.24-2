import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  ClipboardCheck, 
  Truck,
  ChevronRight,
  Ruler,
  Droplet,
  Construction
} from 'lucide-react';
import type { WorkOrder } from '../types';
import { formatDate } from '../utils/format';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ workOrder }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkOrderIcon = (title: string) => {
    switch (title) {
      case 'Site Visit / Stake Out':
        return Ruler;
      case 'Footings':
      case 'Walls':
        return Construction;
      case 'Strip':
        return Construction;
      case 'Waterproofing':
        return Droplet;
      case 'Flatwork':
        return Construction;
      default:
        return Construction;
    }
  };

  const Icon = getWorkOrderIcon(workOrder.title);

  return (
    <div
      onClick={() => navigate(`/work-orders/${workOrder.id}`)}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">{workOrder.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
            {workOrder.status}
          </span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {workOrder.startDate ? formatDate(workOrder.startDate) : 'Not scheduled'}
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          {workOrder.crew}
        </div>
        {workOrder.inspection && (
          <div className="flex items-center">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Inspection: {new Date(workOrder.inspection).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
        {workOrder.concrete && (
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Pour: {new Date(workOrder.concrete).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {(workOrder.estimatedCY || workOrder.actualCY) && (
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
          {workOrder.estimatedCY && (
            <div>Est. CY: {workOrder.estimatedCY}</div>
          )}
          {workOrder.actualCY && (
            <div>Actual CY: {workOrder.actualCY}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkOrderCard;