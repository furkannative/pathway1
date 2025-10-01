const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Create a new workbook
const wb = XLSX.utils.book_new();

// Sample data with headers
const data = [
  {
    Name: 'John Doe',
    Title: 'CEO',
    Manager: '',
    Department: 'Executive',
    Location: 'New York',
    Email: 'john.doe@company.com'
  },
  {
    Name: 'Jane Smith',
    Title: 'CTO',
    Manager: 'John Doe',
    Department: 'Technology',
    Location: 'San Francisco',
    Email: 'jane.smith@company.com'
  },
  {
    Name: 'Mike Johnson',
    Title: 'CFO',
    Manager: 'John Doe',
    Department: 'Finance',
    Location: 'Chicago',
    Email: 'mike.johnson@company.com'
  },
  {
    Name: 'Sarah Williams',
    Title: 'Software Engineer',
    Manager: 'Jane Smith',
    Department: 'Technology',
    Location: 'San Francisco',
    Email: 'sarah.williams@company.com'
  },
  {
    Name: 'David Brown',
    Title: 'Financial Analyst',
    Manager: 'Mike Johnson',
    Department: 'Finance',
    Location: 'Chicago',
    Email: 'david.brown@company.com'
  }
];

// Convert data to worksheet
const ws = XLSX.utils.json_to_sheet(data);

// Set column widths
const colWidths = [
  { wch: 20 }, // Name
  { wch: 20 }, // Title
  { wch: 20 }, // Manager
  { wch: 15 }, // Department
  { wch: 15 }, // Location
  { wch: 25 }  // Email
];

ws['!cols'] = colWidths;

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, "Employees");

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write to file
const filePath = path.join(publicDir, 'org_chart_template.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`Template created at: ${filePath}`);
