import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, BarChart3, Wrench } from 'lucide-react';
import CrewInfo from '../components/crews/CrewInfo';
import CrewMembers from '../components/crews/CrewMembers';
import CrewEquipment from '../components/crews/CrewEquipment';
import CrewPerformance from '../components/crews/CrewPerformance';
import CrewSchedule from '../components/crews/CrewSchedule';

const mockCrew = {
  id: '1',
  name: 'Foundation Team Alpha',
  lead: 'John Smith',
  size: 5,
  specialty: 'Residential Foundations',
  status: 'Available',
  members: [
    {
      id: 'EMP001',
      name: 'John Smith',
      role: 'Crew Lead',
      experience: '8 years',
      certifications: ['Safety Lead', 'Equipment Operator'],
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'Mike Johnson',
      role: 'Senior Technician',
      experience: '5 years',
      certifications: ['Equipment Operator'],
      status: 'Active'
    }
  ],
  equipment: [
    {
      id: 'EQ001',
      name: 'Concrete Mixer',
      type: 'Heavy Equipment',
      status: 'Available',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15'
    },
    {
      id: 'EQ002',
      name: 'Foundation Forms',
      type: 'Construction Equipment',
      status: 'In Use',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-03-01'
    }
  ],
  performance: {
    projectsCompleted: 45,
    onTimeCompletion: 95,
    qualityRating: 4.8,
    safetyIncidents: 0
  }
};

const CrewDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Crew Info', icon: ArrowLeft },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <CrewInfo crew={mockCrew} />;
      case 'equipment':
        return <CrewEquipment crew={mockCrew} />;
      case 'performance':
        return <CrewPerformance crew={mockCrew} />;
      case 'schedule':
        return <CrewSchedule crew={mockCrew} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{mockCrew.name}</h1>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          mockCrew.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {mockCrew.status}
        </span>
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
                {React.createElement(tab.icon, { className: 'h-5 w-5 mr-2' })}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <CrewMembers crew={mockCrew} />
      </div>
    </div>
  );
};

export default CrewDetail;