import React from 'react';
import { Building2, Users, HardHat, FolderKanban, TrendingUp, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import Card from '../components/Card';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import RecentActivity from '../components/dashboard/RecentActivity';
import ProjectMap from '../components/dashboard/ProjectMap';
import MapFilters from '../components/dashboard/map/MapFilters';

const Dashboard: React.FC = () => {
  const stats = {
    activeProjects: 12,
    totalEmployees: 45,
    activeCrews: 8,
    completionRate: 92,
    projectsCompleted: 156,
    avgCompletionTime: '14 days',
    totalRevenue: '$2.5M',
    customerSatisfaction: '4.8'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Active Projects"
          value={stats.activeProjects.toString()}
          icon={Building2}
          iconColor="text-blue-500"
        />
        <Card
          title="Projects Completed"
          value={stats.projectsCompleted.toString()}
          icon={CheckCircle2}
          iconColor="text-green-500"
        />
        <Card
          title="Avg. Completion Time"
          value={stats.avgCompletionTime}
          icon={Clock}
          iconColor="text-orange-500"
        />
        <Card
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          iconColor="text-purple-500"
        />
        <Card
          title="Total Employees"
          value={stats.totalEmployees.toString()}
          icon={Users}
          iconColor="text-indigo-500"
        />
        <Card
          title="Active Crews"
          value={stats.activeCrews.toString()}
          icon={HardHat}
          iconColor="text-yellow-500"
        />
        <Card
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={TrendingUp}
          iconColor="text-emerald-500"
        />
        <Card
          title="Customer Satisfaction"
          value={stats.customerSatisfaction}
          icon={FolderKanban}
          iconColor="text-rose-500"
          subtitle="out of 5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Section - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h2>
            <TodaySchedule />
          </div>
        </div>

        {/* Activity Section - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Map Section - Full width */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Project Locations</h2>
        </div>
        <MapFilters />
        <div className="h-[600px] mt-6">
          <ProjectMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;