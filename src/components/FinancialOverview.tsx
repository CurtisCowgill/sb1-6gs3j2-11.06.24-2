import React from 'react';
import { DollarSign } from 'lucide-react';

const FinancialOverview: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Financial Overview</h2>
      
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <DollarSign className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No financial data available</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;