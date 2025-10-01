'use client';

import { useState } from 'react';
import OrgChart3Flow from '@/components/OrgChart3/OrgChart3Flow';
import DepartmentCards from '@/components/OrgChart3/DepartmentCards';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Projeksiyon periyotları
type ProjectionPeriod = 'current' | '6months' | '1year' | '3years';

export default function OrgChart4Page() {
  const [projectionPeriod, setProjectionPeriod] = useState<ProjectionPeriod>('current');
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-white border-b">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FinTech Growth Planner</h1>
            <p className="text-gray-500">Plan and visualize your organization's growth with our interactive org chart</p>
          </div>
          
          {/* Projeksiyon periyodu seçimi */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-700 mr-2">Growth Projection:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setProjectionPeriod('current')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  projectionPeriod === 'current'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setProjectionPeriod('6months')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  projectionPeriod === '6months'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => setProjectionPeriod('1year')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  projectionPeriod === '1year'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                1 Year
              </button>
              <button
                onClick={() => setProjectionPeriod('3years')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  projectionPeriod === '3years'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                3 Years
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        {/* Org Chart Flow */}
        <div className="flex-grow overflow-hidden">
          <OrgChart3Flow projectionPeriod={projectionPeriod} />
        </div>
        
        {/* Departman Kartları Toggle Butonu */}
        <div className="flex-none border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <span className="font-semibold">Departments</span>
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                {projectionPeriod === 'current' ? '5' : 
                 projectionPeriod === '6months' ? '7' : 
                 projectionPeriod === '1year' ? '9' : '12'} departments
              </span>
            </div>
            {isDepartmentsOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        
        {/* Departman Kartları (Açılır/Kapanır) */}
        <AnimatePresence>
          {isDepartmentsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-none overflow-hidden bg-gray-50 border-t border-gray-200"
            >
              <div className="p-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
                <DepartmentCards projectionPeriod={projectionPeriod} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
