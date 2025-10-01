'use client';

import { Suspense } from 'react';
import HiringRiskDashboard from '@/components/HiringRiskAnalyzer/HiringRiskDashboard';

export default function HiringRiskPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-12 text-center">Loading Hiring Risk Analyzer...</div>}>
        <HiringRiskDashboard />
      </Suspense>
    </main>
  );
}
