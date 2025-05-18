import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  CreditCard,
  Settings,
  Package,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const mainNavItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Package,
    label: 'Product',
    href: '/dashboard/product',
  },
  {
    icon: ShoppingBag,
    label: 'Orders',
    href: '/dashboard/orders',
  },
  {
    icon: CreditCard,
    label: 'Payments',
    href: '/dashboard/payments',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    href: '/dashboard/analytics',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
  },
];

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-background transition-all sm:flex',
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4 py-2 lg:h-16">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <ShoppingBag className="h-5 w-5" />
          <span>NicheNinja</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6">
        <div className="px-3">
          <div className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main
          </div>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                  location.pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NicheNinja</p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;