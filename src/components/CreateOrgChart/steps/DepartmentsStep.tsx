'use client';

import { useState } from 'react';
import { ProjectData, Department } from '../CreateOrgChartWizard';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

interface DepartmentsStepProps {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

// Predefined department colors
const departmentColors = [
  '#3B82F6', // blue
  '#A855F7', // purple
  '#22C55E', // green
  '#F97316', // orange
  '#EF4444', // red
  '#6366F1', // indigo
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F59E0B', // amber
  '#8B5CF6', // violet
];

// Common department templates for fintech companies
const departmentTemplates = [
  {
    name: 'Engineering',
    description: 'Software development and technical infrastructure',
    color: '#3B82F6',
    headcount: 0
  },
  {
    name: 'Product',
    description: 'Product management, design, and user experience',
    color: '#A855F7',
    headcount: 0
  },
  {
    name: 'Data Science',
    description: 'Data analysis, machine learning, and analytics',
    color: '#F97316',
    headcount: 0
  },
  {
    name: 'Compliance',
    description: 'Regulatory compliance and legal affairs',
    color: '#22C55E',
    headcount: 0
  },
  {
    name: 'Security',
    description: 'Information security and risk management',
    color: '#EF4444',
    headcount: 0
  },
  {
    name: 'Operations',
    description: 'Business operations and customer support',
    color: '#6366F1',
    headcount: 0
  },
  {
    name: 'Finance',
    description: 'Financial planning, accounting, and reporting',
    color: '#14B8A6',
    headcount: 0
  },
  {
    name: 'Marketing',
    description: 'Marketing, communications, and brand management',
    color: '#F59E0B',
    headcount: 0
  },
  {
    name: 'HR',
    description: 'Human resources, recruitment, and employee development',
    color: '#EC4899',
    headcount: 0
  },
  {
    name: 'Sales',
    description: 'Sales, business development, and account management',
    color: '#8B5CF6',
    headcount: 0
  }
];

export default function DepartmentsStep({ projectData, updateProjectData }: DepartmentsStepProps) {
  const [departments, setDepartments] = useState<Department[]>(projectData.departments);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: departmentColors[0],
    headcount: 0,
    parentDepartment: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'headcount' ? parseInt(value) || 0 : value 
    }));
  };
  
  const addDepartment = () => {
    const newDepartment: Department = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
      color: formData.color,
      headcount: formData.headcount,
      ...(formData.parentDepartment && { parentDepartment: formData.parentDepartment })
    };
    
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    updateProjectData({ departments: updatedDepartments });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      color: departmentColors[0],
      headcount: 0,
      parentDepartment: ''
    });
    setShowForm(false);
  };
  
  const updateDepartment = () => {
    if (!editingDepartment) return;
    
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartment.id 
        ? { 
            ...dept, 
            name: formData.name, 
            description: formData.description, 
            color: formData.color, 
            headcount: formData.headcount,
            ...(formData.parentDepartment ? { parentDepartment: formData.parentDepartment } : {})
          } 
        : dept
    );
    
    setDepartments(updatedDepartments);
    updateProjectData({ departments: updatedDepartments });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      color: departmentColors[0],
      headcount: 0,
      parentDepartment: ''
    });
    setEditingDepartment(null);
    setShowForm(false);
  };
  
  const editDepartment = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      color: department.color,
      headcount: department.headcount,
      parentDepartment: department.parentDepartment || ''
    });
    setShowForm(true);
  };
  
  const deleteDepartment = (id: string) => {
    const updatedDepartments = departments.filter(dept => dept.id !== id);
    setDepartments(updatedDepartments);
    updateProjectData({ departments: updatedDepartments });
  };
  
  const addTemplate = (template: typeof departmentTemplates[0]) => {
    const newDepartment: Department = {
      id: uuidv4(),
      name: template.name,
      description: template.description,
      color: template.color,
      headcount: Math.max(1, Math.floor(projectData.currentHeadcount * 0.1)) // Default to 10% of total headcount
    };
    
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    updateProjectData({ departments: updatedDepartments });
  };
  
  const addCommonDepartments = () => {
    // Filter out templates that already exist in departments
    const existingDepartmentNames = departments.map(d => d.name.toLowerCase());
    const filteredTemplates = departmentTemplates.filter(
      t => !existingDepartmentNames.includes(t.name.toLowerCase())
    );
    
    // Calculate headcount distribution based on common patterns in fintech
    const totalHeadcount = projectData.currentHeadcount;
    const distribution = {
      Engineering: Math.floor(totalHeadcount * 0.4), // 40%
      Product: Math.floor(totalHeadcount * 0.15), // 15%
      'Data Science': Math.floor(totalHeadcount * 0.1), // 10%
      Compliance: Math.floor(totalHeadcount * 0.1), // 10%
      Security: Math.floor(totalHeadcount * 0.05), // 5%
      Operations: Math.floor(totalHeadcount * 0.05), // 5%
      Finance: Math.floor(totalHeadcount * 0.05), // 5%
      Marketing: Math.floor(totalHeadcount * 0.05), // 5%
      HR: Math.floor(totalHeadcount * 0.03), // 3%
      Sales: Math.floor(totalHeadcount * 0.02), // 2%
    };
    
    const newDepartments = filteredTemplates.map(template => ({
      id: uuidv4(),
      name: template.name,
      description: template.description,
      color: template.color,
      headcount: distribution[template.name as keyof typeof distribution] || 1
    }));
    
    const updatedDepartments = [...departments, ...newDepartments];
    setDepartments(updatedDepartments);
    updateProjectData({ departments: updatedDepartments });
  };
  
  const getTotalHeadcount = () => {
    return departments.reduce((sum, dept) => sum + dept.headcount, 0);
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-1.5 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="ml-3 text-sm text-blue-800 font-medium">
            Define the departments in your organization. You can add departments individually or use our templates for common fintech department structures.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-medium text-gray-900">Departments</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addCommonDepartments}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Add Common Departments
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingDepartment(null);
              setFormData({
                name: '',
                description: '',
                color: departmentColors[0],
                headcount: 0,
                parentDepartment: ''
              });
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            Add Department
          </button>
        </div>
      </div>
      
      {/* Department Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md animate-fadeIn">
          <h4 className="text-lg font-medium text-gray-900 mb-5 flex items-center">
            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-700 mr-2">
              {editingDepartment ? (
                <PencilIcon className="h-4 w-4" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </div>
            {editingDepartment ? 'Edit Department' : 'Add New Department'}
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Engineering"
                className="block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="headcount" className="block text-sm font-medium text-gray-700 mb-1">
                Headcount
              </label>
              <input
                type="number"
                name="headcount"
                id="headcount"
                value={formData.headcount}
                onChange={handleChange}
                min="0"
                placeholder="e.g., 10"
                className="block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Department Color
              </label>
              <div className="flex flex-wrap gap-2">
                {departmentColors.map((color) => (
                  <div 
                    key={color}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                      formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="parentDepartment" className="block text-sm font-medium text-gray-700 mb-1">
                Parent Department (Optional)
              </label>
              <div className="relative">
                <select
                  id="parentDepartment"
                  name="parentDepartment"
                  value={formData.parentDepartment}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm appearance-none"
                >
                  <option value="">None (Top-Level Department)</option>
                  {departments
                    .filter(dept => !editingDepartment || dept.id !== editingDepartment.id)
                    .map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))
                  }
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Software development and technical infrastructure"
                className="block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingDepartment(null);
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editingDepartment ? updateDepartment : addDepartment}
              disabled={!formData.name}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-all duration-200 ${
                formData.name 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-400 cursor-not-allowed'
              }`}
            >
              {editingDepartment ? 'Update Department' : 'Add Department'}
            </button>
          </div>
        </div>
      )}
      
      {/* Department List */}
      {departments.length > 0 ? (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-900">
              Current Departments ({departments.length})
            </h4>
            <span className="text-sm text-gray-500">
              Total Headcount: {getTotalHeadcount()} / {projectData.currentHeadcount}
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <div 
                key={department.id} 
                className="relative group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="h-2" style={{ backgroundColor: department.color }}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h5 className="text-base font-medium text-gray-900 mb-1">{department.name}</h5>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={() => editDepartment(department)}
                        className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDepartment(department.id)}
                        className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{department.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {department.headcount} {department.headcount === 1 ? 'employee' : 'employees'}
                    </div>
                    {department.parentDepartment && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                        </svg>
                        {departments.find(d => d.id === department.parentDepartment)?.name || 'Parent Department'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">No departments added yet</h3>
          <p className="text-sm text-gray-500 mb-4">Add departments to your organization chart to get started</p>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={addCommonDepartments}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Add Common Departments
            </button>
          </div>
        </div>
      )}
      
      {/* Department Templates */}
      {departments.length === 0 && (
        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900 mb-4">Common Fintech Departments</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {departmentTemplates.slice(0, 6).map((template) => (
              <div 
                key={template.name} 
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => addTemplate(template)}
              >
                <div className="h-1.5" style={{ backgroundColor: template.color }}></div>
                <div className="p-3">
                  <h5 className="text-sm font-medium text-gray-900">{template.name}</h5>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
