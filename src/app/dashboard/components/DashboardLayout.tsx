'use client';

import NavBar from './NavBar';
import { AppBar } from './AppBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: 'var(--background-color)' }} className="min-h-screen">
      <div className="flex">
        <NavBar />
        <main className="flex-1 flex flex-col min-h-screen w-full" 
              style={{ backgroundColor: 'var(--main-content-bg)' }}>
          <AppBar />
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}