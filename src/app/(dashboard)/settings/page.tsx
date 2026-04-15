export default function SettingsPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your display name and default role.
        </p>
      </div>
      {/* TODO: settings form for display name + default role */}
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Settings form coming in Session 1.
      </div>
    </div>
  );
}
