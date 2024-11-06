import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Users,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Truck,
  Edit2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { WorkOrder } from '../../types/workOrders';
import { formatDate } from '../../utils/format';
import { workOrderTemplates } from '../../utils/workOrderTemplates';

interface WorkOrderDetailProps {
  workOrder: WorkOrder;
  onUpdate: (updates: Partial<WorkOrder>) => void;
}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = ({ workOrder, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const template = workOrderTemplates[workOrder.type];

  const handleChecklistUpdate = (itemId: string, completed: boolean) => {
    const newChecklist = workOrder.checklist.map(item => 
      item.id === itemId ? { ...item, completed } : item
    );
    onUpdate({ checklist: newChecklist });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
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
            onClick={() => navigate('/work-orders')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{workOrder.type}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workOrder.status)}`}>
            {workOrder.status}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Schedule Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Scheduled Date</p>
                <p className="font-medium">{formatDate(workOrder.scheduledDate)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {Math.floor(workOrder.estimatedDuration / 60)}h {workOrder.estimatedDuration % 60}m
                </p>
              </div>
            </div>

            {workOrder.estimatedCompletionDate && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Completion</p>
                  <p className="font-medium">{formatDate(workOrder.estimatedCompletionDate)}</p>
                </div>
              </div>
            )}

            {workOrder.actualCompletionDate && (
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Actual Completion</p>
                  <p className="font-medium">{formatDate(workOrder.actualCompletionDate)}</p>
                </div>
              </div>
            )}

            {workOrder.rescheduleInfo && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Rescheduled</h3>
                <p className="text-sm text-yellow-700">
                  New Date: {formatDate(workOrder.rescheduleInfo.date)}
                </p>
                <p className="text-sm text-yellow-700">
                  Reason: {workOrder.rescheduleInfo.reason}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Assignments</h2>
          <div className="space-y-4">
            {workOrder.crews.map((crew) => (
              <div key={crew.id} className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">{crew.isPrimary ? 'Primary Crew' : 'Support Crew'}</p>
                  <p className="font-medium">{crew.id}</p>
                  {crew.role && <p className="text-sm text-gray-500">{crew.role}</p>}
                </div>
              </div>
            ))}

            {workOrder.vendors && workOrder.vendors.map((vendor) => (
              <div key={vendor.vendorId} className="flex items-center">
                <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">{vendor.type}</p>
                  <p className="font-medium">{vendor.vendorId}</p>
                  {vendor.notes && <p className="text-sm text-gray-500">{vendor.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Requirements Section */}
      {(template.requiresInspection || template.requiresPour) && (
        <div className="grid grid-cols-2 gap-6">
          {template.requiresInspection && workOrder.inspectionDetails && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Inspection Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Time</p>
                    <p className="font-medium">{formatDate(workOrder.inspectionDetails.scheduledAt)}</p>
                  </div>
                </div>
                {workOrder.inspectionDetails.inspector && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Inspector</p>
                      <p className="font-medium">{workOrder.inspectionDetails.inspector}</p>
                    </div>
                  </div>
                )}
                {workOrder.inspectionDetails.result && (
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Result</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workOrder.inspectionDetails.result === 'pass' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {workOrder.inspectionDetails.result.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {template.requiresPour && workOrder.pourDetails && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pour Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Time</p>
                    <p className="font-medium">{formatDate(workOrder.pourDetails.scheduledAt)}</p>
                  </div>
                </div>
                {workOrder.pourDetails.estimatedQuantity && (
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Estimated Quantity</p>
                      <p className="font-medium">{workOrder.pourDetails.estimatedQuantity} yards</p>
                    </div>
                  </div>
                )}
                {workOrder.pourDetails.actualQuantity && (
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Actual Quantity</p>
                      <p className="font-medium">{workOrder.pourDetails.actualQuantity} yards</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Checklist Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Status Checklist</h2>
        <div className="space-y-4">
          {workOrder.checklist.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => handleChecklistUpdate(item.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-900">{item.task}</span>
              {item.required && (
                <span className="ml-2 text-xs text-red-500">*Required</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      {workOrder.notes && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{workOrder.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WorkOrderDetail;