import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  MapPin,
  Building2,
  ClipboardCheck,
  Truck,
  Edit2
} from 'lucide-react';
import { formatDate } from '../utils/format';

interface RecurringWorkOrder {
  id: string;
  name: string;
  type: 'recurring';
  frequency: string;
  interval: number;
  defaultCrewType: string;
  primaryCrew: string;
  additionalCrews: string[];
  estimatedDuration: number;
  vendors: {
    name: string;
    type: string;
    required: boolean;
  }[];
  inspectionJurisdiction: string;
  nextOccurrence: string;
  lastCompleted: string;
  status: 'active' | 'paused' | 'completed';
  notes?: string;
}

const mockRecurringWorkOrder: RecurringWorkOrder = {
  id: 'RWO001',
  name: 'Foundation Inspection',
  type: 'recurring',
  frequency: 'weekly',
  interval: 1,
  defaultCrewType: 'foundation',
  primaryCrew: 'Foundation Team A',
  additionalCrews: ['Foundation Team B'],
  estimatedDuration: 120,
  vendors: [
    { name: 'ABC Concrete', type: 'Concrete', required: true },
    { name: 'XYZ Pumping', type: 'Pump', required: true },
    { name: 'Dig Masters', type: 'Excavator', required: false }
  ],
  inspectionJurisdiction: 'City of Rose Hill',
  nextOccurrence: '2024-03-20',
  lastCompleted: '2024-03-13',
  status: 'active',
  notes: 'Standard foundation inspection process'
};

const RecurringWorkOrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workOrder] = useState<RecurringWorkOrder>(mockRecurringWorkOrder);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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
            Back to Work Orders
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{workOrder.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workOrder.status)}`}>
            {workOrder.status.charAt(0).toUpperCase() + workOrder.status.slice(1)}
          </span>
        </div>
        <button
          onClick={() => {/* TODO: Implement edit functionality */}}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Work Order
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Frequency</p>
              <p className="text-2xl font-semibold text-gray-900">
                Every {workOrder.interval} {workOrder.frequency}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.floor(workOrder.estimatedDuration / 60)}h {workOrder.estimatedDuration % 60}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Occurrence</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatDate(workOrder.nextOccurrence)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Crew Assignment</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Primary Crew</h3>
              <div className="mt-2 flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{workOrder.primaryCrew}</span>
              </div>
            </div>
            {workOrder.additionalCrews.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Additional Crews</h3>
                <div className="mt-2 space-y-2">
                  {workOrder.additionalCrews.map((crew, index) => (
                    <div key={index} className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">{crew}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Vendors</h2>
          <div className="space-y-4">
            {workOrder.vendors.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                    <p className="text-sm text-gray-500">{vendor.type}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vendor.required ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {vendor.required ? 'Required' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Additional Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Inspection Jurisdiction</h3>
            <div className="mt-2 flex items-center">
              <ClipboardCheck className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-900">{workOrder.inspectionJurisdiction}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Last Completed</h3>
            <div className="mt-2 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-900">{formatDate(workOrder.lastCompleted)}</span>
            </div>
          </div>
        </div>
        {workOrder.notes && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Notes</h3>
            <p className="mt-2 text-gray-600">{workOrder.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurringWorkOrderDetail;