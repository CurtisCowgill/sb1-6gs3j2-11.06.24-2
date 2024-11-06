import React, { useState } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import { 
  CalendarIcon, 
  MapPin, 
  ListTodo, 
  Users,
  Plus,
  Brain
} from 'lucide-react';
import ProjectStages from '../components/schedule/ProjectStages';
import CrewCalendar from '../components/schedule/CrewCalendar';
import ProjectMap from '../components/dashboard/ProjectMap';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import TabNavigation from '../components/TabNavigation';
import AIRecommendations from '../components/schedule/AIRecommendations';
import ScheduleMiniDashboard from '../components/schedule/ScheduleMiniDashboard';
import UpcomingSchedule from '../components/schedule/UpcomingSchedule';
import type { Project } from '../types';

const mockStats = {
  todayInspections: 2,
  todayPours: 1,
  upcomingInspections: 3,
  upcomingPours: 2
};

const mockUpcomingSchedule = [
  {
    id: 'SCH001',
    type: 'inspection' as const,
    time: '9:00 AM',
    project: 'Downtown Foundation Repair',
    location: '123 Main St'
  },
  {
    id: 'SCH002',
    type: 'pour' as const,
    time: '10:30 AM',
    project: 'Residential Foundation',
    location: '456 Oak Ave'
  }
];

const mockProjects: Project[] = [
  { id: 'p1', name: 'Downtown Foundation', customer: 'ABC Corp', stage: 'ready' },
  { id: 'p2', name: 'Retail Center Base', customer: 'XYZ Ltd', stage: 'stakeout' },
  { id: 'p3', name: 'Office Complex', customer: 'Smith Inc', stage: 'footings' },
  { id: 'p4', name: 'Residential Project', customer: 'Johnson LLC', stage: 'walls' }
];

const mockCrews = [
  { id: 'c1', name: 'Foundation Team A' },
  { id: 'c2', name: 'Foundation Team B' },
  { id: 'c3', name: 'Wall Team' },
  { id: 'c4', name: 'Waterproofing Team' },
  { id: 'c5', name: 'Flatwork Team' }
];

const mockRecommendations = [
  {
    crewId: 'c1',
    crewName: 'Foundation Team A',
    score: 92,
    reasons: {
      availability: 95,
      specialty: 100,
      skillLevel: 90,
      proximity: 85,
      efficiency: 90
    },
    metrics: {
      distanceFromLastProject: '3.2 miles',
      estimatedTravelTime: '12 mins',
      completionRate: 98,
      qualityScore: 4.8
    }
  },
  {
    crewId: 'c2',
    crewName: 'Foundation Team B',
    score: 85,
    reasons: {
      availability: 100,
      specialty: 100,
      skillLevel: 85,
      proximity: 65,
      efficiency: 85
    },
    metrics: {
      distanceFromLastProject: '8.5 miles',
      estimatedTravelTime: '25 mins',
      completionRate: 95,
      qualityScore: 4.5
    }
  }
];

const tabs = [
  { id: 'kanban', label: 'Project Stages', icon: ListTodo },
  { id: 'calendar', label: 'Crew Calendar', icon: CalendarIcon },
  { id: 'map', label: 'Project Map', icon: MapPin },
  { id: 'daily', label: 'Daily Schedule', icon: Users },
  { id: 'ai', label: 'AI Recommendations', icon: Brain }
];

const Schedule: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeTab, setActiveTab] = useState('kanban');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedProjects = projects.map(project => {
        if (project.id === result.draggableId) {
          return {
            ...project,
            stage: destination.droppableId.startsWith('calendar-')
              ? source.droppableId
              : destination.droppableId
          };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };

  const handleAssignCrew = (crewId: string) => {
    console.log('Assigning crew:', crewId);
  };

  const handleScheduleUpdate = (id: string) => {
    console.log('Updating schedule item:', id);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Work Order
          </button>
        </div>

        <ScheduleMiniDashboard stats={mockStats} />
        <UpcomingSchedule items={mockUpcomingSchedule} onUpdate={handleScheduleUpdate} />

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === 'kanban' && (
            <ProjectStages projects={projects} onDragEnd={handleDragEnd} />
          )}
          {activeTab === 'calendar' && (
            <CrewCalendar crews={mockCrews} />
          )}
          {activeTab === 'map' && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="h-[600px]">
                <ProjectMap />
              </div>
            </div>
          )}
          {activeTab === 'daily' && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Today's Schedule</h2>
                <button className="btn btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule Item
                </button>
              </div>
              <TodaySchedule />
            </div>
          )}
          {activeTab === 'ai' && (
            <AIRecommendations
              workOrderId="wo1"
              recommendations={mockRecommendations}
              onAssignCrew={handleAssignCrew}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Schedule;