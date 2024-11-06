import React, { useState } from 'react';
import WeatherForecastDisplay from './WeatherForecast';
import { mockWeatherForecast } from '../data/mockWeather';

interface ProjectLocationProps {
  project: {
    customer: string;
    neighborhood: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    lot: string;
    block: string;
    addition: string;
    inspectionJurisdiction: string;
  };
}

const EditableField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
    />
  </div>
);

const ProjectLocation: React.FC<ProjectLocationProps> = ({ project: initialProject }) => {
  const [project, setProject] = useState(initialProject);

  const handleChange = (field: keyof typeof project) => (value: string) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Location</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <EditableField
          label="Customer"
          value={project.customer}
          onChange={handleChange('customer')}
        />
        <EditableField
          label="Neighborhood"
          value={project.neighborhood}
          onChange={handleChange('neighborhood')}
        />
        <EditableField
          label="Address"
          value={project.address}
          onChange={handleChange('address')}
        />
        <EditableField
          label="City"
          value={project.city}
          onChange={handleChange('city')}
        />
        <EditableField
          label="State"
          value={project.state}
          onChange={handleChange('state')}
        />
        <EditableField
          label="ZIP"
          value={project.zip}
          onChange={handleChange('zip')}
        />
        <EditableField
          label="Lot"
          value={project.lot}
          onChange={handleChange('lot')}
        />
        <EditableField
          label="Block"
          value={project.block}
          onChange={handleChange('block')}
        />
        <EditableField
          label="Addition"
          value={project.addition}
          onChange={handleChange('addition')}
        />
        <div className="col-span-3">
          <EditableField
            label="Inspection Jurisdiction"
            value={project.inspectionJurisdiction}
            onChange={handleChange('inspectionJurisdiction')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectLocation;