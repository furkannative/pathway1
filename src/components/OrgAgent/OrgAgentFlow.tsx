'use client';

import { useCallback, useState, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
  Connection,
  MarkerType,
  useReactFlow,
  Panel,
  ReactFlowProvider,
  ReactFlowInstance,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import OrgAgentNode from './OrgAgentNode';
import AgentDetailPanel from './AgentDetailPanel';
import { usePeopleStore } from '@/store/peopleStore';
import { useRef } from 'react';
import { ViewfinderCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

// Node types for ReactFlow
const nodeTypes = {
  orgNode: OrgAgentNode,
};

// Projeksiyon periyodu prop'unu ekle
interface OrgAgentFlowProps {
  projectionPeriod: 'current' | '6months' | '1year' | '3years';
}

// FinTech şirketi için başlangıç verileri - AI ajanları ve sistemleri eklenmiş
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'orgNode',
    position: { x: 400, y: 50 },
    data: {
      title: 'Alex Morgan',
      role: 'CEO',
      department: 'Executive',
      isHiring: false,
      description: 'Chief Executive Officer responsible for overall company strategy and vision.',
      location: 'New York',
      employeeCount: 5,
      agentSystems: [
        { name: 'Executive Assistant AI', type: 'agent', description: 'Handles scheduling, email management, and basic communications' },
        { name: 'Strategic Analysis System', type: 'system', description: 'Provides market analysis and strategic recommendations' }
      ],
      workDistribution: { human: 80, ai: 20 },
      workingHours: { human: 50, ai: 168 }
    },
  },
  {
    id: '2',
    type: 'orgNode',
    position: { x: 100, y: 250 },
    data: {
      title: 'Sarah Johnson',
      role: 'CTO',
      department: 'Technology',
      isHiring: true,
      description: 'Chief Technology Officer leading all technology initiatives and innovation.',
      location: 'San Francisco',
      employeeCount: 3,
      agentSystems: [
        { name: 'Code Review AI', type: 'agent', description: 'Automated code review and quality assurance' },
        { name: 'Tech Trend Analyzer', type: 'system', description: 'Monitors industry trends and emerging technologies' },
        { name: 'Infrastructure Monitor', type: 'system', description: 'Real-time monitoring of cloud infrastructure' }
      ],
      workDistribution: { human: 70, ai: 30 },
      workingHours: { human: 45, ai: 168 }
    },
  },
  {
    id: '3',
    type: 'orgNode',
    position: { x: 700, y: 250 },
    data: {
      title: 'Michael Chen',
      role: 'CFO',
      department: 'Finance',
      isHiring: false,
      description: 'Chief Financial Officer managing company finances and investments.',
      location: 'Chicago',
      employeeCount: 2,
      agentSystems: [
        { name: 'Financial Forecasting AI', type: 'agent', description: 'Predictive financial modeling and forecasting' },
        { name: 'Expense Analyzer', type: 'system', description: 'Automated expense categorization and analysis' }
      ],
      workDistribution: { human: 75, ai: 25 },
      workingHours: { human: 45, ai: 168 }
    },
  },
  {
    id: '4',
    type: 'orgNode',
    position: { x: -50, y: 450 },
    data: {
      title: 'Emily Davis',
      role: 'Engineering Manager',
      department: 'Technology',
      isHiring: true,
      description: 'Managing the engineering team and technical projects.',
      location: 'Remote',
      employeeCount: 0,
      agentSystems: [
        { name: 'Sprint Planning Assistant', type: 'agent', description: 'Helps optimize sprint planning and resource allocation' },
        { name: 'Bug Triage System', type: 'system', description: 'Automatically categorizes and prioritizes bugs' }
      ],
      workDistribution: { human: 65, ai: 35 },
      workingHours: { human: 40, ai: 168 }
    },
  },
  {
    id: '5',
    type: 'orgNode',
    position: { x: 250, y: 450 },
    data: {
      title: 'David Wilson',
      role: 'Product Manager',
      department: 'Product',
      isHiring: false,
      description: 'Leading product strategy and roadmap development for payment solutions.',
      location: 'Boston',
      employeeCount: 0,
      agentSystems: [
        { name: 'User Feedback Analyzer', type: 'agent', description: 'Processes and categorizes user feedback' },
        { name: 'Competitive Analysis Tool', type: 'system', description: 'Monitors competitor products and features' }
      ],
      workDistribution: { human: 70, ai: 30 },
      workingHours: { human: 40, ai: 120 }
    },
  },
  {
    id: '6',
    type: 'orgNode',
    position: { x: 550, y: 450 },
    data: {
      title: 'Lisa Taylor',
      role: 'Marketing Director',
      department: 'Marketing',
      isHiring: true,
      description: 'Overseeing all marketing initiatives and brand strategy.',
      location: 'Los Angeles',
      employeeCount: 0,
      agentSystems: [
        { name: 'Content Generation AI', type: 'agent', description: 'Creates marketing copy and content drafts' },
        { name: 'Campaign Analytics', type: 'system', description: 'Real-time marketing campaign performance tracking' }
      ],
      workDistribution: { human: 60, ai: 40 },
      workingHours: { human: 40, ai: 168 }
    },
  },
  {
    id: '7',
    type: 'orgNode',
    position: { x: 850, y: 450 },
    data: {
      title: 'James Brown',
      role: 'Financial Analyst',
      department: 'Finance',
      isHiring: false,
      description: 'Analyzing financial data and preparing reports for investment decisions.',
      location: 'New York',
      employeeCount: 0,
      agentSystems: [
        { name: 'Data Processing AI', type: 'agent', description: 'Processes and cleans financial datasets' },
        { name: 'Report Generator', type: 'system', description: 'Automated financial report generation' }
      ],
      workDistribution: { human: 50, ai: 50 },
      workingHours: { human: 40, ai: 168 }
    },
  },
];

// 6 aylık projeksiyon için ek pozisyonlar
const sixMonthsProjectionNodes: Node[] = [
  ...initialNodes,
  {
    id: '8',
    type: 'orgNode',
    position: { x: -150, y: 650 },
    data: {
      title: 'Open Position',
      role: 'Backend Developer',
      department: 'Technology',
      isHiring: true,
      description: 'Developing and maintaining core banking APIs and microservices.',
      location: 'Remote',
      employeeCount: 0,
      agentSystems: [
        { name: 'Code Generation Assistant', type: 'agent', description: 'Assists with boilerplate code generation' },
        { name: 'API Testing System', type: 'system', description: 'Automated API testing and validation' }
      ],
      workDistribution: { human: 60, ai: 40 },
      workingHours: { human: 40, ai: 120 }
    },
  },
  {
    id: '9',
    type: 'orgNode',
    position: { x: 50, y: 650 },
    data: {
      title: 'Open Position',
      role: 'Frontend Developer',
      department: 'Technology',
      isHiring: true,
      description: 'Building responsive and intuitive user interfaces for financial applications.',
      location: 'San Francisco',
      employeeCount: 0,
      agentSystems: [
        { name: 'UI Component Generator', type: 'agent', description: 'Generates UI components from specifications' },
        { name: 'Accessibility Checker', type: 'system', description: 'Ensures UI meets accessibility standards' }
      ],
      workDistribution: { human: 65, ai: 35 },
      workingHours: { human: 40, ai: 100 }
    },
  },
  {
    id: '10',
    type: 'orgNode',
    position: { x: 750, y: 650 },
    data: {
      title: 'Open Position',
      role: 'Compliance Officer',
      department: 'Finance',
      isHiring: true,
      description: 'Ensuring company adherence to financial regulations and compliance standards.',
      location: 'New York',
      employeeCount: 0,
      agentSystems: [
        { name: 'Regulatory Scanner', type: 'agent', description: 'Monitors regulatory changes and updates' },
        { name: 'Compliance Checker', type: 'system', description: 'Automated compliance verification for documents' }
      ],
      workDistribution: { human: 70, ai: 30 },
      workingHours: { human: 40, ai: 168 }
    },
  },
];

// Başlangıç bağlantıları
const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e2-5', 
    source: '2', 
    target: '5', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e3-6', 
    source: '3', 
    target: '6', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e3-7', 
    source: '3', 
    target: '7', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
];

// 6 aylık projeksiyon için ek bağlantılar
const sixMonthsProjectionEdges: Edge[] = [
  ...initialEdges,
  { 
    id: 'e4-8', 
    source: '4', 
    target: '8', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e4-9', 
    source: '4', 
    target: '9', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
  { 
    id: 'e7-10', 
    source: '7', 
    target: '10', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: false 
  },
];

// Ana bileşen içeriği
function OrgAgentFlowContent({ projectionPeriod }: OrgAgentFlowProps) {
  // ReactFlow instance
  const { fitView } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Nodes and edges state
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  // Selected node for editing
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  // Load nodes and edges based on projection period
  useEffect(() => {
    let currentNodes: Node[] = [];
    let currentEdges: Edge[] = [];
    
    switch (projectionPeriod) {
      case 'current':
        currentNodes = initialNodes;
        currentEdges = initialEdges;
        break;
      case '6months':
        currentNodes = sixMonthsProjectionNodes;
        currentEdges = sixMonthsProjectionEdges;
        break;
      case '1year':
        // Implement 1 year projection data
        currentNodes = sixMonthsProjectionNodes;
        currentEdges = sixMonthsProjectionEdges;
        break;
      case '3years':
        // Implement 3 year projection data
        currentNodes = sixMonthsProjectionNodes;
        currentEdges = sixMonthsProjectionEdges;
        break;
    }
    
    setNodes(currentNodes);
    setEdges(currentEdges);
    
    // Reset selected node
    setSelectedNode(null);
    
    // Fit view after a short delay to ensure nodes are rendered
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
  }, [projectionPeriod, fitView]);
  
  // Handle node changes (position, selection, etc.)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      
      // Update selected node if selection changed
      const selectionChange = changes.find(
        (change) => change.type === 'select' && change.selected === true
      );
      
      if (selectionChange && selectionChange.id) {
        const node = nodes.find((n) => n.id === selectionChange.id);
        if (node) {
          setSelectedNode(node);
        }
      } else if (changes.every((change) => change.type === 'select' && change.selected === false)) {
        setSelectedNode(null);
      }
    },
    [nodes]
  );
  
  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );
  
  // Handle new connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 2, stroke: '#3b82f6' },
        animated: false
      }, eds));
    },
    []
  );
  
  // Update node data
  const handleNodeUpdate = useCallback(
    (id: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );
      
      // Update selected node
      setSelectedNode((prev) => {
        if (prev && prev.id === id) {
          return {
            ...prev,
            data: {
              ...prev.data,
              ...data,
            },
          };
        }
        return prev;
      });
    },
    []
  );
  
  // Delete node
  const handleNodeDelete = useCallback(
    (id: string) => {
      // Remove connected edges
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== id && edge.target !== id
      ));
      
      // Remove node
      setNodes((nds) => nds.filter((node) => node.id !== id));
      
      // Clear selected node
      setSelectedNode(null);
    },
    []
  );
  
  // Close detail panel
  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);
  
  // Add new node
  const addNewNode = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const newNodeId = uuidv4();
    const position = reactFlowInstance.project({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    });
    
    const newNode: Node = {
      id: newNodeId,
      type: 'orgNode',
      position,
      data: {
        title: 'New Position',
        role: '',
        department: '',
        isHiring: false,
        description: '',
        location: '',
        employeeCount: 0,
        agentSystems: [],
        workDistribution: { human: 100, ai: 0 },
        workingHours: { human: 40, ai: 0 }
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    
    // Select the new node
    setSelectedNode(newNode);
  }, [reactFlowInstance]);
  
  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        onInit={setReactFlowInstance}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { strokeWidth: 2, stroke: '#3b82f6' },
        }}
      >
        <Controls />
        <Background color="#f8fafc" gap={16} />
        
        {/* Add Node Button */}
        <Panel position="top-right" className="bg-white p-2 rounded-md shadow-md">
          <button
            onClick={addNewNode}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Add Position
          </button>
        </Panel>
        
        {/* Fit View Button */}
        <Panel position="top-left" className="bg-white p-2 rounded-md shadow-md">
          <button
            onClick={() => fitView({ padding: 0.2 })}
            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
          >
            <ViewfinderCircleIcon className="h-4 w-4" />
            Fit View
          </button>
        </Panel>
      </ReactFlow>
      
      {/* Detail Panel */}
      <div className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-10 ${
        selectedNode ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <AgentDetailPanel
          selectedNode={selectedNode}
          onNodeUpdate={handleNodeUpdate}
          onNodeDelete={handleNodeDelete}
          onClose={handleClosePanel}
        />
      </div>
    </div>
  );
}

// Wrap with ReactFlowProvider
export default function OrgAgentFlow({ projectionPeriod }: OrgAgentFlowProps) {
  return (
    <ReactFlowProvider>
      <OrgAgentFlowContent projectionPeriod={projectionPeriod} />
    </ReactFlowProvider>
  );
}
