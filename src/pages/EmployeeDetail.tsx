import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Briefcase,
  HardHat
} from 'lucide-react';
import TabNavigation from '../components/TabNavigation';
import EmployeeInfo from '../components/employees/EmployeeInfo';
import EmployeeCertifications from '../components/employees/EmployeeCertifications';
import EmployeePerformance from '../components/employees/EmployeePerformance';
import EmployeeSchedule from '../components/employees/EmployeeSchedule';
import EmployeeTimesheet from '../components/employees/EmployeeTimesheet';

const mockEmployee = {
  id: 'EMP001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  role: 'Foundation Specialist',
  startDate: '2023-01-15',
  status: 'Active' as const,
  crewId: 'CREW001',
  skills: ['Concrete Work', 'Foundation Repair', 'Site Preparation'],
  certifications: [
    {
      id: 'CERT001',
      name: 'OSHA Safety',
      issueDate: '2023-01-01',
      expiryDate: '2024-01-01',
      issuingAuthority: 'OSHA'
    },
    {
      id: 'CERT002',
      name: 'Heavy Equipment Operation',
      issueDate: '2023-02-15',
      expiryDate: '2025-02-15',
      issuingAuthority: 'NCCCO'
    }
  ],
  performanceMetrics: [
    {
      id: 'PERF001',
      date: '2024-02-01',
      category: 'Quality',
      score: 95,
      notes: 'Excellent attention to detail'
    },
    {
      id: 'PERF002',
      date: '2024-02-15',
      category: 'Efficiency',
      score: 90,
      notes: 'Consistently meets deadlines'
    }
  ],
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
};

const tabs = [
  { id: 'info', label: 'Information', icon: User },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'timesheet', label: 'Timesheet', icon: Clock }
];

const EmployeeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [employee] = useState(mockEmployee);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <EmployeeInfo employee={employee} />;
      case 'certifications':
        return <EmployeeCertifications certifications={employee.certifications} />;
      case 'performance':
        return <EmployeePerformance metrics={employee.performanceMetrics} />;
      case 'schedule':
        return <EmployeeSchedule employeeId={employee.id} />;
      case 'timesheet':
        return <EmployeeTimesheet employeeId={employee.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/employees')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </button>
          <div className="flex items-center space-x-4">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt=""
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-gray-500" />
                <span className="text-gray-500">{employee.role}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            employee.status === 'Active' ? 'bg-green-100 text-green-800' :
            employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {employee.status}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Employee
          </button>
        </div>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EmployeeDetail;