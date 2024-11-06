import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Project } from './mapData';
import { stageColors, stageNames } from './mapData';

interface ProjectMarkersProps {
  projects: Project[];
  selectedStages: Set<string>;
  stageColors: Record<string, string>;
  stageNames: Record<string, string>;
}

const createMarkerIcon = (stage: string) => {
  const color = stageColors[stage as keyof typeof stageColors];
  const svg = `
    <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.59644 19.4036 0 12.5 0Z" fill="${color}"/>
      <circle cx="12.5" cy="12.5" r="5.5" fill="white"/>
    </svg>
  `;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });
};

const ProjectMarkers: React.FC<ProjectMarkersProps> = ({
  projects,
  selectedStages,
  stageColors,
  stageNames
}) => {
  return (
    <>
      {projects
        .filter(project => selectedStages.has(project.stage))
        .map(project => (
          <Marker
            key={project.id}
            position={project.coordinates}
            icon={createMarkerIcon(project.stage)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.location}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Customer:</span> {project.customer}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Stage:</span>{' '}
                    <span style={{ color: stageColors[project.stage] }}>
                      {stageNames[project.stage]}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {project.status}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Start Date:</span> {project.startDate}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default ProjectMarkers;