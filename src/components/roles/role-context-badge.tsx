import { cn } from "@/lib/utils";
import type { RoleId } from "@/lib/types";

interface RoleContextBadgeProps {
  role: RoleId;
  className?: string;
}

const ROLE_LABELS: Record<RoleId, string> = {
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
