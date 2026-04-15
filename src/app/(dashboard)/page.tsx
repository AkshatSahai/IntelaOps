export default function DashboardHomePage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Select your role to get started, or pick up where you left off.
        </p>
      </div>
      {/* TODO: RoleSelector + recent sessions list */}
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Role selector and recent sessions coming in Session 1.
      </div>
    </div>
  );
}
