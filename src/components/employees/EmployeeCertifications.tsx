import React from 'react';
import { Plus, Award, Calendar, Building } from 'lucide-react';
import { Certification } from '../../types';
import { formatDate } from '../../utils/format';

interface EmployeeCertificationsProps {
  certifications: Certification[];
}

const EmployeeCertifications: React.FC<EmployeeCertificationsProps> = ({ certifications }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Certifications</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-900">{cert.name}</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <Building className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{cert.issuingAuthority}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  {formatDate(cert.issueDate)} - {formatDate(cert.expiryDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCertifications;