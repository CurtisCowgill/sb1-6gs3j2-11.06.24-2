import React from 'react';
import { DollarSign, CreditCard, Receipt, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

interface VendorBillingProps {
  billing: {
    status: string;
    terms: string;
    creditLimit: number;
    currentBalance: number;
    lastPayment: {
      amount: number;
      date: string;
    };
  };
}

const VendorBilling: React.FC<VendorBillingProps> = ({ billing }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(billing.currentBalance)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Credit Limit</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(billing.creditLimit)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Receipt className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Payment</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(billing.lastPayment.amount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Payment Date</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatDate(billing.lastPayment.date)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Billing Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium text-gray-900">{billing.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Terms</p>
                <p className="font-medium text-gray-900">{billing.terms}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Available Credit</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(billing.creditLimit - billing.currentBalance)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Credit Utilization</p>
                <p className="font-medium text-gray-900">
                  {Math.round((billing.currentBalance / billing.creditLimit) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBilling;