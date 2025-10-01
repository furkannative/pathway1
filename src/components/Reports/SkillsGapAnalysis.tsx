'use client';

import { useState } from 'react';

interface SkillData {
  name: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'high' | 'medium' | 'low';
}

const skillsData: SkillData[] = [
  { name: 'Blockchain Development', category: 'Engineering', currentLevel: 2, requiredLevel: 4, priority: 'high' },
  { name: 'AI/ML Engineering', category: 'Data Science', currentLevel: 3, requiredLevel: 5, priority: 'high' },
  { name: 'Cybersecurity', category: 'Security', currentLevel: 3, requiredLevel: 5, priority: 'high' },
  { name: 'Cloud Architecture', category: 'Engineering', currentLevel: 4, requiredLevel: 5, priority: 'medium' },
  { name: 'Regulatory Compliance', category: 'Compliance', currentLevel: 4, requiredLevel: 5, priority: 'high' },
  { name: 'Data Analytics', category: 'Data Science', currentLevel: 3, requiredLevel: 4, priority: 'medium' },
  { name: 'UX Research', category: 'Product', currentLevel: 2, requiredLevel: 3, priority: 'medium' },
  { name: 'API Design', category: 'Engineering', currentLevel: 4, requiredLevel: 4, priority: 'low' },
  { name: 'DevOps', category: 'Operations', currentLevel: 3, requiredLevel: 4, priority: 'medium' },
  { name: 'Product Management', category: 'Product', currentLevel: 4, requiredLevel: 4, priority: 'low' },
  { name: 'Quantum Computing', category: 'Engineering', currentLevel: 1, requiredLevel: 2, priority: 'low' },
  { name: 'Smart Contract Auditing', category: 'Security', currentLevel: 2, requiredLevel: 4, priority: 'high' },
];

export default function SkillsGapAnalysis() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredSkills = skillsData.filter(skill => 
    (filter === 'all' || skill.priority === filter) &&
    (categoryFilter === 'all' || skill.category === categoryFilter)
  );
  
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));
  
  // Calculate summary stats
  const highPriorityCount = skillsData.filter(s => s.priority === 'high').length;
  const mediumPriorityCount = skillsData.filter(s => s.priority === 'medium').length;
  const lowPriorityCount = skillsData.filter(s => s.priority === 'low').length;
  
  // Calculate average gap by category
  const categoryGaps = categories.map(category => {
    const categorySkills = skillsData.filter(s => s.category === category);
    const totalGap = categorySkills.reduce((sum, skill) => sum + (skill.requiredLevel - skill.currentLevel), 0);
    const avgGap = totalGap / categorySkills.length;
    return {
      category,
      avgGap,
      skillCount: categorySkills.length,
      highPriorityCount: categorySkills.filter(s => s.priority === 'high').length
    };
  }).sort((a, b) => b.avgGap - a.avgGap);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Skills Gap Analysis</h3>
        
        <div className="flex space-x-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('high')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              filter === 'high' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High
          </button>
          <button 
            onClick={() => setFilter('medium')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              filter === 'medium' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button 
            onClick={() => setFilter('low')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              filter === 'low' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const gap = skill.requiredLevel - skill.currentLevel;
              
              return (
                <div 
                  key={skill.name} 
                  className={`border rounded-lg p-3 ${
                    skill.priority === 'high' 
                      ? 'border-red-200 bg-red-50' 
                      : skill.priority === 'medium'
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{skill.name}</h4>
                      <p className="text-xs text-gray-500">{skill.category}</p>
                    </div>
                    <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      skill.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : skill.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-1">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Current: {skill.currentLevel}</span>
                        <span>Required: {skill.requiredLevel}</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-blue-600 rounded-full"
                          style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                        ></div>
                        <div 
                          className={`absolute top-0 h-full w-0.5 ${
                            skill.priority === 'high' ? 'bg-red-500' : 
                            skill.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ left: `${(skill.requiredLevel / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                      gap > 2 
                        ? 'bg-red-100 text-red-800' 
                        : gap > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {gap}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No skills match the selected filters.
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-1 space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Skills Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">High Priority</span>
                <span className="text-xs font-medium text-red-600">{highPriorityCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Medium Priority</span>
                <span className="text-xs font-medium text-yellow-600">{mediumPriorityCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Low Priority</span>
                <span className="text-xs font-medium text-green-600">{lowPriorityCount}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-100">
                <span className="text-xs text-gray-600">Total Skills</span>
                <span className="text-xs font-medium text-blue-600">{skillsData.length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Gap by Category</h4>
            <div className="space-y-3">
              {categoryGaps.map(cat => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">{cat.category}</span>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-900">{cat.avgGap.toFixed(1)}</span>
                      {cat.highPriorityCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                          {cat.highPriorityCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${(cat.avgGap / 4) * 100}%`,
                        backgroundColor: cat.avgGap > 1.5 ? '#EF4444' : cat.avgGap > 0.5 ? '#F59E0B' : '#10B981'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h4>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-1.5">•</span>
                <span>Focus on high priority skills with largest gaps first</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-1.5">•</span>
                <span>Implement targeted training for medium priority skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-1.5">•</span>
                <span>Consider strategic hiring for critical skill gaps</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-1.5">•</span>
                <span>Develop mentorship programs to share existing expertise</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
        <div>
          <span className="font-medium">Skills Gap:</span> The difference between current team capabilities and required skills for upcoming projects.
        </div>
        <div>
          Last updated: April 15, 2025
        </div>
      </div>
    </div>
  );
}
