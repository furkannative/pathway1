'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecentCharts from './RecentCharts';
import TemplateModal from './TemplateModal';

export default function WelcomePage() {
  const router = useRouter();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RecentCharts />

      {/* Where is everyone else? section */}
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <div className="flex items-start mb-6">
          <div className="mr-4 flex-shrink-0">
            <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Where is everyone else?</h2>
            <p className="mt-1 text-gray-500">
              <button className="text-blue-600 hover:text-blue-700 font-medium">Upload a CSV</button>
              {' '}of employees or{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium">Sync with your HRIS</button>
              {' '}to keep your org chart always up-to-date or use the build controls to create your org chart by hand.
            </p>
          </div>
        </div>
      </div>

      {/* Current user section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <button className="mb-4 text-sm font-medium text-gray-700 hover:text-blue-600">
          Add your manager
        </button>

        <div className="relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <button className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          <div className="w-48 p-4 bg-white border-2 border-blue-600 rounded-lg flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-3" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Emre Emre</div>
            </div>
          </div>
        </div>

        <button className="mt-4 text-sm font-medium text-gray-700 hover:text-blue-600">
          Add a direct report
        </button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
          </svg>
          Start with a template
        </button>

        <button
          onClick={() => router.push('/org-chart/demo')}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Try a demo org chart
        </button>

        <button
          onClick={() => router.push('/org-chart/new')}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Start from scratch
        </button>
      </div>

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}
