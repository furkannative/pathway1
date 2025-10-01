'use client';

import { useState } from 'react';

interface HeadcountProjectionData {
  revenueLevel: string;
  headcountTotal: number;
  engineering: number;
  product: number;
  dataScience: number;
  compliance: number;
  security: number;
  operations: number;
  costPerEmployee: number;
}

const headcountProjectionData: HeadcountProjectionData[] = [
  { 
    revenueLevel: '$10M ARR', 
    headcountTotal: 45, 
    engineering: 18, 
    product: 8, 
    dataScience: 4, 
    compliance: 6, 
    security: 4, 
    operations: 5,
    costPerEmployee: 120000
  },
  { 
    revenueLevel: '$20M ARR', 
    headcountTotal: 90, 
    engineering: 42, 
    product: 18, 
    dataScience: 8, 
    compliance: 12, 
    security: 6, 
    operations: 4,
    costPerEmployee: 125000
  },
  { 
    revenueLevel: '$50M ARR', 
    headcountTotal: 180, 
    engineering: 85, 
    product: 35, 
    dataScience: 20, 
    compliance: 18, 
    security: 12, 
    operations: 10,
    costPerEmployee: 130000
  },
  { 
    revenueLevel: '$100M ARR', 
    headcountTotal: 320, 
    engineering: 150, 
    product: 60, 
    dataScience: 40, 
    compliance: 30, 
    security: 20, 
    operations: 20,
    costPerEmployee: 135000
  },
];

export default function HeadcountScalingProjections() {
  const [selectedLevel, setSelectedLevel] = useState<string>('$20M ARR');
  
  const selectedData = headcountProjectionData.find(item => item.revenueLevel === selectedLevel) || headcountProjectionData[1];
  
  // Calculate department percentages
  const departments = [
    { name: 'Engineering', value: selectedData.engineering, color: '#3B82F6' },
    { name: 'Product', value: selectedData.product, color: '#A855F7' },
    { name: 'Data Science', value: selectedData.dataScience, color: '#F97316' },
    { name: 'Compliance', value: selectedData.compliance, color: '#22C55E' },
    { name: 'Security', value: selectedData.security, color: '#EF4444' },
    { name: 'Operations', value: selectedData.operations, color: '#6366F1' },
  ];
  
  // Calculate total annual cost
  const totalAnnualCost = selectedData.headcountTotal * selectedData.costPerEmployee;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Headcount Scaling Projections</h3>
        
        <div className="flex space-x-2">
          {headcountProjectionData.map(item => (
            <button 
              key={item.revenueLevel}
              onClick={() => setSelectedLevel(item.revenueLevel)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                selectedLevel === item.revenueLevel 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.revenueLevel}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Total Headcount</span>
              <span className="text-sm font-medium text-gray-900">{selectedData.headcountTotal}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-blue-600" 
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            {departments.map((dept) => (
              <div key={dept.name} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{dept.value}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((dept.value / selectedData.headcountTotal) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ 
                      width: `${(dept.value / selectedData.headcountTotal) * 100}%`,
                      backgroundColor: dept.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Key Metrics at {selectedLevel}</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Annual Revenue</span>
              <span className="text-sm font-medium text-gray-900">{selectedLevel}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Total Headcount</span>
              <span className="text-sm font-medium text-gray-900">{selectedData.headcountTotal}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Avg. Cost per Employee</span>
              <span className="text-sm font-medium text-gray-900">${selectedData.costPerEmployee.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Total Annual Personnel Cost</span>
              <span className="text-sm font-medium text-gray-900">${totalAnnualCost.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Personnel Cost % of Revenue</span>
              <span className="text-sm font-medium text-gray-900">
                {Math.round((totalAnnualCost / parseInt(selectedLevel.replace('$', '').replace('M ARR', '000000'))) * 100)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Eng to Non-Eng Ratio</span>
              <span className="text-sm font-medium text-gray-900">
                {(selectedData.engineering / (selectedData.headcountTotal - selectedData.engineering)).toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Note:</span> This model shows optimal headcount distribution at different revenue stages based on fintech industry benchmarks.
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Scaling Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="text-xs font-medium text-blue-800 mb-1">Engineering Focus</h5>
            <p className="text-xs text-blue-700">
              {selectedLevel === '$10M ARR' ? 'Build core platform capabilities and establish engineering practices.' : 
               selectedLevel === '$20M ARR' ? 'Scale engineering teams by specialization and improve automation.' :
               selectedLevel === '$50M ARR' ? 'Create dedicated teams for platform components and increase reliability.' :
               'Establish engineering centers of excellence and optimize for scale.'}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3">
            <h5 className="text-xs font-medium text-purple-800 mb-1">Compliance & Security</h5>
            <p className="text-xs text-purple-700">
              {selectedLevel === '$10M ARR' ? 'Establish baseline security practices and regulatory compliance.' : 
               selectedLevel === '$20M ARR' ? 'Build dedicated security team and formalize compliance processes.' :
               selectedLevel === '$50M ARR' ? 'Implement advanced security measures and automate compliance.' :
               'Create specialized security teams and prepare for international regulations.'}
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3">
            <h5 className="text-xs font-medium text-orange-800 mb-1">Data & Analytics</h5>
            <p className="text-xs text-orange-700">
              {selectedLevel === '$10M ARR' ? 'Focus on core analytics and data infrastructure.' : 
               selectedLevel === '$20M ARR' ? 'Build specialized data science capabilities and ML foundations.' :
               selectedLevel === '$50M ARR' ? 'Expand data science teams and implement advanced ML models.' :
               'Establish AI/ML centers of excellence and focus on predictive analytics.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
