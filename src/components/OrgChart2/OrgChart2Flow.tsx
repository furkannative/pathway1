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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import OrgChart2Node from './OrgChart2Node';
import NodeEditPanel from './NodeEditPanel';
import { usePeopleStore } from '@/store/peopleStore';
import { useRef } from 'react';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';

// Node types for ReactFlow
const nodeTypes = {
  orgNode: OrgChart2Node,
};

// Projeksiyon periyodu prop'unu ekle
interface OrgChart2FlowProps {
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
    position: { x: 150, y: 200 },
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
    position: { x: 650, y: 200 },
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
    position: { x: 0, y: 350 },
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
    position: { x: 300, y: 350 },
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
    position: { x: 500, y: 350 },
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
    position: { x: 800, y: 350 },
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
    position: { x: -100, y: 500 },
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
    position: { x: 100, y: 500 },
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
    position: { x: 700, y: 500 },
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
    position: { x: 300, y: 500 },
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
    position: { x: 900, y: 500 },
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
    position: { x: 0, y: 650 },
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
    position: { x: 200, y: 650 },
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
    position: { x: 400, y: 650 },
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
    position: { x: 600, y: 650 },
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
    position: { x: -150, y: 800 },
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
    position: { x: 150, y: 800 },
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
    position: { x: 450, y: 800 },
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
    position: { x: 750, y: 800 },
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
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e3-7', source: '3', target: '7', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

// 6 aylık projeksiyon için ek bağlantılar
const sixMonthsProjectionEdges: Edge[] = [
  ...initialEdges,
  { id: 'e4-8', source: '4', target: '8', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e4-9', source: '4', target: '9', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e7-10', source: '7', target: '10', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
];

// 1 yıllık projeksiyon için ek bağlantılar
const oneYearProjectionEdges: Edge[] = [
  ...sixMonthsProjectionEdges,
  { id: 'e2-11', source: '2', target: '11', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e3-12', source: '3', target: '12', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e4-13', source: '4', target: '13', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e5-14', source: '5', target: '14', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
];

// 3 yıllık projeksiyon için ek bağlantılar
const threeYearsProjectionEdges: Edge[] = [
  ...oneYearProjectionEdges,
  { id: 'e2-15', source: '2', target: '15', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e2-16', source: '2', target: '16', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e1-17', source: '1', target: '17', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e3-18', source: '3', target: '18', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e3-19', source: '3', target: '19', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e6-20', source: '6', target: '20', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
];

// Kartlar arasındaki mesafeyi ayarla
const HORIZONTAL_NODE_PADDING = 250; // Yatay mesafeyi artırdım (önceki değer 200)
const VERTICAL_NODE_PADDING = 120;   // Dikey mesafeyi artırdım (önceki değer 100)

// Düğümleri düzenle
const layoutNodes = (nodes: Node[], edges: Edge[]): Node[] => {
  const nodeMap = new Map<string, Node>();
  nodes.forEach(node => nodeMap.set(node.id, { ...node }));

  // Kök düğümü bul (gelen bağlantısı olmayan düğüm)
  const rootNode = nodes.find(node => !edges.some(edge => edge.target === node.id));
  if (!rootNode) return nodes;

  // Kök düğümün pozisyonunu ayarla
  const rootNodeCopy = nodeMap.get(rootNode.id);
  if (rootNodeCopy) {
    rootNodeCopy.position = { x: 0, y: 0 };
  }

  // Düğümleri hiyerarşik olarak düzenle
  const processedNodes = new Set<string>();
  const processNode = (nodeId: string, level: number, horizontalIndex: number, siblingCount: number) => {
    if (processedNodes.has(nodeId)) return;
    processedNodes.add(nodeId);

    const node = nodeMap.get(nodeId);
    if (!node) return;

    // Yatay pozisyonu hesapla - kardeş düğümler arasında eşit mesafe
    let xPos = 0;
    if (siblingCount > 1) {
      // Kardeş düğümleri merkeze hizala
      const totalWidth = (siblingCount - 1) * HORIZONTAL_NODE_PADDING;
      const startX = -totalWidth / 2;
      xPos = startX + horizontalIndex * HORIZONTAL_NODE_PADDING;
    }

    // Dikey pozisyonu hesapla - seviyeye göre
    const yPos = level * VERTICAL_NODE_PADDING;

    // Düğümün pozisyonunu güncelle
    node.position = { x: xPos, y: yPos };

    // Alt düğümleri bul
    const childEdges = edges.filter(edge => edge.source === nodeId);
    const childIds = childEdges.map(edge => edge.target);

    // Alt düğümleri işle
    childIds.forEach((childId, index) => {
      processNode(childId, level + 1, index, childIds.length);
    });
  };

  // Kök düğümden başlayarak tüm düğümleri işle
  processNode(rootNode.id, 0, 0, 1);

  return Array.from(nodeMap.values());
};

// Ana bileşen içeriği
function OrgChart2FlowContent({ projectionPeriod }: OrgChart2FlowProps) {
  // ReactFlow referansları
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Projeksiyon periyoduna göre uygun node ve edge'leri seç
  const getProjectionData = () => {
    switch (projectionPeriod) {
      case 'current':
        return { nodes: initialNodes, edges: initialEdges };
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

  // Projeksiyon verilerini al
  const { nodes: initialProjectionNodes, edges: projectionEdges } = getProjectionData();
  
  // Düğümleri düzenle (layout)
  const projectionNodes = layoutNodes(initialProjectionNodes, projectionEdges);

  // State tanımlamaları
  const [nodes, setNodes] = useState<Node[]>(projectionNodes);
  const [edges, setEdges] = useState<Edge[]>(projectionEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [viewport, setViewport] = useState<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 1 });
  
  // Projeksiyon periyodu değiştiğinde node ve edge'leri güncelle
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = getProjectionData();
    const newProjectionNodes = layoutNodes(newNodes, newEdges);
    setNodes(newProjectionNodes);
    setEdges(newEdges);
  }, [projectionPeriod]);

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
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle new connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      // Create a new edge with arrow and smoothstep type
      const newEdge = {
        ...connection,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: false,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  // Handle node click to open edit panel
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    setSelectedNode(node);
    setIsPanelOpen(true);
  }, []);

  // Handle background click (add node at click position)
  const handlePaneClick = useCallback((event: React.MouseEvent) => {
    // Close panel if it's open
    if (isPanelOpen) {
      setIsPanelOpen(false);
      setSelectedNode(null);
      return;
    }

    // Get click position in flow coordinates
    const viewport = getViewport();
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Create empty node data
    const newNodeData = {
      title: 'New Position',
      role: '',
      department: '',
      isHiring: false,
      description: '',
      location: '',
      employeeCount: 0,
    };

    setSelectedNode({
      id: 'temp-new-node',
      type: 'orgNode',
      position,
      data: newNodeData,
    });
    
    setIsPanelOpen(true);
  }, [getViewport, isPanelOpen, screenToFlowPosition]);

  // Handle double click on pane to add a new node
  const handlePaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds || !reactFlowInstance) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'orgNode',
      position,
      data: {
        name: 'New Employee',
        role: 'New Role',
        department: 'Technology',
        isHiring: false,
        location: 'Remote',
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setSelectedNode(newNode);
    setIsPanelOpen(true);
  }, [nodes, reactFlowInstance]);

  // Handle panel close
  const handlePanelClose = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedNode(null);
  }, []);

  // Handle save from panel
  const handlePanelSave = useCallback((data: any) => {
    if (selectedNode) {
      // Update existing node
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
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
      
      // Update edges if hiring status changed
      if (data.isHiring !== selectedNode.data.isHiring) {
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.target === selectedNode.id) {
              return {
                ...edge,
                animated: data.isHiring,
              };
            }
            return edge;
          })
        );
      }
      
      // Update in people store
      updatePerson(selectedNode.id, {
        name: data.title,
        title: data.role,
        department: data.department,
        email: data.description,
        location: data.location,
        isHiring: data.isHiring
      });
    }
    
    // Close panel
    handlePanelClose();
  }, [selectedNode, updatePerson, handlePanelClose]);

  // Add node button click handler
  const handleAddNodeClick = useCallback(() => {
    // Create new node in center of viewport
    const viewport = getViewport();
    const position = {
      x: viewport.x + viewport.width / 2,
      y: viewport.y + viewport.height / 2,
    };
    
    // Create empty node data
    const newNodeData = {
      title: 'New Position',
      role: '',
      department: '',
      isHiring: false,
      description: '',
      location: '',
      employeeCount: 0,
    };

    setSelectedNode({
      id: 'temp-new-node',
      type: 'orgNode',
      position,
      data: newNodeData,
    });
    
    setIsPanelOpen(true);
  }, [getViewport]);

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
        typeof viewport.zoom === 'number') {
      setViewport({
        x: viewport.x,
        y: viewport.y,
        zoom: viewport.zoom
      });
    }
  };

  return (
    <div className="h-full flex">
      {/* Main ReactFlow Area */}
      <div className="flex-grow h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onInit={setReactFlowInstance}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onDoubleClick={handlePaneDoubleClick}
          onMoveEnd={onMoveEnd}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <Background color="#aaa" gap={16} />
          <Panel position="top-right">
            <button
              onClick={() => {
                if (reactFlowInstance) {
                  reactFlowInstance.fitView();
                }
              }}
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
            isOpen={isPanelOpen}
            onClose={handlePanelClose}
            nodeData={selectedNode.data}
            onSave={handlePanelSave}
          />
        </motion.div>
      )}
    </div>
  );
}

// Wrap with ReactFlowProvider
export default function OrgChart2Flow({ projectionPeriod }: OrgChart2FlowProps) {
  return (
    <ReactFlowProvider>
      <OrgChart2FlowContent projectionPeriod={projectionPeriod} />
    </ReactFlowProvider>
  );
}
