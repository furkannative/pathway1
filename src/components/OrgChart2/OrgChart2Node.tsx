'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Node data interface
interface OrgNodeData {
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

function OrgChart2Node({ data, id }: NodeProps<OrgNodeData>) {
  // Get node color based on role, department and hiring status
  const getNodeStyle = () => {
    // C-level executives get special styling
    if (data.role?.toLowerCase().includes('ceo') || 
        data.role?.toLowerCase().includes('cto') || 
        data.role?.toLowerCase().includes('cfo') || 
        data.role?.toLowerCase().includes('chief')) {
      return 'bg-gradient-to-br from-blue-500 to-blue-300 text-white border-blue-600 shadow-lg';
    }
    
    // Department-based styling
    if (data.department && departmentColors[data.department]) {
      return departmentColors[data.department];
    }
    
    // Manager styling
    if (data.role?.toLowerCase().includes('manager') || 
        data.role?.toLowerCase().includes('director') || 
        data.role?.toLowerCase().includes('lead')) {
      return 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100';
    }
    
    // Default styling
    return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
  };
  
  // Handle add child button click
  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddChild) {
      data.onAddChild(id);
    }
  };

  return (
    <div 
      className={`group relative rounded-xl p-4 border-2 min-w-[200px] max-w-[250px] cursor-pointer transition-all duration-200 ${getNodeStyle()} ${data.isHiring ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}
    >
      {/* Target handle (top) */}
      <Handle 
        type="target" 
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      {/* Node content */}
      <div className="flex flex-col gap-1.5">
        <div className="font-bold text-base truncate">{data.title || 'Untitled Position'}</div>
        {data.role && <div className="text-sm opacity-80 truncate">{data.role}</div>}
        {data.department && <div className="text-xs opacity-70 truncate">{data.department}</div>}
        {data.location && <div className="text-xs opacity-60 truncate">{data.location}</div>}
        
        {/* Hiring badge */}
        {data.isHiring && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
            HIRING
          </span>
        )}
      </div>
      
      {/* Source handle (bottom) */}
      <Handle 
        type="source" 
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      {/* Add child button */}
      <button
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white rounded-full border border-gray-300 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors opacity-0 group-hover:opacity-100"
        onClick={handleAddChild}
        title="Add child node"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}

// Memoize the component for better performance
export default memo(OrgChart2Node);
