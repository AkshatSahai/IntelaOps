export default function AdvisorPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Advisory Session</h2>
        <p className="text-muted-foreground">
          Describe your challenge and I&apos;ll help you think through it.
        </p>
      </div>
      {/* TODO: start advisory session button → redirects to /advisor/[sessionId] */}
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Advisory session start coming in Session 1.
      </div>
    </div>
  );
}
