import React, { useState } from 'react';
import { X, Calendar, Users, ClipboardCheck, Truck, Building } from 'lucide-react';
import { WorkOrder } from '../types';

interface WorkOrderModalProps {
  workOrder: WorkOrder;
  onClose: () => void;
  onUpdate: (data: Partial<WorkOrder>) => void;
}

const WorkOrderModal: React.FC<WorkOrderModalProps> = ({ workOrder, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    inspection: workOrder.inspection,
    concrete: workOrder.concrete,
    vendors: workOrder.vendors.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      inspection: formData.inspection,
      concrete: formData.concrete,
      vendors: formData.vendors.split(',').map(v => v.trim())
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-2xl w-full shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{workOrder.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Read-only info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Crew</p>
                  <p className="font-medium">{workOrder.crew}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{workOrder.startDate || 'Not scheduled'}</p>
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <ClipboardCheck className="h-4 w-4 mr-1" />
                  Inspection Schedule
                </label>
                <input
                  type="datetime-local"
                  value={formData.inspection}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspection: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Truck className="h-4 w-4 mr-1" />
                  Concrete Schedule
                </label>
                <input
                  type="datetime-local"
                  value={formData.concrete}
                  onChange={(e) => setFormData(prev => ({ ...prev, concrete: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 mr-1" />
                  Vendors (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.vendors}
                  onChange={(e) => setFormData(prev => ({ ...prev, vendors: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Materials Inc, Equipment Co, etc."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Work Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderModal;