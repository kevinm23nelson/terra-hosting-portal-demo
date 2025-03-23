'use client';

import NavBar from './NavBar';
import { AppBar } from './AppBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <NavBar />
        <main className="flex-1 flex flex-col min-h-screen w-full bg-background">
          <AppBar />
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}