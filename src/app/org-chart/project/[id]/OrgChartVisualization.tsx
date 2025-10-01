'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  manager?: string;
  isHiring?: boolean;
  hiringTimeline?: string;
  location?: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
  employees: Employee[];
}

interface OrgChartVisualizationProps {
  employees: Employee[];
  timeProjection: string; // '6months', '1year', '3years'
}

// Departman renkleri
const departmentColors: Record<string, string> = {
  'Engineering': 'bg-blue-100 border-blue-300',
  'Product': 'bg-purple-100 border-purple-300',
  'Finance': 'bg-green-100 border-green-300',
  'Marketing': 'bg-yellow-100 border-yellow-300',
  'Data Science': 'bg-indigo-100 border-indigo-300',
  'Security': 'bg-red-100 border-red-300',
  'Compliance': 'bg-orange-100 border-orange-300',
  'Operations': 'bg-teal-100 border-teal-300',
  'Executive': 'bg-gray-100 border-gray-300',
};

// Lokasyon bilgileri
const employeeLocations: Record<string, string> = {
  'e1': 'New York',
  'e2': 'San Francisco',
  'e3': 'Boston',
  'e4': 'Chicago',
  'e5': 'Remote',
  'e6': 'Los Angeles',
  'e7': 'Washington DC',
  'e8': 'San Francisco',
  'e9': 'Boston',
  'e10': 'Chicago',
  'e11': 'Remote',
  'e12': 'Los Angeles',
  'e13': 'Washington DC',
  'e14': 'San Francisco',
  'e15': 'Remote',
  'fe1': 'San Francisco',
  'fe2': 'Remote',
  'fe3': 'Washington DC',
  'fe4': 'Chicago',
  'fe5': 'Boston',
  'fe6': 'Remote',
  'fe7': 'San Francisco',
  'fe8': 'New York',
  'fe9': 'Boston',
  'fe10': 'Remote',
  'fe11': 'San Francisco',
  'fe12': 'Boston',
  'fe13': 'Remote',
  'fe14': 'Chicago',
  'fe15': 'Washington DC',
  'fe16': 'Los Angeles',
};

// Sample future employees data for projections
const futureEmployees: Record<string, Employee[]> = {
  '6months': [
    { id: 'fe1', name: 'Hiring', title: 'Senior Blockchain Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe2', name: 'Hiring', title: 'Financial Data Scientist', department: 'Data Science', manager: 'e5', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe3', name: 'Hiring', title: 'Security Engineer', department: 'Security', manager: 'e7', isHiring: true, hiringTimeline: '6months' },
  ],
  '1year': [
    { id: 'fe1', name: 'Hiring', title: 'Senior Blockchain Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe2', name: 'Hiring', title: 'Financial Data Scientist', department: 'Data Science', manager: 'e5', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe3', name: 'Hiring', title: 'Security Engineer', department: 'Security', manager: 'e7', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe4', name: 'Hiring', title: 'Compliance Officer', department: 'Compliance', manager: 'e4', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe5', name: 'Hiring', title: 'Product Manager - Payments', department: 'Product', manager: 'e3', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe6', name: 'Hiring', title: 'Frontend Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe7', name: 'Hiring', title: 'Backend Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '1year' },
  ],
  '3years': [
    { id: 'fe1', name: 'Hiring', title: 'Senior Blockchain Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe2', name: 'Hiring', title: 'Financial Data Scientist', department: 'Data Science', manager: 'e5', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe3', name: 'Hiring', title: 'Security Engineer', department: 'Security', manager: 'e7', isHiring: true, hiringTimeline: '6months' },
    { id: 'fe4', name: 'Hiring', title: 'Compliance Officer', department: 'Compliance', manager: 'e4', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe5', name: 'Hiring', title: 'Product Manager - Payments', department: 'Product', manager: 'e3', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe6', name: 'Hiring', title: 'Frontend Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe7', name: 'Hiring', title: 'Backend Developer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '1year' },
    { id: 'fe8', name: 'Hiring', title: 'VP of Engineering', department: 'Engineering', manager: 'e1', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe9', name: 'Hiring', title: 'VP of Product', department: 'Product', manager: 'e1', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe10', name: 'Hiring', title: 'DevOps Engineer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe11', name: 'Hiring', title: 'QA Engineer', department: 'Engineering', manager: 'e2', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe12', name: 'Hiring', title: 'UX Designer', department: 'Product', manager: 'e3', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe13', name: 'Hiring', title: 'Data Engineer', department: 'Data Science', manager: 'e5', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe14', name: 'Hiring', title: 'Compliance Analyst', department: 'Compliance', manager: 'e4', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe15', name: 'Hiring', title: 'Security Analyst', department: 'Security', manager: 'e7', isHiring: true, hiringTimeline: '3years' },
    { id: 'fe16', name: 'Hiring', title: 'Marketing Manager', department: 'Marketing', manager: 'e6', isHiring: true, hiringTimeline: '3years' },
  ],
};

// Departmanları birleştir ve grupla
const mergeDepartments = (employees: Employee[]): Department[] => {
  const departmentMap = new Map<string, Department>();
  
  employees.forEach(employee => {
    const deptName = employee.department;
    
    if (!departmentMap.has(deptName)) {
      departmentMap.set(deptName, {
        id: deptName.toLowerCase().replace(/\s+/g, '-'),
        name: deptName,
        color: departmentColors[deptName] || 'bg-gray-100 border-gray-300',
        employees: []
      });
    }
    
    // Lokasyon bilgisini ekle
    const employeeWithLocation = {
      ...employee,
      location: employeeLocations[employee.id] || 'Remote'
    };
    
    departmentMap.get(deptName)?.employees.push(employeeWithLocation);
  });
  
  return Array.from(departmentMap.values());
};

const OrgChartVisualization: React.FC<OrgChartVisualizationProps> = ({ employees, timeProjection }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Apply time-based projection to the employee data
  useEffect(() => {
    setIsAnimating(true);
    let projected = [...employees];
    
    // Add future employees based on the selected time projection
    if (timeProjection === '6months') {
      projected = [...projected, ...futureEmployees['6months']];
    } else if (timeProjection === '1year') {
      projected = [...projected, ...futureEmployees['1year']];
    } else if (timeProjection === '3years') {
      projected = [...projected, ...futureEmployees['3years']];
    }
    
    // Departmanları birleştir ve grupla
    const mergedDepartments = mergeDepartments(projected);
    setDepartments(mergedDepartments);
    
    // Reset animation state after a delay
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [employees, timeProjection]);

  if (departments.length === 0) {
    return <div className="p-4">Loading organization chart...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: departments.indexOf(dept) * 0.1 }}
            className={`rounded-lg shadow-sm border-2 p-4 ${dept.color}`}
          >
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              {dept.name}
              <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
                {dept.employees.length} {dept.employees.length === 1 ? 'employee' : 'employees'}
              </span>
            </h3>
            
            <ul className="space-y-2 mt-3">
              {dept.employees.map((employee) => (
                <motion.li 
                  key={employee.id} 
                  className="bg-white bg-opacity-70 rounded-md p-2 text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 + (dept.employees.indexOf(employee) * 0.05) }}
                >
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-gray-600 text-xs flex justify-between">
                    <span>{employee.title}</span>
                    <span>{employee.location}</span>
                  </div>
                  {employee.isHiring && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full animate-pulse">
                      Hiring
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrgChartVisualization;
