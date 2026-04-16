import type { ReactNode } from 'react';

// App shell layout — wraps all app pages
// Sidebar + Topbar are rendered per-page to handle active states
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-base)',
    }}>
      {children}
    </div>
  );
}
