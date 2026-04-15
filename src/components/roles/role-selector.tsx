'use client';

import { Layout, BarChart3, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROLE_DEFINITIONS } from '@/lib/constants';
import type { RoleId } from '@/lib/types';

const ROLE_ICONS: Record<RoleId, React.ElementType> = {
  'product-owner': Layout,
  'business-analyst': BarChart3,
};

interface RoleSelectorProps {
  selectedRole: RoleId | null;
  onSelect: (role: RoleId) => void;
}

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps): React.JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ROLE_DEFINITIONS.map((role) => {
        const Icon = ROLE_ICONS[role.id];
        const active = selectedRole === role.id;
        return (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={cn(
              'group relative rounded-xl border p-6 text-left transition-all duration-150',
              'hover:border-primary/40 hover:shadow-sm',
              active
                ? 'border-primary/60 bg-primary/[0.04] shadow-sm'
                : 'border-border bg-card',
            )}
          >
            {active && (
              <CheckCircle2
                size={16}
                className="absolute right-4 top-4 text-primary"
              />
            )}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.08]">
              <Icon size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{role.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{role.description}</p>

            <div className="mt-4 border-t pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Advisory capabilities
              </p>
              <ul className="space-y-1">
                {role.advisoryCapabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        );
      })}
    </div>
  );
}
