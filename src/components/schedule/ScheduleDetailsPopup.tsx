import React from 'react';
import { X, Calendar, Clock, MapPin, HardHat, FileText } from 'lucide-react';

interface ScheduleItem {
  id: string;
  type: 'inspection' | 'concrete' | 'job';
  time: string;
  project: string;
  location: string;
  crew?: string;
  notes?: string;
}

interface ScheduleDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: ScheduleItem[];
}

const ScheduleDetailsPopup: React.FC<ScheduleDetailsPopupProps> = ({
  isOpen,
  onClose,
  title,
  items
}) => {
  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'concrete':
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="relative inline-block w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-medium text-gray-900">
                      {item.time}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.type === 'inspection' 
                      ? 'bg-purple-100 text-purple-800'
                      : item.type === 'concrete'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    {item.project}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </div>
                    {item.crew && (
                      <div className="flex items-center gap-1">
                        <HardHat className="w-4 h-4" />
                        {item.crew}
                      </div>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-500">{item.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailsPopup;