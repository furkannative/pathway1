import { create } from 'zustand';
import * as XLSX from 'xlsx';

interface Person {
  id: string;
  name: string;
  title: string;
  email?: string;
  department?: string;
  location?: string;
  managerId?: string;
  isHiring?: boolean;
  manager?: Person;
  employees?: Person[];
}

interface PeopleStore {
  people: Person[];
  uploadExcel: (file: File) => Promise<void>;
  getPeople: () => void;
  addPerson: (person: Omit<Person, 'id'>) => void;
  updatePerson: (id: string, updates: Partial<Person>) => void;
  deletePerson: (id: string) => void;
}

// Benzersiz ID oluşturmak için yardımcı fonksiyon
const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Örnek veri
const sampleData: Person[] = [
  {
    id: 'ceo1',
    name: 'John Smith',
    title: 'CEO',
    email: 'john@example.com',
    department: 'Executive',
    location: 'New York',
    employees: []
  },
  {
    id: 'cto1',
    name: 'Emily Johnson',
    title: 'CTO',
    email: 'emily@example.com',
    department: 'Technology',
    location: 'San Francisco',
    managerId: 'ceo1',
    employees: []
  },
  {
    id: 'cfo1',
    name: 'Michael Brown',
    title: 'CFO',
    email: 'michael@example.com',
    department: 'Finance',
    location: 'Chicago',
    managerId: 'ceo1',
    employees: []
  }
];

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  people: [],

  getPeople: () => {
    try {
      const storedPeople = localStorage.getItem('orgChartPeople');
      if (storedPeople) {
        const parsedPeople = JSON.parse(storedPeople);
        set({ people: parsedPeople });
      } else {
        // Eğer localStorage'da veri yoksa, örnek veriyi kullan
        localStorage.setItem('orgChartPeople', JSON.stringify(sampleData));
        set({ people: sampleData });
      }
    } catch (error) {
      console.error('Error fetching people from localStorage:', error);
      // Hata durumunda örnek veriyi kullan
      set({ people: sampleData });
    }
  },

  uploadExcel: async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      // Tüm çalışanları oluştur (yönetici ilişkileri olmadan)
      const employeesMap = new Map<string, Person>();
      const employees: Person[] = [];

      // İlk geçiş: Tüm çalışanları oluştur
      jsonData.forEach((row) => {
        const employee: Person = {
          id: generateId(),
          name: row.Name || row.name || '',
          title: row.Title || row.title || '',
          email: row.Email || row.email,
          department: row.Department || row.department,
          location: row.Location || row.location,
          employees: []
        };
        employeesMap.set(employee.name, employee);
        employees.push(employee);
      });

      // İkinci geçiş: Yönetici ilişkilerini kur
      employees.forEach((employee) => {
        const rowData = jsonData.find(
          (row) => (row.Name || row.name) === employee.name
        );
        if (rowData) {
          const managerName = rowData.Manager || rowData.manager;
          if (managerName && employeesMap.has(managerName)) {
            const manager = employeesMap.get(managerName)!;
            employee.managerId = manager.id;
            employee.manager = manager;
            
            // Yöneticinin employees dizisine bu çalışanı ekle
            if (!manager.employees) {
              manager.employees = [];
            }
            manager.employees.push(employee);
          }
        }
      });

      // Üçüncü geçiş: Hiring pozisyonları ekle
      // Teknoloji departmanı için DevOps Engineer pozisyonu
      const techManager = employees.find(emp => emp.department === 'Technology' && !emp.managerId);
      if (techManager) {
        const hiringPosition: Person = {
          id: generateId(),
          name: 'Hiring',
          title: 'DevOps Engineer',
          department: 'Technology',
          location: techManager.location,
          managerId: techManager.id,
          manager: techManager,
          isHiring: true
        };
        employees.push(hiringPosition);
        
        if (!techManager.employees) {
          techManager.employees = [];
        }
        techManager.employees.push(hiringPosition);
      }

      // Finans departmanı için Financial Controller pozisyonu
      const financeManager = employees.find(emp => emp.department === 'Finance' && !emp.managerId);
      if (financeManager) {
        const hiringPosition: Person = {
          id: generateId(),
          name: 'Hiring',
          title: 'Financial Controller',
          department: 'Finance',
          location: financeManager.location,
          managerId: financeManager.id,
          manager: financeManager,
          isHiring: true
        };
        employees.push(hiringPosition);
        
        if (!financeManager.employees) {
          financeManager.employees = [];
        }
        financeManager.employees.push(hiringPosition);
      }

      // Verileri sakla
      set({ people: employees });
      
      // Verileri localStorage'a kaydet
      localStorage.setItem('orgChartPeople', JSON.stringify(employees));
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  addPerson: (person) => {
    const newPerson: Person = {
      ...person,
      id: generateId(),
      employees: []
    };
    
    set(state => {
      const updatedPeople = [...state.people, newPerson];
      
      // Eğer yönetici belirtilmişse, yöneticinin employees dizisine ekle
      if (newPerson.managerId) {
        const manager = updatedPeople.find(p => p.id === newPerson.managerId);
        if (manager) {
          if (!manager.employees) {
            manager.employees = [];
          }
          manager.employees.push(newPerson);
        }
      }
      
      // localStorage'a kaydet
      localStorage.setItem('orgChartPeople', JSON.stringify(updatedPeople));
      
      return { people: updatedPeople };
    });
  },

  updatePerson: (id, updates) => {
    set(state => {
      const updatedPeople = state.people.map(person => {
        if (person.id === id) {
          return { ...person, ...updates };
        }
        return person;
      });
      
      // localStorage'a kaydet
      localStorage.setItem('orgChartPeople', JSON.stringify(updatedPeople));
      
      return { people: updatedPeople };
    });
  },

  deletePerson: (id) => {
    set(state => {
      // Silinecek kişiyi bul
      const personToDelete = state.people.find(p => p.id === id);
      
      if (!personToDelete) {
        return state;
      }
      
      // Bu kişinin altındaki çalışanları yöneticisine bağla
      const updatedPeople = state.people.map(person => {
        if (person.managerId === id) {
          return {
            ...person,
            managerId: personToDelete.managerId
          };
        }
        return person;
      });
      
      // Kişiyi listeden çıkar
      const filteredPeople = updatedPeople.filter(p => p.id !== id);
      
      // localStorage'a kaydet
      localStorage.setItem('orgChartPeople', JSON.stringify(filteredPeople));
      
      return { people: filteredPeople };
    });
  }
}));
