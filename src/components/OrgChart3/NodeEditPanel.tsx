'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { usePeopleStore } from '@/store/peopleStore';

interface Node {
  id: string;
  title: string;
  role?: string;
  department?: string;
  description?: string;
  isHiring?: boolean;
  location?: string;
}

interface NodeEditPanelProps {
  selectedNode: Node | null;
  onNodeUpdate: (id: string, data: any) => void;
  onNodeDelete: (id: string) => void;
  onClose: () => void;
}

export default function NodeEditPanel({ selectedNode, onNodeUpdate, onNodeDelete, onClose }: NodeEditPanelProps) {
  // Form state
  const [title, setTitle] = useState(selectedNode?.title || '');
  const [role, setRole] = useState(selectedNode?.role || '');
  const [department, setDepartment] = useState(selectedNode?.department || '');
  const [description, setDescription] = useState(selectedNode?.description || '');
  const [isHiring, setIsHiring] = useState(selectedNode?.isHiring || false);
  const [location, setLocation] = useState(selectedNode?.location || '');
  
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
        location
      });
    }
  };

  // Toggle hiring status
  const toggleHiring = () => {
    setIsHiring(!isHiring);
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
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter description or click Generate"
            />
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
