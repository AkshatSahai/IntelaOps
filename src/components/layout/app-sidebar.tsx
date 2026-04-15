'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Plus,
  MessageCircle,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: Home, exact: true },
  { href: '/create', label: 'Create', icon: Plus, exact: false },
  { href: '/advisor', label: 'Advisor', icon: MessageCircle, exact: false },
  { href: '/history', label: 'History', icon: Clock, exact: false },
  { href: '/settings', label: 'Settings', icon: Settings, exact: false },
] as const;

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps): React.JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  function isActive(href: string, exact: boolean): boolean {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        'relative flex shrink-0 flex-col border-r bg-[#fafafa] transition-all duration-200',
        collapsed ? 'w-[60px]' : 'w-[240px]',
        className,
      )}
    >
      {/* Logo bar */}
      <div
        className={cn(
          'flex h-14 shrink-0 items-center border-b px-3',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!collapsed && (
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            Ops Co-Pilot
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-2',
                active
                  ? 'bg-primary/[0.08] text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon size={15} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
