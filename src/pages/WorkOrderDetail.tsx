import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  ClipboardCheck,
  Truck,
  DollarSign,
  Cloud,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockWorkOrders } from '../data/mockWorkOrders';
import { formatDate } from '../utils/format';

const WorkOrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workOrder = mockWorkOrders.find(wo => wo.id === id);

  if (!workOrder) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Work Order Not Found</h2>
          <p className="mt-2 text-gray-500">The requested work order could not be found.</p>
          <button
            onClick={() => navigate('/work-orders')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Work Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/work-orders')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{workOrder.name}</h1>
            <p className="text-sm text-gray-500">{workOrder.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workOrder.status)}`}>
            {workOrder.status.replace('_', ' ').charAt(0).toUpperCase() + workOrder.status.slice(1)}
          </span>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Start Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {workOrder.scheduledStart ? formatDate(workOrder.scheduledStart) : 'Not scheduled'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-lg font-semibold text-gray-900">
                {Math.floor(workOrder.estimatedDuration / 60)}h {workOrder.estimatedDuration % 60}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Assigned Crew</p>
              <p className="text-lg font-semibold text-gray-900">
                {workOrder.defaultCrewType}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Progress</p>
              <p className="text-lg font-semibold text-gray-900">
                {workOrder.progress}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tasks</h2>
            <div className="space-y-4">
              {workOrder.tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {task.duration} minutes
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workOrder.resources.map((resource) => (
                <div key={resource.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
                      <p className="text-sm text-gray-500">{resource.type}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {resource.quantity} {resource.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Weather Section */}
          {workOrder.weather && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Weather Conditions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Conditions</span>
                  </div>
                  <span className="text-sm font-medium">{workOrder.weather.conditions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Temperature</span>
                  <span className="text-sm font-medium">{workOrder.weather.temperature}°F</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Wind Speed</span>
                  <span className="text-sm font-medium">{workOrder.weather.windSpeed} mph</span>
                </div>
              </div>
            </div>
          )}

          {/* Costs Section */}
          {workOrder.costs && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Costs</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Total Estimated</span>
                  </div>
                  <span className="text-sm font-medium">${workOrder.costs.estimated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Materials</span>
                  <span className="text-sm font-medium">${workOrder.costs.materials}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Labor</span>
                  <span className="text-sm font-medium">${workOrder.costs.labor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Equipment</span>
                  <span className="text-sm font-medium">${workOrder.costs.equipment}</span>
                </div>
              </div>
            </div>
          )}

          {/* Completion Criteria */}
          {workOrder.completionCriteria && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Completion Requirements</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <ClipboardCheck className={`h-5 w-5 mr-2 ${workOrder.completionCriteria.requiresInspection ? 'text-blue-500' : 'text-gray-300'}`} />
                  <span className="text-sm text-gray-500">Requires Inspection</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className={`h-5 w-5 mr-2 ${workOrder.completionCriteria.requiresSignoff ? 'text-blue-500' : 'text-gray-300'}`} />
                  <span className="text-sm text-gray-500">Requires Signoff</span>
                </div>
                {workOrder.completionCriteria.requiredDocuments && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Required Documents:</p>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {workOrder.completionCriteria.requiredDocuments.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetail;