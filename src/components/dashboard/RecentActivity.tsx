import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Building2, CheckCircle2, Truck, Calendar } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'project',
      title: 'Project Started',
      description: 'Downtown Foundation Repair kicked off',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      icon: Building2,
      iconColor: 'text-blue-500'
    },
    // Add more activities...
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <activity.icon className={`h-5 w-5 ${activity.iconColor} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;