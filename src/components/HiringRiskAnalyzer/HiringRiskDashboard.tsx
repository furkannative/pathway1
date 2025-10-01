'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import RiskScoreCard from './RiskScoreCard';
import RiskDetailPanel from './RiskDetailPanel';

// Types
type FilterOption = 'all' | 'high-risk' | 'medium-risk' | 'low-risk';
type SortOption = 'risk-desc' | 'risk-asc' | 'days-desc' | 'days-asc';
type Department = 'all' | 'engineering' | 'product' | 'marketing' | 'sales' | 'finance' | 'hr';

// Mock data
const MOCK_ROLES = [
  {
    id: 1,
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    score: 85,
    daysOpen: 45,
    benchmarkDays: 30,
    applicants: 12,
    interviewsScheduled: 8,
    interviewsCompleted: 5,
    recruiter: 'Sarah Johnson',
    jobDescription: 'We are looking for a Senior Backend Engineer...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 5, benchmarkDays: 3 },
      { stage: 'Technical Screen', averageDays: 12, benchmarkDays: 7 },
      { stage: 'Technical Interview', averageDays: 18, benchmarkDays: 10 },
      { stage: 'Final Interview', averageDays: 10, benchmarkDays: 10 },
    ],
    interviewerAvailability: [
      { name: 'John Smith', role: 'Engineering Manager', availableSlots: 2, conflictCount: 5, isOverbooked: true },
      { name: 'Emily Chen', role: 'Senior Engineer', availableSlots: 4, conflictCount: 2, isOverbooked: false },
      { name: 'Michael Brown', role: 'Tech Lead', availableSlots: 1, conflictCount: 7, isOverbooked: true },
    ],
    suggestedActions: [
      'Add 2-3 backup interviewers to increase scheduling flexibility',
      'Expand candidate sourcing channels to increase application volume',
      'Reduce time-to-feedback by implementing automated reminders',
      'Consider simplifying the technical assessment to reduce candidate drop-off'
    ]
  },
  {
    id: 2,
    role: 'Product Manager',
    department: 'Product',
    score: 62,
    daysOpen: 28,
    benchmarkDays: 35,
    applicants: 25,
    interviewsScheduled: 12,
    interviewsCompleted: 9,
    recruiter: 'David Wilson',
    jobDescription: 'We are looking for a Product Manager...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 3, benchmarkDays: 3 },
      { stage: 'Initial Screen', averageDays: 8, benchmarkDays: 5 },
      { stage: 'Case Study', averageDays: 12, benchmarkDays: 10 },
      { stage: 'Final Interview', averageDays: 5, benchmarkDays: 7 },
    ],
    interviewerAvailability: [
      { name: 'Jessica Lee', role: 'Head of Product', availableSlots: 3, conflictCount: 2, isOverbooked: false },
      { name: 'Robert Garcia', role: 'Senior PM', availableSlots: 5, conflictCount: 1, isOverbooked: false },
      { name: 'Sophia Wang', role: 'Design Lead', availableSlots: 4, conflictCount: 3, isOverbooked: false },
    ],
    suggestedActions: [
      'Accelerate feedback collection after case study reviews',
      'Consider adding a collaborative exercise to the interview process',
      'Prepare interview panel for upcoming availability constraints'
    ]
  },
  {
    id: 3,
    role: 'Financial Analyst',
    department: 'Finance',
    score: 25,
    daysOpen: 15,
    benchmarkDays: 40,
    applicants: 35,
    interviewsScheduled: 18,
    interviewsCompleted: 16,
    recruiter: 'Sarah Johnson',
    jobDescription: 'We are looking for a Financial Analyst...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 2, benchmarkDays: 3 },
      { stage: 'Initial Screen', averageDays: 4, benchmarkDays: 5 },
      { stage: 'Skills Assessment', averageDays: 6, benchmarkDays: 7 },
      { stage: 'Final Interview', averageDays: 3, benchmarkDays: 7 },
    ],
    interviewerAvailability: [
      { name: 'Thomas Clark', role: 'Finance Director', availableSlots: 6, conflictCount: 0, isOverbooked: false },
      { name: 'Amanda Lewis', role: 'Senior Analyst', availableSlots: 8, conflictCount: 1, isOverbooked: false },
      { name: 'Daniel Kim', role: 'Finance Manager', availableSlots: 5, conflictCount: 2, isOverbooked: false },
    ],
    suggestedActions: [
      'Continue with current process - role is on track',
      'Consider preparing offer packages in advance to expedite final stage'
    ]
  },
  {
    id: 4,
    role: 'Marketing Specialist',
    department: 'Marketing',
    score: 78,
    daysOpen: 32,
    benchmarkDays: 25,
    applicants: 28,
    interviewsScheduled: 10,
    interviewsCompleted: 7,
    recruiter: 'David Wilson',
    jobDescription: 'We are looking for a Marketing Specialist...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 4, benchmarkDays: 3 },
      { stage: 'Initial Screen', averageDays: 7, benchmarkDays: 5 },
      { stage: 'Portfolio Review', averageDays: 14, benchmarkDays: 8 },
      { stage: 'Final Interview', averageDays: 7, benchmarkDays: 7 },
    ],
    interviewerAvailability: [
      { name: 'Rachel Green', role: 'Marketing Director', availableSlots: 1, conflictCount: 6, isOverbooked: true },
      { name: 'Jason Taylor', role: 'Brand Manager', availableSlots: 3, conflictCount: 4, isOverbooked: true },
      { name: 'Michelle Park', role: 'Content Lead', availableSlots: 4, conflictCount: 2, isOverbooked: false },
    ],
    suggestedActions: [
      'Streamline portfolio review process to reduce time-in-stage',
      'Add 2 backup interviewers from the marketing team',
      'Consider implementing a group interview format to maximize interviewer time'
    ]
  },
  {
    id: 5,
    role: 'DevOps Engineer',
    department: 'Engineering',
    score: 92,
    daysOpen: 60,
    benchmarkDays: 35,
    applicants: 8,
    interviewsScheduled: 5,
    interviewsCompleted: 3,
    recruiter: 'Sarah Johnson',
    jobDescription: 'We are looking for a DevOps Engineer...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 6, benchmarkDays: 3 },
      { stage: 'Technical Screen', averageDays: 15, benchmarkDays: 7 },
      { stage: 'Technical Interview', averageDays: 22, benchmarkDays: 10 },
      { stage: 'Final Interview', averageDays: 17, benchmarkDays: 10 },
    ],
    interviewerAvailability: [
      { name: 'Andrew Wilson', role: 'Infrastructure Lead', availableSlots: 0, conflictCount: 8, isOverbooked: true },
      { name: 'Lisa Chen', role: 'DevOps Lead', availableSlots: 1, conflictCount: 6, isOverbooked: true },
      { name: 'Kevin Martinez', role: 'SRE', availableSlots: 2, conflictCount: 5, isOverbooked: true },
    ],
    suggestedActions: [
      'Urgently expand candidate sourcing channels for this specialized role',
      'Consider contracting a technical recruiter specialized in DevOps',
      'Temporarily reassign interviewers from other engineering teams',
      'Evaluate compensation package against market rates for DevOps talent',
      'Consider internal upskilling program as a long-term solution'
    ]
  },
  {
    id: 6,
    role: 'Customer Success Manager',
    department: 'Sales',
    score: 45,
    daysOpen: 22,
    benchmarkDays: 30,
    applicants: 30,
    interviewsScheduled: 15,
    interviewsCompleted: 12,
    recruiter: 'David Wilson',
    jobDescription: 'We are looking for a Customer Success Manager...',
    timeInStages: [
      { stage: 'Application Review', averageDays: 3, benchmarkDays: 3 },
      { stage: 'Initial Screen', averageDays: 6, benchmarkDays: 5 },
      { stage: 'Role Play Exercise', averageDays: 9, benchmarkDays: 7 },
      { stage: 'Final Interview', averageDays: 4, benchmarkDays: 7 },
    ],
    interviewerAvailability: [
      { name: 'Jennifer Adams', role: 'Head of Customer Success', availableSlots: 4, conflictCount: 3, isOverbooked: false },
      { name: 'Brian Johnson', role: 'Senior CSM', availableSlots: 6, conflictCount: 1, isOverbooked: false },
      { name: 'Olivia Martinez', role: 'Account Executive', availableSlots: 5, conflictCount: 2, isOverbooked: false },
    ],
    suggestedActions: [
      'Accelerate role play feedback process',
      'Prepare for potential scheduling conflicts next week due to QBR',
      'Consider adding a customer interaction simulation to better assess candidates'
    ]
  }
];

const HiringRiskDashboard = () => {
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [filteredRoles, setFilteredRoles] = useState(MOCK_ROLES);
  const [selectedRole, setSelectedRole] = useState<typeof MOCK_ROLES[0] | null>(null);
  const [filterRisk, setFilterRisk] = useState<FilterOption>('all');
  const [filterDepartment, setFilterDepartment] = useState<Department>('all');
  const [sortOption, setSortOption] = useState<SortOption>('risk-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...roles];
    
    // Apply risk filter
    if (filterRisk !== 'all') {
      result = result.filter(role => {
        if (filterRisk === 'high-risk') return role.score >= 70;
        if (filterRisk === 'medium-risk') return role.score >= 30 && role.score < 70;
        if (filterRisk === 'low-risk') return role.score < 30;
        return true;
      });
    }
    
    // Apply department filter
    if (filterDepartment !== 'all') {
      result = result.filter(role => 
        role.department.toLowerCase() === filterDepartment
      );
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(role => 
        role.role.toLowerCase().includes(query) || 
        role.department.toLowerCase().includes(query) ||
        role.recruiter.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'risk-desc':
          return b.score - a.score;
        case 'risk-asc':
          return a.score - b.score;
        case 'days-desc':
          return b.daysOpen - a.daysOpen;
        case 'days-asc':
          return a.daysOpen - b.daysOpen;
        default:
          return 0;
      }
    });
    
    setFilteredRoles(result);
  }, [roles, filterRisk, filterDepartment, sortOption, searchQuery]);

  // Handle refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Handle role selection
  const handleRoleSelect = (role: typeof MOCK_ROLES[0]) => {
    setSelectedRole(role);
  };

  // Close detail panel
  const handleCloseDetail = () => {
    setSelectedRole(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Hiring Delay Risk Analyzer</h1>
          <p className="text-gray-500">Monitor and predict delays in your hiring pipeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <ChartBarIcon className="h-5 w-5 mr-2 text-gray-500" />
            Analytics
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedRole ? "lg:col-span-2" : "lg:col-span-3"}>
          {/* Filters and search */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search roles, departments, recruiters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value as FilterOption)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="high-risk">High Risk</option>
                    <option value="medium-risk">Medium Risk</option>
                    <option value="low-risk">Low Risk</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value as Department)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="finance">Finance</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="risk-desc">Highest Risk First</option>
                    <option value="risk-asc">Lowest Risk First</option>
                    <option value="days-desc">Longest Open First</option>
                    <option value="days-asc">Newest First</option>
                  </select>
                </div>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Results summary */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Showing {filteredRoles.length} of {roles.length} open positions
            </div>
            <div className="flex space-x-1">
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                {roles.filter(r => r.score >= 70).length} High Risk
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                {roles.filter(r => r.score >= 30 && r.score < 70).length} Medium Risk
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                {roles.filter(r => r.score < 30).length} Low Risk
              </span>
            </div>
          </div>
          
          {/* Role cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoles.length > 0 ? (
              filteredRoles.map(role => (
                <RiskScoreCard
                  key={role.id}
                  score={role.score}
                  role={role.role}
                  department={role.department}
                  daysOpen={role.daysOpen}
                  applicants={role.applicants}
                  interviewsScheduled={role.interviewsScheduled}
                  interviewsCompleted={role.interviewsCompleted}
                  recruiter={role.recruiter}
                  benchmarkDays={role.benchmarkDays}
                  onClick={() => handleRoleSelect(role)}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 flex flex-col items-center justify-center text-gray-500">
                <FunnelIcon className="w-12 h-12 mb-3 text-gray-300" />
                <p>No roles match your current filters</p>
                <button 
                  onClick={() => {
                    setFilterRisk('all');
                    setFilterDepartment('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Detail panel */}
        {selectedRole && (
          <div className="lg:col-span-1">
            <RiskDetailPanel
              role={selectedRole.role}
              department={selectedRole.department}
              score={selectedRole.score}
              daysOpen={selectedRole.daysOpen}
              benchmarkDays={selectedRole.benchmarkDays}
              applicants={selectedRole.applicants}
              interviewsScheduled={selectedRole.interviewsScheduled}
              interviewsCompleted={selectedRole.interviewsCompleted}
              recruiter={selectedRole.recruiter}
              jobDescription={selectedRole.jobDescription}
              timeInStages={selectedRole.timeInStages}
              interviewerAvailability={selectedRole.interviewerAvailability}
              suggestedActions={selectedRole.suggestedActions}
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HiringRiskDashboard;
