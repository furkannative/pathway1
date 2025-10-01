'use client';

import { useState } from 'react';
import { ProjectData } from '../CreateOrgChartWizard';

interface OrgStructureStepProps {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

const structureTypes = [
  {
    id: 'hierarchical',
    name: 'Hierarchical',
    description: 'Traditional top-down structure with clear reporting lines',
    color: 'blue',
    recommended: true,
    benefits: [
      'Clear chain of command',
      'Well-defined career paths',
      'Specialized departments',
      'Suitable for stable environments'
    ]
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Employees report to both functional and project managers',
    color: 'purple',
    recommended: false,
    benefits: [
      'Efficient resource sharing',
      'Cross-functional collaboration',
      'Balanced functional and project priorities',
      'Good for complex projects'
    ]
  },
  {
    id: 'flat',
    name: 'Flat',
    description: 'Few or no middle management layers between staff and executives',
    color: 'green',
    recommended: false,
    benefits: [
      'Faster decision making',
      'Reduced bureaucracy',
      'Increased employee autonomy',
      'Popular in startups and tech companies'
    ]
  },
  {
    id: 'network',
    name: 'Network',
    description: 'Decentralized structure with interconnected teams and departments',
    color: 'orange',
    recommended: false,
    benefits: [
      'Highly adaptable to change',
      'Encourages innovation',
      'Flexible team formation',
      'Suitable for dynamic environments'
    ]
  }
];

export default function OrgStructureStep({ projectData, updateProjectData }: OrgStructureStepProps) {
  const [currentHeadcount, setCurrentHeadcount] = useState(projectData.currentHeadcount.toString());
  
  const handleStructureChange = (structureType: 'hierarchical' | 'matrix' | 'flat' | 'network') => {
    updateProjectData({ structureType });
  };
  
  const handleHeadcountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentHeadcount(value);
    updateProjectData({ currentHeadcount: parseInt(value) || 0 });
  };
  
  const getColorClasses = (type: typeof structureTypes[0]) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-700',
        hover: 'hover:bg-blue-50/70 hover:border-blue-400',
        badge: 'bg-blue-100 text-blue-800',
        radio: 'text-blue-600 focus:ring-blue-500',
        bullet: 'text-blue-500'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-500',
        text: 'text-purple-700',
        hover: 'hover:bg-purple-50/70 hover:border-purple-400',
        badge: 'bg-purple-100 text-purple-800',
        radio: 'text-purple-600 focus:ring-purple-500',
        bullet: 'text-purple-500'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-700',
        hover: 'hover:bg-green-50/70 hover:border-green-400',
        badge: 'bg-green-100 text-green-800',
        radio: 'text-green-600 focus:ring-green-500',
        bullet: 'text-green-500'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-500',
        text: 'text-orange-700',
        hover: 'hover:bg-orange-50/70 hover:border-orange-400',
        badge: 'bg-orange-100 text-orange-800',
        radio: 'text-orange-600 focus:ring-orange-500',
        bullet: 'text-orange-500'
      }
    };
    
    return colors[type.color as keyof typeof colors];
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
            Choose the organizational structure that best fits your company. This will determine how your org chart is visualized and how departments and roles are organized.
          </p>
        </div>
      </div>
      
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Headcount
        </label>
        <div className="max-w-xs">
          <input
            type="number"
            value={currentHeadcount}
            onChange={handleHeadcountChange}
            min="1"
            placeholder="e.g., 50"
            className="block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
          />
          <p className="mt-2 text-xs text-gray-500">
            Enter the total number of employees in your organization
          </p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Organization Structure Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {structureTypes.map((type) => {
            const colorClasses = getColorClasses(type);
            const isSelected = projectData.structureType === type.id;
            
            return (
              <div 
                key={type.id}
                className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
                  isSelected 
                    ? `${colorClasses.border} ${colorClasses.bg}` 
                    : `border border-gray-200 ${colorClasses.hover}`
                }`}
                onClick={() => handleStructureChange(type.id as any)}
              >
                {type.recommended && (
                  <div className="absolute -top-3 -right-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses.badge}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-0.5">
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => {}}
                      className={`h-4 w-4 border-gray-300 ${colorClasses.radio}`}
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </div>
                </div>
                
                <div className="mt-5">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Benefits:</h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className={`${colorClasses.bullet} mr-2`}>•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm mt-8">
        <h3 className="text-base font-medium text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Structure Recommendation
        </h3>
        <p className="mt-3 text-sm text-green-700">
          {projectData.currentHeadcount < 20 
            ? "For organizations with less than 20 employees, a flat structure often works best to maintain agility and direct communication."
            : projectData.currentHeadcount < 50
              ? "With 20-50 employees, consider a hierarchical structure with minimal layers to balance clear reporting lines with organizational agility."
              : projectData.currentHeadcount < 100
                ? "For organizations with 50-100 employees, a hierarchical structure with functional departments or a matrix structure can provide the right balance of specialization and collaboration."
                : "For larger organizations with 100+ employees, a matrix or network structure can help maintain cross-functional collaboration while providing necessary specialization."
          }
        </p>
      </div>
    </div>
  );
}
