'use client';

import { 
  ExclamationTriangleIcon, 
  ClockIcon, 
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

type RiskLevel = 'low' | 'medium' | 'high';

type RiskScoreCardProps = {
  score: number;
  role: string;
  department: string;
  daysOpen: number;
  applicants: number;
  interviewsScheduled: number;
  interviewsCompleted: number;
  recruiter: string;
  benchmarkDays: number;
  onClick?: () => void;
};

const RiskScoreCard = ({
  score,
  role,
  department,
  daysOpen,
  applicants,
  interviewsScheduled,
  interviewsCompleted,
  recruiter,
  benchmarkDays,
  onClick
}: RiskScoreCardProps) => {
  // Determine risk level based on score
  const getRiskLevel = (score: number): RiskLevel => {
    if (score < 30) return 'low';
    if (score < 70) return 'medium';
    return 'high';
  };

  // Get styling based on risk level
  const getRiskStyling = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          scoreBg: 'bg-green-100',
          icon: 'text-green-500'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          scoreBg: 'bg-yellow-100',
          icon: 'text-yellow-500'
        };
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          scoreBg: 'bg-red-100',
          icon: 'text-red-500'
        };
    }
  };

  const riskLevel = getRiskLevel(score);
  const styles = getRiskStyling(riskLevel);
  
  // Calculate progress percentage for timeline
  const progressPercentage = Math.min(100, (daysOpen / benchmarkDays) * 100);

  return (
    <div 
      className={`p-5 ${styles.bg} border ${styles.border} rounded-xl cursor-pointer hover:shadow-md transition-all`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-gray-900 text-lg">{role}</h3>
          <p className="text-gray-500 text-sm">{department}</p>
        </div>
        <div className={`flex items-center justify-center w-12 h-12 ${styles.scoreBg} rounded-full ${styles.text} font-bold`}>
          {score}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Timeline Progress</span>
          <span>{daysOpen} days / {benchmarkDays} benchmark</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${riskLevel === 'high' ? 'bg-red-500' : riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <UserGroupIcon className="w-4 h-4 text-gray-400 mr-1.5" />
          <span className="text-sm text-gray-600">{applicants} applicants</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 text-gray-400 mr-1.5" />
          <span className="text-sm text-gray-600">{interviewsScheduled} interviews</span>
        </div>
      </div>
      
      {riskLevel === 'high' && (
        <div className="flex items-start p-3 bg-white rounded-lg mb-3">
          <ExclamationTriangleIcon className={`w-5 h-5 ${styles.icon} mt-0.5 mr-2 flex-shrink-0`} />
          <div>
            <p className="text-sm text-gray-700 font-medium">High Risk Factors</p>
            <p className="text-xs text-gray-500">Low application volume, interviewer availability conflicts</p>
          </div>
        </div>
      )}
      
      {riskLevel === 'medium' && (
        <div className="flex items-start p-3 bg-white rounded-lg mb-3">
          <ClockIcon className={`w-5 h-5 ${styles.icon} mt-0.5 mr-2 flex-shrink-0`} />
          <div>
            <p className="text-sm text-gray-700 font-medium">Moderate Risk Factors</p>
            <p className="text-xs text-gray-500">Slow feedback from interviewers, longer time-in-stage</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
          <DocumentTextIcon className="w-3.5 h-3.5 mr-1" />
          <span>Recruiter: {recruiter}</span>
        </div>
        <span className="text-indigo-500 font-medium">View Details →</span>
      </div>
    </div>
  );
};

export default RiskScoreCard;
