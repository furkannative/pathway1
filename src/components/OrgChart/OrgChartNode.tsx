'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface OrgNodeData {
  title: string;
  department: string;
  role?: string;
  employeeCount: number;
  isCollapsed?: boolean;
  isHiring?: boolean;
  isProjected?: boolean;
  description?: string;
  location?: string;
  onNodeClick?: (id: string, data: any) => void;
  onAddChild?: (parentId: string) => void;
}

function OrgChartNode({ data, id }: NodeProps<OrgNodeData>) {
  const departmentColors: { [key: string]: string } = {
    'Department A': 'bg-red-50 border-red-100',
    'Department B': 'bg-yellow-50 border-yellow-100',
    'Department C': 'bg-blue-50 border-blue-100',
    'Executive': 'bg-purple-50 border-purple-100',
    'Technology': 'bg-blue-50 border-blue-100',
    'Engineering': 'bg-blue-50 border-blue-100',
    'Finance': 'bg-green-50 border-green-100',
    'Marketing': 'bg-orange-50 border-orange-100',
    'HR': 'bg-pink-50 border-pink-100',
    'Sales': 'bg-indigo-50 border-indigo-100',
    'Operations': 'bg-teal-50 border-teal-100',
    'Product': 'bg-cyan-50 border-cyan-100',
    'Design': 'bg-amber-50 border-amber-100',
    'Data': 'bg-violet-50 border-violet-100',
    'Legal': 'bg-amber-50 border-amber-100',
    'Infrastructure': 'bg-indigo-50 border-indigo-100',
    'Customer Support': 'bg-teal-50 border-teal-100',
  };

  const getStatusColor = () => {
    if (data.isProjected) return 'border-2 border-blue-500 shadow-md bg-blue-50';
    if (data.isHiring) return 'border-2 border-green-500 shadow-lg';
    if (data.title?.toLowerCase().includes('ceo') || data.title?.toLowerCase().includes('cto') || data.title?.toLowerCase().includes('chief')) {
      return 'bg-gradient-to-br from-blue-500 to-blue-300 text-white border-blue-600 shadow-xl';
    }
    if (data.department && departmentColors[data.department]) {
      return departmentColors[data.department] + ' border-2';
    }
    if (data.role?.toLowerCase().includes('manager')) {
      return 'bg-green-50 border-green-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onAddChild) {
      data.onAddChild(id);
    }
  };

  return (
    <div 
      className={`group relative rounded-xl p-4 min-w-[180px] max-w-[220px] cursor-pointer transition-all duration-200 ${getStatusColor()}`}
      style={{ 
        boxShadow: data.isHiring ? '0 0 0 2px #10b981' : 
                  data.isProjected ? '0 0 0 2px #3b82f6' : undefined,
        opacity: data.isProjected ? 0.9 : 1
      }}
      onClick={() => data.onNodeClick && data.onNodeClick(id, data)}
    >
      {/* Üst bağlantı noktası */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className={data.isProjected ? 'bg-blue-500' : ''}
      />
      <div className="flex flex-col gap-1">
        <div className="font-bold text-base truncate">{data.title}</div>
        <div className="text-xs text-gray-500 truncate">{data.role}</div>
        <div className="text-xs text-gray-500 truncate">{data.department}</div>
        {data.location && <div className="text-xs text-gray-400 truncate">{data.location}</div>}
        
        {/* Status badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {data.isHiring && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow whitespace-nowrap">HIRING</span>
          )}
          {data.isProjected && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow whitespace-nowrap">PROJECTED</span>
          )}
        </div>
      </div>
      {/* Alt bağlantı noktası */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={data.isProjected ? 'bg-blue-500' : ''}
      />
      {/* Yeni düğüm ekleme butonu - hover durumunda görünür */}
      <button
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors opacity-0 group-hover:opacity-100"
        onClick={handleAddChild}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}

export default memo(OrgChartNode);
