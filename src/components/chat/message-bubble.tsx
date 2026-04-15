"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { MessageRole } from "@/lib/types";

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming = false }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-current" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
