import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Truck,
  ClipboardCheck,
  Settings
} from 'lucide-react';
import ProjectsTable from '../components/ProjectsTable';
import ScheduleDetailsPopup from '../components/schedule/ScheduleDetailsPopup';
import ProjectTypeList from '../components/projects/ProjectTypeList';
import TabNavigation from '../components/TabNavigation';
import type { Project } from '../types';

interface ScheduleItem {
  id: string;
  type: 'inspection' | 'concrete' | 'job';
  time: string;
  project: string;
  location: string;
  crew?: string;
  notes?: string;
}

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'active', label: 'Active' },
  { id: 'complete', label: 'Complete' },
  { id: 'billed', label: 'Billed' },
  { id: 'closed', label: 'Closed' },
  { id: 'types', label: 'Project Types', icon: Settings }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const projects: Project[] = [
    {
      id: 'PRJ001',
      name: 'Downtown Foundation Repair',
      customer: 'ABC Corporation',
      location: 'Downtown District',
      status: 'In Progress',
      startDate: '2024-03-01',
      budget: '$150,000',
      completion: '45%'
    },
    {
      id: 'PRJ002',
      name: 'Residential Foundation Installation',
      customer: 'John Smith',
      location: 'Suburban Heights',
      status: 'Scheduled',
      startDate: '2024-03-15',
      budget: '$85,000',
      completion: '0%'
    }
  ];

  const todaySchedule = {
    jobs: 3,
    inspections: 2,
    concretePours: 1
  };

  const weekSchedule = {
    jobs: 8,
    inspections: 5,
    concretePours: 4
  };

  const mockTodayItems: ScheduleItem[] = [
    {
      id: '1',
      type: 'inspection',
      time: '9:00 AM',
      project: 'Downtown Foundation Repair',
      location: '123 Main St',
      crew: 'Team Alpha',
      notes: 'Pre-pour inspection'
    },
    {
      id: '2',
      type: 'concrete',
      time: '10:30 AM',
      project: 'Residential Foundation',
      location: '456 Oak Ave',
      crew: 'Team Beta',
      notes: 'Foundation pour'
    },
    {
      id: '3',
      type: 'job',
      time: '8:00 AM',
      project: 'Commercial Complex',
      location: '789 Business Pkwy',
      crew: 'Team Gamma'
    }
  ];

  const mockWeekItems: ScheduleItem[] = [
    ...mockTodayItems,
    {
      id: '4',
      type: 'inspection',
      time: 'Tomorrow 2:00 PM',
      project: 'Retail Center',
      location: '321 Shop St',
      crew: 'Team Delta',
      notes: 'Final inspection'
    },
    {
      id: '5',
      type: 'concrete',
      time: 'Wed 8:30 AM',
      project: 'Office Building',
      location: '654 Work Ave',
      crew: 'Team Alpha',
      notes: 'Wall pour'
    }
  ];

  const showScheduleDetails = (period: 'today' | 'week') => {
    setPopupTitle(period === 'today' ? "Today's Schedule" : "This Week's Schedule");
    setScheduleItems(period === 'today' ? mockTodayItems : mockWeekItems);
    setIsPopupOpen(true);
  };

  const filteredProjects = projects.filter(project => {
    switch (activeTab) {
      case 'backlog':
        return project.status === 'Scheduled';
      case 'active':
        return project.status === 'In Progress';
      case 'complete':
        return project.status === 'Completed';
      case 'billed':
        return project.status === 'Billed';
      case 'closed':
        return project.status === 'Closed';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        {activeTab !== 'types' && (
          <button
            onClick={() => navigate('/projects/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        )}
      </div>

      {activeTab !== 'types' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => showScheduleDetails('today')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Jobs Starting</span>
                <span className="text-sm font-medium text-blue-600">{todaySchedule.jobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Inspections</span>
                <span className="text-sm font-medium text-purple-600">{todaySchedule.inspections}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Concrete Pours</span>
                <span className="text-sm font-medium text-green-600">{todaySchedule.concretePours}</span>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => showScheduleDetails('week')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">This Week</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Jobs Starting</span>
                <span className="text-sm font-medium text-blue-600">{weekSchedule.jobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Inspections</span>
                <span className="text-sm font-medium text-purple-600">{weekSchedule.inspections}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Concrete Pours</span>
                <span className="text-sm font-medium text-green-600">{weekSchedule.concretePours}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
                <span className="flex items-center">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </span>
                <Plus className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Schedule Pour
                </span>
                <Plus className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="bg-white shadow rounded-lg">
        {activeTab === 'types' ? (
          <div className="p-6">
            <ProjectTypeList />
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center max-w-md flex-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <button className="ml-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <ProjectsTable projects={filteredProjects} />
          </div>
        )}
      </div>

      <ScheduleDetailsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
        items={scheduleItems}
      />
    </div>
  );
};

export default Projects;