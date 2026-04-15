'use client';

import { useState, useRef, type KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const CHAR_WARN_THRESHOLD = 2000;
const MAX_ROWS = 4;
const LINE_HEIGHT_PX = 22;

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function InputBar({
  onSend,
  isLoading = false,
  placeholder = 'Type your message…',
  disabled = false,
}: InputBarProps): React.JSX.Element {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overLimit = value.length > CHAR_WARN_THRESHOLD;
  const isEmpty = !value.trim();
  const isDisabled = isLoading || disabled;

  function handleSend(): void {
    if (isEmpty || isDisabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput(): void {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const maxHeight = MAX_ROWS * LINE_HEIGHT_PX + 16; // +16 for py-2
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }

  return (
    <div className="shrink-0 border-t bg-background px-4 pb-4 pt-3">
      <div
        className={cn(
          'flex items-end gap-2 rounded-xl border bg-background shadow-sm transition-colors',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
          isDisabled && 'opacity-60',
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={placeholder}
          disabled={isDisabled}
          className={cn(
            'flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-relaxed',
            'placeholder:text-muted-foreground focus:outline-none',
            'overflow-y-auto',
          )}
          style={{ maxHeight: `${MAX_ROWS * LINE_HEIGHT_PX + 16}px` }}
        />
        <div className="flex shrink-0 flex-col items-end gap-1 pb-2 pr-2">
          <button
            onClick={handleSend}
            disabled={isEmpty || isDisabled}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
              isEmpty || isDisabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
            title="Send (Enter)"
          >
            {isLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            ) : (
              <ArrowUp size={14} />
            )}
          </button>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground">
          Enter to send&ensp;·&ensp;Shift+Enter for newline
        </p>
        {overLimit && (
          <p className={cn('text-xs', value.length > 4000 ? 'text-destructive' : 'text-amber-500')}>
            {value.length.toLocaleString()} chars
          </p>
        )}
      </div>
    </div>
  );
}
