import React from 'react';
import { ClipboardCheck, Truck, CalendarIcon, Clock } from 'lucide-react';
import Card from '../Card';

interface ScheduleStats {
  todayInspections: number;
  todayPours: number;
  upcomingInspections: number;
  upcomingPours: number;
}

interface ScheduleMiniDashboardProps {
  stats: ScheduleStats;
}

const ScheduleMiniDashboard: React.FC<ScheduleMiniDashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Today's Inspections"
        value={stats.todayInspections.toString()}
        icon={ClipboardCheck}
        iconColor="text-blue-500"
      />
      <Card
        title="Today's Pours"
        value={stats.todayPours.toString()}
        icon={Truck}
        iconColor="text-green-500"
      />
      <Card
        title="Upcoming Inspections"
        value={stats.upcomingInspections.toString()}
        icon={CalendarIcon}
        iconColor="text-purple-500"
      />
      <Card
        title="Upcoming Pours"
        value={stats.upcomingPours.toString()}
        icon={Clock}
        iconColor="text-orange-500"
      />
    </div>
  );
};

export default ScheduleMiniDashboard;