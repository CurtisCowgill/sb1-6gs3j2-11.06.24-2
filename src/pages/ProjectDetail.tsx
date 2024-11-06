import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TabNavigation, { projectTabs } from '../components/TabNavigation';
import ProjectTags from '../components/projects/ProjectTags';
import ProjectOverview from '../components/projects/ProjectOverview';
import ProjectWorkOrders from '../components/projects/ProjectWorkOrders';
import ProjectPlans from '../components/projects/ProjectPlans';
import ProjectPhotos from '../components/projects/ProjectPhotos';
import ProjectTime from '../components/projects/ProjectTime';
import ProjectFinancial from '../components/projects/ProjectFinancial';

const mockProject = {
  id: 'PRJ001',
  name: 'Downtown Foundation Repair',
  location: {
    address: '525 E Douglas Ave',
    city: 'Wichita',
    state: 'KS',
    coordinates: [37.687176, -97.336273] as [number, number]
  },
  customer: 'ABC Corporation',
  status: 'In Progress',
  startDate: '2024-03-01',
  budget: '$150,000',
  completion: '45%',
  tags: [
    { id: 't1', text: 'urgent' },
    { id: 't2', text: 'commercial' }
  ]
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [tags, setTags] = useState(mockProject.tags);

  const handleAddTag = (text: string) => {
    setTags([...tags, { id: `t${Date.now()}`, text }]);
  };

  const handleRemoveTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview projectId={id} project={mockProject} />;
      case 'workorders':
        return <ProjectWorkOrders projectId={id} />;
      case 'plans':
        return <ProjectPlans projectId={id} />;
      case 'photos':
        return <ProjectPhotos projectId={id} />;
      case 'time':
        return <ProjectTime projectId={id} />;
      case 'financial':
        return <ProjectFinancial projectId={id} />;
      default:
        return <ProjectOverview projectId={id} project={mockProject} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockProject.name}</h1>
        </div>
        
        <ProjectTags
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      </div>

      <TabNavigation
        tabs={projectTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProjectDetail;