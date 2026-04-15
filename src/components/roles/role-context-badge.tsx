import { Layout, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoleId } from '@/lib/types';

interface RoleContextBadgeProps {
  role: RoleId;
  className?: string;
}

const ROLE_META: Record<RoleId, { label: string; Icon: React.ElementType }> = {
  'product-owner': { label: 'Product Owner', Icon: Layout },
  'business-analyst': { label: 'Business Analyst', Icon: BarChart3 },
};

export function RoleContextBadge({ role, className }: RoleContextBadgeProps): React.JSX.Element {
  const { label, Icon } = ROLE_META[role];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-0.5 text-xs font-medium text-primary',
        className,
      )}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}
