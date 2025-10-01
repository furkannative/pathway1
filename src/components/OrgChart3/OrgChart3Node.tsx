'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Node data interface
interface OrgChart3NodeData {
  title: string;
  department: string;
  role?: string;
  employeeCount: number;
  isCollapsed?: boolean;
  isHiring?: boolean;
  description?: string;
  location?: string;
  onAddChild?: (parentId: string) => void;
}

// Department color mapping
const departmentColors: { [key: string]: string } = {
  'Executive': 'bg-purple-50 border-purple-200 hover:bg-purple-100',
  'Technology': 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  'Finance': 'bg-green-50 border-green-200 hover:bg-green-100',
  'Marketing': 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  'HR': 'bg-pink-50 border-pink-200 hover:bg-pink-100',
  'Sales': 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
  'Operations': 'bg-teal-50 border-teal-200 hover:bg-teal-100',
  'Product': 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
  'Design': 'bg-rose-50 border-rose-200 hover:bg-rose-100',
  'Department A': 'bg-red-50 border-red-200 hover:bg-red-100',
  'Department B': 'bg-amber-50 border-amber-200 hover:bg-amber-100',
  'Department C': 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
};

export default function OrgChart3Node({ data, id, selected }: NodeProps<OrgChart3NodeData>) {
  // Get node color based on role, department and hiring status
  const getNodeStyle = () => {
    // C-level executives get special styling
    if (data.role && data.role.includes('C') && data.role.includes('O')) {
      return 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600';
    }
    
    // Department-based styling
    const deptClass = departmentColors[data.department] || 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    
    // Add hiring indicator
    if (data.isHiring) {
      return `${deptClass} ring-2 ring-red-400 ring-offset-2`;
    }
    
    return deptClass;
  };

  // Calculate opacity based on whether node is projected
  const isProjected = data.title === 'Open Position';
  
  return (
    <div className={`relative rounded-xl shadow-lg p-4 border transition-all duration-200 min-w-[180px] max-w-[220px] ${getNodeStyle()} ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
      {/* Hiring badge */}
      {data.isHiring && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          HIRING
        </div>
      )}
      
      {/* Node content */}
      <div className={`flex flex-col gap-1 ${isProjected ? 'opacity-80' : 'opacity-100'}`}>
        <div className="font-semibold text-lg">{data.title}</div>
        {data.role && <div className="text-sm font-medium">{data.role}</div>}
        {data.department && <div className="text-xs text-gray-600 bg-white/50 rounded-md px-2 py-0.5 inline-block">{data.department}</div>}
        {data.location && <div className="text-xs text-gray-500 mt-1">{data.location}</div>}
      </div>
      
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
}

// Memoize the component for better performance
