'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RightPanel from '@/components/RightPanel';

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<'explore' | 'customize' | 'enrich' | 'project' | null>(null);
  const router = useRouter();

  return (
    <main className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">👋 Welcome to Workleap Growth Planner, Furkan!</h1>
        <p className="text-gray-600 mb-8">Plan your organization's growth with data-driven insights.</p>

        <h2 className="text-xl font-medium mb-4">Get Started</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Explore Organization',
              description: 'View and manage your current organization structure and departments.',
              icon: '🔍',
              type: 'explore' as const
            },
            {
              title: 'Growth Planning',
              description: "Create time-based projections for your organization's future growth.",
              icon: '📈',
              type: 'customize' as const
            },
            {
              title: 'Hiring Management',
              description: 'Track hiring status and manage recruitment across departments.',
              icon: '👥',
              type: 'enrich' as const
            },
            {
              title: 'Financial Projections',
              description: 'Analyze budget implications of your growth plans for your Fintech organization.',
              icon: '💰',
              type: 'project' as const
            }
          ].map((step) => (
            <button
              key={step.title}
              onClick={() => setActivePanel(step.type)}
              className="block group w-full text-left"
            >
              <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-all">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activePanel && (
        <RightPanel
          type={activePanel}
          onClose={() => setActivePanel(null)}
        />
      )}
    </main>
  );
}
