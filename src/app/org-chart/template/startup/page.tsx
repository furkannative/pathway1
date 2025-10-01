'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StartupRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/org-chart/project/startup-growth');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-900">Redirecting to Startup Growth Template...</h2>
        <p className="mt-2 text-sm text-gray-500">You'll be redirected automatically in a moment.</p>
      </div>
    </div>
  );
}
