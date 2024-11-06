import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Crews from './pages/Crews';
import CrewDetail from './pages/CrewDetail';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Calendar from './pages/Calendar';
import Schedule from './pages/Schedule';
import WorkOrders from './pages/WorkOrders';
import WorkOrderDetail from './pages/WorkOrderDetail';
import NewWorkOrder from './pages/NewWorkOrder';
import RecurringWorkOrderDetail from './pages/RecurringWorkOrderDetail';
import Vendors from './pages/Vendors';
import VendorDetail from './pages/VendorDetail';
import Locations from './pages/Locations';
import Fleet from './pages/fleet/Fleet';
import Safety from './pages/Safety';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/crews" element={<Crews />} />
      <Route path="/crews/:id" element={<CrewDetail />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<EmployeeDetail />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/work-orders" element={<WorkOrders />} />
      <Route path="/work-orders/new" element={<NewWorkOrder />} />
      <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
      <Route path="/work-orders/recurring/:id" element={<RecurringWorkOrderDetail />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/vendors/:id" element={<VendorDetail />} />
      <Route path="/locations/*" element={<Locations />} />
      <Route path="/fleet/*" element={<Fleet />} />
      <Route path="/safety/*" element={<Safety />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;