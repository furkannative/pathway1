'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { 
  ChatBubbleLeftRightIcon, 
  CalendarIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

type DetailViewProps = {
  team1: string;
  team2: string;
  score: number;
  details: {
    messages: number;
    meetings: number;
    tasks: number;
  } | null;
  onClose: () => void;
};

// Helper function to get score color
const getScoreColor = (score: number): string => {
  if (score < 10) return 'text-red-500';
  if (score < 30) return 'text-orange-500';
  if (score < 50) return 'text-yellow-500';
  if (score < 70) return 'text-green-500';
  if (score < 90) return 'text-teal-500';
  return 'text-emerald-500';
};

// Helper function to get score description
const getScoreDescription = (score: number): string => {
  if (score < 10) return 'Minimal collaboration';
  if (score < 30) return 'Limited collaboration';
  if (score < 50) return 'Moderate collaboration';
  if (score < 70) return 'Good collaboration';
  if (score < 90) return 'Strong collaboration';
  return 'Intense collaboration';
};

// Helper function to get score background
const getScoreBackground = (score: number): string => {
  if (score < 10) return 'bg-red-50';
  if (score < 30) return 'bg-orange-50';
  if (score < 50) return 'bg-yellow-50';
  if (score < 70) return 'bg-green-50';
  if (score < 90) return 'bg-teal-50';
  return 'bg-emerald-50';
};

// Helper function to get recommendation
const getRecommendation = (score: number, team1: string, team2: string): string => {
  if (score < 10) {
    return `Consider scheduling regular sync meetings between ${team1} and ${team2} teams to improve collaboration.`;
  }
  if (score < 30) {
    return `Encourage more cross-functional projects between ${team1} and ${team2} to strengthen collaboration.`;
  }
  if (score < 50) {
    return `Current collaboration level is acceptable, but could be improved with more shared documentation and knowledge sharing.`;
  }
  if (score < 70) {
    return `Good collaboration level. Consider creating more opportunities for informal interactions to maintain this level.`;
  }
  if (score < 90) {
    return `Strong collaboration. This is a healthy level - maintain current practices.`;
  }
  return `Very high collaboration intensity. Monitor for potential communication overload and meeting fatigue.`;
};

const DetailView = ({ team1, team2, score, details, onClose }: DetailViewProps) => {
  if (!team1 || !team2) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-medium text-gray-800">
          Collaboration Details
        </h3>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-800 font-medium">{team1}</div>
        <div className="mx-3 text-gray-400">↔</div>
        <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-800 font-medium">{team2}</div>
      </div>
      
      <div className={`mb-6 p-4 rounded-xl ${getScoreBackground(score)}`}>
        <div className="text-sm text-gray-600 mb-1">Collaboration Score</div>
        <div className="flex items-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)} mr-3`}>{score}</div>
          <div className="text-gray-700 font-medium">{getScoreDescription(score)}</div>
        </div>
      </div>
      
      {details && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500 mr-2" />
              <div className="text-sm font-medium text-gray-700">Messages</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{details.messages}</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center mb-2">
              <CalendarIcon className="w-5 h-5 text-green-500 mr-2" />
              <div className="text-sm font-medium text-gray-700">Meetings</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{details.meetings}</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center mb-2">
              <ClipboardDocumentListIcon className="w-5 h-5 text-purple-500 mr-2" />
              <div className="text-sm font-medium text-gray-700">Tasks</div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{details.tasks}</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Collaboration Trend</div>
        <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
          <div className="flex items-center text-gray-400">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            <span>Trend data will be available after 90 days</span>
          </div>
        </div>
      </div>
      
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Recommendation</div>
        <div className="bg-indigo-50 rounded-xl p-4 text-gray-700 border border-indigo-100">
          {getRecommendation(score, team1, team2)}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
