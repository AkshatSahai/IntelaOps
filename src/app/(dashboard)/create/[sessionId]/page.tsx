import { Suspense } from 'react';
import { ChatContainer } from '@/components/chat/chat-container';
import { getArtifactType } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { RoleId, ArtifactTypeId } from '@/lib/types';

interface CreateSessionPageProps {
  params: { sessionId: string };
  searchParams: { role?: string; artifactType?: string };
}

export default function CreateSessionPage({
  params,
  searchParams,
}: CreateSessionPageProps): React.JSX.Element {
  const role = (searchParams.role ?? 'product-owner') as RoleId;
  const artifactType = (searchParams.artifactType ?? 'user-story-feature') as ArtifactTypeId;

  let artifactName = artifactType
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  try {
    artifactName = getArtifactType(artifactType).name;
  } catch {
    // use default
  }

  return (
    <div className="flex h-full flex-col">
      {/* Session header bar */}
      <div className="flex shrink-0 items-center gap-3 border-b bg-card px-6 py-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            'bg-primary/[0.08] text-primary',
          )}
        >
          Guided
        </span>
        <span className="text-sm font-medium text-foreground">{artifactName}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          Session {params.sessionId.slice(0, 8)}…
        </span>
      </div>

      {/* Chat area — fills remaining space */}
      <div className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={null}>
          <ChatContainer
            sessionId={params.sessionId}
            mode="guided"
            role={role}
            artifactType={artifactType}
          />
        </Suspense>
      </div>
    </div>
  );
}
