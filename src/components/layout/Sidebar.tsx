import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  FileText,
  Settings2,
  LayoutDashboard,
  FlaskConical,
  BarChart3,
  AlertTriangle,
  ClipboardCheck,
  Shield,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Document Control',
    href: '/documents',
    icon: <FileText className="h-5 w-5" />,
    children: [
      { title: 'All Documents', href: '/documents' },
      { title: 'Pending Review', href: '/documents/pending' },
      { title: 'Create New', href: '/documents/create' },
      { title: 'Templates', href: '/documents/templates' },
    ],
  },
  {
    title: 'Instruments',
    href: '/instruments',
    icon: <FlaskConical className="h-5 w-5" />,
    children: [
      { title: 'Master List', href: '/instruments' },
      { title: 'Maintenance Logs', href: '/instruments/maintenance' },
      { title: 'Calibration', href: '/instruments/calibration' },
      { title: 'QC Logs', href: '/instruments/qc' },
    ],
  },
  {
    title: 'KPIs & Analytics',
    href: '/kpis',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Risk Management',
    href: '/risks',
    icon: <AlertTriangle className="h-5 w-5" />,
    children: [
      { title: 'Risk Register', href: '/risks' },
      { title: 'CAPA', href: '/risks/capa' },
      { title: 'Non-Conformities', href: '/risks/nc' },
    ],
  },
  {
    title: 'Audits',
    href: '/audits',
    icon: <ClipboardCheck className="h-5 w-5" />,
    children: [
      { title: 'Audit Schedule', href: '/audits' },
      { title: 'Checklists', href: '/audits/checklists' },
      { title: 'Findings', href: '/audits/findings' },
    ],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings2 className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Document Control']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo/Header */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">PathLab QMS</span>
          <span className="text-[10px] text-sidebar-foreground/60">ISO 9001:2015</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.title}
                    </span>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <ul className="mt-1 space-y-1 pl-10">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm transition-colors',
                              location.pathname === child.href
                                ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium'
                                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground'
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent/50 p-3">
          <p className="text-xs text-sidebar-foreground/60">Compliance Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-status-approved" />
            <span className="text-sm font-medium text-sidebar-foreground">Compliant</span>
          </div>
          <p className="mt-1 text-[10px] text-sidebar-foreground/50">Last audit: Oct 2024</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-primary p-2 text-primary-foreground shadow-lg lg:hidden"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-64">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
