import React from 'react';
import ProjectPhotosView from '../ProjectPhotos';

interface ProjectPhotosProps {
  projectId?: string;
}

const ProjectPhotos: React.FC<ProjectPhotosProps> = () => {
  return <ProjectPhotosView />;
};

export default ProjectPhotos;