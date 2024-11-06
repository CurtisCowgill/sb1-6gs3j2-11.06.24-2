import React from 'react';
import ProjectLocation from '../ProjectLocation';
import ProjectDetails from '../ProjectDetails';
import ProjectMap from './ProjectMap';
import WorkOrderList from '../WorkOrderList';
import WeatherForecastDisplay from '../WeatherForecast';
import { mockWeatherForecast } from '../../data/mockWeather';
import { STANDARD_WORK_ORDERS } from '../../data/workOrders';

interface Project {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: [number, number];
  };
  customer: string;
  status: string;
  startDate: string;
  budget: string;
  completion: string;
}

interface ProjectOverviewProps {
  projectId?: string;
  project: Project;
}

const mockProjectDetails = {
  customer: 'Nies Homes',
  neighborhood: 'Sienna Ranch',
  address: '3001 Cottonwood Ln',
  city: 'Rose Hill',
  state: 'KS',
  zip: '67133',
  lot: '48',
  block: 'A',
  addition: 'Sienna Ranch 4th',
  inspectionJurisdiction: 'City of Rose Hill',
  projectType: 'Foundation + Waterproofing',
  builderProjectId: '2024-072',
  dateAdded: '10/31/2024',
  floorplan: 'Custom',
  permitNumber: 'P4358-A19',
  permitDate: '10/15/2024',
  permitIncluded: true
};

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const handleWorkOrderUpdate = (id: string, data: any) => {
    console.log('Updating work order:', id, data);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProjectLocation project={mockProjectDetails} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Map</h2>
          <div className="h-[300px] mb-4">
            <ProjectMap 
              coordinates={project.location.coordinates}
              popupContent={`
                <b>${project.name}</b><br/>
                ${project.location.address}<br/>
                ${project.location.city}, ${project.location.state}
              `}
            />
          </div>
          <WeatherForecastDisplay forecast={mockWeatherForecast} />
        </div>
      </div>
      
      <ProjectDetails project={mockProjectDetails} />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Work Orders</h2>
        <WorkOrderList 
          workOrders={STANDARD_WORK_ORDERS} 
          onUpdate={handleWorkOrderUpdate}
        />
      </div>
    </div>
  );
};

export default ProjectOverview;