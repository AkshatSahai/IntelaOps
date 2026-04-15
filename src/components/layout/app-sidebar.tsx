import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/create", label: "Create", description: "New guided artifact" },
  { href: "/advisor", label: "Advisor", description: "Advisory session" },
  { href: "/history", label: "History", description: "Past sessions" },
  { href: "/settings", label: "Settings", description: "Preferences" },
] as const;

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-60 flex-col border-r bg-card px-3 py-4",
        className
      )}
    >
      <div className="mb-6 px-3">
        <h1 className="text-sm font-semibold tracking-tight">
          Operations Co-Pilot
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col rounded-md px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "text-muted-foreground"
            )}
          >
            <span className="font-medium text-foreground">{item.label}</span>
            <span className="text-xs">{item.description}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
