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

export default function HomeDuplicatePage() {
  const router = useRouter();
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Workleap Growth Planner
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Design your organization's structure and plan future growth with intuitive tools.
        </p>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto">
        {/* Top action card */}
        <div 
          className="mb-8 p-6 bg-blue-50/50 rounded-lg border border-blue-100 hover:bg-blue-50/80 transition-all cursor-pointer"
          onClick={() => router.push('/upload')}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-500 mr-5">
              <ArrowUpTrayIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">Upload Personnel Data</h3>
              <p className="text-gray-500 mt-1">Import your organization's employee data to build your chart</p>
            </div>
            <button 
              className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
              onClick={(e) => { e.stopPropagation(); router.push('/upload'); }}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Two action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div 
            className="p-6 bg-indigo-50/50 rounded-lg border border-indigo-100 hover:bg-indigo-50/80 transition-all cursor-pointer"
            onClick={() => router.push('/org-chart/create')}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-500 mt-0.5">
                <WrenchIcon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-800">Build From Scratch</h3>
                <p className="text-gray-500 mt-1 mb-4">Create your organization chart manually by adding departments and positions</p>
                <button 
                  className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); router.push('/org-chart/create'); }}
                >
                  Start Building
                </button>
              </div>
            </div>
          </div>

          <div 
            className="p-6 bg-teal-50/50 rounded-lg border border-teal-100 hover:bg-teal-50/80 transition-all cursor-pointer"
            onClick={() => setShowTemplateModal(true)}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-100 text-teal-500 mt-0.5">
                <DocumentIcon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-800">Use a Template</h3>
                <p className="text-gray-500 mt-1 mb-4">Choose from industry-specific templates to jumpstart your organization chart</p>
                <button 
                  className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setShowTemplateModal(true); }}
                >
                  Browse Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Collaboration Card */}
        <div 
          className="p-6 bg-purple-50/50 rounded-lg border border-purple-100 hover:bg-purple-50/80 transition-all cursor-pointer mb-10"
          onClick={() => router.push('/collaboration')}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-500 mt-0.5">
              <ChartBarIcon className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-800">Cross-Team Collaboration</h3>
              <p className="text-gray-500 mt-1 mb-4">Analyze communication patterns and collaboration intensity between teams</p>
              <button 
                className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600 transition-colors"
                onClick={(e) => { e.stopPropagation(); router.push('/collaboration'); }}
              >
                View Heatmap
              </button>
            </div>
          </div>
        </div>

        {/* Hiring Delay Risk Analyzer Card */}
        <div 
          className="p-6 bg-purple-50/50 rounded-lg border border-purple-100 hover:bg-purple-50/80 transition-all cursor-pointer mb-10"
          onClick={() => router.push('/hiring-risk')}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-500 mt-0.5">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-800">Hiring Delay Risk Analyzer</h3>
              <p className="text-gray-500 mt-1 mb-4">Predict and prevent hiring delays with AI-powered risk analysis</p>
              <button 
                className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600 transition-colors"
                onClick={(e) => { e.stopPropagation(); router.push('/hiring-risk'); }}
              >
                View Risk Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium text-gray-800">Recent Projects</h2>
            <button 
              className="text-sm text-blue-500 hover:text-blue-700 transition-colors flex items-center"
              onClick={() => router.push('/projects')}
            >
              View All
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentProjects.map((project, index) => {
              // Alternate pastel colors for project cards
              const colors = [
                { bg: "bg-blue-50/50", border: "border-blue-100", hover: "hover:bg-blue-50/80", badge: "bg-blue-100 text-blue-600" },
                { bg: "bg-purple-50/50", border: "border-purple-100", hover: "hover:bg-purple-50/80", badge: "bg-purple-100 text-purple-600" },
                { bg: "bg-teal-50/50", border: "border-teal-100", hover: "hover:bg-teal-50/80", badge: "bg-teal-100 text-teal-600" },
                { bg: "bg-amber-50/50", border: "border-amber-100", hover: "hover:bg-amber-50/80", badge: "bg-amber-100 text-amber-600" }
              ];
              const colorSet = colors[index % colors.length];
              
              return (
                <div 
                  key={project.id}
                  className={`p-5 ${colorSet.bg} border ${colorSet.border} rounded-lg ${colorSet.hover} transition-all cursor-pointer`}
                  onClick={() => router.push(`/org-chart/project/${project.id}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-800 text-lg">{project.name}</h3>
                    <span className={`text-xs px-3 py-1.5 ${colorSet.badge} rounded-full font-medium`}>
                      {project.projectionType}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center px-3 py-1.5 bg-white/80 rounded-md">
                      <UsersIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                      <span>{project.employeeCount} employees</span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 bg-white/80 rounded-md">
                      <DocumentIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                      <span>{project.departmentCount} departments</span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 bg-white/80 rounded-md">
                      <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                      <span>Modified {project.lastModified}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Template selection modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-800">Choose a Template</h2>
              <button 
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
                onClick={() => setShowTemplateModal(false)}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <p className="text-gray-500 mb-5">Select a template that best matches your organization's structure to get started quickly.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orgChartTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`p-5 rounded-lg ${template.color} border ${template.borderColor} hover:shadow-sm cursor-pointer transition-all`}
                    onClick={() => {
                      router.push(`/org-chart/template/${template.id}`);
                      setShowTemplateModal(false);
                    }}
                  >
                    <h3 className={`text-lg font-medium ${template.textColor} mb-2`}>{template.name}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-300 transition-colors mr-3"
                onClick={() => setShowTemplateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
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
