import React from 'react';
import { Camera, Upload } from 'lucide-react';

const ProjectPhotos: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Project Photos</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </button>
      </div>

      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <Camera className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No photos uploaded yet</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPhotos;