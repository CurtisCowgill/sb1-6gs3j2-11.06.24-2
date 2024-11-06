import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Calendar, Clock, Users, Plus } from 'lucide-react';
import type { WorkOrderTemplate } from '../../types/workOrders';

interface WorkOrderTemplateListProps {
  templates: WorkOrderTemplate[];
  onCreateFromTemplate: (template: WorkOrderTemplate) => void;
}

const WorkOrderTemplateList: React.FC<WorkOrderTemplateListProps> = ({
  templates,
  onCreateFromTemplate
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Recurring Work Orders</h2>
        <button
          onClick={() => navigate('/work-orders/recurring/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Recurring Order
        </button>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onCreateFromTemplate(template)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Create Instance
                </button>
                <button
                  onClick={() => navigate(`/work-orders/recurring/${template.id}`)}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {template.type === 'recurring' ? (
                  <span>Every {template.interval} {template.frequency}</span>
                ) : (
                  <span>One-time</span>
                )}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {Math.floor(template.estimatedDuration / 60)}h {template.estimatedDuration % 60}m
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {template.defaultCrewType}
              </div>
            </div>

            {template.tasks.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tasks ({template.tasks.length})</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  {template.tasks.slice(0, 3).map((task) => (
                    <li key={task.id} className="truncate">{task.title}</li>
                  ))}
                  {template.tasks.length > 3 && (
                    <li>+ {template.tasks.length - 3} more tasks</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkOrderTemplateList;