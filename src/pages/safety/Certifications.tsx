import React, { useState } from 'react';
import { Plus, Search, Filter, Award } from 'lucide-react';
import type { SafetyCertification } from '../../types';
import { formatDate } from '../../utils/format';

const mockCertifications: SafetyCertification[] = [
  {
    id: 'CERT001',
    employeeId: 'EMP001',
    name: 'OSHA 30-Hour Construction',
    issuingAuthority: 'OSHA',
    issueDate: '2023-06-15',
    expiryDate: '2024-06-15',
    status: 'Active',
    documentUrl: '/certifications/osha-30.pdf'
  },
  {
    id: 'CERT002',
    employeeId: 'EMP002',
    name: 'First Aid & CPR',
    issuingAuthority: 'Red Cross',
    issueDate: '2023-09-01',
    expiryDate: '2024-09-01',
    status: 'Active',
    documentUrl: '/certifications/first-aid.pdf'
  }
];

const Certifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status: SafetyCertification['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Safety Certifications</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search certifications..."
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

          <div className="space-y-4">
            {mockCertifications.map((cert) => (
              <div
                key={cert.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-blue-500 mt-1" />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {cert.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Issuing Authority: {cert.issuingAuthority}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Issued: {formatDate(cert.issueDate)}
                      </span>
                      <span className="text-gray-500">
                        Expires: {formatDate(cert.expiryDate)}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 text-blue-600 hover:text-blue-800">
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;