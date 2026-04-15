"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ArtifactTypeId } from "@/lib/types";

interface ArtifactPreviewProps {
  content: string;
  artifactType: ArtifactTypeId;
}

export function ArtifactPreview({ content, artifactType }: ArtifactPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const label = artifactType
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-medium">{label}</span>
        <button
          onClick={handleCopy}
          className={cn(
            "rounded px-3 py-1 text-xs font-medium transition-colors",
            copied
              ? "bg-green-100 text-green-700"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none p-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
