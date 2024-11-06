import React from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { PerformanceMetric } from '../../types';
import { formatDate } from '../../utils/format';

interface EmployeePerformanceProps {
  metrics: PerformanceMetric[];
}

const EmployeePerformance: React.FC<EmployeePerformanceProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Performance History</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Review
          </button>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {metric.category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(metric.date)}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(metric.score)}`}>
                  {metric.score}%
                </span>
              </div>
              {metric.notes && (
                <p className="mt-2 text-sm text-gray-600">{metric.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;