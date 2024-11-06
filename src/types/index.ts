export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  projects: Project[];
  status: 'Active' | 'Inactive';
  notes?: string;
  preferredCommunication: string;
  rating: number;
  lastContact: string;
  type: 'company' | 'individual';
  totalSales?: number;
  projectCount?: number;
}

export interface Project {
  id: string;
  name: string;
  customer: string;
  location: string;
  status: string;
  startDate: string;
  budget: string;
  completion: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  startDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  skills: string[];
  certifications: Certification[];
  performanceMetrics: PerformanceMetric[];
  avatar?: string;
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
}

export interface PerformanceMetric {
  id: string;
  date: string;
  category: string;
  score: number;
  notes?: string;
}

export interface WeatherForecast {
  date: string;
  conditions: string;
  high: number;
  low: number;
}

export interface Vehicle {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: string;
  mileage: number;
  fuelType: string;
  lastService: string;
  nextService: string;
  maintenanceHistory: MaintenanceRecord[];
  documents: Document[];
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: string;
  hoursUsed: number;
  lastService: string;
  nextService: string;
  maintenanceHistory: MaintenanceRecord[];
  documents: Document[];
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  technician: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface SafetyIncident {
  id: string;
  date: string;
  location: string;
  projectId: string;
  type: string;
  description: string;
  employees: string[];
  witnesses: string[];
  rootCause: string;
  correctiveActions: string[];
  status: string;
}

export interface SafetyResource {
  id: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
  lastUpdated: string;
}

export interface SafetyCertification {
  id: string;
  employeeId: string;
  name: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  documentUrl: string;
}