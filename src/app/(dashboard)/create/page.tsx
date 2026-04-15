export default function CreatePage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Create Artifact</h2>
        <p className="text-muted-foreground">
          Choose an artifact type to start a guided creation session.
        </p>
      </div>
      {/* TODO: artifact type selector grid */}
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Artifact type selector coming in Session 1.
      </div>
    </div>
  );
}
