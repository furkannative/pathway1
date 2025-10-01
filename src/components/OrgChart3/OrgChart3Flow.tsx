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
import OrgChart3Node from './OrgChart3Node';
import NodeEditPanel from './NodeEditPanel';
import { usePeopleStore } from '@/store/peopleStore';
import { useRef } from 'react';
import { ViewfinderCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

// Node types for ReactFlow
const nodeTypes = {
  orgNode: OrgChart3Node,
};

// Projeksiyon periyodu prop'unu ekle
interface OrgChart3FlowProps {
  projectionPeriod: 'current' | '6months' | '1year' | '3years';
}

// FinTech şirketi için başlangıç verileri
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
    },
  },
];

// 1 yıllık projeksiyon için ek pozisyonlar
const oneYearProjectionNodes: Node[] = [
  ...sixMonthsProjectionNodes,
  {
    id: '11',
    type: 'orgNode',
    position: { x: 300, y: 650 },
    data: {
      title: 'Open Position',
      role: 'Data Science Lead',
      department: 'Technology',
      isHiring: true,
      description: 'Leading data science initiatives for risk assessment and fraud detection.',
      location: 'Remote',
      employeeCount: 0,
    },
  },
  {
    id: '12',
    type: 'orgNode',
    position: { x: 900, y: 650 },
    data: {
      title: 'Open Position',
      role: 'Investment Analyst',
      department: 'Finance',
      isHiring: true,
      description: 'Analyzing investment opportunities and managing portfolio strategies.',
      location: 'Chicago',
      employeeCount: 0,
    },
  },
  {
    id: '13',
    type: 'orgNode',
    position: { x: 0, y: 800 },
    data: {
      title: 'Open Position',
      role: 'Blockchain Developer',
      department: 'Technology',
      isHiring: true,
      description: 'Developing blockchain solutions for secure financial transactions.',
      location: 'Remote',
      employeeCount: 0,
    },
  },
  {
    id: '14',
    type: 'orgNode',
    position: { x: 200, y: 800 },
    data: {
      title: 'Open Position',
      role: 'UX/UI Designer',
      department: 'Design',
      isHiring: true,
      description: 'Creating intuitive and engaging user experiences for financial products.',
      location: 'Boston',
      employeeCount: 0,
    },
  },
];

// 3 yıllık projeksiyon için ek pozisyonlar
const threeYearsProjectionNodes: Node[] = [
  ...oneYearProjectionNodes,
  {
    id: '15',
    type: 'orgNode',
    position: { x: 400, y: 800 },
    data: {
      title: 'Open Position',
      role: 'AI Research Lead',
      department: 'Technology',
      isHiring: true,
      description: 'Leading research in artificial intelligence for financial forecasting and automated trading.',
      location: 'San Francisco',
      employeeCount: 0,
    },
  },
  {
    id: '16',
    type: 'orgNode',
    position: { x: 600, y: 800 },
    data: {
      title: 'Open Position',
      role: 'Cybersecurity Director',
      department: 'Technology',
      isHiring: true,
      description: 'Overseeing all cybersecurity initiatives and protecting financial data.',
      location: 'New York',
      employeeCount: 0,
    },
  },
  {
    id: '17',
    type: 'orgNode',
    position: { x: -150, y: 950 },
    data: {
      title: 'Open Position',
      role: 'International Expansion Manager',
      department: 'Operations',
      isHiring: true,
      description: 'Managing the company\'s expansion into international markets.',
      location: 'London',
      employeeCount: 0,
    },
  },
  {
    id: '18',
    type: 'orgNode',
    position: { x: 150, y: 950 },
    data: {
      title: 'Open Position',
      role: 'Cryptocurrency Specialist',
      department: 'Finance',
      isHiring: true,
      description: 'Managing cryptocurrency investments and developing crypto-based financial products.',
      location: 'Remote',
      employeeCount: 0,
    },
  },
  {
    id: '19',
    type: 'orgNode',
    position: { x: 450, y: 950 },
    data: {
      title: 'Open Position',
      role: 'Regulatory Affairs Director',
      department: 'Legal',
      isHiring: true,
      description: 'Managing relationships with financial regulators and ensuring compliance.',
      location: 'Washington DC',
      employeeCount: 0,
    },
  },
  {
    id: '20',
    type: 'orgNode',
    position: { x: 750, y: 950 },
    data: {
      title: 'Open Position',
      role: 'Customer Success Lead',
      department: 'Customer Support',
      isHiring: true,
      description: 'Ensuring customer satisfaction and managing support teams for financial products.',
      location: 'Chicago',
      employeeCount: 0,
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
    animated: true 
  },
  { 
    id: 'e4-9', 
    source: '4', 
    target: '9', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e7-10', 
    source: '7', 
    target: '10', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
];

// 1 yıllık projeksiyon için ek bağlantılar
const oneYearProjectionEdges: Edge[] = [
  ...sixMonthsProjectionEdges,
  { 
    id: 'e2-11', 
    source: '2', 
    target: '11', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e3-12', 
    source: '3', 
    target: '12', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e4-13', 
    source: '4', 
    target: '13', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e5-14', 
    source: '5', 
    target: '14', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
];

// 3 yıllık projeksiyon için ek bağlantılar
const threeYearsProjectionEdges: Edge[] = [
  ...oneYearProjectionEdges,
  { 
    id: 'e2-15', 
    source: '2', 
    target: '15', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e2-16', 
    source: '2', 
    target: '16', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e1-17', 
    source: '1', 
    target: '17', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e3-18', 
    source: '3', 
    target: '18', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e3-19', 
    source: '3', 
    target: '19', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
  { 
    id: 'e6-20', 
    source: '6', 
    target: '20', 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed }, 
    style: { strokeWidth: 2, stroke: '#3b82f6' },
    animated: true 
  },
];

// Kartlar arasındaki mesafeyi ayarla
const HORIZONTAL_NODE_PADDING = 150;  // Yatay mesafeyi artırdım (önceki değer 120)
const VERTICAL_NODE_PADDING = 120;   // Dikey mesafeyi artırdım (önceki değer 100)

// Ana bileşen içeriği
function OrgChart3FlowContent({ projectionPeriod }: OrgChart3FlowProps) {
  // ReactFlow referansları
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // State
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 0.6 });
  
  // Projeksiyon periyoduna göre uygun node ve edge'leri seç
  const getProjectionData = () => {
    switch (projectionPeriod) {
      case '6months':
        return { nodes: sixMonthsProjectionNodes, edges: sixMonthsProjectionEdges };
      case '1year':
        return { nodes: oneYearProjectionNodes, edges: oneYearProjectionEdges };
      case '3years':
        return { nodes: threeYearsProjectionNodes, edges: threeYearsProjectionEdges };
      default:
        return { nodes: initialNodes, edges: initialEdges };
    }
  };

  // Düğümleri düzenle
  const layoutNodes = useCallback((nodes: Node[], edges: Edge[]): Node[] => {
    // Düğümleri düzenleme mantığı
    const nodeMap = new Map<string, Node>();
    nodes.forEach(node => nodeMap.set(node.id, node));
    
    // Düğümleri seviyelerine göre grupla
    const levels: { [key: string]: string[] } = {};
    
    // Kök düğümü bul (gelen kenarı olmayan)
    const rootNodes: string[] = [];
    const childNodes = new Set<string>();
    
    edges.forEach(edge => {
      childNodes.add(edge.target);
    });
    
    nodes.forEach(node => {
      if (!childNodes.has(node.id)) {
        rootNodes.push(node.id);
      }
    });
    
    // Seviyeleri hesapla
    const calculateLevels = (nodeId: string, level: number) => {
      if (!levels[level]) levels[level] = [];
      levels[level].push(nodeId);
      
      // Alt düğümleri bul
      const childEdges = edges.filter(edge => edge.source === nodeId);
      childEdges.forEach(edge => {
        calculateLevels(edge.target, level + 1);
      });
    };
    
    rootNodes.forEach(rootId => {
      calculateLevels(rootId, 0);
    });
    
    // Düğümleri yeniden konumlandır
    const levelCount = Object.keys(levels).length;
    const verticalSpacing = 200; // Dikey boşluk
    
    Object.keys(levels).forEach(levelStr => {
      const level = parseInt(levelStr);
      const nodesInLevel = levels[level];
      const horizontalSpacing = 250; // Yatay boşluk
      const levelWidth = (nodesInLevel.length - 1) * horizontalSpacing;
      const startX = 400 - levelWidth / 2;
      
      nodesInLevel.forEach((nodeId, index) => {
        const node = nodeMap.get(nodeId);
        if (node) {
          const updatedNode = {
            ...node,
            position: {
              x: startX + index * horizontalSpacing,
              y: 100 + level * verticalSpacing
            }
          };
          nodeMap.set(nodeId, updatedNode);
        }
      });
    });
    
    return Array.from(nodeMap.values());
  }, []);

  // İlk projeksiyon verilerini al
  const { nodes: initialProjectionNodes, edges: projectionEdges } = getProjectionData();
  
  // Düğümleri düzenle (layout)
  const projectionNodes = useMemo(() => layoutNodes(initialProjectionNodes, projectionEdges), [layoutNodes, initialProjectionNodes, projectionEdges]);

  // Projeksiyon periyodu değiştiğinde node ve edge'leri güncelle
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = getProjectionData();
    const layoutedNodes = layoutNodes(newNodes, newEdges);
    setNodes(layoutedNodes);
    setEdges(newEdges);
  }, [projectionPeriod, layoutNodes]);

  const { getViewport, setViewport: setViewportFromHook, screenToFlowPosition } = useReactFlow();
  const people = usePeopleStore(state => state.people);
  const getPeople = usePeopleStore(state => state.getPeople);
  const addPerson = usePeopleStore(state => state.addPerson);
  const updatePerson = usePeopleStore(state => state.updatePerson);

  // Load people data on mount
  useEffect(() => {
    getPeople();
  }, [getPeople]);

  // Handle node changes (position, selection, etc)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Handle new connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        id: `e${connection.source}-${connection.target}`,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 2, stroke: '#3b82f6' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Handle node click to open edit panel
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      setIsPanelOpen(true);
    },
    []
  );

  // Handle background click (add node at click position)
  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setIsPanelOpen(false);
  }, []);

  // Handle node update from panel
  const handleNodeUpdate = useCallback(
    (id: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return { ...node, data: { ...node.data, ...data } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Handle node delete
  const handleNodeDelete = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNode(null);
      setIsPanelOpen(false);
    },
    [setNodes, setEdges]
  );

  // Handle panel save
  const handlePanelSave = useCallback(
    (data: any) => {
      if (selectedNode) {
        handleNodeUpdate(selectedNode.id, data);
      }
      setIsPanelOpen(false);
    },
    [selectedNode, handleNodeUpdate]
  );

  // Handle panel close
  const handlePanelClose = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  // Handle add node
  const handleAddNode = useCallback(() => {
    const newNode: Node = {
      id: uuidv4(),
      type: 'orgNode',
      position: { x: 100, y: 100 },
      data: {
        title: 'New Position',
        role: '',
        department: '',
        isHiring: false,
        description: '',
        location: '',
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
    setIsPanelOpen(true);
  }, [setNodes]);

  // Handle drag over for drag and drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop for drag and drop
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: uuidv4(),
        type: 'orgNode',
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Prepare nodes with event handlers
  const nodesWithHandlers = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
      },
    }));
  }, [nodes]);

  // Viewport değişikliklerini izle
  const onMoveEnd = (event: any) => {
    const viewport = event.viewport;
    // TypeScript hatalarını düzeltmek için viewport tipini kontrol et
    if (viewport && typeof viewport.x === 'number' && typeof viewport.y === 'number' && 
        typeof viewport.zoom === 'number' && typeof viewport.width === 'number' && typeof viewport.height === 'number') {
      setViewport({
        x: viewport.x,
        y: viewport.y,
        zoom: viewport.zoom
      });
    }
  };

  // Viewport'u ortala
  const centerViewport = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.5, includeHiddenNodes: false });
    }
  }, [reactFlowInstance]);

  // ReactFlow yüklendiğinde
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    
    // Başlangıçta görünümü ortala ve uygun zoom seviyesini ayarla
    setTimeout(() => {
      instance.fitView({ padding: 0.4, includeHiddenNodes: false, maxZoom: 0.8 });
    }, 100);
  }, []);

  return (
    <div className="h-full flex">
      {/* Main ReactFlow Area */}
      <div ref={reactFlowWrapper} className="flex-grow h-full">
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onInit={onInit}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onConnect={onConnect}
          onPaneClick={handlePaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.4, maxZoom: 0.8 }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
          minZoom={0.2}
          maxZoom={1.5}
          connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
          connectionLineType={ConnectionLineType.SmoothStep}
          proOptions={{ hideAttribution: true }}
        >
          <Controls position="bottom-right" showInteractive={false} />
          <Background color="#f1f5f9" gap={16} />
          <Panel position="top-right">
            <button
              onClick={handleAddNode}
              className="bg-white p-2 rounded-md shadow-sm hover:bg-gray-50"
            >
              <PlusIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={centerViewport}
              className="bg-white p-2 rounded-md shadow-sm hover:bg-gray-50"
            >
              <ViewfinderCircleIcon className="h-5 w-5 text-gray-600" />
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Right Panel for Editing */}
      {isPanelOpen && selectedNode && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-96 h-full border-l border-gray-200 bg-white overflow-y-auto"
        >
          <NodeEditPanel
            selectedNode={selectedNode}
            onNodeUpdate={handlePanelSave}
            onNodeDelete={() => {}}
            onClose={handlePanelClose}
          />
        </motion.div>
      )}
    </div>
  );
}

// Wrap with ReactFlowProvider
export default function OrgChart3Flow({ projectionPeriod }: OrgChart3FlowProps) {
  return (
    <ReactFlowProvider>
      <OrgChart3FlowContent projectionPeriod={projectionPeriod} />
    </ReactFlowProvider>
  );
}
