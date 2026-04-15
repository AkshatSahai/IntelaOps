'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function check(): Promise<void> {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace('/login');
      } else {
        setChecking(false);
      }
    }
    void check();
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
