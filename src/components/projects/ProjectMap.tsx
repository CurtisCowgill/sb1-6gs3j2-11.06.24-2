import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ClientOnly from '../ClientOnly';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface ProjectMapProps {
  coordinates: [number, number];
  popupContent: string;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ coordinates, popupContent }) => {
  return (
    <ClientOnly>
      <div style={{ height: '100%', width: '100%', minHeight: '300px' }}>
        <MapContainer
          center={coordinates}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>
              <div dangerouslySetInnerHTML={{ __html: popupContent }} />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </ClientOnly>
  );
};

export default ProjectMap;