import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WorkOrderForm from '../components/workOrders/WorkOrderForm';
import type { WorkOrder } from '../types/workOrders';

const NewWorkOrder: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: WorkOrder) => {
    console.log('Creating work order:', data);
    // TODO: Implement API call to create work order
    navigate('/work-orders');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/work-orders')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Work Orders
        </button>
        <h1 className="text-2xl font-bold text-gray-900">New Work Order</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <WorkOrderForm
          isTemplate={false}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/work-orders')}
          initialData={{
            type: 'adhoc',
            priority: 'medium',
            defaultCrewType: 'foundation',
            tasks: [],
            resources: [],
            status: 'draft',
            progress: 0
          }}
        />
      </div>
    </div>
  );
};

export default NewWorkOrder;