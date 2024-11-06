import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { 
  WorkOrder, 
  WorkOrderTemplate,
  Task,
  Resource,
  WorkOrderFrequency,
  WorkOrderPriority,
  CrewType,
  VendorType
} from '../../types/workOrders';

interface WorkOrderFormProps {
  initialData?: Partial<WorkOrder>;
  isTemplate?: boolean;
  onSubmit: (data: WorkOrder | WorkOrderTemplate) => void;
  onCancel: () => void;
}

const frequencies: { value: WorkOrderFrequency; label: string }[] = [
  { value: 'once', label: 'One Time' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' }
];

const priorities: { value: WorkOrderPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'emergency', label: 'Emergency' }
];

const crewTypes: { value: CrewType; label: string }[] = [
  { value: 'foundation', label: 'Foundation' },
  { value: 'walls', label: 'Walls' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'flatwork', label: 'Flatwork' },
  { value: 'general', label: 'General' }
];

const vendorTypes: { value: VendorType; label: string }[] = [
  { value: 'concrete', label: 'Concrete' },
  { value: 'pump', label: 'Pump' },
  { value: 'excavator', label: 'Excavator' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'other', label: 'Other' }
];

const WorkOrderForm: React.FC<WorkOrderFormProps> = ({
  initialData,
  isTemplate,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    name: '',
    description: '',
    type: 'adhoc',
    priority: 'medium',
    estimatedDuration: 0,
    defaultCrewType: 'general',
    tasks: [],
    resources: [],
    vendors: [],
    status: 'draft',
    progress: 0,
    completionCriteria: {
      requiresInspection: false,
      requiresSignoff: false,
      requiredDocuments: []
    },
    ...initialData
  });

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    duration: 0
  });

  const [newResource, setNewResource] = useState<Partial<Resource>>({
    type: 'material',
    name: '',
    quantity: 0,
    unit: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as WorkOrder);
  };

  const addTask = () => {
    if (newTask.title) {
      setFormData(prev => ({
        ...prev,
        tasks: [
          ...(prev.tasks || []),
          {
            id: `task-${Date.now()}`,
            status: 'pending',
            ...newTask
          } as Task
        ]
      }));
      setNewTask({ title: '', duration: 0 });
    }
  };

  const addResource = () => {
    if (newResource.name && newResource.quantity) {
      setFormData(prev => ({
        ...prev,
        resources: [
          ...(prev.resources || []),
          {
            id: `resource-${Date.now()}`,
            ...newResource
          } as Resource
        ]
      }));
      setNewResource({ type: 'material', name: '', quantity: 0, unit: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value as 'recurring' | 'adhoc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="adhoc">Ad-hoc</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>

        {formData.type === 'recurring' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                value={formData.frequency}
                onChange={e => setFormData({ ...formData, frequency: e.target.value as WorkOrderFrequency })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {frequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>{freq.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Interval</label>
              <input
                type="number"
                value={formData.interval}
                onChange={e => setFormData({ ...formData, interval: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                min="1"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={formData.priority}
            onChange={e => setFormData({ ...formData, priority: e.target.value as WorkOrderPriority })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Default Crew Type</label>
          <select
            value={formData.defaultCrewType}
            onChange={e => setFormData({ ...formData, defaultCrewType: e.target.value as CrewType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {crewTypes.map(crew => (
              <option key={crew.value} value={crew.value}>{crew.label}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Requirements</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.completionCriteria?.requiresInspection}
                onChange={e => setFormData({
                  ...formData,
                  completionCriteria: {
                    ...formData.completionCriteria,
                    requiresInspection: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Requires Inspection
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.completionCriteria?.requiresSignoff}
                onChange={e => setFormData({
                  ...formData,
                  completionCriteria: {
                    ...formData.completionCriteria,
                    requiresSignoff: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Requires Signoff
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks</h3>
        <div className="space-y-4">
          {formData.tasks?.map((task, index) => (
            <div key={task.id} className="flex items-center space-x-4">
              <span className="text-sm">{index + 1}.</span>
              <span className="flex-1">{task.title}</span>
              <span>{task.duration} min</span>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    tasks: prev.tasks?.filter(t => t.id !== task.id)
                  }));
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={newTask.duration}
              onChange={e => setNewTask({ ...newTask, duration: parseInt(e.target.value) })}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addTask}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
        <div className="space-y-4">
          {formData.resources?.map((resource) => (
            <div key={resource.id} className="flex items-center space-x-4">
              <span className="w-24">{resource.type}</span>
              <span className="flex-1">{resource.name}</span>
              <span>{resource.quantity} {resource.unit}</span>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    resources: prev.resources?.filter(r => r.id !== resource.id)
                  }));
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-4">
            <select
              value={newResource.type}
              onChange={e => setNewResource({ ...newResource, type: e.target.value as 'material' | 'equipment' | 'labor' })}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="material">Material</option>
              <option value="equipment">Equipment</option>
              <option value="labor">Labor</option>
            </select>
            <input
              type="text"
              placeholder="Resource name"
              value={newResource.name}
              onChange={e => setNewResource({ ...newResource, name: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newResource.quantity}
              onChange={e => setNewResource({ ...newResource, quantity: parseInt(e.target.value) })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Unit"
              value={newResource.unit}
              onChange={e => setNewResource({ ...newResource, unit: e.target.value })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addResource}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {isTemplate ? 'Save Template' : 'Create Work Order'}
        </button>
      </div>
    </form>
  );
};

export default WorkOrderForm;