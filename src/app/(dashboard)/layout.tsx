import { Suspense } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { AuthGuard } from '@/components/layout/auth-guard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Suspense
            fallback={
              <div className="flex h-14 shrink-0 items-center border-b bg-background px-6">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            }
          >
            <Header />
          </Suspense>
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
