'use client';

import { useState } from 'react';
import { ProjectData } from '../CreateOrgChartWizard';

interface ProjectDetailsStepProps {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

const industryOptions = [
  'Fintech',
  'Banking',
  'Insurance',
  'Investment',
  'Payments',
  'Lending',
  'Wealth Management',
  'Cryptocurrency',
  'Blockchain',
  'Regtech',
  'Other Financial Services'
];

export default function ProjectDetailsStep({ projectData, updateProjectData }: ProjectDetailsStepProps) {
  const [formData, setFormData] = useState({
    projectName: projectData.projectName,
    companyName: projectData.companyName,
    industry: projectData.industry,
    description: projectData.description,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateProjectData({ [name]: value });
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-1.5 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="ml-3 text-sm text-blue-800 font-medium">
            Start by providing basic information about your organization chart project. This will help us customize the experience for you.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="relative group">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="projectName"
              id="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="e.g., Q2 2025 Organization Structure"
              className="block w-full border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Give your org chart project a descriptive name
          </p>
        </div>
        
        <div className="relative group">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g., Fintech Innovations Inc."
              className="block w-full border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Enter your company or organization name
          </p>
        </div>
        
        <div className="relative group">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
            >
              <option value="">Select an industry</option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Select the industry your company operates in
          </p>
        </div>
        
        <div className="relative group sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of your organization and the purpose of this chart..."
              className="block w-full border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Provide additional context about your organization chart project
          </p>
        </div>
      </div>
      
      <div className="pt-5">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <span className="text-xs text-gray-500 italic mr-2 self-center">* Required fields</span>
          </span>
        </div>
      </div>
    </div>
  );
}
