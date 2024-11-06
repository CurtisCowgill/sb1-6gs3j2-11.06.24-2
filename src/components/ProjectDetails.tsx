import React, { useState } from 'react';

interface ProjectDetailsProps {
  project: {
    projectType: string;
    builderProjectId: string;
    dateAdded: string;
    floorplan: string;
    permitNumber: string;
    permitDate: string;
    permitIncluded: boolean;
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

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project: initialProject }) => {
  const [project, setProject] = useState(initialProject);

  const handleChange = (field: keyof typeof project) => (value: string) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Details</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <EditableField
            label="Project Type"
            value={project.projectType}
            onChange={handleChange('projectType')}
          />
          <EditableField
            label="Builder Project #"
            value={project.builderProjectId}
            onChange={handleChange('builderProjectId')}
          />
          <EditableField
            label="Date Added"
            value={project.dateAdded}
            onChange={handleChange('dateAdded')}
          />
          <EditableField
            label="Floorplan"
            value={project.floorplan}
            onChange={handleChange('floorplan')}
          />
          <EditableField
            label="Permit #"
            value={project.permitNumber}
            onChange={handleChange('permitNumber')}
          />
          <EditableField
            label="Permit Date"
            value={project.permitDate}
            onChange={handleChange('permitDate')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-500">Permit Included</label>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={project.permitIncluded}
                onChange={(e) => setProject(prev => ({ ...prev, permitIncluded: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;