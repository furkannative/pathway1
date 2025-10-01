'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowUpTrayIcon, 
  WrenchIcon, 
  DocumentIcon,
  XMarkIcon,
  ClockIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// Template data
const orgChartTemplates = [
  {
    id: 'fintech',
    name: 'Fintech Organization',
    description: 'Optimized for financial technology companies with product, engineering, and compliance teams.',
    color: 'bg-blue-100',
    borderColor: 'border-blue-300',
    hoverColor: 'hover:border-blue-400',
    textColor: 'text-blue-700'
  },
  {
    id: 'startup',
    name: 'Startup Growth',
    description: 'Perfect for rapidly scaling startups with flat hierarchies and cross-functional teams.',
    color: 'bg-green-100',
    borderColor: 'border-green-300',
    hoverColor: 'hover:border-green-400',
    textColor: 'text-green-700'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Structure',
    description: 'Designed for large organizations with multiple business units and complex reporting lines.',
    color: 'bg-purple-100',
    borderColor: 'border-purple-300',
    hoverColor: 'hover:border-purple-400',
    textColor: 'text-purple-700'
  },
  {
    id: 'matrix',
    name: 'Matrix Organization',
    description: 'For companies using matrix management with dual reporting relationships.',
    color: 'bg-orange-100',
    borderColor: 'border-orange-300',
    hoverColor: 'hover:border-orange-400',
    textColor: 'text-orange-700'
  },
  {
    id: 'agile',
    name: 'Agile Teams',
    description: 'Structured around agile methodologies with squads, tribes, and chapters.',
    color: 'bg-teal-100',
    borderColor: 'border-teal-300',
    hoverColor: 'hover:border-teal-400',
    textColor: 'text-teal-700'
  },
  {
    id: 'remote',
    name: 'Remote-First',
    description: 'Optimized for distributed teams with global operations and time zone considerations.',
    color: 'bg-indigo-100',
    borderColor: 'border-indigo-300',
    hoverColor: 'hover:border-indigo-400',
    textColor: 'text-indigo-700'
  }
];

// Recent projects data
const recentProjects = [
  {
    id: 'fintech-growth-2025',
    name: 'Fintech Growth Plan 2025',
    description: 'Q2 growth projections for our fintech division',
    employeeCount: 87,
    departmentCount: 12,
    lastModified: '2 days ago',
    projectionType: '1 year',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'payments-team-reorg',
    name: 'Payments Team Reorganization',
    description: 'New structure for the payments processing team',
    employeeCount: 34,
    departmentCount: 5,
    lastModified: '1 week ago',
    projectionType: '6 months',
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'compliance-expansion',
    name: 'Compliance Department Expansion',
    description: 'Regulatory compliance team growth planning',
    employeeCount: 23,
    departmentCount: 3,
    lastModified: '2 weeks ago',
    projectionType: '3 years',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 'international-expansion',
    name: 'International Markets Expansion',
    description: 'Team structure for EMEA market entry',
    employeeCount: 42,
    departmentCount: 7,
    lastModified: '3 weeks ago',
    projectionType: '1 year',
    color: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
];

export default function HomePage() {
  const router = useRouter();
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top horizontal card for uploading personnel data */}
      <div 
        className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        onClick={() => router.push('/upload')}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <ArrowUpTrayIcon className="w-6 h-6" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">Upload Personnel Data</h3>
            <p className="text-gray-600">Import your organization's employee data to quickly build a comprehensive org chart</p>
          </div>
          <button 
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
            onClick={(e) => { e.stopPropagation(); router.push('/upload'); }}
          >
            Upload Now
          </button>
        </div>
      </div>

      {/* Two minimized cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div 
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
          onClick={() => router.push('/org-chart/create')}
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <WrenchIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Build From Scratch</h3>
          </div>
          <p className="text-gray-600 text-sm">Create your organization chart manually by adding departments and positions</p>
          <div className="mt-4 flex justify-end">
            <button 
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              onClick={(e) => { e.stopPropagation(); router.push('/org-chart/create'); }}
            >
              Start Building
            </button>
          </div>
        </div>

        <div 
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer"
          onClick={() => setShowTemplateModal(true)}
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
              <DocumentIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Use a Template</h3>
          </div>
          <p className="text-gray-600 text-sm">Choose from industry-specific templates to jumpstart your organization chart</p>
          <div className="mt-4 flex justify-end">
            <button 
              className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              onClick={(e) => { e.stopPropagation(); setShowTemplateModal(true); }}
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
          <button 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            onClick={() => router.push('/projects')}
          >
            View All 
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentProjects.map((project) => (
            <div 
              key={project.id}
              className={`p-5 rounded-lg border ${project.borderColor} ${project.color} hover:shadow-md transition-all cursor-pointer`}
              onClick={() => router.push(`/org-chart/project/${project.id}`)}
            >
              <div className="flex items-start">
                <div className={`w-10 h-10 ${project.iconBg} ${project.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <UsersIcon className="w-3.5 h-3.5 mr-1" />
                      <span>{project.employeeCount} employees</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <DocumentIcon className="w-3.5 h-3.5 mr-1" />
                      <span>{project.departmentCount} departments</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon className="w-3.5 h-3.5 mr-1" />
                      <span>Modified {project.lastModified}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                      <span>{project.projectionType} projection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template selection modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Choose a Mappin Template</h2>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                onClick={() => setShowTemplateModal(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-10rem)]">
              <p className="text-gray-600 mb-6">Select a template that best matches your organization's structure to get started quickly.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orgChartTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`p-5 rounded-lg border ${template.borderColor} ${template.hoverColor} ${template.color} cursor-pointer transition-all hover:shadow-md`}
                    onClick={() => {
                      router.push(`/org-chart/template/${template.id}`);
                      setShowTemplateModal(false);
                    }}
                  >
                    <h3 className={`text-lg font-semibold ${template.textColor} mb-2`}>{template.name}</h3>
                    <p className="text-gray-700 text-sm">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button 
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors mr-3"
                onClick={() => setShowTemplateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                onClick={() => router.push('/org-chart')}
              >
                Create Custom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
