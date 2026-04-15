'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MessageRole } from '@/lib/types';

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({
  role,
  content,
  isStreaming = false,
}: MessageBubbleProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  async function handleCopy(): Promise<void> {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn('group flex w-full gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar dot */}
      <div
        className={cn(
          'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border bg-muted text-muted-foreground',
        )}
      >
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          'relative max-w-[78%] rounded-xl px-4 py-3 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border bg-card text-foreground shadow-sm',
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        ) : (
          <>
            <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed [&>:first-child]:mt-0 [&>:last-child]:mb-0">
              <ReactMarkdown>{content}</ReactMarkdown>
              {isStreaming && !content && (
                <span className="inline-flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </span>
              )}
              {isStreaming && content && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-foreground/50 align-middle" />
              )}
            </div>

            {/* Copy button — visible on hover when not streaming */}
            {!isStreaming && content && (
              <button
                onClick={handleCopy}
                className={cn(
                  'absolute -right-2 -top-2 hidden rounded-md border bg-card p-1 shadow-sm transition-colors group-hover:flex',
                  'items-center justify-center',
                  copied
                    ? 'border-green-300 bg-green-50 text-green-600'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
                title="Copy message"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
