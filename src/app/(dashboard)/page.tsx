'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { RoleSelector } from '@/components/roles/role-selector';
import { cn } from '@/lib/utils';
import type { RoleId, Session } from '@/lib/types';

// Inner component uses useSearchParams → must be wrapped in Suspense
function DashboardHomeContent(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as RoleId | null;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sessions')
      .then((r) => r.json())
      .then((data: { sessions?: Session[] }) => {
        setSessions(data.sessions?.slice(0, 5) ?? []);
      })
      .catch(() => setSessions([]))
      .finally(() => setSessionsLoading(false));
  }, []);

  function handleRoleSelect(r: RoleId): void {
    const params = new URLSearchParams(searchParams.toString());
    params.set('role', r);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-2">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select your role to get started, or pick up where you left off.
        </p>
      </div>

      {/* Role selector */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select your role
        </h2>
        <RoleSelector selectedRole={role} onSelect={handleRoleSelect} />
      </section>

      {/* Action paths — shown after role is selected */}
      {role && (
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What would you like to do?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              icon={<Plus size={18} className="text-primary" />}
              title="Create a Work Item"
              description="Start a guided session to create a polished artifact — user story, BRD, feasibility assessment, and more."
              onClick={() => router.push(`/create?role=${role}`)}
            />
            <ActionCard
              icon={<MessageCircle size={18} className="text-primary" />}
              title="Talk Through a Problem"
              description="Open an advisory session for strategic thinking, coaching, and working through blockers."
              onClick={() => router.push(`/advisor?role=${role}`)}
            />
          </div>
        </section>
      )}

      {/* Recent sessions */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent sessions
        </h2>
        {sessionsLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-card p-8 text-center">
            <Clock size={24} className="mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No sessions yet.</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Select a role above to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-card">
            {sessions.map((session, idx) => (
              <SessionRow
                key={session.id}
                session={session}
                isLast={idx === sessions.length - 1}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function ActionCard({ icon, title, description, onClick }: ActionCardProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group rounded-xl border bg-card p-5 text-left transition-all duration-150',
        'hover:border-primary/40 hover:shadow-sm',
      )}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08]">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Get started <ArrowRight size={12} />
      </div>
    </button>
  );
}

interface SessionRowProps {
  session: Session;
  isLast: boolean;
}

function SessionRow({ session, isLast }: SessionRowProps): React.JSX.Element {
  const router = useRouter();

  function navigate(): void {
    const dest =
      session.mode === 'guided'
        ? `/create/${session.id}?role=${session.role}&artifactType=${session.artifactTypeId ?? ''}`
        : `/advisor/${session.id}?role=${session.role}`;
    router.push(dest);
  }

  const roleLabel = session.role === 'product-owner' ? 'PO' : 'BA';
  const modeLabel = session.mode === 'guided' ? 'Guided' : 'Advisory';
  const date = new Date(session.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <button
      onClick={navigate}
      className={cn(
        'flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-accent',
        !isLast && 'border-b',
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{session.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <Badge label={roleLabel} color="blue" />
          <Badge label={modeLabel} color="gray" />
          <Badge label={session.status} color={session.status === 'active' ? 'green' : 'gray'} />
        </div>
      </div>
      <div className="ml-4 shrink-0 text-right">
        <p className="text-xs text-muted-foreground">{date}</p>
        <ArrowRight size={13} className="ml-auto mt-1 text-muted-foreground/40" />
      </div>
    </button>
  );
}

type BadgeColor = 'blue' | 'gray' | 'green';

function Badge({ label, color }: { label: string; color: BadgeColor }): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium',
        color === 'blue' && 'bg-primary/[0.08] text-primary',
        color === 'gray' && 'bg-muted text-muted-foreground',
        color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      )}
    >
      {label}
    </span>
  );
}

export default function DashboardHomePage(): React.JSX.Element {
  return (
    <div className="h-full overflow-y-auto p-6">
      <Suspense
        fallback={
          <div className="flex h-32 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        }
      >
        <DashboardHomeContent />
      </Suspense>
    </div>
  );
}
