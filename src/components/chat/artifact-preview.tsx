'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getArtifactType } from '@/lib/constants';
import type { ArtifactTypeId } from '@/lib/types';

interface ArtifactPreviewProps {
  content: string;
  artifactType: ArtifactTypeId;
  title?: string;
}

export function ArtifactPreview({
  content,
  artifactType,
  title,
}: ArtifactPreviewProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  let artifactName = title;
  if (!artifactName) {
    try {
      artifactName = getArtifactType(artifactType).name;
    } catch {
      artifactName = artifactType
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.02] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/10 bg-primary/[0.04] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/[0.12]">
            <FileText size={13} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Artifact Generated
            </p>
            <p className="text-sm font-semibold text-foreground">{artifactName}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            copied
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30',
          )}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Content */}
      <div className="prose prose-sm dark:prose-invert max-w-none p-5 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
