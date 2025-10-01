'use client';

import { useState } from 'react';
import SummaryMetrics from '@/components/Reports/SummaryMetrics';
import HeadcountChart from '@/components/Reports/HeadcountChart';
import FinancialProjections from '@/components/Reports/FinancialProjections';
import SkillsGapAnalysis from '@/components/Reports/SkillsGapAnalysis';

export default function ReportsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">
          Comprehensive insights and projections for your fintech organization
        </p>
      </div>
      
      <div className="mb-8">
        <SummaryMetrics />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <HeadcountChart />
        <FinancialProjections />
      </div>
      
      <div className="mb-8">
        <SkillsGapAnalysis />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-900">About These Reports</h3>
            <p className="mt-1 text-sm text-blue-700">
              These reports provide a comprehensive view of your organization's current state and future projections.
              The data is updated quarterly and includes headcount projections, financial forecasts, and skills gap analysis.
              Use these insights to make informed decisions about hiring, training, and resource allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
