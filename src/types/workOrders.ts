import { z } from 'zod';

export type WorkOrderType = 
  | 'site_visit'
  | 'deliver_forms'
  | 'walls'
  | 'strip'
  | 'pickup_forms'
  | 'waterproofing'
  | 'flatwork';

export type ProjectType = 
  | 'walls'
  | 'walls_waterproofing'
  | 'walls_floors_waterproofing';

export type WorkOrderStatus = 
  | 'draft'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'on_hold';

export type VendorType = 
  | 'plumber'
  | 'excavator'
  | 'concrete'
  | 'pump'
  | 'materials';

export interface WorkOrder {
  id: string;
  projectId: string;
  type: WorkOrderType;
  status: WorkOrderStatus;
  scheduledDate: string;
  estimatedDuration: number; // in minutes
  estimatedCompletionDate?: string;
  actualCompletionDate?: string;
  rescheduleInfo?: {
    date: string;
    reason: string;
  };
  crews: {
    id: string;
    isPrimary: boolean;
    role?: string;
  }[];
  vendors?: {
    type: VendorType;
    vendorId: string;
    notes?: string;
  }[];
  dependencies?: string[]; // Work Order IDs that must be completed first
  checklist: {
    id: string;
    task: string;
    required: boolean;
    completed: boolean;
    completedAt?: string;
    completedBy?: string;
  }[];
  notes?: string;
  inspectionDetails?: {
    scheduledAt: string;
    inspector?: string;
    result?: 'pass' | 'fail';
    notes?: string;
  };
  pourDetails?: {
    scheduledAt: string;
    estimatedQuantity?: number;
    actualQuantity?: number;
    mix?: string;
    notes?: string;
  };
  materials?: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    notes?: string;
  }[];
  weather?: {
    temperature?: number;
    conditions?: string;
    windSpeed?: number;
    precipitation?: number;
  };
}

export interface Project {
  id: string;
  type: ProjectType;
  name: string;
  customer: string;
  location: string;
  status: 'active' | 'completed' | 'on_hold';
  startDate: string;
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  workOrders: WorkOrder[];
  materials?: {
    id: string;
    name: string;
    estimatedQuantity: number;
    actualQuantity?: number;
    unit: string;
    notes?: string;
  }[];
}

// Zod schemas for validation
export const workOrderSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  type: z.enum([
    'site_visit',
    'deliver_forms',
    'walls',
    'strip',
    'pickup_forms',
    'waterproofing',
    'flatwork'
  ]),
  status: z.enum([
    'draft',
    'scheduled',
    'in_progress',
    'completed',
    'cancelled',
    'on_hold'
  ]),
  scheduledDate: z.string(),
  estimatedDuration: z.number(),
  estimatedCompletionDate: z.string().optional(),
  actualCompletionDate: z.string().optional(),
  rescheduleInfo: z.object({
    date: z.string(),
    reason: z.string()
  }).optional(),
  crews: z.array(z.object({
    id: z.string(),
    isPrimary: z.boolean(),
    role: z.string().optional()
  })),
  vendors: z.array(z.object({
    type: z.enum(['plumber', 'excavator', 'concrete', 'pump', 'materials']),
    vendorId: z.string(),
    notes: z.string().optional()
  })).optional(),
  dependencies: z.array(z.string()).optional(),
  checklist: z.array(z.object({
    id: z.string(),
    task: z.string(),
    required: z.boolean(),
    completed: z.boolean(),
    completedAt: z.string().optional(),
    completedBy: z.string().optional()
  })),
  notes: z.string().optional(),
  inspectionDetails: z.object({
    scheduledAt: z.string(),
    inspector: z.string().optional(),
    result: z.enum(['pass', 'fail']).optional(),
    notes: z.string().optional()
  }).optional(),
  pourDetails: z.object({
    scheduledAt: z.string(),
    estimatedQuantity: z.number().optional(),
    actualQuantity: z.number().optional(),
    mix: z.string().optional(),
    notes: z.string().optional()
  }).optional(),
  materials: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    notes: z.string().optional()
  })).optional(),
  weather: z.object({
    temperature: z.number().optional(),
    conditions: z.string().optional(),
    windSpeed: z.number().optional(),
    precipitation: z.number().optional()
  }).optional()
});

export const projectSchema = z.object({
  id: z.string(),
  type: z.enum(['walls', 'walls_waterproofing', 'walls_floors_waterproofing']),
  name: z.string(),
  customer: z.string(),
  location: z.string(),
  status: z.enum(['active', 'completed', 'on_hold']),
  startDate: z.string(),
  estimatedCompletionDate: z.string(),
  actualCompletionDate: z.string().optional(),
  workOrders: z.array(workOrderSchema),
  materials: z.array(z.object({
    id: z.string(),
    name: z.string(),
    estimatedQuantity: z.number(),
    actualQuantity: z.number().optional(),
    unit: z.string(),
    notes: z.string().optional()
  })).optional()
});