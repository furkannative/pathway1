'use client';

import { useState } from 'react';
import { 
  XMarkIcon, 
  ExclamationTriangleIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type RiskDetailPanelProps = {
  role: string;
  department: string;
  score: number;
  daysOpen: number;
  benchmarkDays: number;
  applicants: number;
  interviewsScheduled: number;
  interviewsCompleted: number;
  recruiter: string;
  jobDescription: string;
  timeInStages: {
    stage: string;
    averageDays: number;
    benchmarkDays: number;
  }[];
  interviewerAvailability: {
    name: string;
    role: string;
    availableSlots: number;
    conflictCount: number;
    isOverbooked: boolean;
  }[];
  suggestedActions: string[];
  onClose: () => void;
};

const RiskDetailPanel = ({
  role,
  department,
  score,
  daysOpen,
  benchmarkDays,
  applicants,
  interviewsScheduled,
  interviewsCompleted,
  recruiter,
  jobDescription,
  timeInStages,
  interviewerAvailability,
  suggestedActions,
  onClose
}: RiskDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviewers' | 'suggestions'>('overview');

  // Determine risk level based on score
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'low', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    if (score < 70) return { level: 'medium', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { level: 'high', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const riskInfo = getRiskLevel(score);
  
  // Calculate progress percentage for timeline
  const progressPercentage = Math.min(100, (daysOpen / benchmarkDays) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{role}</h2>
          <p className="text-gray-500">{department}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-14 h-14 ${riskInfo.bg} rounded-full ${riskInfo.color} font-bold text-xl mr-4`}>
            {score}
          </div>
          <div>
            <div className="text-sm text-gray-500">Risk Score</div>
            <div className="font-medium text-gray-800">
              {riskInfo.level === 'high' ? 'High Risk' : riskInfo.level === 'medium' ? 'Medium Risk' : 'Low Risk'}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Days Open</div>
            <div className="font-medium text-gray-800">{daysOpen}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Benchmark</div>
            <div className="font-medium text-gray-800">{benchmarkDays} days</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Applicants</div>
            <div className="font-medium text-gray-800">{applicants}</div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'interviewers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('interviewers')}
          >
            Interviewers
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'suggestions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-5">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Timeline Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className={`h-2 rounded-full ${riskInfo.level === 'high' ? 'bg-red-500' : riskInfo.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Start</span>
                <span>{daysOpen} days / {benchmarkDays} benchmark</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Time in Stages</h3>
              <div className="space-y-3">
                {timeInStages.map((stage, index) => {
                  const stageProgress = (stage.averageDays / stage.benchmarkDays) * 100;
                  const isDelayed = stage.averageDays > stage.benchmarkDays;
                  
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">{stage.stage}</span>
                        <span className={isDelayed ? 'text-red-500' : 'text-green-500'}>
                          {stage.averageDays} days {isDelayed ? '(delayed)' : '(on track)'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${isDelayed ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(100, stageProgress)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <UserIcon className="w-4 h-4 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500">Application Rate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{(applicants / daysOpen).toFixed(1)}/day</span>
                    {(applicants / daysOpen) < 2 ? (
                      <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500">Interview Completion</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{Math.round((interviewsCompleted / interviewsScheduled) * 100)}%</span>
                    {(interviewsCompleted / interviewsScheduled) < 0.8 ? (
                      <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <ClockIcon className="w-4 h-4 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500">Feedback Time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2.3 days</span>
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500">Candidate Engagement</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Medium</span>
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'interviewers' && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Interviewer Availability</h3>
            <div className="space-y-3">
              {interviewerAvailability.map((interviewer, index) => (
                <div key={index} className={`p-3 rounded-lg border ${interviewer.isOverbooked ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-800">{interviewer.name}</div>
                      <div className="text-xs text-gray-500">{interviewer.role}</div>
                    </div>
                    {interviewer.isOverbooked ? (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Overbooked</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Available</span>
                    )}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <CalendarIcon className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-600">{interviewer.availableSlots} available slots</span>
                    </div>
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className={`w-3.5 h-3.5 ${interviewer.conflictCount > 0 ? 'text-red-400' : 'text-gray-400'} mr-1`} />
                      <span className="text-xs text-gray-600">{interviewer.conflictCount} conflicts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'suggestions' && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested Actions</h3>
            <div className="space-y-3">
              {suggestedActions.map((action, index) => (
                <div key={index} className="flex items-start p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">{action}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Job Description Analysis</h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="w-4 h-4 text-gray-500 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">Optimization Opportunities</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-1.5">•</span>
                    <span>Job title may be too specific, limiting candidate pool</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-1.5">•</span>
                    <span>Required qualifications may be too strict (10+ years experience)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-1.5">•</span>
                    <span>Benefits and perks are well highlighted</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center">
            <ClockIcon className="w-3.5 h-3.5 mr-1" />
            Last updated: May 3, 2025, 14:08
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Export Data
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Share to Slack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDetailPanel;
