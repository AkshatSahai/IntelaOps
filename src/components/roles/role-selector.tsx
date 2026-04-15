"use client";

import { cn } from "@/lib/utils";
import { ROLE_DEFINITIONS } from "@/lib/constants";
import type { RoleId } from "@/lib/types";

interface RoleSelectorProps {
  selectedRole: RoleId | null;
  onSelect: (role: RoleId) => void;
}

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ROLE_DEFINITIONS.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className={cn(
            "rounded-lg border p-6 text-left transition-colors",
            "hover:border-primary hover:bg-accent",
            selectedRole === role.id
              ? "border-primary bg-accent"
              : "border-border bg-card"
          )}
        >
          <h3 className="font-semibold text-foreground">{role.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {role.artifactTypes.length} artifact types
          </p>
        </button>
      ))}
    </div>
  );
}
