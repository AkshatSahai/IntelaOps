import { Suspense } from 'react';
import { ChatContainer } from '@/components/chat/chat-container';
import { cn } from '@/lib/utils';
import type { RoleId } from '@/lib/types';

interface AdvisorSessionPageProps {
  params: { sessionId: string };
  searchParams: { role?: string };
}

export default function AdvisorSessionPage({
  params,
  searchParams,
}: AdvisorSessionPageProps): React.JSX.Element {
  const role = (searchParams.role ?? 'product-owner') as RoleId;

  return (
    <div className="flex h-full flex-col">
      {/* Session header bar */}
      <div className="flex shrink-0 items-center gap-3 border-b bg-card px-6 py-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            'bg-muted text-muted-foreground',
          )}
        >
          Advisory
        </span>
        <span className="text-sm font-medium text-foreground">Open conversation</span>
        <span className="ml-auto text-xs text-muted-foreground">
          Session {params.sessionId.slice(0, 8)}…
        </span>
      </div>

      {/* Chat area */}
      <div className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={null}>
          <ChatContainer
            sessionId={params.sessionId}
            mode="advisory"
            role={role}
          />
        </Suspense>
      </div>
    </div>
  );
}
