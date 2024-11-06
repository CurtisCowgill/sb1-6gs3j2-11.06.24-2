import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { WorkOrder, Project } from '../types/workOrders';
import { workOrderSchema, projectSchema } from '../types/workOrders';
import { generateWorkOrdersForProject } from '../utils/workOrderTemplates';
import { useToastContext } from '../context/ToastContext';

export function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const { showToast } = useToastContext();

  const validateWorkOrder = useCallback((workOrder: Partial<WorkOrder>) => {
    try {
      return workOrderSchema.parse(workOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`);
        throw new Error(`Validation failed: ${issues.join(', ')}`);
      }
      throw error;
    }
  }, []);

  const createWorkOrder = useCallback((workOrder: Partial<WorkOrder>) => {
    try {
      const validatedWorkOrder = validateWorkOrder(workOrder);
      setWorkOrders(prev => [...prev, validatedWorkOrder]);
      showToast('Work order created successfully', 'success');
      return validatedWorkOrder;
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to create work order', 'error');
      throw error;
    }
  }, [validateWorkOrder, showToast]);

  const updateWorkOrder = useCallback((id: string, updates: Partial<WorkOrder>) => {
    try {
      setWorkOrders(prev => {
        const index = prev.findIndex(wo => wo.id === id);
        if (index === -1) {
          throw new Error('Work order not found');
        }

        const updatedWorkOrder = { ...prev[index], ...updates };
        validateWorkOrder(updatedWorkOrder);

        const newWorkOrders = [...prev];
        newWorkOrders[index] = updatedWorkOrder;
        return newWorkOrders;
      });
      showToast('Work order updated successfully', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to update work order', 'error');
      throw error;
    }
  }, [validateWorkOrder, showToast]);

  const deleteWorkOrder = useCallback((id: string) => {
    try {
      setWorkOrders(prev => {
        const index = prev.findIndex(wo => wo.id === id);
        if (index === -1) {
          throw new Error('Work order not found');
        }

        const newWorkOrders = [...prev];
        newWorkOrders.splice(index, 1);
        return newWorkOrders;
      });
      showToast('Work order deleted successfully', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to delete work order', 'error');
      throw error;
    }
  }, [showToast]);

  const generateProjectWorkOrders = useCallback((project: Project) => {
    try {
      projectSchema.parse(project);
      const workOrders = generateWorkOrdersForProject(
        project.id,
        project.type,
        project.startDate
      );
      
      const createdWorkOrders = workOrders.map(wo => createWorkOrder(wo));
      showToast(`Generated ${createdWorkOrders.length} work orders for project`, 'success');
      return createdWorkOrders;
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to generate work orders', 'error');
      throw error;
    }
  }, [createWorkOrder, showToast]);

  const getWorkOrdersByProject = useCallback((projectId: string) => {
    return workOrders.filter(wo => wo.projectId === projectId);
  }, [workOrders]);

  const getDependentWorkOrders = useCallback((workOrderId: string) => {
    return workOrders.filter(wo => wo.dependencies?.includes(workOrderId));
  }, [workOrders]);

  return {
    workOrders,
    createWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,
    generateProjectWorkOrders,
    getWorkOrdersByProject,
    getDependentWorkOrders
  };
}