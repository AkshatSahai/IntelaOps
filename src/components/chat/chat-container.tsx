"use client";

import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "@/components/chat/message-bubble";
import { InputBar } from "@/components/chat/input-bar";
import { ArtifactPreview } from "@/components/chat/artifact-preview";
import type { ArtifactType, MessageRole, SessionMode, Role } from "@/lib/types";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatContainerProps {
  sessionId: string;
  mode: SessionMode;
  role: Role;
  artifactType?: ArtifactType;
  initialMessages?: ChatMessage[];
}

export function ChatContainer({
  sessionId,
  mode,
  role,
  artifactType,
  initialMessages = [],
}: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [artifact, setArtifact] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(userMessage: string): Promise<void> {
    const userEntry: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, userEntry]);
    setIsLoading(true);

    const assistantEntry: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantEntry]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          role,
          mode,
          artifactType,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantEntry.id ? { ...m, content: accumulated } : m
          )
        );
      }

      if (artifactType && accumulated.includes("#")) {
        setArtifact(accumulated);
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantEntry.id
            ? { ...m, content: "Something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((msg, i) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            isStreaming={isLoading && i === messages.length - 1 && msg.role === "assistant"}
          />
        ))}
        {artifact && artifactType && (
          <ArtifactPreview content={artifact} artifactType={artifactType} />
        )}
        <div ref={bottomRef} />
      </div>
      <InputBar onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
