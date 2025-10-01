'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Departman kartları için props
interface DepartmentCardsProps {
  projectionPeriod: 'current' | '6months' | '1year' | '3years';
}

// Çalışan tipi
interface Employee {
  id: string;
  name: string;
  role: string;
  isHiring: boolean;
  location: string;
}

// Departman tipi
interface Department {
  id: string;
  name: string;
  color: string;
  employees: Employee[];
}

// Mevcut departmanlar
const currentDepartments: Department[] = [
  {
    id: 'exec',
    name: 'Executive',
    color: 'bg-purple-100 border-purple-300',
    employees: [
      { id: '1', name: 'Alex Morgan', role: 'CEO', isHiring: false, location: 'New York' }
    ]
  },
  {
    id: 'tech',
    name: 'Technology',
    color: 'bg-blue-100 border-blue-300',
    employees: [
      { id: '2', name: 'Sarah Johnson', role: 'CTO', isHiring: true, location: 'San Francisco' },
      { id: '4', name: 'Emily Davis', role: 'Engineering Manager', isHiring: true, location: 'Remote' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    color: 'bg-green-100 border-green-300',
    employees: [
      { id: '3', name: 'Michael Chen', role: 'CFO', isHiring: false, location: 'Chicago' },
      { id: '7', name: 'James Brown', role: 'Financial Analyst', isHiring: false, location: 'New York' }
    ]
  },
  {
    id: 'product',
    name: 'Product',
    color: 'bg-yellow-100 border-yellow-300',
    employees: [
      { id: '5', name: 'David Wilson', role: 'Product Manager', isHiring: false, location: 'Boston' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: 'bg-orange-100 border-orange-300',
    employees: [
      { id: '6', name: 'Lisa Taylor', role: 'Marketing Director', isHiring: true, location: 'Los Angeles' }
    ]
  }
];

// 6 aylık projeksiyon departmanları
const sixMonthsDepartments: Department[] = [
  ...currentDepartments,
  {
    id: 'tech-6m',
    name: 'Technology',
    color: 'bg-blue-100 border-blue-300',
    employees: [
      { id: '8', name: 'Open Position', role: 'Backend Developer', isHiring: true, location: 'Remote' },
      { id: '9', name: 'Open Position', role: 'Frontend Developer', isHiring: true, location: 'San Francisco' }
    ]
  },
  {
    id: 'finance-6m',
    name: 'Finance',
    color: 'bg-green-100 border-green-300',
    employees: [
      { id: '10', name: 'Open Position', role: 'Compliance Officer', isHiring: true, location: 'New York' }
    ]
  }
];

// 1 yıllık projeksiyon departmanları
const oneYearDepartments: Department[] = [
  ...sixMonthsDepartments,
  {
    id: 'tech-1y',
    name: 'Technology',
    color: 'bg-blue-100 border-blue-300',
    employees: [
      { id: '11', name: 'Open Position', role: 'Data Science Lead', isHiring: true, location: 'Remote' },
      { id: '13', name: 'Open Position', role: 'Blockchain Developer', isHiring: true, location: 'Remote' }
    ]
  },
  {
    id: 'finance-1y',
    name: 'Finance',
    color: 'bg-green-100 border-green-300',
    employees: [
      { id: '12', name: 'Open Position', role: 'Investment Analyst', isHiring: true, location: 'Chicago' }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    color: 'bg-rose-100 border-rose-300',
    employees: [
      { id: '14', name: 'Open Position', role: 'UX/UI Designer', isHiring: true, location: 'Boston' }
    ]
  }
];

// 3 yıllık projeksiyon departmanları
const threeYearsDepartments: Department[] = [
  ...oneYearDepartments,
  {
    id: 'tech-3y',
    name: 'Technology',
    color: 'bg-blue-100 border-blue-300',
    employees: [
      { id: '15', name: 'Open Position', role: 'AI Research Lead', isHiring: true, location: 'San Francisco' },
      { id: '16', name: 'Open Position', role: 'Cybersecurity Director', isHiring: true, location: 'New York' }
    ]
  },
  {
    id: 'operations',
    name: 'Operations',
    color: 'bg-teal-100 border-teal-300',
    employees: [
      { id: '17', name: 'Open Position', role: 'International Expansion Manager', isHiring: true, location: 'London' }
    ]
  },
  {
    id: 'finance-3y',
    name: 'Finance',
    color: 'bg-green-100 border-green-300',
    employees: [
      { id: '18', name: 'Open Position', role: 'Cryptocurrency Specialist', isHiring: true, location: 'Remote' }
    ]
  },
  {
    id: 'legal',
    name: 'Legal',
    color: 'bg-indigo-100 border-indigo-300',
    employees: [
      { id: '19', name: 'Open Position', role: 'Regulatory Affairs Director', isHiring: true, location: 'Washington DC' }
    ]
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    color: 'bg-cyan-100 border-cyan-300',
    employees: [
      { id: '20', name: 'Open Position', role: 'Customer Success Lead', isHiring: true, location: 'Chicago' }
    ]
  }
];

// Departmanları birleştir ve tekrar edenleri grupla
const mergeDepartments = (departments: Department[]): Department[] => {
  const mergedMap = new Map<string, Department>();
  
  departments.forEach(dept => {
    const existingDept = mergedMap.get(dept.name);
    
    if (existingDept) {
      // Departman zaten var, çalışanları ekle
      existingDept.employees = [...existingDept.employees, ...dept.employees];
    } else {
      // Yeni departman ekle
      mergedMap.set(dept.name, { ...dept });
    }
  });
  
  return Array.from(mergedMap.values());
};

export default function DepartmentCards({ projectionPeriod }: DepartmentCardsProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  
  // Projeksiyon periyoduna göre departmanları güncelle
  useEffect(() => {
    let deptData: Department[] = [];
    
    switch (projectionPeriod) {
      case 'current':
        deptData = currentDepartments;
        break;
      case '6months':
        deptData = mergeDepartments(sixMonthsDepartments);
        break;
      case '1year':
        deptData = mergeDepartments(oneYearDepartments);
        break;
      case '3years':
        deptData = mergeDepartments(threeYearsDepartments);
        break;
      default:
        deptData = currentDepartments;
    }
    
    setDepartments(deptData);
  }, [projectionPeriod]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {departments.map((dept) => (
        <motion.div
          key={dept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
              <li key={employee.id} className="bg-white bg-opacity-70 rounded-md p-2 text-sm">
                <div className="font-medium">{employee.name}</div>
                <div className="text-gray-600 text-xs flex justify-between">
                  <span>{employee.role}</span>
                  <span>{employee.location}</span>
                </div>
                {employee.isHiring && (
                  <span className="inline-block mt-1 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                    Hiring
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
