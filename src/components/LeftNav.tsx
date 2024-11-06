import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Calendar,
  Users,
  HardHat,
  UserCircle,
  Building,
  MapPin,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Truck,
  Shield,
  BarChart3,
  Settings
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Schedule', href: '/schedule', icon: Calendar },
  { title: 'Projects', href: '/projects', icon: Home },
  { title: 'Work Orders', href: '/work-orders', icon: ClipboardList },
  { title: 'Customers', href: '/customers', icon: Users },
  { title: 'Crews', href: '/crews', icon: HardHat },
  { title: 'Employees', href: '/employees', icon: UserCircle },
  { title: 'Vendors', href: '/vendors', icon: Building },
  { title: 'Locations', href: '/locations', icon: MapPin },
  { title: 'Fleet', href: '/fleet', icon: Truck },
  { title: 'Safety', href: '/safety', icon: Shield },
  { title: 'Reports', href: '/reports', icon: BarChart3 }
];

interface LeftNavProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const LeftNav: React.FC<LeftNavProps> = ({ isOpen, onToggle, isMobile }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[hsl(var(--bg-sidebar))] border-r border-[hsl(var(--border-light))] transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-4 border-b border-[hsl(var(--border-light))]">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            {isOpen && (
              <span className="font-semibold text-[hsl(var(--text-primary))] truncate">True Concrete</span>
            )}
          </Link>
          {isMobile && (
            <button onClick={onToggle} className="md:hidden p-2 ml-auto">
              <Menu className="h-5 w-5 text-[hsl(var(--text-secondary))]" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link ${
                location.pathname === item.href
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              {React.createElement(item.icon, {
                className: "h-5 w-5 flex-shrink-0"
              })}
              {isOpen && (
                <span className="truncate">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-2">
          <Link
            to="/settings"
            className={`nav-link ${
              location.pathname === '/settings'
                ? 'nav-link-active'
                : 'nav-link-inactive'
            }`}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="truncate">Settings</span>}
          </Link>
        </div>

        <div className="border-t border-[hsl(var(--border-light))] p-4">
          <div className={`flex items-center gap-2 mb-4 ${isOpen ? '' : 'justify-center'}`}>
            <UserCircle className="h-8 w-8 flex-shrink-0 text-[hsl(var(--text-light))]" />
            {isOpen && (
              <div className="min-w-0">
                <p className="font-medium text-[hsl(var(--text-primary))] truncate">John Doe</p>
                <p className="text-sm text-[hsl(var(--text-secondary))] truncate">john@example.com</p>
              </div>
            )}
          </div>
          <Link
            to="/logout"
            className={`nav-link text-[hsl(var(--error))] hover:bg-[hsl(var(--error))/10] ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </Link>
        </div>

        {!isMobile && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-20 bg-white border border-[hsl(var(--border-light))] rounded-full p-1.5 hover:bg-[hsl(var(--secondary))] transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftNav;