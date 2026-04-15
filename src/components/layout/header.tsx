import { RoleContextBadge } from "@/components/roles/role-context-badge";
import type { Role } from "@/lib/types";

interface HeaderProps {
  role?: Role;
  userEmail?: string;
}

export function Header({ role, userEmail }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        {role && <RoleContextBadge role={role} />}
      </div>
      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="text-sm text-muted-foreground">{userEmail}</span>
        )}
      </div>
    </header>
  );
}
