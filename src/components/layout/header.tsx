'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { RoleContextBadge } from '@/components/roles/role-context-badge';
import { cn } from '@/lib/utils';
import type { RoleId } from '@/lib/types';

export function Header(): React.JSX.Element {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as RoleId | null;

  useEffect(() => {
    async function load(): Promise<void> {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setEmail(user.email ?? null);
        setDisplayName((user.user_metadata?.display_name as string | undefined) ?? null);
      }
    }
    void load();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  async function handleSignOut(): Promise<void> {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  const initial = (displayName?.[0] ?? email?.[0] ?? '?').toUpperCase();
  const label = displayName ?? email ?? '';

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-6">
      {/* Left: role context */}
      <div className="flex items-center gap-3">
        {role ? (
          <>
            <RoleContextBadge role={role} />
            <button
              onClick={() => router.push('/')}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Switch role
            </button>
          </>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            Operations Co-Pilot
          </span>
        )}
      </div>

      {/* Right: user avatar */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
            'hover:bg-accent',
          )}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
            {initial}
          </span>
          <span className="hidden max-w-[140px] truncate text-sm text-muted-foreground sm:block">
            {label}
          </span>
          <ChevronDown size={13} className="text-muted-foreground" />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1.5 w-48 rounded-lg border bg-card py-1 shadow-md">
            <button
              onClick={() => {
                setOpen(false);
                router.push('/settings');
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <Settings size={13} className="text-muted-foreground" />
              Settings
            </button>
            <div className="my-1 border-t" />
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <LogOut size={13} className="text-muted-foreground" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
