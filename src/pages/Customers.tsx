import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Download, TrendingUp, BarChart3 } from 'lucide-react';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerFilters from '../components/customers/CustomerFilters';
import { Customer } from '../types';
import { formatCurrency } from '../utils/format';

const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    companyName: 'Nies Homes',
    contactName: 'John Nies',
    email: 'john@nieshomes.com',
    phone: '(316) 555-0123',
    address: {
      street: '1234 Builder Way',
      city: 'Wichita',
      state: 'KS',
      zip: '67226'
    },
    projects: [],
    status: 'Active',
    notes: 'Premium home builder, prefers early morning concrete pours',
    preferredCommunication: 'Email',
    rating: 5,
    lastContact: '2024-03-10',
    type: 'company',
    totalSales: 850000,
    projectCount: 12
  },
  {
    id: 'CUST002',
    companyName: 'Remodel Masters',
    contactName: 'Sarah Johnson',
    email: 'sarah@remodelmasters.com',
    phone: '(316) 555-0456',
    address: {
      street: '789 Contractor Lane',
      city: 'Derby',
      state: 'KS',
      zip: '67037'
    },
    projects: [],
    status: 'Active',
    notes: 'Specializes in basement remodels',
    preferredCommunication: 'Phone',
    rating: 4,
    lastContact: '2024-03-08',
    type: 'company',
    totalSales: 650000,
    projectCount: 8
  }
];

const timeRanges = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'All Time', value: 'all' }
];

type CustomerTab = 'all' | 'company' | 'individual';

const Customers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [activeTab, setActiveTab] = useState<CustomerTab>('all');
  const [timeRange, setTimeRange] = useState('month');

  const handleAddCustomer = () => {
    navigate('/customers/new');
  };

  const handleExport = () => {
    console.log('Exporting customer data...');
  };

  const filteredCustomers = customers.filter(customer => 
    activeTab === 'all' || customer.type === activeTab
  );

  // Sort customers by sales and project count
  const topCustomersBySales = [...customers]
    .sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))
    .slice(0, 5);

  const topCustomersByProjects = [...customers]
    .sort((a, b) => (b.projectCount || 0) - (a.projectCount || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleAddCustomer}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === range.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${
                range.value === timeRanges[0].value
                  ? 'rounded-l-md'
                  : range.value === timeRanges[timeRanges.length - 1].value
                  ? 'rounded-r-md'
                  : ''
              } border border-gray-300`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top 5 Customers by Sales */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Top 5 Customers by Sales</h2>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {topCustomersBySales.map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-sm text-gray-500">{index + 1}.</span>
                  <span className="text-sm font-medium">{customer.companyName}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(customer.totalSales || 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Customers by Project Count */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Top 5 Customers by Projects</h2>
            <BarChart3 className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {topCustomersByProjects.map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-sm text-gray-500">{index + 1}.</span>
                  <span className="text-sm font-medium">{customer.companyName}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {customer.projectCount} projects
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'individual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Individuals
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="ml-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {showFilters && <CustomerFilters />}

          <CustomerTable customers={filteredCustomers} />
        </div>
      </div>
    </div>
  );
};

export default Customers;