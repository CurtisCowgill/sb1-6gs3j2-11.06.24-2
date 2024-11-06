import React from 'react';
import { 
  User,
  Mail, 
  Phone, 
  Calendar,
  HardHat,
  MapPin 
} from 'lucide-react';

interface EmployeeInfoProps {
  employee: {
    name: string;
    email: string;
    phone: string;
    role: string;
    startDate: string;
    location: string;
    status: string;
  };
  onEdit?: () => void;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Edit Details
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{employee.role}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{employee.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{employee.startDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{employee.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <HardHat className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                employee.status === 'Active' 
                  ? 'bg-green-100 text-green-800'
                  : employee.status === 'On Leave'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;