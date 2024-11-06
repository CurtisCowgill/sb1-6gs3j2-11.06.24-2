import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TabNavigation, { vendorTabs } from '../components/TabNavigation';
import VendorInfo from '../components/vendors/VendorInfo';
import VendorDeliveries from '../components/vendors/VendorDeliveries';
import VendorDocuments from '../components/vendors/VendorDocuments';
import VendorContacts from '../components/vendors/VendorContacts';
import VendorMap from '../components/vendors/VendorMap';
import VendorBilling from '../components/vendors/VendorBilling';
import VendorPricing from '../components/vendors/VendorPricing';

const mockVendor = {
  id: 'V001',
  name: 'ABC Concrete Supply',
  type: 'Concrete Supplier',
  status: 'Active',
  email: 'orders@abcconcrete.com',
  phone: '(555) 123-4567',
  website: 'www.abcconcrete.com',
  address: {
    street: '789 Industrial Pkwy',
    city: 'Wichita',
    state: 'KS',
    zip: '67226'
  },
  contacts: [
    {
      id: 'VC001',
      name: 'John Smith',
      role: 'Sales Manager',
      email: 'john@abcconcrete.com',
      phone: '(555) 123-4567',
      isPrimary: true,
      projects: [
        { id: 'PRJ001', name: 'Downtown Foundation Repair' }
      ]
    },
    {
      id: 'VC002',
      name: 'Sarah Johnson',
      role: 'Dispatch Manager',
      email: 'sarah@abcconcrete.com',
      phone: '(555) 234-5678',
      isPrimary: false,
      projects: [
        { id: 'PRJ002', name: 'Residential Foundation' }
      ]
    }
  ],
  deliveries: [
    {
      id: 'DEL001',
      projectName: 'Downtown Foundation Repair',
      date: '2024-03-10',
      status: 'Delivered',
      type: 'Concrete',
      quantity: '50 yards',
      onTime: true
    },
    {
      id: 'DEL002',
      projectName: 'Residential Foundation',
      date: '2024-03-15',
      status: 'Scheduled',
      type: 'Concrete',
      quantity: '35 yards',
      onTime: true
    }
  ],
  metrics: {
    totalDeliveries: 150,
    onTimeDelivery: 95,
    qualityRating: 4.8,
    averageResponseTime: '2 hours'
  },
  billing: {
    status: 'Good Standing',
    terms: 'Net 30',
    creditLimit: 50000,
    currentBalance: 15000,
    lastPayment: {
      amount: 25000,
      date: '2024-03-01'
    }
  },
  products: [
    {
      id: 'P001',
      name: '3000 PSI Concrete Mix',
      category: 'Concrete',
      unit: 'Yard',
      currentPrice: 125.00,
      priceHistory: [
        { price: 125.00, effectiveDate: '2024-01-01' },
        { price: 120.00, effectiveDate: '2023-10-01' },
        { price: 115.00, effectiveDate: '2023-07-01' }
      ]
    },
    {
      id: 'P002',
      name: '4000 PSI Concrete Mix',
      category: 'Concrete',
      unit: 'Yard',
      currentPrice: 135.00,
      priceHistory: [
        { price: 135.00, effectiveDate: '2024-01-01' },
        { price: 130.00, effectiveDate: '2023-10-01' },
        { price: 125.00, effectiveDate: '2023-07-01' }
      ]
    },
    {
      id: 'P003',
      name: 'Fiber Mesh',
      category: 'Additives',
      unit: 'Bag',
      currentPrice: 12.50,
      priceHistory: [
        { price: 12.50, effectiveDate: '2024-01-01' },
        { price: 11.75, effectiveDate: '2023-10-01' },
        { price: 11.00, effectiveDate: '2023-07-01' }
      ]
    }
  ]
};

const VendorDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <VendorInfo vendor={mockVendor} />
              </div>
              <VendorMap address={mockVendor.address} />
            </div>
            <VendorContacts contacts={mockVendor.contacts} />
          </div>
        );
      case 'deliveries':
        return <VendorDeliveries deliveries={mockVendor.deliveries} metrics={mockVendor.metrics} />;
      case 'pricing':
        return <VendorPricing vendorId={id} products={mockVendor.products} />;
      case 'documents':
        return <VendorDocuments vendorId={id} />;
      case 'billing':
        return <VendorBilling billing={mockVendor.billing} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/vendors')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendors
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{mockVendor.name}</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(mockVendor.status)
          }`}>
            {mockVendor.status}
          </span>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Edit Vendor
        </button>
      </div>

      <TabNavigation
        tabs={vendorTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VendorDetail;