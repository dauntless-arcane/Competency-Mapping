'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page by default
    router.replace('/auth/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F2E5D8] flex items-center justify-center">
      <div className="text-[#032B61]">Redirecting...</div>
    </div>
  );
}