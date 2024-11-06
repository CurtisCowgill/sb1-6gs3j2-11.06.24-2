import { 
  WorkOrder, 
  WorkOrderTemplate, 
  ConstructionStage,
  VendorType 
} from '../types/workOrders';

export const mockWorkOrderTemplates: WorkOrderTemplate[] = [
  {
    id: 'TPL001',
    name: 'Foundation Pour',
    description: 'Standard procedure for residential foundation pour',
    constructionStage: 'footings',
    type: 'adhoc',
    priority: 'high',
    estimatedDuration: 480,
    defaultCrewType: 'foundation',
    crews: [
      {
        crewId: 'CREW001',
        isPrimary: true,
        role: 'Foundation crew',
        notes: 'Primary foundation crew'
      },
      {
        crewId: 'CREW002',
        isPrimary: false,
        role: 'Support crew',
        notes: 'Backup crew for large pours'
      }
    ],
    tasks: [
      {
        id: 't1',
        title: 'Pre-pour inspection',
        description: 'Final inspection of forms and reinforcement',
        status: 'pending',
        duration: 60
      },
      {
        id: 't2',
        title: 'Pour preparation',
        description: 'Setup equipment and prepare site for pour',
        status: 'pending',
        duration: 90
      },
      {
        id: 't3',
        title: 'Concrete pour',
        description: 'Execute concrete pour according to specifications',
        status: 'pending',
        duration: 240
      },
      {
        id: 't4',
        title: 'Finishing',
        description: 'Complete surface finishing and curing preparation',
        status: 'pending',
        duration: 90
      }
    ],
    resources: [
      {
        id: 'r1',
        type: 'material',
        name: 'Concrete',
        quantity: 40,
        unit: 'yards',
        cost: 125
      },
      {
        id: 'r2',
        type: 'equipment',
        name: 'Concrete pump truck',
        quantity: 1,
        unit: 'truck',
        cost: 850
      }
    ],
    vendors: [
      {
        type: 'concrete',
        required: true,
        preferredVendor: 'ABC Concrete',
        notes: 'Primary concrete supplier'
      },
      {
        type: 'pump',
        required: true,
        preferredVendor: 'XYZ Pumping',
        notes: 'Preferred pump company'
      },
      {
        type: 'plumber',
        required: true,
        notes: 'Required for under-slab plumbing'
      }
    ],
    productivityRates: [
      {
        type: 'concrete_pour',
        rate: 50,
        unit: 'cubic_yards',
        crewSize: 6,
        notes: 'Standard pour rate for residential foundations'
      },
      {
        type: 'form_setup',
        rate: 100,
        unit: 'linear_feet',
        crewSize: 4,
        notes: 'Form setup rate for standard residential foundation'
      }
    ],
    inspectionRequirements: [
      {
        jurisdictionId: 'JUR001',
        type: 'pre_pour',
        noticeRequired: 24,
        preferredTimeOfDay: 'morning',
        notes: 'Schedule inspection for early morning'
      }
    ],
    relatedStages: {
      previousStage: 'stake_out',
      nextStage: 'walls',
      preferredCrew: 'same'
    },
    tags: ['foundation', 'concrete', 'pour'],
    locationRequirements: {
      neighborhoods: ['Sienna Ranch', 'Brookfield'],
      cities: ['Rose Hill', 'Derby'],
      counties: ['Butler', 'Sedgwick']
    }
  },
  {
    id: 'TPL002',
    name: 'Wall Pour',
    description: 'Standard procedure for residential wall pour',
    constructionStage: 'walls',
    type: 'adhoc',
    priority: 'high',
    estimatedDuration: 480,
    defaultCrewType: 'walls',
    crews: [
      {
        crewId: 'CREW003',
        isPrimary: true,
        role: 'Wall crew',
        notes: 'Primary wall crew'
      }
    ],
    tasks: [
      {
        id: 't1',
        title: 'Pre-pour inspection',
        description: 'Final inspection of wall forms and reinforcement',
        status: 'pending',
        duration: 60
      },
      {
        id: 't2',
        title: 'Pour preparation',
        description: 'Setup equipment and prepare for wall pour',
        status: 'pending',
        duration: 90
      },
      {
        id: 't3',
        title: 'Wall pour',
        description: 'Execute wall pour according to specifications',
        status: 'pending',
        duration: 240
      },
      {
        id: 't4',
        title: 'Finishing',
        description: 'Complete wall finishing and prepare for curing',
        status: 'pending',
        duration: 90
      }
    ],
    resources: [
      {
        id: 'r1',
        type: 'material',
        name: 'Concrete',
        quantity: 30,
        unit: 'yards',
        cost: 125
      },
      {
        id: 'r2',
        type: 'equipment',
        name: 'Concrete pump truck',
        quantity: 1,
        unit: 'truck',
        cost: 850
      }
    ],
    vendors: [
      {
        type: 'concrete',
        required: true,
        preferredVendor: 'ABC Concrete',
        notes: 'Primary concrete supplier'
      },
      {
        type: 'pump',
        required: true,
        preferredVendor: 'XYZ Pumping',
        notes: 'Preferred pump company'
      }
    ],
    productivityRates: [
      {
        type: 'wall_pour',
        rate: 40,
        unit: 'cubic_yards',
        crewSize: 6,
        notes: 'Standard pour rate for residential walls'
      },
      {
        type: 'form_setup',
        rate: 80,
        unit: 'linear_feet',
        crewSize: 4,
        notes: 'Form setup rate for standard residential walls'
      }
    ],
    inspectionRequirements: [
      {
        jurisdictionId: 'JUR001',
        type: 'pre_pour',
        noticeRequired: 24,
        preferredTimeOfDay: 'morning',
        notes: 'Schedule inspection for early morning'
      }
    ],
    relatedStages: {
      previousStage: 'footings',
      nextStage: 'strip',
      preferredCrew: 'same'
    },
    tags: ['walls', 'concrete', 'pour'],
    locationRequirements: {
      neighborhoods: ['Sienna Ranch', 'Brookfield'],
      cities: ['Rose Hill', 'Derby'],
      counties: ['Butler', 'Sedgwick']
    }
  }
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO001',
    name: 'Sienna Ranch Lot 48 Foundation Pour',
    description: 'Foundation pour for new residential construction',
    constructionStage: 'footings',
    type: 'adhoc',
    priority: 'high',
    estimatedDuration: 480,
    defaultCrewType: 'foundation',
    crews: mockWorkOrderTemplates[0].crews,
    tasks: mockWorkOrderTemplates[0].tasks,
    resources: mockWorkOrderTemplates[0].resources,
    vendors: mockWorkOrderTemplates[0].vendors,
    productivityRates: mockWorkOrderTemplates[0].productivityRates,
    inspectionRequirements: mockWorkOrderTemplates[0].inspectionRequirements,
    status: 'scheduled',
    progress: 0,
    projectId: 'PRJ001',
    scheduledStart: '2024-03-20T07:00:00',
    scheduledEnd: '2024-03-20T15:00:00',
    assignedCrews: ['CREW001'],
    weather: {
      temperature: 65,
      conditions: 'Clear',
      windSpeed: 5
    },
    costs: {
      estimated: 8500,
      actual: 0,
      materials: 5000,
      labor: 2500,
      equipment: 1000
    },
    quality: {
      inspectionRequired: true,
      inspectionPassed: false,
      inspectionDate: '2024-03-20T06:30:00',
      inspector: 'John Smith'
    },
    safety: {
      hazards: ['excavation', 'heavy_equipment'],
      requiredPPE: ['hard_hat', 'safety_vest', 'steel_toe_boots'],
      specialInstructions: 'Ensure proper trench safety measures are in place'
    }
  }
];