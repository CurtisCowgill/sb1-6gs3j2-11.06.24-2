import React from 'react';
import { Brain, Users, MapPin, Star, TrendingUp, Clock } from 'lucide-react';

interface CrewRecommendation {
  crewId: string;
  crewName: string;
  score: number;
  reasons: {
    availability: number;
    specialty: number;
    skillLevel: number;
    proximity: number;
    efficiency: number;
  };
  metrics: {
    distanceFromLastProject: string;
    estimatedTravelTime: string;
    completionRate: number;
    qualityScore: number;
  };
}

interface AIRecommendationsProps {
  workOrderId: string;
  recommendations: CrewRecommendation[];
  onAssignCrew: (crewId: string) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  onAssignCrew
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreWidth = (score: number) => {
    return `${score}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">AI Recommendations</h2>
        </div>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div key={rec.crewId} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">{rec.crewName}</h3>
              </div>
              <div className="flex items-center">
                <span className={`text-2xl font-bold ${getScoreColor(rec.score)}`}>
                  {rec.score}
                </span>
                <span className="text-sm text-gray-500 ml-1">/ 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <span className="font-medium">{rec.reasons.availability}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: getScoreWidth(rec.reasons.availability) }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Specialty Match</span>
                  <span className="font-medium">{rec.reasons.specialty}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: getScoreWidth(rec.reasons.specialty) }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Skill Level</span>
                  <span className="font-medium">{rec.reasons.skillLevel}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: getScoreWidth(rec.reasons.skillLevel) }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Proximity</span>
                  <span className="font-medium">{rec.reasons.proximity}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: getScoreWidth(rec.reasons.proximity) }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{rec.metrics.distanceFromLastProject} away</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{rec.metrics.estimatedTravelTime} travel time</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{rec.metrics.completionRate}% completion rate</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="h-4 w-4 mr-1" />
                <span>{rec.metrics.qualityScore}/5 quality score</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onAssignCrew(rec.crewId)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Assign Crew
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;