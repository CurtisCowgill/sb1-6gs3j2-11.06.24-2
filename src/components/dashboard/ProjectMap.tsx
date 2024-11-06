import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapComponent from './map/MapComponent';
import { mockProjects, stageColors, stageNames } from './map/mapData';
import ClientOnly from '../ClientOnly';

const ProjectMap: React.FC = () => {
  const selectedStages = new Set(['backlog', 'stakeout', 'footings', 'walls', 'strip', 'waterproofing', 'flatwork']);

  return (
    <ClientOnly>
      <div className="h-full">
        <MapComponent
          selectedStages={selectedStages}
          projects={mockProjects}
          stageColors={stageColors}
          stageNames={stageNames}
        />
      </div>
    </ClientOnly>
  );
};

export default ProjectMap;