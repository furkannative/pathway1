'use client';

import { useState } from 'react';

interface HeadcountData {
  department: string;
  current: number;
  sixMonths: number;
  oneYear: number;
  threeYears: number;
  color: string;
}

const headcountData: HeadcountData[] = [
  { department: 'Engineering', current: 42, sixMonths: 48, oneYear: 56, threeYears: 72, color: '#3B82F6' },
  { department: 'Product', current: 18, sixMonths: 22, oneYear: 26, threeYears: 34, color: '#A855F7' },
  { department: 'Compliance', current: 12, sixMonths: 14, oneYear: 16, threeYears: 22, color: '#22C55E' },
  { department: 'Data Science', current: 8, sixMonths: 10, oneYear: 14, threeYears: 24, color: '#F97316' },
  { department: 'Security', current: 6, sixMonths: 8, oneYear: 10, threeYears: 16, color: '#EF4444' },
  { department: 'Operations', current: 4, sixMonths: 6, oneYear: 8, threeYears: 12, color: '#6366F1' },
];

export default function HeadcountChart() {
  const [timeframe, setTimeframe] = useState<'current' | 'sixMonths' | 'oneYear' | 'threeYears'>('current');
  
  const getTimeframeData = () => {
    return headcountData.map(item => ({
      ...item,
      value: item[timeframe]
    }));
  };
  
  const chartData = getTimeframeData();
  const totalHeadcount = chartData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate the maximum bar width for scaling
  const maxValue = Math.max(...chartData.map(item => item.value));
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Headcount Projection</h3>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeframe('current')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              timeframe === 'current' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Current
          </button>
          <button 
            onClick={() => setTimeframe('sixMonths')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              timeframe === 'sixMonths' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6 Months
          </button>
          <button 
            onClick={() => setTimeframe('oneYear')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              timeframe === 'oneYear' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1 Year
          </button>
          <button 
            onClick={() => setTimeframe('threeYears')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              timeframe === 'threeYears' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3 Years
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-500">
          Total Headcount: <span className="text-gray-900 font-semibold">{totalHeadcount}</span>
        </div>
        <div className="text-sm font-medium text-gray-500">
          {timeframe === 'current' ? 'Current' : 
           timeframe === 'sixMonths' ? '6-Month Projection' : 
           timeframe === 'oneYear' ? '1-Year Projection' : 
           '3-Year Projection'}
        </div>
      </div>
      
      <div className="space-y-3">
        {chartData.map((item) => (
          <div key={item.department} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{item.department}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {timeframe === 'current' 
            ? 'Current organization structure as of Q2 2025.' 
            : timeframe === 'sixMonths' 
              ? 'Projected headcount for Q4 2025 based on current hiring plans.' 
              : timeframe === 'oneYear' 
                ? 'Projected headcount for Q2 2026 based on growth strategy.' 
                : 'Long-term projection for Q2 2028 aligned with company vision.'}
        </div>
      </div>
    </div>
  );
}
