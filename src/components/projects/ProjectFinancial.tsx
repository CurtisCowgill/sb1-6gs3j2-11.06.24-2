import React from 'react';
import FinancialOverview from '../FinancialOverview';

interface ProjectFinancialProps {
  projectId?: string;
}

const ProjectFinancial: React.FC<ProjectFinancialProps> = () => {
  return <FinancialOverview />;
};

export default ProjectFinancial;