'use client';

import { ProjectData, Department, Employee } from '../CreateOrgChartWizard';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ReviewStepProps {
  projectData: ProjectData;
}

export default function ReviewStep({ projectData }: ReviewStepProps) {
  // Helper function to get department by ID
  const getDepartmentById = (id: string): Department | undefined => {
    return projectData.departments.find(dept => dept.id === id);
  };
  
  // Helper function to get employee by ID
  const getEmployeeById = (id: string): Employee | undefined => {
    return projectData.employees.find(emp => emp.id === id);
  };
  
  // Check if project data is complete
  const isProjectComplete = (): boolean => {
    return (
      !!projectData.projectName &&
      !!projectData.companyName &&
      !!projectData.industry &&
      projectData.departments.length > 0 &&
      projectData.employees.length > 0
    );
  };
  
  // Get validation warnings
  const getValidationWarnings = (): string[] => {
    const warnings: string[] = [];
    
    if (!projectData.projectName) {
      warnings.push('Project name is missing');
    }
    
    if (!projectData.companyName) {
      warnings.push('Company name is missing');
    }
    
    if (!projectData.industry) {
      warnings.push('Industry is not selected');
    }
    
    if (projectData.departments.length === 0) {
      warnings.push('No departments have been added');
    }
    
    if (projectData.employees.length === 0) {
      warnings.push('No employees have been added');
    }
    
    // Check if all departments have employees
    const departmentsWithoutEmployees = projectData.departments.filter(
      dept => !projectData.employees.some(emp => emp.department === dept.id)
    );
    
    if (departmentsWithoutEmployees.length > 0) {
      warnings.push(`${departmentsWithoutEmployees.length} departments have no employees`);
    }
    
    // Check if employees have valid managers
    const employeesWithInvalidManagers = projectData.employees.filter(
      emp => emp.manager && !getEmployeeById(emp.manager)
    );
    
    if (employeesWithInvalidManagers.length > 0) {
      warnings.push(`${employeesWithInvalidManagers.length} employees have invalid manager references`);
    }
    
    // Check if headcount matches employees count
    if (projectData.currentHeadcount !== projectData.employees.length) {
      warnings.push(`Current headcount (${projectData.currentHeadcount}) doesn't match number of employees (${projectData.employees.length})`);
    }
    
    return warnings;
  };
  
  const warnings = getValidationWarnings();
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-700">
          Review your organization chart details before creating it. Make sure all information is correct and complete.
        </p>
      </div>
      
      {/* Validation Status */}
      <div className={`rounded-lg p-4 ${
        warnings.length === 0 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-yellow-50 border border-yellow-200'
      }`}>
        <div className="flex items-center">
          {warnings.length === 0 ? (
            <>
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-green-800">Your organization chart is ready to create!</h3>
            </>
          ) : (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-sm font-medium text-yellow-800">Please address the following issues:</h3>
            </>
          )}
        </div>
        
        {warnings.length > 0 && (
          <ul className="mt-2 text-sm text-yellow-700 space-y-1 ml-7 list-disc">
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Project Summary */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Project Summary</h3>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Project Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.projectName || 'Not specified'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.companyName || 'Not specified'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Industry</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.industry || 'Not specified'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Organization Structure</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{projectData.structureType || 'Not specified'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Current Headcount</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.currentHeadcount || 0}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Departments</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.departments.length}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Employees</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.employees.length}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Hiring Positions</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {projectData.employees.filter(emp => emp.isHiring).length}
              </dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{projectData.description || 'No description provided'}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Department Summary */}
      {projectData.departments.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Departments</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projectData.departments.map((dept) => {
                const departmentEmployees = projectData.employees.filter(emp => emp.department === dept.id);
                return (
                  <div key={dept.id} className="border rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b" style={{ backgroundColor: dept.color + '20' }}>
                      <div className="flex items-center">
                        <div 
                          className="h-3 w-3 rounded-full mr-2" 
                          style={{ backgroundColor: dept.color }}
                        />
                        <h4 className="text-sm font-medium text-gray-900">{dept.name}</h4>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-gray-500">{dept.description}</div>
                      <div className="mt-2 flex justify-between text-xs">
                        <span>{departmentEmployees.length} employees</span>
                        <span>
                          {departmentEmployees.filter(emp => emp.isHiring).length} hiring
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Growth Projections */}
      {projectData.projectionEnabled && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Growth Projections</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Annual Growth Rate</dt>
                <dd className="mt-1 text-sm text-gray-900">{projectData.growthRate}%</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{new Date(projectData.startDate).toLocaleDateString()}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Target Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{new Date(projectData.targetDate).toLocaleDateString()}</dd>
              </div>
              
              <div className="sm:col-span-3">
                <dt className="text-sm font-medium text-gray-500">Projection Periods</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex space-x-2">
                    {projectData.projectionPeriods.sixMonths && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        6 Months
                      </span>
                    )}
                    {projectData.projectionPeriods.oneYear && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        1 Year
                      </span>
                    )}
                    {projectData.projectionPeriods.threeYears && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        3 Years
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      
      {/* Next Steps */}
      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
        <h3 className="text-sm font-medium text-indigo-800">What happens next?</h3>
        <ul className="mt-2 text-sm text-indigo-700 space-y-1 ml-5 list-disc">
          <li>Your organization chart will be created with all the information you've provided</li>
          <li>You'll be able to view, edit, and share your organization chart</li>
          <li>Time-based projections will be available based on your settings</li>
          <li>You can add, remove, or modify employees and departments at any time</li>
          <li>Reports and analytics will be generated based on your organization structure</li>
        </ul>
      </div>
    </div>
  );
}
