'use client';

import { useState } from 'react';
import OrgChartFlow from '@/components/OrgChart/OrgChartFlow';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, AdjustmentsHorizontalIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function OrgChartPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeProjection, setTimeProjection] = useState('current');

  const timeOptions = [
    { id: 'current', name: 'Current', description: 'View the current organization structure' },
    { id: '6months', name: '6 Months', description: 'Projected organization in 6 months' },
    { id: '1year', name: '1 Year', description: 'Projected organization in 1 year' },
    { id: '3years', name: '3 Years', description: 'Projected organization in 3 years' },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <div className="flex flex-col border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Viewing:</span>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Live Org Chart
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 z-10 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block px-4 py-2 text-sm`}
                      >
                        Live Org Chart
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block px-4 py-2 text-sm`}
                      >
                        Saved Org Charts
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your org chart"
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md" title="Add Node">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md" title="Export">
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md" title="Settings">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Time Projection Navigation */}
        <div className="flex items-center px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 mr-4">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Time Projection:</span>
          </div>
          <div className="flex space-x-1">
            {timeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setTimeProjection(option.id)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeProjection === option.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                title={option.description}
              >
                {option.name}
                {timeProjection === option.id && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-800 text-xs text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center">
            <span className="text-xs text-gray-500 mr-2">Hiring Status:</span>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Active
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                Projected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Org Chart Canvas */}
      <div className="flex-1 bg-gray-50">
        <OrgChartFlow timeProjection={timeProjection} />
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-md shadow-lg border border-gray-200 p-1">
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="px-2 text-sm text-gray-600">100%</span>
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      {/* Time Projection Info */}
      {timeProjection !== 'current' && (
        <div className="absolute top-32 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <div className="flex items-start mb-3">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {timeOptions.find(o => o.id === timeProjection)?.name} Projection
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {timeProjection === '6months' && 'Showing projected growth for next 6 months'}
                {timeProjection === '1year' && 'Showing projected growth for next year'}
                {timeProjection === '3years' && 'Showing projected growth for next 3 years'}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500">Current Headcount:</span>
              <span className="text-xs font-medium text-gray-900">42</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500">Projected Headcount:</span>
              <span className="text-xs font-medium text-blue-600">
                {timeProjection === '6months' && '57'}
                {timeProjection === '1year' && '78'}
                {timeProjection === '3years' && '124'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Growth Rate:</span>
              <span className="text-xs font-medium text-green-600">
                {timeProjection === '6months' && '+35%'}
                {timeProjection === '1year' && '+85%'}
                {timeProjection === '3years' && '+195%'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
