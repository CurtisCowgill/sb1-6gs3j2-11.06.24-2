import React from 'react';
import { 
  Home, 
  FileText, 
  Camera, 
  Clock, 
  DollarSign,
  User,
  MessageSquare,
  Receipt,
  Truck,
  ClipboardList,
  type LucideIcon
} from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const projectTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home
  },
  {
    id: 'workorders',
    label: 'Work Orders',
    icon: ClipboardList
  },
  {
    id: 'plans',
    label: 'Plans & Docs',
    icon: FileText
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: Camera
  },
  {
    id: 'time',
    label: 'Time',
    icon: Clock
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: DollarSign
  }
];

export const customerTabs: Tab[] = [
  { 
    id: 'info', 
    label: 'Information', 
    icon: User 
  },
  { 
    id: 'documents', 
    label: 'Documents', 
    icon: FileText 
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: MessageSquare 
  },
  { 
    id: 'billing', 
    label: 'Billing', 
    icon: Receipt 
  }
];

export const vendorTabs: Tab[] = [
  { 
    id: 'info', 
    label: 'Information', 
    icon: User 
  },
  { 
    id: 'deliveries', 
    label: 'Deliveries', 
    icon: Truck 
  },
  { 
    id: 'pricing', 
    label: 'Pricing', 
    icon: DollarSign 
  },
  { 
    id: 'documents', 
    label: 'Documents', 
    icon: FileText 
  },
  { 
    id: 'billing', 
    label: 'Billing', 
    icon: Receipt 
  }
];

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;