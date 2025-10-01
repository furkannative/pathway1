'use client';

import { useRef } from 'react';
import { usePeopleStore } from '@/store/peopleStore';

interface RightPanelProps {
  onClose?: () => void;
  type: 'explore' | 'customize' | 'enrich' | 'populate' | 'project';
}

export default function RightPanel({ onClose, type }: RightPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadExcel = usePeopleStore(state => state.uploadExcel);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadExcel(file);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const getContent = () => {
    switch (type) {
      case 'populate':
        return {
          title: 'Populate',
          icon: (
            <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 8a6 6 0 1112 0A6 6 0 016 8zm2 10a3 3 0 00-3 3 1 1 0 11-2 0 5 5 0 015-5h8a5 5 0 015 5 1 1 0 11-2 0 3 3 0 00-3-3H8z" />
            </svg>
          ),
          iconBg: 'bg-green-100',
          content: (
            <>
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Add People Data</h3>
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 8a6 6 0 1112 0A6 6 0 016 8zm2 10a3 3 0 00-3 3 1 1 0 11-2 0 5 5 0 015-5h8a5 5 0 015 5 1 1 0 11-2 0 3 3 0 00-3-3H8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Fill in your Directory by setting up an integration or importing a spreadsheet of your people data.
                  </p>
                </div>
                <div className="space-y-2">
                  <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                    Integrate with HRIS
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    Upload a CSV
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />
                  <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                    Manually Add Employees
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Have Questions?</h3>
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm1.975-9c2.208 0 4 1.657 4 3.7 0 1.643-1.096 2.873-2.744 3.338-.442.125-.85.398-.85.962h-2c0-1.448.739-2.39 1.82-2.796 1.21-.454 1.774-1.15 1.774-1.504 0-.714-.757-1.7-2-1.7-.958 0-1.827.603-1.975 1.37L9.55 9.54C9.838 8.472 10.818 7 12.975 7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Want a demo, help setting up an integration, or have any other questions for us?
                  </p>
                </div>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Request a Demo
                </button>
              </div>
            </>
          )
        };
      case 'explore':
        return {
          title: 'Explore Organization',
          icon: '🔍',
          iconBg: 'bg-blue-100',
          content: (
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Manage Your Organization</h3>
              <p className="text-sm text-gray-600 mb-6">
                Visualize and manage your organization's structure with our interactive chart. Create departments, add positions, and establish reporting relationships to get a clear picture of your current organization.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Our intuitive interface allows you to drag and drop elements, customize department colors, and easily track vacant positions across your organization.
              </p>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  View Organization Chart
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Manage Departments
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Edit Positions
                </button>
              </div>
            </div>
          )
        };
      case 'customize':
        return {
          title: 'Growth Planning',
          icon: '📈',
          iconBg: 'bg-orange-100',
          content: (
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Plan Your Future Growth</h3>
              <p className="text-sm text-gray-600 mb-6">
                Create detailed time-based projections for your organization's growth. Our powerful planning tools allow you to visualize how your company will evolve over time, with specific projections for 6 months, 1 year, and 3 years into the future.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Each projection includes department-level growth forecasts, new position requirements, and hiring timelines. You can compare different growth scenarios and adjust your plans as your business evolves.
              </p>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  6-Month Projection
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  1-Year Projection
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  3-Year Projection
                </button>
              </div>
            </div>
          )
        };
      case 'enrich':
        return {
          title: 'Hiring Management',
          icon: '👥',
          iconBg: 'bg-purple-100',
          content: (
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Manage Hiring Process</h3>
              <p className="text-sm text-gray-600 mb-6">
                Track and manage your organization's hiring needs across all departments. Our hiring management tools help you visualize open positions, track recruitment progress, and plan for future talent acquisition based on your growth projections.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Each position can be marked with hiring status, allowing you to see at a glance which roles are actively being recruited for. Set hiring priorities, track candidate pipelines, and ensure your recruitment efforts align with your growth strategy.
              </p>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  View Open Positions
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Hiring Status Dashboard
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Recruitment Planning
                </button>
              </div>
            </div>
          )
        };
      case 'project':
        return {
          title: 'Financial Projections',
          icon: '💰',
          iconBg: 'bg-green-100',
          content: (
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Financial Growth Analysis</h3>
              <p className="text-sm text-gray-600 mb-6">
                Analyze the financial implications of your growth plans specifically tailored for Fintech organizations. Our financial projection tools help you understand the budget requirements for expanding your team, adding new departments, and scaling your operations.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Calculate salary budgets by department, estimate recruitment costs, and project overall personnel expenses. Our ROI calculator helps you evaluate the financial impact of your growth decisions, ensuring your expansion plans align with your financial goals.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                For Fintech companies, we provide specialized analysis tools that account for industry-specific roles, compliance requirements, and technology investments needed to support your growth.
              </p>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Salary Budget Projections
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Department Cost Analysis
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Growth ROI Calculator
                </button>
                <button className="w-full py-2.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200">
                  Financial Reports
                </button>
              </div>
            </div>
          )
        };
      default:
        return {
          title: 'Populate',
          icon: '👥',
          iconBg: 'bg-green-100',
          content: null
        };
    }
  };

  const { title, icon, iconBg, content } = getContent();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div className="w-[400px] bg-blue-50 h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">{title}</h2>
            {onClose && (
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="space-y-8">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
