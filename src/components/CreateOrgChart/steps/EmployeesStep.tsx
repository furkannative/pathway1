'use client';

import { useState } from 'react';
import { ProjectData, Department, Employee } from '../CreateOrgChartWizard';
import { PlusIcon, TrashIcon, PencilIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

interface EmployeesStepProps {
  projectData: ProjectData;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

// Common job titles for fintech companies
const jobTitlesByDepartment: Record<string, string[]> = {
  Engineering: [
    'CTO', 
    'VP of Engineering', 
    'Engineering Manager', 
    'Senior Software Engineer', 
    'Software Engineer', 
    'Frontend Engineer', 
    'Backend Engineer', 
    'DevOps Engineer', 
    'QA Engineer'
  ],
  Product: [
    'CPO', 
    'VP of Product', 
    'Product Manager', 
    'Senior Product Designer', 
    'Product Designer', 
    'UX Researcher'
  ],
  'Data Science': [
    'Chief Data Officer', 
    'Data Science Manager', 
    'Senior Data Scientist', 
    'Data Scientist', 
    'Data Analyst', 
    'Machine Learning Engineer'
  ],
  Compliance: [
    'Chief Compliance Officer', 
    'Compliance Manager', 
    'Compliance Analyst', 
    'Regulatory Affairs Specialist', 
    'AML Specialist'
  ],
  Security: [
    'CISO', 
    'Security Engineer', 
    'Security Analyst', 
    'Penetration Tester', 
    'Security Operations Specialist'
  ],
  Operations: [
    'COO', 
    'Operations Manager', 
    'Customer Success Manager', 
    'Customer Support Specialist', 
    'Operations Analyst'
  ],
  Finance: [
    'CFO', 
    'Finance Director', 
    'Financial Analyst', 
    'Accountant', 
    'Financial Controller'
  ],
  Marketing: [
    'CMO', 
    'Marketing Director', 
    'Growth Manager', 
    'Content Strategist', 
    'Digital Marketing Specialist'
  ],
  HR: [
    'CHRO', 
    'HR Manager', 
    'Talent Acquisition Specialist', 
    'People Operations Specialist', 
    'HR Coordinator'
  ],
  Sales: [
    'CRO', 
    'Sales Director', 
    'Account Executive', 
    'Sales Development Representative', 
    'Customer Success Manager'
  ]
};

// Default job titles for departments not in the predefined list
const defaultJobTitles = [
  'Director', 
  'Manager', 
  'Team Lead', 
  'Senior Specialist', 
  'Specialist', 
  'Coordinator'
];

export default function EmployeesStep({ projectData, updateProjectData }: EmployeesStepProps) {
  const [employees, setEmployees] = useState<Employee[]>(projectData.employees);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [bulkImport, setBulkImport] = useState(false);
  const [bulkData, setBulkData] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    department: '',
    manager: '',
    email: '',
    location: '',
    isHiring: false,
    hiringTimeline: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const addEmployee = () => {
    const newEmployee: Employee = {
      id: uuidv4(),
      name: formData.name,
      title: formData.title,
      department: formData.department,
      ...(formData.manager && { manager: formData.manager }),
      ...(formData.email && { email: formData.email }),
      ...(formData.location && { location: formData.location }),
      ...(formData.isHiring && { 
        isHiring: true,
        ...(formData.hiringTimeline && { hiringTimeline: formData.hiringTimeline })
      })
    };
    
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    updateProjectData({ employees: updatedEmployees });
    
    // Reset form
    resetForm();
  };
  
  const updateEmployee = () => {
    if (!editingEmployee) return;
    
    const updatedEmployees = employees.map(emp => 
      emp.id === editingEmployee.id 
        ? { 
            ...emp, 
            name: formData.name, 
            title: formData.title, 
            department: formData.department,
            ...(formData.manager ? { manager: formData.manager } : {}),
            ...(formData.email ? { email: formData.email } : {}),
            ...(formData.location ? { location: formData.location } : {}),
            ...(formData.isHiring 
              ? { 
                  isHiring: true,
                  ...(formData.hiringTimeline ? { hiringTimeline: formData.hiringTimeline } : {})
                } 
              : { isHiring: false, hiringTimeline: undefined })
          } 
        : emp
    );
    
    setEmployees(updatedEmployees);
    updateProjectData({ employees: updatedEmployees });
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      department: '',
      manager: '',
      email: '',
      location: '',
      isHiring: false,
      hiringTimeline: ''
    });
    setEditingEmployee(null);
    setShowForm(false);
    setBulkImport(false);
    setBulkData('');
  };
  
  const editEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      title: employee.title,
      department: employee.department,
      manager: employee.manager || '',
      email: employee.email || '',
      location: employee.location || '',
      isHiring: employee.isHiring || false,
      hiringTimeline: employee.hiringTimeline || ''
    });
    setShowForm(true);
    setBulkImport(false);
  };
  
  const deleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    updateProjectData({ employees: updatedEmployees });
  };
  
  const handleBulkImport = () => {
    try {
      // Parse CSV or line-by-line format
      const lines = bulkData.split('\\n');
      const newEmployees: Employee[] = [];
      
      lines.forEach(line => {
        if (!line.trim()) return;
        
        const parts = line.split(',').map(part => part.trim());
        if (parts.length < 3) return; // Need at least name, title, department
        
        const [name, title, department, manager, email, location] = parts;
        if (!name || !title || !department) return;
        
        newEmployees.push({
          id: uuidv4(),
          name,
          title,
          department,
          ...(manager && { manager }),
          ...(email && { email }),
          ...(location && { location })
        });
      });
      
      if (newEmployees.length > 0) {
        const updatedEmployees = [...employees, ...newEmployees];
        setEmployees(updatedEmployees);
        updateProjectData({ employees: updatedEmployees });
        resetForm();
      }
    } catch (error) {
      console.error('Error parsing bulk import data:', error);
      // In a real app, you'd show an error message to the user
    }
  };
  
  const generateSampleEmployees = () => {
    const newEmployees: Employee[] = [];
    const departments = projectData.departments;
    
    // Create a CEO/Founder first
    const ceo: Employee = {
      id: uuidv4(),
      name: 'Alex Johnson',
      title: 'CEO / Founder',
      department: departments[0]?.id || 'Executive',
      location: 'San Francisco, CA'
    };
    newEmployees.push(ceo);
    
    // Generate employees for each department
    departments.forEach(dept => {
      const departmentName = dept.name;
      const headcount = dept.headcount;
      const jobTitles = jobTitlesByDepartment[departmentName] || defaultJobTitles;
      
      // Create department head
      if (headcount > 0) {
        const deptHead: Employee = {
          id: uuidv4(),
          name: generateRandomName(),
          title: jobTitles[0] || 'Department Head',
          department: dept.id,
          manager: ceo.id,
          location: ['San Francisco, CA', 'New York, NY', 'London, UK', 'Remote'][Math.floor(Math.random() * 4)]
        };
        newEmployees.push(deptHead);
        
        // Create other employees in the department
        for (let i = 1; i < Math.min(headcount, 5); i++) {
          const titleIndex = Math.min(i, jobTitles.length - 1);
          newEmployees.push({
            id: uuidv4(),
            name: generateRandomName(),
            title: jobTitles[titleIndex],
            department: dept.id,
            manager: deptHead.id,
            location: ['San Francisco, CA', 'New York, NY', 'London, UK', 'Remote'][Math.floor(Math.random() * 4)],
            ...(Math.random() > 0.8 && { 
              isHiring: true,
              hiringTimeline: ['Q2 2025', 'Q3 2025', 'Q4 2025'][Math.floor(Math.random() * 3)]
            })
          });
        }
      }
    });
    
    const updatedEmployees = [...employees, ...newEmployees];
    setEmployees(updatedEmployees);
    updateProjectData({ employees: updatedEmployees });
  };
  
  // Helper function to generate random names
  const generateRandomName = () => {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver', 'Charlotte', 'Benjamin', 'Amelia', 'Elijah', 'Mia', 'Lucas', 'Harper', 'Mason', 'Evelyn'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };
  
  const getManagerOptions = () => {
    return employees.filter(emp => emp.id !== editingEmployee?.id);
  };
  
  const getDepartmentById = (id: string) => {
    return projectData.departments.find(dept => dept.id === id);
  };
  
  const getEmployeesByDepartment = (departmentId: string) => {
    return employees.filter(emp => emp.department === departmentId);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-700">
          Add employees to your organization chart. You can add them individually, import in bulk, or generate sample employees based on your department structure.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Employees</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={generateSampleEmployees}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Generate Sample Employees
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setBulkImport(false);
              setEditingEmployee(null);
              setFormData({
                name: '',
                title: '',
                department: projectData.departments[0]?.id || '',
                manager: '',
                email: '',
                location: '',
                isHiring: false,
                hiringTimeline: ''
              });
            }}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Employee
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setBulkImport(true);
              setEditingEmployee(null);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowUpOnSquareIcon className="h-4 w-4 mr-1" />
            Bulk Import
          </button>
        </div>
      </div>
      
      {/* Employee Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Employee Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., John Smith"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Software Engineer"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a department</option>
                {projectData.departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                Manager (Optional)
              </label>
              <select
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">No Manager (Reports to Top)</option>
                {getManagerOptions().map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.title})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., john.smith@company.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="sm:col-span-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isHiring"
                    name="isHiring"
                    type="checkbox"
                    checked={formData.isHiring}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isHiring" className="font-medium text-gray-700">
                    Hiring for this position
                  </label>
                  <p className="text-gray-500">Mark this position as actively hiring</p>
                </div>
              </div>
            </div>
            
            {formData.isHiring && (
              <div className="sm:col-span-2">
                <label htmlFor="hiringTimeline" className="block text-sm font-medium text-gray-700">
                  Hiring Timeline
                </label>
                <select
                  id="hiringTimeline"
                  name="hiringTimeline"
                  value={formData.hiringTimeline}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a timeline</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Q2 2025">Q2 2025</option>
                  <option value="Q3 2025">Q3 2025</option>
                  <option value="Q4 2025">Q4 2025</option>
                  <option value="Q1 2026">Q1 2026</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editingEmployee ? updateEmployee : addEmployee}
              disabled={!formData.name || !formData.title || !formData.department}
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                formData.name && formData.title && formData.department
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-400 cursor-not-allowed'
              }`}
            >
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </div>
      )}
      
      {/* Bulk Import Form */}
      {bulkImport && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Bulk Import Employees</h4>
          <p className="text-xs text-gray-500 mb-4">
            Enter employee data in CSV format: Name, Title, Department, Manager (optional), Email (optional), Location (optional)
          </p>
          
          <textarea
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            rows={6}
            placeholder="John Smith, Software Engineer, Engineering, Alex Johnson, john@example.com, San Francisco\nJane Doe, Product Manager, Product, Alex Johnson, jane@example.com, New York"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBulkImport}
              disabled={!bulkData.trim()}
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                bulkData.trim() 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-400 cursor-not-allowed'
              }`}
            >
              Import Employees
            </button>
          </div>
        </div>
      )}
      
      {/* Employees List */}
      {employees.length > 0 ? (
        <div>
          <div className="mb-2 flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-700">
              {employees.length} Employee{employees.length !== 1 ? 's' : ''}
            </h4>
            <div className="text-sm text-gray-500">
              {employees.filter(emp => emp.isHiring).length} positions marked as hiring
            </div>
          </div>
          
          {/* Department tabs for filtering */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Departments">
              {projectData.departments.map((dept) => {
                const deptEmployees = getEmployeesByDepartment(dept.id);
                return (
                  <button
                    key={dept.id}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      deptEmployees.length > 0
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {dept.name} ({deptEmployees.length})
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {employees.map((employee) => {
                const department = getDepartmentById(employee.department);
                return (
                  <li key={employee.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-start">
                      <div 
                        className="h-4 w-4 rounded-full mt-1 mr-3" 
                        style={{ backgroundColor: department?.color || '#CBD5E0' }}
                      />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">
                          {employee.name}
                          {employee.isHiring && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Hiring {employee.hiringTimeline ? `(${employee.hiringTimeline})` : ''}
                            </span>
                          )}
                        </h5>
                        <p className="text-xs text-gray-500">{employee.title}</p>
                        <div className="flex flex-wrap text-xs text-gray-400 mt-1">
                          <span className="mr-2">{department?.name || 'Unknown Department'}</span>
                          {employee.location && <span className="mr-2">• {employee.location}</span>}
                          {employee.manager && (
                            <span>
                              • Reports to: {employees.find(e => e.id === employee.manager)?.name || 'Unknown'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => editEmployee(employee)}
                        className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmployee(employee.id)}
                        className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No employees added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add employees manually, import in bulk, or generate sample employees.</p>
        </div>
      )}
    </div>
  );
}
