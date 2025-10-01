'use client';

import { useState, useEffect } from 'react';
import { ArrowsPointingOutIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { toPng } from 'html-to-image';

// Collaboration score types
type TeamScore = {
  team1: string;
  team2: string;
  score: number;
  details?: {
    messages: number;
    meetings: number;
    tasks: number;
  };
};

// Mock data generator
const generateMockData = (): TeamScore[] => {
  const teams = [
    'Engineering', 'Product', 'Design', 'Marketing', 
    'Sales', 'Customer Support', 'Finance', 'HR'
  ];
  
  const result: TeamScore[] = [];
  
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams.length; j++) {
      // Skip self-connections or duplicates (we'll show a symmetric matrix)
      if (i >= j) continue;
      
      // Generate a random score
      const baseScore = Math.random() * 100;
      
      // Create some patterns in the data
      let score = baseScore;
      
      // Engineering and Product teams work closely together
      if ((teams[i] === 'Engineering' && teams[j] === 'Product') || 
          (teams[i] === 'Product' && teams[j] === 'Engineering')) {
        score = 85 + Math.random() * 15;
      }
      
      // Design works with Product but less with others
      if ((teams[i] === 'Design' && teams[j] === 'Product') || 
          (teams[i] === 'Product' && teams[j] === 'Design')) {
        score = 70 + Math.random() * 20;
      }
      
      // Finance is somewhat isolated
      if (teams[i] === 'Finance' || teams[j] === 'Finance') {
        score = Math.min(score, 30 + Math.random() * 20);
      }
      
      // HR connects moderately with all departments
      if (teams[i] === 'HR' || teams[j] === 'HR') {
        score = 40 + Math.random() * 30;
      }
      
      // Add some randomness to make it look realistic
      score = Math.min(100, Math.max(5, score + (Math.random() * 20 - 10)));
      
      result.push({
        team1: teams[i],
        team2: teams[j],
        score: Math.round(score),
        details: {
          messages: Math.round(score * (0.5 + Math.random() * 0.5) * 10),
          meetings: Math.round(score * (0.3 + Math.random() * 0.3) * 0.5),
          tasks: Math.round(score * (0.2 + Math.random() * 0.4) * 2),
        }
      });
    }
  }
  
  return result;
};

// Color scale function
const getColorForScore = (score: number): string => {
  if (score < 10) return 'bg-red-100';
  if (score < 20) return 'bg-red-200';
  if (score < 30) return 'bg-orange-200';
  if (score < 40) return 'bg-yellow-200';
  if (score < 50) return 'bg-yellow-300';
  if (score < 60) return 'bg-green-200';
  if (score < 70) return 'bg-green-300';
  if (score < 80) return 'bg-green-400';
  if (score < 90) return 'bg-green-500';
  return 'bg-green-600';
};

// Text color based on background
const getTextColorForScore = (score: number): string => {
  return score >= 70 ? 'text-white' : 'text-gray-800';
};

// Alert status
const getAlertStatus = (score: number): { type: string; message: string } | null => {
  if (score < 10) {
    return {
      type: 'silo',
      message: 'Potential silo detected'
    };
  }
  if (score > 90) {
    return {
      type: 'overload',
      message: 'Potential communication overload'
    };
  }
  return null;
};

type HeatmapGridProps = {
  timeRange: '7d' | '30d' | '90d' | 'custom';
  onDetailView?: (team1: string, team2: string, score: number, details: any) => void;
};

const HeatmapGrid = ({ timeRange, onDetailView }: HeatmapGridProps) => {
  const [teamScores, setTeamScores] = useState<TeamScore[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedCell, setSelectedCell] = useState<{team1: string, team2: string} | null>(null);
  const [alerts, setAlerts] = useState<{
    silos: {team1: string, team2: string, score: number}[];
    overloads: {team1: string, team2: string, score: number}[];
  }>({
    silos: [],
    overloads: []
  });
  
  // Reference for export
  const [heatmapRef, setHeatmapRef] = useState<HTMLDivElement | null>(null);

  // Load data based on time range
  useEffect(() => {
    // In a real app, this would be an API call with the timeRange parameter
    const data = generateMockData();
    setTeamScores(data);
    
    // Extract unique team names
    const uniqueTeams = Array.from(
      new Set(data.flatMap(item => [item.team1, item.team2]))
    ).sort();
    setTeams(uniqueTeams);
    
    // Generate alerts
    const silos: {team1: string, team2: string, score: number}[] = [];
    const overloads: {team1: string, team2: string, score: number}[] = [];
    
    data.forEach(item => {
      if (item.score < 10) {
        silos.push({
          team1: item.team1,
          team2: item.team2,
          score: item.score
        });
      }
      if (item.score > 90) {
        overloads.push({
          team1: item.team1,
          team2: item.team2,
          score: item.score
        });
      }
    });
    
    setAlerts({ silos, overloads });
  }, [timeRange]);

  // Get score for a team pair
  const getScore = (team1: string, team2: string): number | null => {
    // Check if we have a direct match
    const directMatch = teamScores.find(
      score => (score.team1 === team1 && score.team2 === team2) || 
              (score.team1 === team2 && score.team2 === team1)
    );
    
    if (directMatch) {
      return directMatch.score;
    }
    
    // If it's the same team, return 100 (perfect collaboration with self)
    if (team1 === team2) {
      return 100;
    }
    
    return null;
  };

  // Get details for a team pair
  const getDetails = (team1: string, team2: string) => {
    const match = teamScores.find(
      score => (score.team1 === team1 && score.team2 === team2) || 
              (score.team1 === team2 && score.team2 === team1)
    );
    
    return match?.details || null;
  };

  // Handle cell click
  const handleCellClick = (team1: string, team2: string) => {
    const score = getScore(team1, team2);
    const details = getDetails(team1, team2);
    
    if (score !== null && onDetailView) {
      setSelectedCell({ team1, team2 });
      onDetailView(team1, team2, score, details);
    }
  };

  // Export as PNG
  const exportAsPng = async () => {
    if (!heatmapRef) return;
    
    try {
      const dataUrl = await toPng(heatmapRef);
      const link = document.createElement('a');
      link.download = `collaboration-heatmap-${timeRange}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting heatmap:', error);
    }
  };

  // Export as CSV
  const exportAsCsv = () => {
    // Create CSV content
    let csvContent = "Team1,Team2,Score,Messages,Meetings,Tasks\n";
    
    teamScores.forEach(item => {
      csvContent += `${item.team1},${item.team2},${item.score},${item.details?.messages || 0},${item.details?.meetings || 0},${item.details?.tasks || 0}\n`;
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `collaboration-data-${timeRange}.csv`);
    link.click();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">
          Cross-Team Collaboration Heatmap
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={exportAsPng}
            className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center text-gray-700 border border-gray-200 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-1.5" />
            PNG
          </button>
          <button 
            onClick={exportAsCsv}
            className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center text-gray-700 border border-gray-200 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-1.5" />
            CSV
          </button>
          <button 
            onClick={() => {
              if (onDetailView) {
                onDetailView('', '', 0, null);
              }
            }}
            className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center text-gray-700 border border-gray-200 transition-colors"
          >
            <ArrowsPointingOutIcon className="w-4 h-4 mr-1.5" />
            Fullscreen
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div ref={setHeatmapRef} className="min-w-max">
          {/* Header row with team names */}
          <div className="flex">
            <div className="w-32 flex-shrink-0"></div> {/* Empty corner cell */}
            {teams.map(team => (
              <div 
                key={team} 
                className="w-24 flex-shrink-0 p-2 font-medium text-gray-700 text-sm transform -rotate-45 origin-bottom-left h-32 flex items-end"
              >
                {team}
              </div>
            ))}
          </div>
          
          {/* Matrix rows */}
          {teams.map(rowTeam => (
            <div key={rowTeam} className="flex">
              {/* Row header */}
              <div className="w-32 flex-shrink-0 p-2 font-medium text-gray-700 text-sm flex items-center">
                {rowTeam}
              </div>
              
              {/* Cells */}
              {teams.map(colTeam => {
                const score = getScore(rowTeam, colTeam);
                const isSelected = selectedCell && 
                  ((selectedCell.team1 === rowTeam && selectedCell.team2 === colTeam) ||
                   (selectedCell.team1 === colTeam && selectedCell.team2 === rowTeam));
                
                return (
                  <div 
                    key={`${rowTeam}-${colTeam}`}
                    className={`w-24 h-12 flex-shrink-0 flex items-center justify-center cursor-pointer
                      ${score !== null ? getColorForScore(score) : 'bg-gray-50'} 
                      ${isSelected ? 'ring-2 ring-indigo-500' : ''}
                      hover:opacity-90 transition-all rounded-md m-0.5`}
                    onClick={() => handleCellClick(rowTeam, colTeam)}
                  >
                    {score !== null && (
                      <span className={`font-medium ${getTextColorForScore(score)}`}>
                        {score}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
        <span className="text-sm text-gray-600 mr-3 mb-2 sm:mb-0">Collaboration Score:</span>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center px-2 py-1 bg-red-100 rounded-md">
            <span className="text-xs text-gray-800">0-10</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-red-200 rounded-md">
            <span className="text-xs text-gray-800">10-20</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-orange-200 rounded-md">
            <span className="text-xs text-gray-800">20-30</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-yellow-200 rounded-md">
            <span className="text-xs text-gray-800">30-40</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-yellow-300 rounded-md">
            <span className="text-xs text-gray-800">40-50</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-200 rounded-md">
            <span className="text-xs text-gray-800">50-60</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-300 rounded-md">
            <span className="text-xs text-gray-800">60-70</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-400 rounded-md">
            <span className="text-xs text-gray-800">70-80</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-500 rounded-md">
            <span className="text-xs text-white">80-90</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-600 rounded-md">
            <span className="text-xs text-white">90-100</span>
          </div>
        </div>
      </div>
      
      {/* Alerts section */}
      {(alerts.silos.length > 0 || alerts.overloads.length > 0) && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h4 className="font-medium text-gray-800 mb-4">Alerts</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.silos.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center text-red-600 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm font-medium">Potential Silos</span>
                </div>
                <ul className="space-y-2">
                  {alerts.silos.slice(0, 3).map((alert, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm text-gray-600 p-2 bg-white rounded-lg">
                      <span>{alert.team1} ↔ {alert.team2}</span>
                      <span className="font-medium text-red-600">Score {alert.score}</span>
                    </li>
                  ))}
                  {alerts.silos.length > 3 && (
                    <li className="text-xs text-gray-500 text-center pt-1">
                      +{alerts.silos.length - 3} more silos detected
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {alerts.overloads.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center text-orange-600 mb-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-sm font-medium">Communication Overload</span>
                </div>
                <ul className="space-y-2">
                  {alerts.overloads.slice(0, 3).map((alert, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm text-gray-600 p-2 bg-white rounded-lg">
                      <span>{alert.team1} ↔ {alert.team2}</span>
                      <span className="font-medium text-orange-600">Score {alert.score}</span>
                    </li>
                  ))}
                  {alerts.overloads.length > 3 && (
                    <li className="text-xs text-gray-500 text-center pt-1">
                      +{alerts.overloads.length - 3} more overloads detected
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapGrid;
