'use client';

import { useState } from 'react';
import { ProjectData } from '../CreateOrgChartWizard';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface TimelineStepProps {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

export default function TimelineStep({ projectData, updateProjectData }: TimelineStepProps) {
  const [projectionEnabled, setProjectionEnabled] = useState(projectData.projectionEnabled);
  const [projectionPeriods, setProjectionPeriods] = useState(projectData.projectionPeriods);
  const [growthRate, setGrowthRate] = useState(projectData.growthRate.toString());
  const [startDate, setStartDate] = useState(projectData.startDate);
  const [targetDate, setTargetDate] = useState(projectData.targetDate);
  
  const handleProjectionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setProjectionEnabled(checked);
    updateProjectData({ projectionEnabled: checked });
  };
  
  const handlePeriodToggle = (period: keyof typeof projectionPeriods) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedPeriods = { ...projectionPeriods, [period]: checked };
    setProjectionPeriods(updatedPeriods);
    updateProjectData({ projectionPeriods: updatedPeriods });
  };
  
  const handleGrowthRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrowthRate(value);
    updateProjectData({ growthRate: parseInt(value) || 0 });
  };
  
  const handleDateChange = (field: 'startDate' | 'targetDate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (field === 'startDate') {
      setStartDate(value);
      updateProjectData({ startDate: value });
    } else {
      setTargetDate(value);
      updateProjectData({ targetDate: value });
    }
  };
  
  // Calculate projected headcount based on growth rate
  const calculateProjectedHeadcount = (months: number) => {
    const monthlyGrowthRate = (Math.pow(1 + projectData.growthRate / 100, 1/12) - 1);
    return Math.round(projectData.currentHeadcount * Math.pow(1 + monthlyGrowthRate, months));
  };
  
  // Calculate department growth based on current distribution
  const calculateDepartmentGrowth = (months: number) => {
    const totalProjected = calculateProjectedHeadcount(months);
    const growth = totalProjected - projectData.currentHeadcount;
    
    return projectData.departments.map(dept => {
      const currentRatio = dept.headcount / projectData.currentHeadcount;
      const projectedHeadcount = Math.round(dept.headcount + (growth * currentRatio));
      return {
        name: dept.name,
        color: dept.color,
        current: dept.headcount,
        projected: projectedHeadcount,
        growth: projectedHeadcount - dept.headcount
      };
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-700">
          Configure timeline and growth projections for your organization chart. This will help you visualize how your team structure might evolve over time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={handleDateChange('startDate')}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            The current date for your organization chart
          </p>
        </div>
        
        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">
            Target Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="date"
              name="targetDate"
              id="targetDate"
              value={targetDate}
              onChange={handleDateChange('targetDate')}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            The future date for your growth projections
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="projectionEnabled"
              name="projectionEnabled"
              type="checkbox"
              checked={projectionEnabled}
              onChange={handleProjectionToggle}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="projectionEnabled" className="font-medium text-gray-700">
              Enable Growth Projections
            </label>
            <p className="text-gray-500">Show projected team structure at different time intervals</p>
          </div>
        </div>
        
        {projectionEnabled && (
          <div className="mt-4 ml-6">
            <div className="mb-4">
              <label htmlFor="growthRate" className="block text-sm font-medium text-gray-700">
                Annual Growth Rate (%)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="number"
                  name="growthRate"
                  id="growthRate"
                  value={growthRate}
                  onChange={handleGrowthRateChange}
                  min="0"
                  max="200"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                />
                <span className="ml-2 text-sm text-gray-500">%</span>
                <div className="ml-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setGrowthRate('10');
                      updateProjectData({ growthRate: 10 });
                    }}
                    className="px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    10%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGrowthRate('25');
                      updateProjectData({ growthRate: 25 });
                    }}
                    className="ml-1 px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGrowthRate('50');
                      updateProjectData({ growthRate: 50 });
                    }}
                    className="ml-1 px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGrowthRate('100');
                      updateProjectData({ growthRate: 100 });
                    }}
                    className="ml-1 px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    100%
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Expected annual growth rate for your organization
              </p>
            </div>
            
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700">Projection Periods</legend>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sixMonths"
                      name="sixMonths"
                      type="checkbox"
                      checked={projectionPeriods.sixMonths}
                      onChange={handlePeriodToggle('sixMonths')}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sixMonths" className="font-medium text-gray-700">
                      6 Months
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="oneYear"
                      name="oneYear"
                      type="checkbox"
                      checked={projectionPeriods.oneYear}
                      onChange={handlePeriodToggle('oneYear')}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="oneYear" className="font-medium text-gray-700">
                      1 Year
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="threeYears"
                      name="threeYears"
                      type="checkbox"
                      checked={projectionPeriods.threeYears}
                      onChange={handlePeriodToggle('threeYears')}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="threeYears" className="font-medium text-gray-700">
                      3 Years
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        )}
      </div>
      
      {/* Projection Preview */}
      {projectionEnabled && projectData.currentHeadcount > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium leading-6 text-gray-900">Growth Projection Preview</h3>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Based on your current headcount of {projectData.currentHeadcount} and {projectData.growthRate}% annual growth rate
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {projectionPeriods.sixMonths && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800">6 Months Projection</h4>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-blue-900">{calculateProjectedHeadcount(6)}</div>
                    <div className="text-sm text-blue-700">Total Employees</div>
                    <div className="text-xs text-blue-600 mt-1">
                      +{calculateProjectedHeadcount(6) - projectData.currentHeadcount} new positions
                    </div>
                  </div>
                </div>
              )}
              
              {projectionPeriods.oneYear && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="text-sm font-medium text-green-800">1 Year Projection</h4>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-green-900">{calculateProjectedHeadcount(12)}</div>
                    <div className="text-sm text-green-700">Total Employees</div>
                    <div className="text-xs text-green-600 mt-1">
                      +{calculateProjectedHeadcount(12) - projectData.currentHeadcount} new positions
                    </div>
                  </div>
                </div>
              )}
              
              {projectionPeriods.threeYears && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h4 className="text-sm font-medium text-purple-800">3 Year Projection</h4>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-purple-900">{calculateProjectedHeadcount(36)}</div>
                    <div className="text-sm text-purple-700">Total Employees</div>
                    <div className="text-xs text-purple-600 mt-1">
                      +{calculateProjectedHeadcount(36) - projectData.currentHeadcount} new positions
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Department Growth Chart */}
            {projectData.departments.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Department Growth Projection (1 Year)</h4>
                <div className="space-y-3">
                  {calculateDepartmentGrowth(12).map((dept, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{dept.name}</span>
                        <span>
                          {dept.current} → {dept.projected} (+{dept.growth})
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${(dept.current / dept.projected) * 100}%`,
                            backgroundColor: dept.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="text-sm font-medium text-yellow-800">Growth Planning Recommendations</h4>
              <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                <li>• Plan hiring in phases to maintain company culture and onboarding quality</li>
                <li>• Prioritize key leadership positions 3-6 months before team expansion</li>
                <li>• Consider restructuring departments when they exceed 15-20 people</li>
                <li>• Allocate resources for management training as teams grow</li>
                <li>• Review and adjust your org structure every 6 months during rapid growth</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
