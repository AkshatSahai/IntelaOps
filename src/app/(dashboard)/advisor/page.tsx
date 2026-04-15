'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoleId, Session } from '@/lib/types';

function AdvisorPageContent(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') ?? 'product-owner') as RoleId;
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStart(): Promise<void> {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'advisory', role }),
      });
      const data = (await res.json()) as { session?: Session; error?: string };
      if (!res.ok || !data.session) throw new Error(data.error ?? 'Failed to create session');
      router.push(`/advisor/${data.session.id}?role=${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl py-2">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Advisory Session</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Think out loud with your AI advisor. No output artifacts — just focused conversation.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.08]">
            <MessageCircle size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">What would you like to talk through?</p>
            <p className="text-xs text-muted-foreground">Optional — you can jump right in</p>
          </div>
        </div>

        <textarea
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. I'm struggling with how to prioritise my backlog this sprint. My stakeholders have conflicting priorities…"
          disabled={loading}
          className={cn(
            'w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm leading-relaxed',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
            loading && 'opacity-60',
          )}
        />

        {error && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}

        <button
          onClick={handleStart}
          disabled={loading}
          className={cn(
            'mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
            loading
              ? 'cursor-not-allowed bg-primary/60 text-primary-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Starting session…
            </>
          ) : (
            'Start Session'
          )}
        </button>
      </div>
    </div>
  );
}

export default function AdvisorPage(): React.JSX.Element {
  return (
    <div className="h-full overflow-y-auto p-6">
      <Suspense
        fallback={
          <div className="flex h-32 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        }
      >
        <AdvisorPageContent />
      </Suspense>
    </div>
  );
}
