'use client';

import CreateOrgChartWizard from '@/components/CreateOrgChart/CreateOrgChartWizard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CreateOrgChartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/org-chart" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <CreateOrgChartWizard />
      </div>
    </div>
  );
}
