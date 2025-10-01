'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePeopleStore } from '@/store/peopleStore';

interface Template {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
  levels: number;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadExcel = usePeopleStore(state => state.uploadExcel);

  // Bu kısım daha sonra API'den gelecek
  const templates: Template[] = [
    {
      id: 'small',
      name: 'Small Business',
      description: 'Perfect for startups and small teams',
      employeeCount: 10,
      levels: 2
    },
    {
      id: 'medium',
      name: 'Mid-size Company',
      description: 'Ideal for growing companies',
      employeeCount: 50,
      levels: 3
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Suitable for large organizations',
      employeeCount: 200,
      levels: 4
    }
  ];

  if (!isOpen) return null;

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/org-chart/new?template=${templateId}`);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadExcel(file);
        router.push('/org-chart/new');
        onClose();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Choose a template</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
              >
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>{template.employeeCount} employees</p>
                  <p>{template.levels} organizational levels</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-2">Upload your own data</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload an Excel file with your organization data to create a custom org chart.
            </p>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="excel-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">XLSX, XLS, or CSV</p>
                </div>
                <input
                  id="excel-upload"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
