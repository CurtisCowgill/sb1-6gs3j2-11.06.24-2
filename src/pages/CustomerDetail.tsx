import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TabNavigation, { customerTabs } from '../components/TabNavigation';
import CustomerInfo from '../components/customers/CustomerInfo';
import CustomerContacts from '../components/customers/CustomerContacts';
import CustomerMap from '../components/customers/CustomerMap';
import CustomerProjectsTable from '../components/customers/CustomerProjectsTable';
import CustomerDocuments from '../components/customers/CustomerDocuments';
import CustomerCommunication from '../components/customers/CustomerCommunication';
import CustomerBilling from '../components/customers/CustomerBilling';

const mockCustomer = {
  id: 'CUST001',
  name: 'ABC Builders',
  type: 'Builder',
  email: 'contact@abcbuilders.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Construction Ave',
    city: 'Builder City',
    state: 'BC',
    zip: '12345'
  },
  preferredCommunication: 'Email',
  rating: 4.5,
  notes: 'Premium builder client with multiple ongoing projects',
  contacts: [
    {
      id: 'CON001',
      name: 'John Smith',
      role: 'President',
      email: 'john@abcbuilders.com',
      phone: '(555) 123-4567',
      isPrimary: true,
      projects: [
        { id: 'PRJ001', name: 'Downtown Foundation Repair' }
      ]
    },
    {
      id: 'CON002',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      email: 'sarah@abcbuilders.com',
      phone: '(555) 234-5678',
      isPrimary: false,
      projects: [
        { id: 'PRJ002', name: 'Residential Foundation' }
      ]
    }
  ],
  projects: [
    {
      id: 'PRJ001',
      name: 'Downtown Foundation Repair',
      location: '123 Main St',
      status: 'In Progress',
      startDate: '2024-03-01',
      contactPerson: {
        id: 'CON001',
        name: 'John Smith',
        role: 'President'
      }
    },
    {
      id: 'PRJ002',
      name: 'Residential Foundation',
      location: '456 Oak Ave',
      status: 'Scheduled',
      startDate: '2024-03-15',
      contactPerson: {
        id: 'CON002',
        name: 'Sarah Johnson',
        role: 'Project Manager'
      }
    }
  ]
};

const CustomerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <CustomerInfo customer={mockCustomer} />
              </div>
              <CustomerMap address={mockCustomer.address} />
            </div>
            <CustomerContacts contacts={mockCustomer.contacts} />
            <CustomerProjectsTable projects={mockCustomer.projects} />
          </div>
        );
      case 'documents':
        return <CustomerDocuments customerId={id} />;
      case 'communication':
        return <CustomerCommunication customerId={id} />;
      case 'billing':
        return <CustomerBilling customerId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/customers')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockCustomer.name}</h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {mockCustomer.type}
          </span>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Edit Customer
        </button>
      </div>

      <TabNavigation
        tabs={customerTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CustomerDetail;