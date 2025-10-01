'use client';

import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import EmployeeList from '@/components/Directory/EmployeeList';

interface Department {
  id: string;
  name: string;
  employeeCount: number;
  isHiring?: boolean;
  color: string;
}

export default function DirectoryPage() {
  const [activeTab, setActiveTab] = useState<'employees' | 'departments' | 'analytics'>('employees');

  // Gerçek veriler normalde bir API'den gelecektir
  const [stats] = useState({
    employees: 78,
    departments: 8,
    locations: 5,
    openPositions: 12,
    growthRate: 15 // %15 büyüme oranı
  });

  const [departments] = useState<Department[]>([
    { id: 'eng', name: 'Engineering', employeeCount: 32, color: '#3B82F6', isHiring: true },
    { id: 'prod', name: 'Product', employeeCount: 12, color: '#A855F7' },
    { id: 'data', name: 'Data Science', employeeCount: 8, color: '#F97316', isHiring: true },
    { id: 'comp', name: 'Compliance', employeeCount: 6, color: '#22C55E' },
    { id: 'sec', name: 'Security', employeeCount: 4, color: '#EF4444' },
    { id: 'ops', name: 'Operations', employeeCount: 7, color: '#6366F1' },
    { id: 'fin', name: 'Finance', employeeCount: 5, color: '#14B8A6' },
    { id: 'mkt', name: 'Marketing', employeeCount: 4, color: '#F59E0B' }
  ]);

  // Departman dağılımı için veri hazırlama
  const departmentDistribution = departments.map(dept => ({
    name: dept.name,
    value: (dept.employeeCount / stats.employees) * 100,
    color: dept.color,
    count: dept.employeeCount
  }));

  // Lokasyon dağılımı için örnek veri
  const locationDistribution = [
    { name: 'New York', count: 28, percentage: 36 },
    { name: 'San Francisco', count: 22, percentage: 28 },
    { name: 'London', count: 12, percentage: 15 },
    { name: 'Berlin', count: 10, percentage: 13 },
    { name: 'Remote', count: 6, percentage: 8 }
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Directory</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your organization's employees and departments</p>
      </div>

      {/* Stats Cards */}
      <div className="bg-white px-6 py-5 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Employees</p>
                <p className="text-2xl font-bold text-blue-900">{stats.employees}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Departments</p>
                <p className="text-2xl font-bold text-purple-900">{stats.departments}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Locations</p>
                <p className="text-2xl font-bold text-orange-900">{stats.locations}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPinIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Open Positions</p>
                <p className="text-2xl font-bold text-green-900">{stats.openPositions}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <BriefcaseIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-2 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'employees'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'departments'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('departments')}
          >
            Departments
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'analytics'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        {activeTab === 'employees' ? (
          <EmployeeList />
        ) : activeTab === 'departments' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Departments</h2>
                  <p className="text-sm text-gray-500 mt-1">View and manage your company departments</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                  <PlusIcon className="h-4 w-4 mr-1.5" />
                  Add Department
                </button>
              </div>
            </div>
            
            {/* Department List */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {departments.map((dept) => (
                  <div 
                    key={dept.id}
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center p-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-sm" 
                        style={{ 
                          backgroundColor: `${dept.color}20`,
                          border: `1px solid ${dept.color}40`
                        }}
                      >
                        <BuildingOfficeIcon className="h-6 w-6" style={{ color: dept.color }} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            {dept.name}
                            {dept.isHiring && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                Hiring
                              </span>
                            )}
                          </h3>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <UsersIcon className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{dept.employeeCount} {dept.employeeCount === 1 ? 'employee' : 'employees'}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${(dept.employeeCount / stats.employees) * 100}%`,
                                  backgroundColor: dept.color 
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {Math.round((dept.employeeCount / stats.employees) * 100)}%
                            </span>
                          </div>
                          
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Department Card */}
                <div className="relative bg-white rounded-xl border border-dashed border-gray-300 shadow-sm overflow-hidden hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 p-4">
                  <button className="w-full h-full flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    <div className="p-3 bg-gray-100 rounded-lg mr-4 group-hover:bg-blue-100">
                      <PlusIcon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Add New Department</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Organization Analytics</h2>
              <p className="text-sm text-gray-500 mt-1">Insights about your organization structure</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Department Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Department Distribution</h3>
                <div className="space-y-4">
                  {departmentDistribution.map((dept) => (
                    <div key={dept.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dept.color }}></div>
                          <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{dept.count} ({Math.round(dept.value)}%)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${dept.value}%`, backgroundColor: dept.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Location Distribution</h3>
                <div className="space-y-4">
                  {locationDistribution.map((location, index) => (
                    <div key={location.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-700">{location.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{location.count} ({location.percentage}%)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${location.percentage}%`, 
                            backgroundColor: ['#3B82F6', '#A855F7', '#F97316', '#22C55E', '#EF4444'][index % 5] 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Growth Projection */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-2">
                <div className="flex items-center mb-4">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-base font-medium text-gray-900">Growth Projection</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Based on your current growth rate of {stats.growthRate}%, your organization is projected to grow as follows:
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-700 mb-1">6 Months</p>
                    <p className="text-xl font-bold text-blue-900">{Math.round(stats.employees * (1 + stats.growthRate/200))}</p>
                    <p className="text-xs text-blue-600">employees</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-purple-700 mb-1">1 Year</p>
                    <p className="text-xl font-bold text-purple-900">{Math.round(stats.employees * (1 + stats.growthRate/100))}</p>
                    <p className="text-xs text-purple-600">employees</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-indigo-700 mb-1">3 Years</p>
                    <p className="text-xl font-bold text-indigo-900">{Math.round(stats.employees * (1 + stats.growthRate/100*3))}</p>
                    <p className="text-xs text-indigo-600">employees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
