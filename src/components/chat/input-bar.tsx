"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function InputBar({
  onSend,
  isLoading = false,
  placeholder = "Type your message…",
  disabled = false,
}: InputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend(): void {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput(): void {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className="flex items-end gap-2 border-t bg-background p-4">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className={cn(
          "flex-1 resize-none rounded-md border bg-transparent px-3 py-2 text-sm",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
          "max-h-40 overflow-y-auto"
        )}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || isLoading || disabled}
        className={cn(
          "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-primary/90 transition-colors"
        )}
      >
        {isLoading ? "…" : "Send"}
      </button>
    </div>
  );
}
