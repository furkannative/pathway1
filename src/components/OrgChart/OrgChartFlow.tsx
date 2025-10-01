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
} from 'reactflow';
import 'reactflow/dist/style.css';
import OrgChartNode from './OrgChartNode';
import NodeEditModal from './NodeEditModal';
import { usePeopleStore } from '@/store/peopleStore';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

// OrgChartFlow için props tipi tanımı
interface OrgChartFlowProps {
  timeProjection?: string;
}

// Projeksiyon verilerini oluşturan yardımcı fonksiyon
const generateProjectedEmployees = (timeProjection: string) => {
  // Fintech şirketi için gerçekçi pozisyonlar
  const fintechPositions = [
    { title: 'Blockchain Developer', department: 'Engineering' },
    { title: 'Smart Contract Specialist', department: 'Engineering' },
    { title: 'Data Scientist', department: 'Data' },
    { title: 'Machine Learning Engineer', department: 'Data' },
    { title: 'Financial Analyst', department: 'Finance' },
    { title: 'Risk Assessment Specialist', department: 'Finance' },
    { title: 'Compliance Officer', department: 'Legal' },
    { title: 'Regulatory Affairs Specialist', department: 'Legal' },
    { title: 'UX/UI Designer', department: 'Product' },
    { title: 'Product Manager', department: 'Product' },
    { title: 'Growth Hacker', department: 'Marketing' },
    { title: 'Digital Marketing Specialist', department: 'Marketing' },
    { title: 'DevOps Engineer', department: 'Infrastructure' },
    { title: 'Cloud Architect', department: 'Infrastructure' },
    { title: 'Customer Success Manager', department: 'Customer Support' },
    { title: 'Technical Support Specialist', department: 'Customer Support' }
  ];
  
  // Departman renkleri
  const departmentColors: Record<string, string> = {
    'Engineering': '#3B82F6',
    'Data': '#8B5CF6',
    'Finance': '#10B981',
    'Legal': '#F59E0B',
    'Product': '#EC4899',
    'Marketing': '#EF4444',
    'Infrastructure': '#6366F1',
    'Customer Support': '#14B8A6'
  };
  
  // Zaman projeksiyonuna göre eklenecek çalışan sayısı
  let employeeCount = 0;
  
  if (timeProjection === '6months') {
    employeeCount = 15;
  } else if (timeProjection === '1year') {
    employeeCount = 36;
  } else if (timeProjection === '3years') {
    employeeCount = 82;
  }
  
  // Projeksiyon verilerini oluştur
  const projectedEmployees = [];
  
  for (let i = 0; i < employeeCount; i++) {
    // Rastgele bir pozisyon seç
    const positionIndex = Math.floor(Math.random() * fintechPositions.length);
    const position = fintechPositions[positionIndex];
    
    // Rastgele bir yönetici ID'si (gerçek bir çalışana bağlamak için)
    // Not: Gerçek uygulamada, bu ID'lerin gerçek çalışanlara ait olması gerekir
    const managerId = `existing-${Math.floor(Math.random() * 10) + 1}`;
    
    // Yeni çalışan oluştur
    const newEmployee = {
      id: `projected-${uuidv4()}`,
      name: `Projected Position ${i + 1}`,
      title: position.title,
      department: position.department,
      departmentColor: departmentColors[position.department] || '#64748B',
      email: `position${i + 1}@example.com`,
      location: ['New York', 'London', 'Singapore', 'Remote'][Math.floor(Math.random() * 4)],
      isHiring: true,
      managerId: managerId,
      isProjected: true
    };
    
    projectedEmployees.push(newEmployee);
  }
  
  return projectedEmployees;
};

const nodeTypes = {
  orgNode: OrgChartNode,
};

function OrgChartFlowContent({ timeProjection = 'current' }: OrgChartFlowProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [parentNode, setParentNode] = useState<string | null>(null);
  const people = usePeopleStore(state => state.people);
  const getPeople = usePeopleStore(state => state.getPeople);
  const updatePerson = usePeopleStore(state => state.updatePerson);
  const addPerson = usePeopleStore(state => state.addPerson);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  // Organizasyon şemasını oluştur
  useEffect(() => {
    if (people.length > 0) {
      // Düğümleri oluştur
      const orgNodes: Node[] = [];
      const orgEdges: Edge[] = [];
      
      // Kök düğümleri bul (yöneticisi olmayan)
      const rootPersons = people.filter(p => !p.managerId);
      
      // Zaman projeksiyonuna göre ek çalışanları ekle
      let projectedEmployees: any[] = [];
      
      if (timeProjection !== 'current') {
        // Projeksiyon verilerini oluştur
        projectedEmployees = generateProjectedEmployees(timeProjection);
      }
      
      if (rootPersons.length > 0) {
        // Her kök için ağaç yapısını oluştur
        rootPersons.forEach((rootPerson, rootIndex) => {
          const buildOrgChart = (person: any, level: number, horizontalPosition: number) => {
            // Düğüm pozisyonunu hesapla
            const xSpacing = 250;
            const ySpacing = 150;
            const x = horizontalPosition * xSpacing;
            const y = level * ySpacing;
            
            // Düğümü oluştur
            const node: Node = {
              id: person.id,
              type: 'orgNode',
              position: { x, y },
              data: {
                title: person.name,
                department: person.department || '',
                role: person.title || '',
                description: person.email || '',
                employeeCount: person.employees?.length || 0,
                isCollapsed: false,
                isHiring: person.isHiring || false,
                isProjected: person.isProjected || false,
                location: person.location || '',
                onNodeClick: handleNodeClick,
                onAddChild: handleAddChild,
              },
            };
            
            orgNodes.push(node);
            
            // Alt düğümleri işle
            if (person.employees && person.employees.length > 0) {
              const childCount = person.employees.length;
              let startPos = horizontalPosition - (childCount - 1) / 2;
              
              person.employees.forEach((employee: any, idx: number) => {
                // Kenarı oluştur
                orgEdges.push({
                  id: `e${person.id}-${employee.id}`,
                  source: person.id,
                  target: employee.id,
                  type: 'smoothstep',
                  animated: employee.isHiring || employee.isProjected,
                  style: {
                    stroke: employee.isProjected ? '#3b82f6' : employee.isHiring ? '#10b981' : '#64748b',
                    strokeWidth: employee.isProjected || employee.isHiring ? 2 : 1,
                  },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: employee.isProjected ? '#3b82f6' : employee.isHiring ? '#10b981' : '#64748b',
                  },
                });
                
                // Alt düğümleri oluştur
                buildOrgChart(employee, level + 1, startPos + idx);
              });
            }
          };
          
          // Kök düğümden başlayarak ağacı oluştur
          buildOrgChart(rootPerson, 0, rootIndex * 4);
        });
      }
      
      // Projeksiyon verilerini ekle
      if (projectedEmployees.length > 0) {
        // Mevcut düğümleri bul
        const existingNodes = orgNodes.map(node => node.id);
        
        // Her projeksiyon çalışanı için
        projectedEmployees.forEach((employee: any, index: number) => {
          // Yönetici ID'sini kontrol et
          const managerId = employee.managerId;
          
          // Eğer yönetici varsa, onun altına ekle
          if (managerId && existingNodes.includes(managerId)) {
            // Yönetici düğümünü bul
            const managerNode = orgNodes.find(node => node.id === managerId);
            
            if (managerNode) {
              // Yönetici pozisyonunu al
              const managerPos = managerNode.position;
              
              // Yöneticinin altındaki çalışan sayısını bul
              const siblingCount = orgEdges.filter(edge => edge.source === managerId).length;
              
              // Pozisyonu hesapla (yöneticinin altında ve yanında)
              const x = managerPos.x + (index % 3 - 1) * 150; // Yatayda dağıt
              const y = managerPos.y + 150 + Math.floor(index / 3) * 100; // Dikeyde dağıt
              
              // Düğümü oluştur
              const node: Node = {
                id: employee.id,
                type: 'orgNode',
                position: { x, y },
                data: {
                  title: employee.name,
                  department: employee.department || '',
                  role: employee.title || '',
                  description: employee.email || '',
                  employeeCount: 0,
                  isCollapsed: false,
                  isHiring: employee.isHiring || false,
                  isProjected: true,
                  location: employee.location || '',
                  onNodeClick: handleNodeClick,
                  onAddChild: handleAddChild,
                },
              };
              
              // Düğümü ekle
              orgNodes.push(node);
              
              // Kenarı oluştur
              orgEdges.push({
                id: `e${managerId}-${employee.id}`,
                source: managerId,
                target: employee.id,
                type: 'smoothstep',
                animated: true,
                style: {
                  stroke: '#3b82f6',
                  strokeWidth: 2,
                },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: '#3b82f6',
                },
              });
            }
          } else {
            // Yönetici yoksa veya bulunamadıysa, kök düğüm olarak ekle
            const x = 500 + (index % 3) * 250;
            const y = 500 + Math.floor(index / 3) * 150;
            
            // Düğümü oluştur
            const node: Node = {
              id: employee.id,
              type: 'orgNode',
              position: { x, y },
              data: {
                title: employee.name,
                department: employee.department || '',
                role: employee.title || '',
                description: employee.email || '',
                employeeCount: 0,
                isCollapsed: false,
                isHiring: employee.isHiring || false,
                isProjected: true,
                location: employee.location || '',
                onNodeClick: handleNodeClick,
                onAddChild: handleAddChild,
              },
            };
            
            // Düğümü ekle
            orgNodes.push(node);
          }
        });
      }
      
      setNodes(orgNodes);
      setEdges(orgEdges);
    } else {
      // Örnek veri oluştur
      const sampleNodes: Node[] = [
        {
          id: '1',
          type: 'orgNode',
          position: { x: 250, y: 0 },
          data: {
            title: 'CEO',
            department: 'Executive',
            role: 'Chief Executive Officer',
            description: 'Leads the company',
            employeeCount: 2,
            isCollapsed: false,
            isHiring: false,
            location: 'New York',
            onNodeClick: handleNodeClick,
            onAddChild: handleAddChild,
          },
        },
        {
          id: '2',
          type: 'orgNode',
          position: { x: 100, y: 150 },
          data: {
            title: 'CTO',
            department: 'Technology',
            role: 'Chief Technology Officer',
            description: 'Leads the tech team',
            employeeCount: 0,
            isCollapsed: false,
            isHiring: false,
            location: 'San Francisco',
            onNodeClick: handleNodeClick,
            onAddChild: handleAddChild,
          },
        },
        {
          id: '3',
          type: 'orgNode',
          position: { x: 400, y: 150 },
          data: {
            title: 'CFO',
            department: 'Finance',
            role: 'Chief Financial Officer',
            description: 'Manages finances',
            employeeCount: 0,
            isCollapsed: false,
            isHiring: true,
            location: 'Chicago',
            onNodeClick: handleNodeClick,
            onAddChild: handleAddChild,
          },
        },
      ];

      const sampleEdges: Edge[] = [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
        },
        {
          id: 'e1-3',
          source: '1',
          target: '3',
          type: 'smoothstep',
          animated: true,
          style: { strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
        },
      ];

      setNodes(sampleNodes);
      setEdges(sampleEdges);
    }
  }, [people]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      // Yeni bağlantı oluşturulduğunda, hedef düğümün yöneticisini güncelle
      const sourceId = connection.source;
      const targetId = connection.target;
      
      if (sourceId && targetId) {
        // Store'da yönetici ilişkisini güncelle
        updatePerson(targetId, { managerId: sourceId });
        
        // Kenar ekle
        setEdges((eds) => 
          addEdge({
            ...connection,
            id: `e${sourceId}-${targetId}`,
            type: 'smoothstep',
            animated: false,
            style: { strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
          }, eds)
        );
      }
    },
    [updatePerson]
  );

  // Düğüme tıklama işleyicisi
  const handleNodeClick = useCallback((nodeId: string, nodeData: any) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setIsModalOpen(true);
    }
  }, [nodes]);

  // Artı butonuna tıklama işleyicisi
  const handleAddChild = useCallback((parentId: string) => {
    // Ebeveyn düğümü bul
    const parentNode = nodes.find(n => n.id === parentId);
    if (!parentNode) return;
    
    // Yeni düğüm için ID oluştur
    const newNodeId = uuidv4();
    
    // Yeni düğümün pozisyonunu hesapla
    const parentPos = parentNode.position;
    const newPosition = {
      x: parentPos.x + 200, // Sağa doğru offset
      y: parentPos.y + 150, // Aşağıya doğru offset
    };
    
    // Yeni düğüm verisi
    const newNodeData = {
      title: 'New Position',
      department: parentNode.data.department,
      role: '',
      description: '',
      employeeCount: 0,
      isCollapsed: false,
      isHiring: true,
      location: '',
      onNodeClick: handleNodeClick,
      onAddChild: handleAddChild,
    };
    
    // Yeni düğüm oluştur
    const newNode: Node = {
      id: newNodeId,
      type: 'orgNode',
      position: newPosition,
      data: newNodeData,
    };
    
    // Yeni kenar oluştur
    const newEdge: Edge = {
      id: `e${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      type: 'smoothstep',
      animated: true,
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    };
    
    // Düğüm ve kenarları güncelle
    setNodes(nds => [...nds, newNode]);
    setEdges(eds => [...eds, newEdge]);
    
    // Store'a yeni kişi ekle
    const newPerson = {
      id: newNodeId,
      name: 'New Position',
      title: '',
      department: parentNode.data.department,
      location: '',
      email: '',
      isHiring: true,
      managerId: parentId
    };
    
    addPerson(newPerson);
    
    // Yeni eklenen düğümü seç ve modalı aç
    setTimeout(() => {
      setSelectedNode(newNode);
      setIsModalOpen(true);
    }, 100);
  }, [nodes, addPerson]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  const updateNodeData = (updatedData: any) => {
    if (selectedNode) {
      // Store'daki kişiyi güncelle
      const personId = selectedNode.id;
      const updates = {
        name: updatedData.title,
        title: updatedData.role,
        department: updatedData.department,
        location: updatedData.location,
        email: updatedData.description,
        isHiring: updatedData.isHiring
      };
      
      updatePerson(personId, updates);
      
      // UI'daki node'u güncelle
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updatedData,
                onNodeClick: handleNodeClick,
                onAddChild: handleAddChild,
              },
            };
          }
          return node;
        })
      );
      
      // Kenarları güncelle - isHiring durumuna göre animasyonu ayarla
      setEdges(eds => 
        eds.map(edge => {
          if (edge.target === personId) {
            return {
              ...edge,
              animated: updatedData.isHiring
            };
          }
          return edge;
        })
      );
    }
    closeModal();
  };

  const handleCreateNode = (nodeData: any) => {
    if (parentNode) {
      // Yeni kişi oluştur
      const newPerson = {
        name: nodeData.title,
        title: nodeData.role,
        department: nodeData.department,
        location: nodeData.location,
        email: nodeData.description,
        isHiring: nodeData.isHiring,
        managerId: parentNode
      };
      
      // Store'a ekle
      addPerson(newPerson);
      
      // Modal'ı kapat
      setIsAddingNode(false);
      setParentNode(null);
    }
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  }, []);

  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    setIsAddingNode(true);
    setParentNode(null);
    setSelectedNode({ id: uuidv4(), position, data: {}, type: 'orgNode' } as Node);
    setIsModalOpen(true);
  }, [reactFlowInstance]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsAddingNode(false);
    setSelectedNode(null);
  };

  const handleModalSave = (data: any) => {
    if (isAddingNode && selectedNode) {
      // Yeni node ekle
      const newId = uuidv4();
      const newNode: Node = {
        ...selectedNode,
        data,
        id: newId,
        position: selectedNode.position,
        type: 'orgNode',
      };
      setNodes(nds => [...nds, newNode]);
      // Eğer bir parentNode seçiliyse, yeni edge ekle
      if (parentNode) {
        setEdges(eds => [...eds, {
          id: `${parentNode}-${newId}`,
          source: parentNode,
          target: newId,
          markerEnd: { type: MarkerType.ArrowClosed },
          type: 'smoothstep',
        }]);
      }
    } else if (selectedNode) {
      // Mevcut node'u güncelle
      setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data } : n));
    }
    handleModalClose();
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={changes => setNodes(applyNodeChanges(changes, nodes))}
        onEdgesChange={changes => setEdges(applyEdgeChanges(changes, edges))}
        onConnect={params => setEdges(eds => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds))}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onDoubleClick={onPaneDoubleClick}
        fitView
        style={{ width: '100%', height: '100%' }}
      >
        <Controls />
        <Background gap={16} color="#f3f4f6" />
        <Panel position="top-right">
          <button
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
            onClick={() => {
              setIsAddingNode(true);
              setSelectedNode({ id: uuidv4(), position: { x: 250, y: 100 }, data: {}, type: 'orgNode' } as Node);
              setIsModalOpen(true);
            }}
          >
            + Add Node
          </button>
        </Panel>
        {isModalOpen && selectedNode && (
          <NodeEditModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            nodeData={selectedNode.data}
            onSave={handleModalSave}
          />
        )}
      </ReactFlow>

      {/* Modal'ın görünürlüğünü artırmak için doğrudan render edelim */}
      {isModalOpen && selectedNode && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <NodeEditModal
            isOpen={isModalOpen}
            onClose={closeModal}
            nodeData={selectedNode.data}
            onSave={updateNodeData}
          />
        </div>
      )}

      {isAddingNode && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <NodeEditModal
            isOpen={isAddingNode}
            onClose={() => {
              setIsAddingNode(false);
              setParentNode(null);
            }}
            nodeData={{
              title: 'New Position',
              role: '',
              department: '',
              description: '',
              isHiring: false,
              location: '',
            }}
            onSave={handleCreateNode}
          />
        </div>
      )}
    </div>
  );
}

// Ana bileşen, ReactFlowProvider ile sarmalanmış
export default function OrgChartFlow({ timeProjection }: OrgChartFlowProps) {
  return (
    <ReactFlowProvider>
      <OrgChartFlowContent timeProjection={timeProjection} />
    </ReactFlowProvider>
  );
}
