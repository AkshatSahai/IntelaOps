'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ROLE_DEFINITIONS, ARTIFACT_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { RoleId, ArtifactTypeId, Session } from '@/lib/types';

function CreatePageContent(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as RoleId | null;
  const [creating, setCreating] = useState<ArtifactTypeId | null>(null);

  const roleDef = role ? ROLE_DEFINITIONS.find((r) => r.id === role) : null;
  const availableArtifacts = roleDef
    ? ARTIFACT_TYPES.filter((a) => roleDef.artifactTypes.includes(a.id as ArtifactTypeId))
    : [];

  async function handleStart(artifactTypeId: ArtifactTypeId): Promise<void> {
    if (!role || creating) return;
    setCreating(artifactTypeId);
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'guided', role, artifactTypeId }),
      });
      const data = (await res.json()) as { session?: Session; error?: string };
      if (!res.ok || !data.session) throw new Error(data.error ?? 'Failed to create session');
      router.push(`/create/${data.session.id}?role=${role}&artifactType=${artifactTypeId}`);
    } catch {
      setCreating(null);
    }
  }

  if (!role) {
    return (
      <div className="mx-auto max-w-3xl py-2">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create Artifact</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No role selected. Please{' '}
            <button
              onClick={() => router.push('/')}
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              select a role
            </button>{' '}
            first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-2">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Create Artifact</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose an artifact type to start a guided creation session.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {availableArtifacts.map((artifact) => (
          <ArtifactCard
            key={artifact.id}
            name={artifact.name}
            description={artifact.description}
            sections={artifact.requiredSections}
            loading={creating === artifact.id}
            disabled={creating !== null && creating !== artifact.id}
            onStart={() => handleStart(artifact.id as ArtifactTypeId)}
          />
        ))}
      </div>
    </div>
  );
}

interface ArtifactCardProps {
  name: string;
  description: string;
  sections: readonly string[];
  loading: boolean;
  disabled: boolean;
  onStart: () => void;
}

function ArtifactCard({
  name,
  description,
  sections,
  loading,
  disabled,
  onStart,
}: ArtifactCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border bg-card p-5 transition-all duration-150',
        !disabled && 'hover:border-primary/40 hover:shadow-sm',
        disabled && 'opacity-60',
      )}
    >
      <h3 className="text-sm font-semibold text-foreground">{name}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-4 border-t pt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Sections ({sections.length})
        </p>
        <div className="flex flex-wrap gap-1">
          {sections.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
          {sections.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              +{sections.length - 4} more
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={loading || disabled}
        className={cn(
          'mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          loading || disabled
            ? 'cursor-not-allowed bg-muted text-muted-foreground'
            : 'bg-primary text-primary-foreground hover:bg-primary/90',
        )}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <>
            Start <ArrowRight size={13} />
          </>
        )}
      </button>
    </div>
  );
}

export default function CreatePage(): React.JSX.Element {
  return (
    <div className="h-full overflow-y-auto p-6">
      <Suspense
        fallback={
          <div className="flex h-32 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        }
      >
        <CreatePageContent />
      </Suspense>
    </div>
  );
}
