import { LatLngTuple } from 'leaflet';

export interface Project {
  id: string;
  name: string;
  location: string;
  coordinates: LatLngTuple;
  stage: 'backlog' | 'stakeout' | 'footings' | 'walls' | 'strip' | 'waterproofing' | 'flatwork';
  status: 'not_started' | 'active' | 'complete';
  customer: string;
  startDate: string;
  neighborhood: string;
  city: string;
  county: string;
}

export const stageColors = {
  backlog: '#94A3B8', // slate-400
  stakeout: '#60A5FA', // blue-400
  footings: '#34D399', // green-400
  walls: '#F59E0B', // amber-500
  strip: '#8B5CF6', // purple-500
  waterproofing: '#EC4899', // pink-500
  flatwork: '#10B981' // emerald-500
} as const;

export const stageNames = {
  backlog: 'Backlog',
  stakeout: 'Stake Out',
  footings: 'Footings',
  walls: 'Walls',
  strip: 'Strip',
  waterproofing: 'Waterproofing',
  flatwork: 'Flatwork'
} as const;

export const mockProjects: Project[] = [
  {
    id: 'P001',
    name: 'Downtown Foundation Repair',
    location: '525 E Douglas Ave',
    coordinates: [37.687176, -97.336273],
    stage: 'walls',
    status: 'active',
    customer: 'ABC Corporation',
    startDate: '2024-03-01',
    neighborhood: 'Downtown',
    city: 'Wichita',
    county: 'Sedgwick'
  },
  {
    id: 'P002',
    name: 'East Mall Foundation',
    coordinates: [37.684859, -97.251740],
    location: '7700 E Kellogg Dr',
    stage: 'footings',
    status: 'active',
    customer: 'Mall Developers Inc',
    startDate: '2024-03-05',
    neighborhood: 'Eastgate',
    city: 'Wichita',
    county: 'Sedgwick'
  },
  {
    id: 'P003',
    name: 'Sienna Ranch Lot 48',
    coordinates: [37.795234, -97.138456],
    location: '3001 Cottonwood Ln',
    stage: 'stakeout',
    status: 'active',
    customer: 'Nies Homes',
    startDate: '2024-03-15',
    neighborhood: 'Sienna Ranch',
    city: 'Rose Hill',
    county: 'Butler'
  },
  {
    id: 'P004',
    name: 'Brookfield Addition Lot 72',
    coordinates: [37.692145, -97.115872],
    location: '2505 Oak St',
    stage: 'waterproofing',
    status: 'active',
    customer: 'Nies Homes',
    startDate: '2024-03-10',
    neighborhood: 'Brookfield',
    city: 'Andover',
    county: 'Butler'
  },
  {
    id: 'P005',
    name: 'Derby Marketplace',
    coordinates: [37.552345, -97.262781],
    location: '1800 N Rock Rd',
    stage: 'strip',
    status: 'active',
    customer: 'Commercial Properties LLC',
    startDate: '2024-03-08',
    neighborhood: 'Derby Marketplace',
    city: 'Derby',
    county: 'Sedgwick'
  },
  {
    id: 'P006',
    name: 'Rose Hill Plaza',
    coordinates: [37.789234, -97.134567],
    location: '1200 N Rose Hill Rd',
    stage: 'flatwork',
    status: 'active',
    customer: 'Rose Hill Development',
    startDate: '2024-03-12',
    neighborhood: 'Rose Hill Plaza',
    city: 'Rose Hill',
    county: 'Butler'
  },
  {
    id: 'P007',
    name: 'Andover Commons',
    coordinates: [37.698765, -97.123456],
    location: '500 N Andover Rd',
    stage: 'backlog',
    status: 'not_started',
    customer: 'Andover Retail LLC',
    startDate: '2024-04-01',
    neighborhood: 'Andover Commons',
    city: 'Andover',
    county: 'Butler'
  },
  {
    id: 'P008',
    name: 'Derby Residential',
    coordinates: [37.548765, -97.258901],
    location: '2200 E Madison Ave',
    stage: 'stakeout',
    status: 'active',
    customer: 'Derby Homes LLC',
    startDate: '2024-03-18',
    neighborhood: 'Madison Heights',
    city: 'Derby',
    county: 'Sedgwick'
  },
  {
    id: 'P009',
    name: 'College Hill Residence',
    coordinates: [37.694234, -97.298541],
    location: '126 N Clifton Ave',
    stage: 'backlog',
    status: 'not_started',
    customer: 'Residential Client',
    startDate: '2024-04-01',
    neighborhood: 'College Hill',
    city: 'Wichita',
    county: 'Sedgwick'
  },
  {
    id: 'P010',
    name: 'Riverside Development',
    coordinates: [37.702145, -97.346872],
    location: '1001 N River Blvd',
    stage: 'footings',
    status: 'active',
    customer: 'River Properties LLC',
    startDate: '2024-03-20',
    neighborhood: 'Riverside',
    city: 'Wichita',
    county: 'Sedgwick'
  }
];