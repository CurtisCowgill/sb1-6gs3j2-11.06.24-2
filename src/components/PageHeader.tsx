import React from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onAdd?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onAdd }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New
        </button>
      )}
    </div>
  );
};

export default PageHeader;