import type { ProjectType, WorkOrderType, WorkOrder } from '../types/workOrders';

interface WorkOrderTemplate {
  type: WorkOrderType;
  estimatedDuration: number; // in minutes
  requiredVendorTypes: string[];
  requiredChecklist: string[];
  requiresInspection: boolean;
  requiresPour: boolean;
  dependencies?: WorkOrderType[];
}

const baseChecklist = [
  'Site safety check completed',
  'Required equipment available',
  'Weather conditions verified',
  'Crew briefing completed'
];

export const workOrderTemplates: Record<WorkOrderType, WorkOrderTemplate> = {
  site_visit: {
    type: 'site_visit',
    estimatedDuration: 120,
    requiredVendorTypes: [],
    requiredChecklist: [
      ...baseChecklist,
      'Site measurements taken',
      'Photos documented',
      'Access points verified'
    ],
    requiresInspection: false,
    requiresPour: false
  },
  deliver_forms: {
    type: 'deliver_forms',
    estimatedDuration: 240,
    requiredVendorTypes: ['materials'],
    requiredChecklist: [
      ...baseChecklist,
      'Forms inventory checked',
      'Delivery location confirmed',
      'Unloading area prepared'
    ],
    requiresInspection: false,
    requiresPour: false
  },
  walls: {
    type: 'walls',
    estimatedDuration: 480,
    requiredVendorTypes: ['concrete', 'pump', 'plumber'],
    requiredChecklist: [
      ...baseChecklist,
      'Forms properly secured',
      'Rebar placement verified',
      'Concrete mix approved',
      'Pour sequence planned'
    ],
    requiresInspection: true,
    requiresPour: true,
    dependencies: ['deliver_forms']
  },
  strip: {
    type: 'strip',
    estimatedDuration: 360,
    requiredVendorTypes: [],
    requiredChecklist: [
      ...baseChecklist,
      'Concrete curing verified',
      'Stripping sequence planned',
      'Storage area prepared'
    ],
    requiresInspection: false,
    requiresPour: false,
    dependencies: ['walls']
  },
  pickup_forms: {
    type: 'pickup_forms',
    estimatedDuration: 240,
    requiredVendorTypes: ['materials'],
    requiredChecklist: [
      ...baseChecklist,
      'Forms cleaned',
      'Forms inventoried',
      'Loading area prepared'
    ],
    requiresInspection: false,
    requiresPour: false,
    dependencies: ['strip']
  },
  waterproofing: {
    type: 'waterproofing',
    estimatedDuration: 360,
    requiredVendorTypes: ['materials'],
    requiredChecklist: [
      ...baseChecklist,
      'Surface preparation completed',
      'Material temperature verified',
      'Application conditions met'
    ],
    requiresInspection: true,
    requiresPour: false,
    dependencies: ['strip']
  },
  flatwork: {
    type: 'flatwork',
    estimatedDuration: 480,
    requiredVendorTypes: ['concrete', 'pump'],
    requiredChecklist: [
      ...baseChecklist,
      'Base preparation verified',
      'Grade stakes set',
      'Concrete mix approved',
      'Finishing tools ready'
    ],
    requiresInspection: true,
    requiresPour: true,
    dependencies: ['waterproofing']
  }
};

export const projectTypeWorkOrders: Record<ProjectType, WorkOrderType[]> = {
  walls: [
    'site_visit',
    'deliver_forms',
    'walls',
    'strip',
    'pickup_forms'
  ],
  walls_waterproofing: [
    'site_visit',
    'deliver_forms',
    'walls',
    'strip',
    'pickup_forms',
    'waterproofing'
  ],
  walls_floors_waterproofing: [
    'site_visit',
    'deliver_forms',
    'walls',
    'strip',
    'pickup_forms',
    'waterproofing',
    'flatwork'
  ]
};

export function generateWorkOrdersForProject(
  projectId: string,
  projectType: ProjectType,
  startDate: string
): Partial<WorkOrder>[] {
  const workOrderTypes = projectTypeWorkOrders[projectType];
  let currentDate = new Date(startDate);
  
  return workOrderTypes.map(type => {
    const template = workOrderTemplates[type];
    const workOrder: Partial<WorkOrder> = {
      projectId,
      type,
      status: 'draft',
      scheduledDate: currentDate.toISOString(),
      estimatedDuration: template.estimatedDuration,
      crews: [],
      checklist: template.requiredChecklist.map((task, index) => ({
        id: `${type}-${index}`,
        task,
        required: true,
        completed: false
      }))
    };

    if (template.requiresInspection) {
      workOrder.inspectionDetails = {
        scheduledAt: currentDate.toISOString()
      };
    }

    if (template.requiresPour) {
      workOrder.pourDetails = {
        scheduledAt: currentDate.toISOString()
      };
    }

    if (template.requiredVendorTypes.length > 0) {
      workOrder.vendors = template.requiredVendorTypes.map(type => ({
        type: type as any,
        vendorId: ''
      }));
    }

    // Add 1 day for the next work order
    currentDate.setDate(currentDate.getDate() + 1);
    
    return workOrder;
  });
}