import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

interface RoleContextBadgeProps {
  role: Role;
  className?: string;
}

const ROLE_LABELS: Record<Role, string> = {
  "product-owner": "Product Owner",
  "business-analyst": "Business Analyst",
};

export function RoleContextBadge({ role, className }: RoleContextBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}
