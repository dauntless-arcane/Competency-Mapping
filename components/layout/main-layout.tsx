'use client';

import { Sidebar } from './sidebar';
import { mockUser } from '@/lib/mock-data';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar userRole={mockUser.role} />
      <div className="flex flex-col bg-[#F2E5D8] min-h-screen">
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}