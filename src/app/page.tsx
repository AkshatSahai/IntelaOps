import Link from "next/link";

export default function LandingPage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Operations Co-Pilot</h1>
          <p className="text-muted-foreground">
            AI-powered guidance for product owners and business analysts.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors text-center"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="w-full rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors text-center"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
