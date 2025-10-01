'use client';

import { useState } from 'react';
import HeatmapGrid from './HeatmapGrid';
import DetailView from './DetailView';
import { 
  AdjustmentsHorizontalIcon, 
  InformationCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

type TimeRange = '7d' | '30d' | '90d' | 'custom';

const CollaborationDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [showInfo, setShowInfo] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<{
    team1: string;
    team2: string;
    score: number;
    details: any;
  } | null>(null);

  // Handle detail view
  const handleDetailView = (team1: string, team2: string, score: number, details: any) => {
    setSelectedTeams({
      team1,
      team2,
      score,
      details
    });
  };

  // Close detail view
  const closeDetailView = () => {
    setSelectedTeams(null);
  };

  // Refresh data
  const refreshData = () => {
    // In a real app, this would trigger a new API call
    // For now, we'll just force a re-render by changing the time range and back
    const currentRange = timeRange;
    setTimeRange('7d');
    setTimeout(() => {
      setTimeRange(currentRange);
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Cross-Team Collaboration</h1>
        <p className="text-gray-500">
          Analyze communication patterns and collaboration intensity between teams
        </p>
      </div>

      {/* Controls and filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div>
              <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
                Time Range
              </label>
              <select
                id="timeRange"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Information"
            >
              <InformationCircleIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={refreshData}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Refresh data"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-500" />
              Advanced Filters
            </button>
          </div>
        </div>
        
        {/* Info panel */}
        {showInfo && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="font-medium text-gray-800 mb-2">About Collaboration Scores</h4>
            <p className="text-sm text-gray-600 mb-2">
              The collaboration score (0-100) is calculated based on:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
              <li>Message frequency between team members</li>
              <li>Shared meetings and calendar events</li>
              <li>Cross-team task dependencies</li>
              <li>Document collaborations</li>
            </ul>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-red-600">Silos</span> (score &lt; 10) indicate teams with minimal interaction.
              <br />
              <span className="font-medium text-orange-600">Overloads</span> (score &gt; 90) may indicate excessive communication burden.
            </p>
          </div>
        )}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={selectedTeams ? "lg:col-span-2" : "lg:col-span-3"}>
          <HeatmapGrid 
            timeRange={timeRange}
            onDetailView={handleDetailView}
          />
        </div>
        
        {selectedTeams && (
          <div className="lg:col-span-1">
            <DetailView 
              team1={selectedTeams.team1}
              team2={selectedTeams.team2}
              score={selectedTeams.score}
              details={selectedTeams.details}
              onClose={closeDetailView}
            />
          </div>
        )}
      </div>
      
      {/* Integration status */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Data Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">Slack</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">Google Calendar</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">Jira</div>
              <div className="text-xs text-gray-500">Not connected</div>
            </div>
            <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">
              Connect
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <ArrowPathIcon className="w-3 h-3 mr-1 text-gray-400" />
          Last data sync: May 3, 2025, 13:30 (Refreshes hourly)
        </div>
      </div>
    </div>
  );
};

export default CollaborationDashboard;
