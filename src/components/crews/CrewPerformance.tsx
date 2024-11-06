import React from 'react';
import { 
  BarChart3, 
  Clock, 
  ThumbsUp,
  AlertOctagon 
} from 'lucide-react';

interface PerformanceMetrics {
  projectsCompleted: number;
  onTimeCompletion: number;
  qualityRating: number;
  safetyIncidents: number;
}

interface CrewPerformanceProps {
  metrics?: PerformanceMetrics;
}

const defaultMetrics: PerformanceMetrics = {
  projectsCompleted: 0,
  onTimeCompletion: 0,
  qualityRating: 0,
  safetyIncidents: 0
};

const CrewPerformance: React.FC<CrewPerformanceProps> = ({ metrics = defaultMetrics }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Projects Completed</p>
            <p className="text-2xl font-semibold">{metrics.projectsCompleted}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">On-Time Completion</p>
            <p className="text-2xl font-semibold">{metrics.onTimeCompletion}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <ThumbsUp className="h-8 w-8 text-yellow-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Quality Rating</p>
            <p className="text-2xl font-semibold">{metrics.qualityRating}/5</p>
          </div>
        </div>
        <div className="flex items-center">
          <AlertOctagon className="h-8 w-8 text-red-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Safety Incidents</p>
            <p className="text-2xl font-semibold">{metrics.safetyIncidents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewPerformance;