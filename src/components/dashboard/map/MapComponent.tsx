import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ProjectMarkers from './ProjectMarkers';
import type { Project } from './mapData';
import L from 'leaflet';

interface MapComponentProps {
  selectedStages: Set<string>;
  projects: Project[];
  stageColors: Record<string, string>;
  stageNames: Record<string, string>;
}

// Fix for Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent: React.FC<MapComponentProps> = ({
  selectedStages,
  projects,
  stageColors,
  stageNames
}) => {
  return (
    <MapContainer
      center={[37.687176, -97.336273]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ProjectMarkers
        projects={projects}
        selectedStages={selectedStages}
        stageColors={stageColors}
        stageNames={stageNames}
      />
    </MapContainer>
  );
};

export default MapComponent;