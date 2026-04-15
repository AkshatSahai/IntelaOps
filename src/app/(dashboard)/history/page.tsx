export default function HistoryPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Session History</h2>
        <p className="text-muted-foreground">
          Browse and search your past guided and advisory sessions.
        </p>
      </div>
      {/* TODO: session list with search */}
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Session history coming in Session 1.
      </div>
    </div>
  );
}
