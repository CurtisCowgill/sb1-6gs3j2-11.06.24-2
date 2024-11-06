export interface WorkOrder {
  id: string;
  title: string;
  crew: string;
  additionalCrews?: string[];
  startDate: string;
  inspection?: string;
  concrete?: string;
  vendors?: string[];
  status: 'Pending' | 'In Progress' | 'Completed';
  progress: number;
  estimatedCY?: number;
  actualCY?: number;
  concreteVendor?: string;
  pumpCompany?: string;
  excavator?: string;
  plumber?: string;
  duration?: string;
  notes?: string;
}

export interface Crew {
  id: string;
  name: string;
  specialty: string;
  status: 'Available' | 'Assigned' | 'On Leave';
}

export interface Vendor {
  id: string;
  name: string;
  type: 'Concrete' | 'Pump' | 'Excavator' | 'Plumber';
  status: 'Active' | 'Inactive';
}