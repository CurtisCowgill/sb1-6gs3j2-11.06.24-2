import React from 'react';
import PlansAndDocs from '../PlansAndDocs';

interface ProjectPlansProps {
  projectId?: string;
}

const ProjectPlans: React.FC<ProjectPlansProps> = () => {
  return <PlansAndDocs />;
};

export default ProjectPlans;