import React from 'react';
import { Plus, Settings } from 'lucide-react';
import { workOrderTemplates, projectTypeWorkOrders } from '../../utils/workOrderTemplates';
import type { ProjectType, WorkOrderType } from '../../types/workOrders';

const WorkOrderTypeList: React.FC = () => {
  const projectTypes: Record<ProjectType, string> = {
    walls: 'Walls Only',
    walls_waterproofing: 'Walls + Waterproofing',
    walls_floors_waterproofing: 'Walls + Floors + Waterproofing'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Work Order Types</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create WO Type
        </button>
      </div>

      {Object.entries(projectTypes).map(([type, label]) => (
        <div key={type} className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">{label}</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {projectTypeWorkOrders[type as ProjectType].map((woType) => {
                const template = workOrderTemplates[woType as WorkOrderType];
                return (
                  <div key={woType} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {woType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Duration: {Math.floor(template.estimatedDuration / 60)}h {template.estimatedDuration % 60}m
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {template.requiresInspection && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Inspection Required
                        </span>
                      )}
                      {template.requiresPour && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Pour Required
                        </span>
                      )}
                      <button className="text-blue-600 hover:text-blue-800">
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderTypeList;