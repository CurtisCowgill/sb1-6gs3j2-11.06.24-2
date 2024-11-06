import React from 'react';
import { stageColors, stageNames } from './mapData';

const MapLegend: React.FC = () => {
  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Project Stages</h3>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(stageNames).map(([stage, name]) => (
          <div key={stage} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: stageColors[stage as keyof typeof stageColors] }}
            />
            <span className="text-sm text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;