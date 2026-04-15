'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Session } from '@/lib/types';

export default function HistoryPage(): React.JSX.Element {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/sessions')
      .then((r) => r.json())
      .then((data: { sessions?: Session[] }) => setSessions(data.sessions ?? []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = query.trim()
    ? sessions.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    : sessions;

  function navigate(session: Session): void {
    const dest =
      session.mode === 'guided'
        ? `/create/${session.id}?role=${session.role}&artifactType=${session.artifactTypeId ?? ''}`
        : `/advisor/${session.id}?role=${session.role}`;
    router.push(dest);
  }

  return (
    <div className="h-full overflow-y-auto p-6">
    <div className="mx-auto max-w-3xl py-2">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Session History</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and resume your guided and advisory sessions.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search sessions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            'w-full rounded-lg border bg-card py-2 pl-9 pr-4 text-sm',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
          )}
        />
      </div>

      {/* Sessions list */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[72px] animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <Clock size={28} className="mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-sm font-medium text-muted-foreground">
            {query ? 'No sessions match your search.' : 'No sessions yet.'}
          </p>
          {!query && (
            <p className="mt-1 text-xs text-muted-foreground">
              Sessions you create will appear here.
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          {filtered.map((session, idx) => (
            <SessionRow
              key={session.id}
              session={session}
              isLast={idx === filtered.length - 1}
              onNavigate={() => navigate(session)}
            />
          ))}
        </div>
      )}

      {!loading && sessions.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {filtered.length} of {sessions.length} sessions
        </p>
      )}
    </div>
    </div>
  );
}

interface SessionRowProps {
  session: Session;
  isLast: boolean;
  onNavigate: () => void;
}

function SessionRow({ session, isLast, onNavigate }: SessionRowProps): React.JSX.Element {
  const roleLabel = session.role === 'product-owner' ? 'Product Owner' : 'Business Analyst';
  const modeLabel = session.mode === 'guided' ? 'Guided' : 'Advisory';
  const updatedAt = new Date(session.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-accent',
        !isLast && 'border-b',
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{session.title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <Badge label={roleLabel} color="blue" />
          <Badge label={modeLabel} color="gray" />
          <Badge
            label={session.status}
            color={
              session.status === 'active'
                ? 'green'
                : session.status === 'completed'
                  ? 'gray'
                  : 'gray'
            }
          />
        </div>
      </div>
      <div className="ml-6 shrink-0 text-right">
        <p className="text-xs text-muted-foreground">{updatedAt}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-primary">
          Resume <ArrowRight size={11} />
        </p>
      </div>
    </button>
  );
}

type BadgeColor = 'blue' | 'gray' | 'green';

function Badge({ label, color }: { label: string; color: BadgeColor }): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize',
        color === 'blue' && 'bg-primary/[0.08] text-primary',
        color === 'gray' && 'bg-muted text-muted-foreground',
        color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      )}
    >
      {label}
    </span>
  );
}
