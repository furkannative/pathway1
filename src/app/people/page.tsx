'use client';

import { useState } from 'react';
import { PlusIcon, ArrowUpTrayIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Kişi tipi tanımı
type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  hiringStatus: 'active' | 'hiring' | 'inactive';
  startDate: string;
  manager?: string;
};

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([
    {
      id: '1',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@fintech.com',
      role: 'CEO',
      department: 'Executive',
      hiringStatus: 'active',
      startDate: '2020-01-01',
    },
    {
      id: '2',
      firstName: 'Ayşe',
      lastName: 'Kaya',
      email: 'ayse.kaya@fintech.com',
      role: 'CTO',
      department: 'Technology',
      hiringStatus: 'active',
      startDate: '2020-02-15',
      manager: '1',
    },
    {
      id: '3',
      firstName: 'Mehmet',
      lastName: 'Demir',
      email: 'mehmet.demir@fintech.com',
      role: 'Senior Developer',
      department: 'Engineering',
      hiringStatus: 'active',
      startDate: '2021-03-10',
      manager: '2',
    },
  ]);

  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState('');
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    hiringStatus: 'active',
    startDate: new Date().toISOString().split('T')[0],
  });

  // Yeni kişi ekleme
  const handleAddPerson = () => {
    if (!newPerson.firstName || !newPerson.lastName || !newPerson.email || !newPerson.role || !newPerson.department) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    const person: Person = {
      id: Date.now().toString(),
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      email: newPerson.email,
      role: newPerson.role,
      department: newPerson.department,
      hiringStatus: newPerson.hiringStatus as 'active' | 'hiring' | 'inactive',
      startDate: newPerson.startDate || new Date().toISOString().split('T')[0],
      manager: newPerson.manager,
    };

    setPeople([...people, person]);
    setNewPerson({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      department: '',
      hiringStatus: 'active',
      startDate: new Date().toISOString().split('T')[0],
    });
    setIsAddingPerson(false);
  };

  // CSV veya JSON formatında toplu import
  const handleImport = () => {
    try {
      // CSV veya JSON formatını tespit et
      if (importText.trim().startsWith('[') || importText.trim().startsWith('{')) {
        // JSON formatı
        const importedPeople = JSON.parse(importText);
        const newPeople = Array.isArray(importedPeople) ? importedPeople : [importedPeople];
        
        // ID'leri güncelle
        const peopleWithIds = newPeople.map((person: Partial<Person>) => ({
          ...person,
          id: person.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
          hiringStatus: person.hiringStatus || 'active',
        }));
        
        setPeople([...people, ...peopleWithIds as Person[]]);
      } else {
        // CSV formatı
        const lines = importText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const newPeople = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const person: any = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            hiringStatus: 'active',
          };
          
          headers.forEach((header, index) => {
            const key = header.toLowerCase().replace(/\s/g, '');
            if (values[index]) {
              if (key === 'firstname') person.firstName = values[index];
              else if (key === 'lastname') person.lastName = values[index];
              else if (key === 'email') person.email = values[index];
              else if (key === 'role') person.role = values[index];
              else if (key === 'department') person.department = values[index];
              else if (key === 'hiringstatus') person.hiringStatus = values[index];
              else if (key === 'startdate') person.startDate = values[index];
              else if (key === 'manager') person.manager = values[index];
            }
          });
          
          return person;
        });
        
        setPeople([...people, ...newPeople as Person[]]);
      }
      
      setImportText('');
      setIsImporting(false);
    } catch (error) {
      alert('Import işlemi sırasında bir hata oluştu. Lütfen formatı kontrol edin.');
      console.error('Import error:', error);
    }
  };

  // Kişi silme
  const handleDeletePerson = (id: string) => {
    if (confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
      setPeople(people.filter(person => person.id !== id));
    }
  };

  // Departman renkleri
  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Engineering': 'bg-cyan-100 text-cyan-800',
      'Product': 'bg-green-100 text-green-800',
      'Marketing': 'bg-yellow-100 text-yellow-800',
      'Sales': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-red-100 text-red-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Operations': 'bg-indigo-100 text-indigo-800',
      'Customer Support': 'bg-teal-100 text-teal-800',
    };
    
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  // Hiring status renkleri
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'hiring': 'bg-yellow-100 text-yellow-800',
      'inactive': 'bg-gray-100 text-gray-800',
    };
    
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-white border-b">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">People Management</h1>
            <p className="text-gray-500">Add, import, and manage people in your organization</p>
          </div>
          
          {/* Import ve Add butonları */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsImporting(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
              Import People
            </button>
            <button
              onClick={() => setIsAddingPerson(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Person
            </button>
          </div>
        </div>
      </div>
      
      {/* Import Modal */}
      {isImporting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Import People</h2>
              <button onClick={() => setIsImporting(false)} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Paste CSV or JSON data below. CSV format should have headers: FirstName, LastName, Email, Role, Department, HiringStatus, StartDate, Manager
              </p>
              <textarea
                className="w-full h-64 border border-gray-300 rounded-md shadow-sm p-2 text-sm font-mono"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste CSV or JSON data here..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsImporting(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Person Modal */}
      {isAddingPerson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Person</h2>
              <button onClick={() => setIsAddingPerson(false)} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.firstName}
                  onChange={(e) => setNewPerson({...newPerson, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.lastName}
                  onChange={(e) => setNewPerson({...newPerson, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.email}
                  onChange={(e) => setNewPerson({...newPerson, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.role}
                  onChange={(e) => setNewPerson({...newPerson, role: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.department}
                  onChange={(e) => setNewPerson({...newPerson, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  <option value="Executive">Executive</option>
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Status</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.hiringStatus}
                  onChange={(e) => setNewPerson({...newPerson, hiringStatus: e.target.value as 'active' | 'hiring' | 'inactive'})}
                >
                  <option value="active">Active</option>
                  <option value="hiring">Hiring</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.startDate}
                  onChange={(e) => setNewPerson({...newPerson, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newPerson.manager || ''}
                  onChange={(e) => setNewPerson({...newPerson, manager: e.target.value || undefined})}
                >
                  <option value="">No Manager</option>
                  {people.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.firstName} {person.lastName} - {person.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingPerson(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPerson}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Person
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* People Table */}
      <div className="flex-grow p-4 overflow-auto">
        <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-medium text-gray-600">
                          {person.firstName.charAt(0)}{person.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</div>
                        <div className="text-sm text-gray-500">{person.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{person.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDepartmentColor(person.department)}`}>
                      {person.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(person.hiringStatus)}`}>
                      {person.hiringStatus.charAt(0).toUpperCase() + person.hiringStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(person.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.manager ? people.find(p => p.id === person.manager)?.firstName + ' ' + people.find(p => p.id === person.manager)?.lastName : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeletePerson(person.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
