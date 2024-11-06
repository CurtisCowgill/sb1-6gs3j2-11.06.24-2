import React, { useState } from 'react';
import { Shield, FileText, Video, AlertTriangle, Award } from 'lucide-react';
import SafetyResources from './safety/SafetyResources';
import ToolboxTalks from './safety/ToolboxTalks';
import Incidents from './safety/Incidents';
import Certifications from './safety/Certifications';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Shield },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  { id: 'toolbox-talks', label: 'Toolbox Talks', icon: Video },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'certifications', label: 'Certifications', icon: Award }
];

const Safety: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'resources':
        return <SafetyResources />;
      case 'toolbox-talks':
        return <ToolboxTalks />;
      case 'incidents':
        return <Incidents />;
      case 'certifications':
        return <Certifications />;
      default:
        return <SafetyOverview />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Safety Management</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SafetyOverview: React.FC = () => {
  const stats = [
    {
      label: 'Active Incidents',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      label: 'Toolbox Talks',
      value: '18',
      icon: Video,
      color: 'text-green-500'
    },
    {
      label: 'Safety Resources',
      value: '24',
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      label: 'Valid Certifications',
      value: '45',
      icon: Award,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Incidents</h3>
          <div className="space-y-4">
            {/* Add recent incidents list here */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Certifications</h3>
          <div className="space-y-4">
            {/* Add upcoming certifications list here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;