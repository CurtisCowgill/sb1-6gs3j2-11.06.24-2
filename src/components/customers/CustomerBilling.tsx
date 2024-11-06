import React from 'react';
import { DollarSign, CreditCard, Receipt, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface CustomerBillingProps {
  customerId: string;
}

interface BillingInfo {
  status: string;
  creditLimit: number;
  currentBalance: number;
  paymentTerms: string;
  lastPayment: {
    amount: number;
    date: string;
  };
  recentInvoices: {
    id: string;
    date: string;
    amount: number;
    status: string;
    project: string;
  }[];
}

const mockBillingInfo: BillingInfo = {
  status: 'Good Standing',
  creditLimit: 50000,
  currentBalance: 15000,
  paymentTerms: 'Net 30',
  lastPayment: {
    amount: 25000,
    date: '2024-03-01'
  },
  recentInvoices: [
    {
      id: 'INV001',
      date: '2024-03-10',
      amount: 15000,
      status: 'Pending',
      project: 'Downtown Foundation Repair'
    },
    {
      id: 'INV002',
      date: '2024-02-15',
      amount: 25000,
      status: 'Paid',
      project: 'Residential Foundation'
    }
  ]
};

const CustomerBilling: React.FC<CustomerBillingProps> = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Billing Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-900">Current Balance</p>
                <p className="text-2xl font-semibold text-blue-900">
                  {formatCurrency(mockBillingInfo.currentBalance)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-900">Credit Limit</p>
                <p className="text-2xl font-semibold text-green-900">
                  {formatCurrency(mockBillingInfo.creditLimit)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-900">Last Payment</p>
                <p className="text-2xl font-semibold text-purple-900">
                  {formatCurrency(mockBillingInfo.lastPayment.amount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            View All Invoices
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBillingInfo.recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Payment Terms</h3>
            <p className="mt-1 text-sm text-gray-500">
              {mockBillingInfo.paymentTerms} - Payments are due within 30 days of invoice date.
              Late payments may be subject to a 1.5% monthly finance charge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBilling;