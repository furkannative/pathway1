'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { usePeopleStore } from '@/store/peopleStore';

interface AgentSystem {
  name: string;
  type: 'agent' | 'system';
  description?: string;
}

interface Node {
  id: string;
  title: string;
  role?: string;
  department?: string;
  description?: string;
  isHiring?: boolean;
  location?: string;
  agentSystems?: AgentSystem[];
  workDistribution?: {
    human: number;
    ai: number;
  };
  workingHours?: {
    human: number;
    ai: number;
  };
}

interface AgentDetailPanelProps {
  selectedNode: Node | null;
  onNodeUpdate: (id: string, data: any) => void;
  onNodeDelete: (id: string) => void;
  onClose: () => void;
}

export default function AgentDetailPanel({ selectedNode, onNodeUpdate, onNodeDelete, onClose }: AgentDetailPanelProps) {
  // Form state
  const [title, setTitle] = useState(selectedNode?.title || '');
  const [role, setRole] = useState(selectedNode?.role || '');
  const [department, setDepartment] = useState(selectedNode?.department || '');
  const [description, setDescription] = useState(selectedNode?.description || '');
  const [isHiring, setIsHiring] = useState(selectedNode?.isHiring || false);
  const [location, setLocation] = useState(selectedNode?.location || '');
  
  // AI Agent/System state
  const [agentSystems, setAgentSystems] = useState<AgentSystem[]>(selectedNode?.agentSystems || []);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentType, setNewAgentType] = useState<'agent' | 'system'>('agent');
  const [newAgentDescription, setNewAgentDescription] = useState('');
  
  // Work distribution state
  const [humanPercentage, setHumanPercentage] = useState(selectedNode?.workDistribution?.human || 100);
  const [aiPercentage, setAiPercentage] = useState(selectedNode?.workDistribution?.ai || 0);
  
  // Working hours state
  const [humanHours, setHumanHours] = useState(selectedNode?.workingHours?.human || 40);
  const [aiHours, setAiHours] = useState(selectedNode?.workingHours?.ai || 0);
  
  const people = usePeopleStore(state => state.people);

  // Update state when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setTitle(selectedNode.title || '');
      setRole(selectedNode.role || '');
      setDepartment(selectedNode.department || '');
      setDescription(selectedNode.description || '');
      setIsHiring(selectedNode.isHiring || false);
      setLocation(selectedNode.location || '');
      setAgentSystems(selectedNode.agentSystems || []);
      setHumanPercentage(selectedNode.workDistribution?.human || 100);
      setAiPercentage(selectedNode.workDistribution?.ai || 0);
      setHumanHours(selectedNode.workingHours?.human || 40);
      setAiHours(selectedNode.workingHours?.ai || 0);
    }
  }, [selectedNode]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save data
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, {
        title,
        role,
        department,
        description,
        isHiring,
        location,
        agentSystems,
        workDistribution: {
          human: humanPercentage,
          ai: aiPercentage
        },
        workingHours: {
          human: humanHours,
          ai: aiHours
        }
      });
    }
  };

  // Toggle hiring status
  const toggleHiring = () => {
    setIsHiring(!isHiring);
  };

  // Add new agent/system
  const addAgentSystem = () => {
    if (newAgentName.trim()) {
      const newAgent: AgentSystem = {
        name: newAgentName.trim(),
        type: newAgentType,
        description: newAgentDescription.trim() || undefined
      };
      
      setAgentSystems([...agentSystems, newAgent]);
      setNewAgentName('');
      setNewAgentType('agent');
      setNewAgentDescription('');
    }
  };

  // Remove agent/system
  const removeAgentSystem = (index: number) => {
    const updatedAgents = [...agentSystems];
    updatedAgents.splice(index, 1);
    setAgentSystems(updatedAgents);
  };

  // Update human percentage and ensure AI percentage is complementary
  const updateHumanPercentage = (value: number) => {
    const newHumanPercentage = Math.min(100, Math.max(0, value));
    setHumanPercentage(newHumanPercentage);
    setAiPercentage(100 - newHumanPercentage);
  };

  // Update AI percentage and ensure human percentage is complementary
  const updateAiPercentage = (value: number) => {
    const newAiPercentage = Math.min(100, Math.max(0, value));
    setAiPercentage(newAiPercentage);
    setHumanPercentage(100 - newAiPercentage);
  };

  // Generate description based on role and department
  const generateDescription = () => {
    if (role && department) {
      setDescription(`${role} in the ${department} department, responsible for key initiatives and projects.`);
    } else if (role) {
      setDescription(`${role} responsible for key initiatives and projects.`);
    } else {
      setDescription('Responsible for key initiatives and projects.');
    }
  };

  if (!selectedNode) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-none p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedNode.id ? 'Edit Position' : 'Add New Position'}
          </h2>
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-grow overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. John Smith"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. Product Manager"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a department</option>
              <option value="Executive">Executive</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Department A">Department A</option>
              <option value="Department B">Department B</option>
              <option value="Department C">Department C</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. New York, Remote"
            />
          </div>

          {/* Hiring Status */}
          <div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleHiring}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isHiring ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span 
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isHiring ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </button>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {isHiring ? 'Currently Hiring' : 'Not Hiring'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <button
                type="button"
                onClick={generateDescription}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Generate
              </button>
            </div>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter description or click Generate"
            />
          </div>

          {/* Work Distribution */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Work Distribution</h3>
            
            <div className="space-y-4">
              {/* Human/AI Distribution Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Human vs AI Work Distribution
                  </label>
                  <div className="text-sm text-gray-500">
                    Human: {humanPercentage}% | AI: {aiPercentage}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humanPercentage}
                  onChange={(e) => updateHumanPercentage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100% Human</span>
                  <span>50/50</span>
                  <span>100% AI</span>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="humanHours" className="block text-sm font-medium text-gray-700">
                    Human Hours/Week
                  </label>
                  <input
                    type="number"
                    id="humanHours"
                    min="0"
                    max="168"
                    value={humanHours}
                    onChange={(e) => setHumanHours(parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="aiHours" className="block text-sm font-medium text-gray-700">
                    AI Hours/Week
                  </label>
                  <input
                    type="number"
                    id="aiHours"
                    min="0"
                    max="168"
                    value={aiHours}
                    onChange={(e) => setAiHours(parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Agents & Systems */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AI Agents & Systems</h3>
            
            {/* Current Agents/Systems List */}
            <div className="mb-4">
              {agentSystems.length > 0 ? (
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
                  {agentSystems.map((item, index) => (
                    <li key={index} className="p-3 flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.name}</span>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            item.type === 'agent' 
                              ? 'bg-violet-100 text-violet-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.type === 'agent' ? 'Agent' : 'System'}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAgentSystem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No AI agents or systems added yet.</p>
              )}
            </div>
            
            {/* Add New Agent/System Form */}
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add New AI Agent/System</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="newAgentName" className="block text-xs font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="newAgentName"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                    placeholder="e.g. Data Analysis Assistant"
                  />
                </div>
                
                <div>
                  <label htmlFor="newAgentType" className="block text-xs font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="newAgentType"
                    value={newAgentType}
                    onChange={(e) => setNewAgentType(e.target.value as 'agent' | 'system')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                  >
                    <option value="agent">AI Agent</option>
                    <option value="system">AI System</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="newAgentDescription" className="block text-xs font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    id="newAgentDescription"
                    value={newAgentDescription}
                    onChange={(e) => setNewAgentDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                    placeholder="Brief description of capabilities"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={addAgentSystem}
                  disabled={!newAgentName.trim()}
                  className="w-full flex justify-center items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add {newAgentType === 'agent' ? 'Agent' : 'System'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer with action buttons */}
      <div className="flex-none p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {selectedNode.id ? 'Save' : 'Add'}
          </button>
          {selectedNode.id && (
            <button
              type="button"
              onClick={() => onNodeDelete(selectedNode.id)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
