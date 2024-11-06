import { WorkOrder } from '../types';

export const STANDARD_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO001',
    title: 'Site Visit / Stake Out',
    crew: 'Survey Team',
    startDate: '2024-03-20',
    status: 'Pending',
    progress: 0
  },
  {
    id: 'WO002',
    title: 'Footings',
    crew: 'Foundation Team',
    additionalCrews: [],
    startDate: '2024-03-22',
    inspection: '2024-03-22T09:00',
    concrete: '2024-03-22T10:30',
    estimatedCY: 45,
    concreteVendor: 'ABC Concrete',
    pumpCompany: 'XYZ Pumping',
    excavator: 'Dig Masters',
    plumber: 'Pro Plumbing',
    status: 'Pending',
    progress: 0
  },
  {
    id: 'WO003',
    title: 'Walls',
    crew: 'Wall Team',
    additionalCrews: [],
    startDate: '2024-03-25',
    inspection: '2024-03-25T09:00',
    concrete: '2024-03-25T10:30',
    estimatedCY: 65,
    concreteVendor: 'ABC Concrete',
    pumpCompany: 'XYZ Pumping',
    excavator: 'Dig Masters',
    plumber: 'Pro Plumbing',
    status: 'Pending',
    progress: 0
  },
  {
    id: 'WO004',
    title: 'Strip',
    crew: 'Strip Team',
    startDate: '2024-03-27',
    status: 'Pending',
    progress: 0
  },
  {
    id: 'WO005',
    title: 'Waterproofing',
    crew: 'Waterproofing Team',
    startDate: '2024-03-28',
    status: 'Pending',
    progress: 0
  },
  {
    id: 'WO006',
    title: 'Flatwork',
    crew: 'Flatwork Team',
    additionalCrews: [],
    startDate: '2024-03-30',
    inspection: '2024-03-30T09:00',
    concrete: '2024-03-30T10:30',
    estimatedCY: 35,
    concreteVendor: 'ABC Concrete',
    pumpCompany: 'XYZ Pumping',
    status: 'Pending',
    progress: 0
  }
];