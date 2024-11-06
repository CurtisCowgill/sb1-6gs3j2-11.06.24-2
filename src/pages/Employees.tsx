import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  ArrowUpDown,
  Download,
  Users,
  Award,
  HardHat,
  AlertTriangle
} from 'lucide-react';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeFilters from '../components/employees/EmployeeFilters';
import { Employee } from '../types';

const timeRanges = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' }
];

const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    role: 'Foundation Specialist',
    startDate: '2023-01-15',
    status: 'Active',
    skills: ['Concrete Work', 'Foundation Repair', 'Site Preparation'],
    certifications: [
      {
        id: 'CERT001',
        name: 'OSHA Safety',
        issueDate: '2023-01-01',
        expiryDate: '2024-01-01',
        issuingAuthority: 'OSHA'
      }
    ],
    performanceMetrics: [
      {
        id: 'PERF001',
        date: '2024-02-01',
        category: 'Quality',
        score: 95,
        notes: 'Excellent attention to detail'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  }
];

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [timeRange, setTimeRange] = useState('month');

  const handleAddEmployee = () => {
    navigate('/employees/new');
  };

  const handleExport = () => {
    console.log('Exporting employee data...');
  };

  // Calculate metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const certifiedEmployees = employees.filter(emp => emp.certifications.length > 0).length;
  const safetyIncidents = employees.reduce((acc, emp) => acc + (emp.performanceMetrics.filter(m => m.category === 'Safety').length), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleAddEmployee}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <HardHat className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{activeEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Certified</p>
              <p className="text-2xl font-semibold text-gray-900">{certifiedEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Safety Incidents</p>
              <p className="text-2xl font-semibold text-gray-900">{safetyIncidents}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center max-w-md flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search employees..."
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
              <button className="ml-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {showFilters && <EmployeeFilters />}

          <EmployeeTable employees={employees} />
        </div>
      </div>
    </div>
  );
};

export default Employees;