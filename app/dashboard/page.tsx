'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { DashboardCards } from '@/components/dashboard/dashboard-cards';
import { mockUser, mockScores, mockCourses } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <WelcomeHeader user={mockUser} />
        <DashboardCards 
          scores={mockScores}
          courses={mockCourses}
          user={mockUser}
        />
      </div>
    </MainLayout>
  );
}