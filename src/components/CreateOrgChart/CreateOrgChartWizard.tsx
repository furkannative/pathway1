'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircleIcon, 
  ChevronRightIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Step components - dynamic imports
const ProjectDetailsStep = dynamic(() => import('./steps/ProjectDetailsStep'));
const OrgStructureStep = dynamic(() => import('./steps/OrgStructureStep'));
const DepartmentsStep = dynamic(() => import('./steps/DepartmentsStep'));
const EmployeesStep = dynamic(() => import('./steps/EmployeesStep'));
const TimelineStep = dynamic(() => import('./steps/TimelineStep'));
const ReviewStep = dynamic(() => import('./steps/ReviewStep'));

export interface ProjectData {
  projectName: string;
  companyName: string;
  industry: string;
  description: string;
  structureType: 'hierarchical' | 'matrix' | 'flat' | 'network';
  currentHeadcount: number;
  departments: Department[];
  employees: Employee[];
  projectionEnabled: boolean;
  projectionPeriods: {
    sixMonths: boolean;
    oneYear: boolean;
    threeYears: boolean;
  };
  growthRate: number;
  startDate: string;
  targetDate: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  headcount: number;
  parentDepartment?: string;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  manager?: string;
  email?: string;
  location?: string;
  isHiring?: boolean;
  hiringTimeline?: string;
}

const steps = [
  { id: 'project-details', name: 'Project Details', icon: DocumentTextIcon },
  { id: 'org-structure', name: 'Organization Structure', icon: ChartBarIcon },
  { id: 'departments', name: 'Departments', icon: BuildingOfficeIcon },
  { id: 'employees', name: 'Employees', icon: UserGroupIcon },
  { id: 'timeline', name: 'Timeline & Projections', icon: CalendarIcon },
  { id: 'review', name: 'Review & Create', icon: CogIcon },
];

const defaultProjectData: ProjectData = {
  projectName: '',
  companyName: '',
  industry: '',
  description: '',
  structureType: 'hierarchical',
  currentHeadcount: 0,
  departments: [],
  employees: [],
  projectionEnabled: true,
  projectionPeriods: {
    sixMonths: true,
    oneYear: true,
    threeYears: true,
  },
  growthRate: 15,
  startDate: new Date().toISOString().split('T')[0],
  targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
};

export default function CreateOrgChartWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData);
  const router = useRouter();
  
  const updateProjectData = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // In a real application, you would save the data to a database here
    console.log('Submitting project data:', projectData);
    
    // For demo purposes, we'll just redirect to the project page
    // In a real app, you'd redirect to the newly created project
    router.push('/org-chart/project/fintech-growth-2025');
  };
  
  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'project-details':
        return <ProjectDetailsStep projectData={projectData} updateProjectData={updateProjectData} />;
      case 'org-structure':
        return <OrgStructureStep projectData={projectData} updateProjectData={updateProjectData} />;
      case 'departments':
        return <DepartmentsStep projectData={projectData} updateProjectData={updateProjectData} />;
      case 'employees':
        return <EmployeesStep projectData={projectData} updateProjectData={updateProjectData} />;
      case 'timeline':
        return <TimelineStep projectData={projectData} updateProjectData={updateProjectData} />;
      case 'review':
        return <ReviewStep projectData={projectData} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Organization Chart</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Create a custom organization chart for your company by following these steps.
        </p>
      </div>
      
      {/* Modern Progress Steps */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <ol className="relative flex justify-between w-full">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  index < currentStep 
                    ? 'bg-blue-600 border-blue-600' 
                    : index === currentStep 
                      ? 'bg-white border-blue-600' 
                      : 'bg-white border-gray-300'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                ) : (
                  <div className={`flex items-center justify-center w-full h-full`}>
                    {React.createElement(step.icon, { 
                      className: `h-5 w-5 ${index === currentStep ? 'text-blue-600' : 'text-gray-400'}`
                    })}
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <span 
                  className={`text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Current Step Card with Shadow */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8 transition-all duration-300">
        <div className="flex items-center mb-6">
          <div className="mr-4 p-3 bg-blue-100 rounded-lg text-blue-700">
            {steps[currentStep] && React.createElement(steps[currentStep].icon, { className: "h-7 w-7" })}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {steps[currentStep] ? steps[currentStep].name : ''}
          </h2>
        </div>
        
        <div className="mt-6">
          {renderStep()}
        </div>
      </div>
      
      {/* Navigation Buttons with Modern Design */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`inline-flex items-center px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Create Organization Chart
          </button>
        )}
      </div>
    </div>
  );
}
