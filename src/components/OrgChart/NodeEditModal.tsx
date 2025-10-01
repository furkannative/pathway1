'use client';

import { Fragment, useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { usePeopleStore } from '@/store/peopleStore';

interface NodeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: {
    title: string;
    role?: string;
    department?: string;
    description?: string;
    isHiring?: boolean;
    location?: string;
  };
  onSave: (data: any) => void;
}

export default function NodeEditModal({ isOpen, onClose, nodeData, onSave }: NodeEditModalProps) {
  const [title, setTitle] = useState(nodeData.title || '');
  const [role, setRole] = useState(nodeData.role || '');
  const [department, setDepartment] = useState(nodeData.department || '');
  const [description, setDescription] = useState(nodeData.description || '');
  const [isHiring, setIsHiring] = useState(nodeData.isHiring || false);
  const [location, setLocation] = useState(nodeData.location || '');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  
  const people = usePeopleStore(state => state.people);

  useEffect(() => {
    if (isOpen) {
      setTitle(nodeData.title || '');
      setRole(nodeData.role || '');
      setDepartment(nodeData.department || '');
      setDescription(nodeData.description || '');
      setIsHiring(nodeData.isHiring || false);
      setLocation(nodeData.location || '');
    }
  }, [nodeData, isOpen]);

  const toggleHiring = () => {
    setIsHiring(!isHiring);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave({
      title,
      role,
      description,
      isHiring,
      department,
      location
    });
  };

  const handleSaveClick = () => {
    handleSubmit();
  };

  const generateDescription = async () => {
    if (role && department) {
      setDescription(`${role} in the ${department} department, responsible for key initiatives and projects.`);
    } else if (role) {
      setDescription(`${role} responsible for key initiatives and projects.`);
    } else {
      setDescription('Responsible for key initiatives and projects.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={(e) => e.stopPropagation()} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Edit Role</h3>
                
                <div className="mt-4 space-y-4">
                  {/* Job Title */}
                  <div>
                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      type="text"
                      name="job-title"
                      id="job-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
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
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
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
                  
                  {/* Hiring Status - Basit toggle button kullan */}
                  <div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={toggleHiring}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isHiring ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isHiring ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                      <span className="ml-3 text-sm font-medium text-gray-700">{isHiring ? 'Hiring' : 'Not Hiring'}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={handleSaveClick}
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
