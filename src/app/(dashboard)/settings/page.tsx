'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { RoleId } from '@/lib/types';

const ROLE_OPTIONS: { value: RoleId; label: string }[] = [
  { value: 'product-owner', label: 'Product Owner' },
  { value: 'business-analyst', label: 'Business Analyst' },
];

export default function SettingsPage(): React.JSX.Element {
  const [displayName, setDisplayName] = useState('');
  const [defaultRole, setDefaultRole] = useState<RoleId>('product-owner');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load(): Promise<void> {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setDisplayName((user.user_metadata?.display_name as string | undefined) ?? '');
        setDefaultRole(
          ((user.user_metadata?.default_role as RoleId | undefined) ?? 'product-owner'),
        );
      }
      setLoading(false);
    }
    void load();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      data: { display_name: displayName, default_role: defaultRole },
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
    <div className="mx-auto max-w-xl py-2">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your display name and default role.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="displayName" className="text-sm font-medium text-foreground">
              Display name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={saving}
              placeholder="Jane Smith"
              className={cn(
                'w-full rounded-lg border bg-background px-3 py-2 text-sm',
                'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
                saving && 'opacity-60',
              )}
            />
            <p className="text-xs text-muted-foreground">
              Shown in the header and on your profile.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="defaultRole" className="text-sm font-medium text-foreground">
              Default role
            </label>
            <select
              id="defaultRole"
              value={defaultRole}
              onChange={(e) => setDefaultRole(e.target.value as RoleId)}
              disabled={saving}
              className={cn(
                'w-full rounded-lg border bg-background px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring',
                saving && 'opacity-60',
              )}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Pre-selects this role on the dashboard home screen.
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className={cn(
              'flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
              saving
                ? 'cursor-not-allowed bg-primary/60 text-primary-foreground'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving…
              </>
            ) : (
              'Save changes'
            )}
          </button>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
              <Check size={14} />
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}
