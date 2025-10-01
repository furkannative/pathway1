'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import { 
  CheckCircleIcon, 
  UsersIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import OrgChartVisualization from './OrgChartVisualization'; // Fixing the import statement

// Sample project data - in a real app, this would come from an API or database
const projectData = {
  'fintech-growth-2025': {
    id: 'fintech-growth-2025',
    name: 'Fintech Growth Plan 2025',
    description: 'Q2 growth projections for our fintech division',
    status: 'READY TO USE',
    lastUpdated: 'April 17, 2025',
    employeeCount: 15,
    departmentCount: 6,
    projectionType: 'Quarterly',
    keyFeatures: [
      'Tech-finance hybrid team structure',
      'Blockchain & cryptocurrency division expansion',
      'Financial regulatory compliance team growth',
      'Security-focused technical team scaling',
      'Full-stack fintech development team structure',
      'API integration and financial data handling teams'
    ],
    includedComponents: [
      { name: 'Tech Assessment', icon: 'code', color: 'blue' },
      { name: 'Financial Acumen', icon: 'currency', color: 'green' },
      { name: 'Security Protocols', icon: 'shield', color: 'purple' },
      { name: 'Data Analytics', icon: 'chart', color: 'red' },
      { name: 'Innovation Metrics', icon: 'lightbulb', color: 'gray' }
    ],
    about: 'The Fintech Growth Plan 2025 is a specialized organizational structure designed for financial technology companies, digital banking startups, and blockchain ventures. This plan combines financial expertise with cutting-edge technology assessment tools, providing optimized HR workflows for evaluating technical talent with financial domain knowledge. Perfect for fintech organizations looking to build teams with both technical skills and financial acumen.',
    timeline: [
      { date: 'Q2 2025', milestone: 'Initial team expansion with key engineering and data science roles' },
      { date: 'Q3 2025', milestone: 'Product and compliance team growth to support new financial products' },
      { date: 'Q4 2025', milestone: 'Security team expansion to enhance platform protection' },
      { date: 'Q1 2026', milestone: 'Executive team expansion with VP-level positions' }
    ],
    budgetAllocation: [
      { department: 'Engineering', allocation: 35, headcount: 42 },
      { department: 'Product', allocation: 20, headcount: 18 },
      { department: 'Compliance', allocation: 15, headcount: 12 },
      { department: 'Data Science', allocation: 12, headcount: 8 },
      { department: 'Security', allocation: 10, headcount: 6 },
      { department: 'Operations', allocation: 8, headcount: 5 }
    ],
    hiringPriorities: [
      { role: 'Senior Blockchain Developer', priority: 'High', department: 'Engineering', status: 'Open' },
      { role: 'Financial Data Scientist', priority: 'High', department: 'Data Science', status: 'Open' },
      { role: 'Security Engineer', priority: 'High', department: 'Security', status: 'Open' },
      { role: 'Compliance Officer', priority: 'Medium', department: 'Compliance', status: 'Planning' },
      { role: 'Product Manager - Payments', priority: 'Medium', department: 'Product', status: 'Planning' }
    ],
    employees: [
      { id: 'e1', name: 'Sarah Chen', title: 'CEO', department: 'Executive' },
      { id: 'e2', name: 'Michael Rodriguez', title: 'CTO', department: 'Engineering', manager: 'e1' },
      { id: 'e3', name: 'Emily Wong', title: 'CPO', department: 'Product', manager: 'e1' },
      { id: 'e4', name: 'David Kim', title: 'Head of Compliance', department: 'Compliance', manager: 'e1' },
      { id: 'e5', name: 'Jessica Lee', title: 'Head of Data Science', department: 'Data Science', manager: 'e1' },
      { id: 'e6', name: 'Robert Taylor', title: 'Head of Marketing', department: 'Marketing', manager: 'e1' },
      { id: 'e7', name: 'Lisa Johnson', title: 'Head of Security', department: 'Security', manager: 'e1' },
      { id: 'e8', name: 'James Wilson', title: 'Senior Engineer', department: 'Engineering', manager: 'e2' },
      { id: 'e9', name: 'Maria Garcia', title: 'Product Manager', department: 'Product', manager: 'e3' },
      { id: 'e10', name: 'John Smith', title: 'Compliance Officer', department: 'Compliance', manager: 'e4' },
      { id: 'e11', name: 'Kevin Chen', title: 'Data Scientist', department: 'Data Science', manager: 'e5' },
      { id: 'e12', name: 'Amanda Brown', title: 'Marketing Specialist', department: 'Marketing', manager: 'e6' },
      { id: 'e13', name: 'Thomas Wright', title: 'Security Analyst', department: 'Security', manager: 'e7' },
      { id: 'e14', name: 'Sophia Martinez', title: 'Frontend Developer', department: 'Engineering', manager: 'e8' },
      { id: 'e15', name: 'Daniel Lee', title: 'Backend Developer', department: 'Engineering', manager: 'e8' },
    ],
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeProjection, setTimeProjection] = useState<string>('6months');

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    if (params.id) {
      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundProject = projectData[projectId as keyof typeof projectData];
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Project not found, redirect to home
        router.push('/');
      }
    }
  }, [params.id, router]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const tabs = [
    { name: 'General Info', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { name: 'Organization Chart', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Growth Timeline', icon: <ClockIcon className="w-5 h-5" /> },
    { name: 'Financial Analysis & Budget Allocation', icon: <CurrencyDollarIcon className="w-5 h-5" /> },
    { name: 'Security & Compliance', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { name: 'Activity Logs', icon: <ChartBarIcon className="w-5 h-5" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                {project.status}
              </span>
              <span className="text-sm text-gray-500">
                Last updated on {project.lastUpdated}
              </span>
            </div>
          </div>
        </div>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => router.push('/org-chart')}
        >
          Use Template
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'py-3 px-4 text-sm font-medium flex items-center whitespace-nowrap',
                    selected
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {/* General Info Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {project.name}</h2>
                <p className="text-gray-700 mb-8">{project.about}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {project.keyFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Included Components</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.includedComponents.map((component: any, index: number) => {
                        const bgColor = `bg-${component.color}-100`;
                        const textColor = `text-${component.color}-700`;
                        
                        return (
                          <div key={index} className={`p-3 rounded-lg ${bgColor} flex items-center`}>
                            {component.icon === 'code' && <DocumentTextIcon className={`w-5 h-5 ${textColor} mr-2`} />}
                            {component.icon === 'currency' && <CurrencyDollarIcon className={`w-5 h-5 ${textColor} mr-2`} />}
                            {component.icon === 'shield' && <ShieldCheckIcon className={`w-5 h-5 ${textColor} mr-2`} />}
                            {component.icon === 'chart' && <PresentationChartLineIcon className={`w-5 h-5 ${textColor} mr-2`} />}
                            {component.icon === 'lightbulb' && <CogIcon className={`w-5 h-5 ${textColor} mr-2`} />}
                            <span className={`${textColor} font-medium`}>{component.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <UsersIcon className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Total Employees</div>
                      <div className="text-2xl font-bold text-gray-900">{project?.employeeCount || 0}</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <DocumentTextIcon className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <div className="text-sm text-purple-600 font-medium">Departments</div>
                      <div className="text-2xl font-bold text-gray-900">{project?.departmentCount || 0}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex items-center">
                    <CalendarIcon className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <div className="text-sm text-green-600 font-medium">Projection Period</div>
                      <div className="text-2xl font-bold text-gray-900">{project?.projectionType || ''}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Organization Chart Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Organization Chart</h2>
                    
                    <div className="flex items-center space-x-4">
                      <a 
                        href="/org-chart2" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        OrgChart 2.0'a Git
                      </a>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setTimeProjection('6months')}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            timeProjection === '6months' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          6 Months
                        </button>
                        <button 
                          onClick={() => setTimeProjection('1year')}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            timeProjection === '1year' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          1 Year
                        </button>
                        <button 
                          onClick={() => setTimeProjection('3years')}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            timeProjection === '3years' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          3 Years
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                    <p className="flex items-center">
                      <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2" />
                      Showing projected organization structure for {timeProjection === '6months' ? 'the next 6 months' : timeProjection === '1year' ? 'the next year' : 'the next 3 years'}.
                      {timeProjection !== '6months' && " Positions marked with 'Hiring' are planned additions to the team."}
                    </p>
                  </div>
                  
                  <div className="h-[600px]">
                    <OrgChartVisualization 
                      employees={project?.employees || []} 
                      timeProjection={timeProjection}
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Growth Timeline Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Growth Timeline</h2>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setTimeProjection('6months')}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          timeProjection === '6months' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        6 Months
                      </button>
                      <button 
                        onClick={() => setTimeProjection('1year')}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          timeProjection === '1year' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        1 Year
                      </button>
                      <button 
                        onClick={() => setTimeProjection('3years')}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          timeProjection === '3years' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        3 Years
                      </button>
                    </div>
                  </div>
                  
                  {/* Timeline visualization */}
                  <div className="relative">
                    {/* Timeline header */}
                    <div className="flex border-b border-gray-200 pb-2">
                      <div className="w-1/4 font-medium text-gray-500 text-sm">Department</div>
                      <div className="w-3/4 grid grid-cols-6 gap-1">
                        <div className="text-center text-xs font-medium text-gray-500">Q2 2025</div>
                        <div className="text-center text-xs font-medium text-gray-500">Q3 2025</div>
                        <div className="text-center text-xs font-medium text-gray-500">Q4 2025</div>
                        <div className="text-center text-xs font-medium text-gray-500">Q1 2026</div>
                        <div className="text-center text-xs font-medium text-gray-500">Q2 2026</div>
                        <div className="text-center text-xs font-medium text-gray-500">Q3 2026</div>
                      </div>
                    </div>
                    
                    {/* Timeline rows */}
                    <div className="mt-4 space-y-6">
                      {/* Engineering row */}
                      <div className="flex">
                        <div className="w-1/4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                            <span className="font-medium">Engineering</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {project?.budgetAllocation?.find((item: any) => item.department === 'Engineering')?.headcount || 0}
                          </div>
                        </div>
                        <div className="w-3/4 grid grid-cols-6 gap-1">
                          <div className="relative h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+2</span>
                            {timeProjection !== '6months' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                2
                              </div>
                            )}
                          </div>
                          <div className="relative h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection === '1year' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+2</span>
                            {timeProjection === '3years' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                2
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Data Science row */}
                      <div className="flex">
                        <div className="w-1/4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></div>
                            <span className="font-medium">Data Science</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {project?.budgetAllocation?.find((item: any) => item.department === 'Data Science')?.headcount || 0}
                          </div>
                        </div>
                        <div className="w-3/4 grid grid-cols-6 gap-1">
                          <div className="relative h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection !== '6months' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection === '3years' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-indigo-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Security row */}
                      <div className="flex">
                        <div className="w-1/4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                            <span className="font-medium">Security</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {project?.budgetAllocation?.find((item: any) => item.department === 'Security')?.headcount || 0}
                          </div>
                        </div>
                        <div className="w-3/4 grid grid-cols-6 gap-1">
                          <div className="relative h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection !== '6months' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection === '3years' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Compliance row */}
                      <div className="flex">
                        <div className="w-1/4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                            <span className="font-medium">Compliance</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {project?.budgetAllocation?.find((item: any) => item.department === 'Compliance')?.headcount || 0}
                          </div>
                        </div>
                        <div className="w-3/4 grid grid-cols-6 gap-1">
                          <div className="h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection !== '6months' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection === '3years' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Product row */}
                      <div className="flex">
                        <div className="w-1/4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></div>
                            <span className="font-medium">Product</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Current: {project?.budgetAllocation?.find((item: any) => item.department === 'Product')?.headcount || 0}
                          </div>
                        </div>
                        <div className="w-3/4 grid grid-cols-6 gap-1">
                          <div className="h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection !== '6months' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                          <div className="relative h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+1</span>
                            {timeProjection === '3years' && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                          <div className="h-10 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">+0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                        ?
                      </div>
                      <span className="text-sm font-medium text-gray-700">Hiring Status Indicators</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Green circles indicate planned hiring for the selected time period ({timeProjection === '6months' ? 'next 6 months' : timeProjection === '1year' ? 'next year' : 'next 3 years'}). 
                      The number shows how many positions are planned for that quarter and department.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Growth Highlights</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Engineering team expanding by {timeProjection === '6months' ? '2' : timeProjection === '1year' ? '3' : '5'} engineers to support blockchain and API development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Data Science team adding {timeProjection === '6months' ? '1' : timeProjection === '1year' ? '1' : '2'} financial data specialists</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Security and Compliance teams growing to meet regulatory requirements</span>
                        </li>
                        {timeProjection === '3years' && (
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Executive team expanding with VP-level positions for Engineering and Product</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Headcount Summary</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Current</span>
                            <span className="text-sm font-medium text-gray-700">{project?.employees?.length || 15}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">6 Months</span>
                            <span className="text-sm font-medium text-gray-700">{(project?.employees?.length || 15) + 3}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(((project?.employees?.length || 15) + 3) / ((project?.employees?.length || 15) + 16)) * 100}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">1 Year</span>
                            <span className="text-sm font-medium text-gray-700">{(project?.employees?.length || 15) + 7}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(((project?.employees?.length || 15) + 7) / ((project?.employees?.length || 15) + 16)) * 100}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">3 Years</span>
                            <span className="text-sm font-medium text-gray-700">{(project?.employees?.length || 15) + 16}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Budget Allocation Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Analysis & Budget Allocation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Total Annual Budget</div>
                      <div className="text-2xl font-bold text-gray-900">$12,450,000</div>
                      <div className="text-xs text-blue-600">+18% from previous year</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <UsersIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-green-600 font-medium">Average Cost per Employee</div>
                      <div className="text-2xl font-bold text-gray-900">$143,100</div>
                      <div className="text-xs text-green-600">Including benefits & overhead</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <PresentationChartLineIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-purple-600 font-medium">Projected Growth Cost</div>
                      <div className="text-2xl font-bold text-gray-900">$3,720,000</div>
                      <div className="text-xs text-purple-600">For 26 new positions</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Department Budget Allocation</h3>
                    
                    <div className="space-y-4">
                      {project?.budgetAllocation?.map((item: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.department}</span>
                            <span className="text-sm font-medium text-gray-700">${(item.allocation * 124500).toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                item.department === 'Engineering' ? 'bg-blue-600' :
                                item.department === 'Product' ? 'bg-purple-600' :
                                item.department === 'Compliance' ? 'bg-orange-600' :
                                item.department === 'Data Science' ? 'bg-green-600' :
                                item.department === 'Security' ? 'bg-red-600' :
                                'bg-indigo-600'
                              }`}
                              style={{ width: `${item.allocation}%` }}
                            ></div>
                          </div>
                        </div>
                      )) || <div className="text-gray-500">No budget allocation data available</div>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Distribution</h3>
                    <div className="aspect-square bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center">
                      <div className="relative w-full max-w-[250px] aspect-square">
                        {/* Simple CSS-based pie chart */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute bg-blue-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                          <div className="absolute bg-purple-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 100% 0, 35% 0)' }}></div>
                          <div className="absolute bg-green-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 35% 0, 0 0, 0 30%)' }}></div>
                          <div className="absolute bg-orange-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 0 30%, 0 70%)' }}></div>
                          <div className="absolute bg-red-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 0 70%, 0 100%, 20% 100%)' }}></div>
                          <div className="absolute bg-indigo-500" style={{ width: '100%', height: '100%', clipPath: 'polygon(50% 50%, 20% 100%, 100% 100%)' }}></div>
                        </div>
                        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-white" style={{ width: '60%', height: '60%', top: '20%', left: '20%' }}>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-500">Total</div>
                            <div className="text-lg font-bold text-gray-900">$12.45M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Engineering (35%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Product (20%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Compliance (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Data Science (12%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Security (10%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></div>
                        <span className="text-xs text-gray-600">Operations (8%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">New Position Cost Projections</h3>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Annual Salary
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Cost
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timeline
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Senior Blockchain Developer
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Engineering
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $185,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $240,500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Q2 2025
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Financial Data Scientist
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Data Science
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $165,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $214,500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Q2 2025
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Compliance Officer
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Compliance
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $140,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $182,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Q3 2025
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Security Engineer
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Security
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $160,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $208,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Q2 2025
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Product Manager - Payments
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Product
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $155,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $201,500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Q3 2025
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    * Total Cost includes salary, benefits (30%), and overhead costs
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Budget Forecast</h3>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Q2 2025</span>
                            <span className="text-sm font-medium text-gray-700">$3,112,500</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Q3 2025</span>
                            <span className="text-sm font-medium text-gray-700">$3,236,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '26%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Q4 2025</span>
                            <span className="text-sm font-medium text-gray-700">$3,485,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Q1 2026</span>
                            <span className="text-sm font-medium text-gray-700">$3,610,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '29%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">Total Annual Budget:</span>
                          <span className="font-bold text-gray-900">$12,450,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">ROI Analysis</h3>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-gray-700">Expected Revenue Growth</div>
                            <div className="text-lg font-bold text-gray-900">$28.5M</div>
                          </div>
                          <div className="text-green-600 font-medium">+24%</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-gray-700">Investment (New Hires)</div>
                            <div className="text-lg font-bold text-gray-900">$3.72M</div>
                          </div>
                          <div className="text-blue-600 font-medium">+18%</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-gray-700">Projected ROI</div>
                            <div className="text-lg font-bold text-gray-900">7.6x</div>
                          </div>
                          <div className="text-purple-600 font-medium">+2.1x vs 2024</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          <p>The projected ROI is calculated based on the expected revenue growth from new product launches and market expansion, divided by the total investment in new hires and infrastructure.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Security & Compliance Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security & Compliance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Regulatory Requirements</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Financial Conduct Authority (FCA) Compliance</h4>
                            <p className="text-sm text-gray-600 mt-1">Team structure meets FCA requirements for separation of duties and oversight.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">GDPR Compliance</h4>
                            <p className="text-sm text-gray-600 mt-1">Data protection roles and responsibilities clearly defined in team structure.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">PCI DSS Compliance</h4>
                            <p className="text-sm text-gray-600 mt-1">Payment processing teams structured to maintain PCI DSS compliance.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Measures</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start">
                          <ShieldCheckIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Dedicated Security Team</h4>
                            <p className="text-sm text-gray-600 mt-1">8 dedicated security professionals with specialized fintech experience.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start">
                          <ShieldCheckIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Segregation of Duties</h4>
                            <p className="text-sm text-gray-600 mt-1">Clear separation between development, testing, and production access.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start">
                          <ShieldCheckIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Compliance Officer</h4>
                            <p className="text-sm text-gray-600 mt-1">Dedicated compliance officer reporting directly to executive leadership.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Activity Logs Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Logs</h2>
                
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          April 17, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Furkan T.
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Updated
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Modified growth projections for Q3 2025
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          April 15, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Emre K.
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Added
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Added new blockchain division structure
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          April 10, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Furkan T.
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Created
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Created Fintech Growth Plan 2025
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
