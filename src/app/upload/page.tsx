'use client';

import { useState, useRef } from 'react';
import { usePeopleStore } from '@/store/peopleStore';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadExcel = usePeopleStore(state => state.uploadExcel);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setError('');
    setSuccess(false);
    setIsUploading(true);
    
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload an Excel file (.xlsx, .xls) or CSV file');
      setIsUploading(false);
      return;
    }

    setFileName(file.name);
    try {
      await uploadExcel(file);
      setSuccess(true);
      setTimeout(() => {
        router.push('/directory');
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/org_chart_template.xlsx';
    link.download = 'org_chart_template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Upload Your Organization Data</h1>
          <p className="text-gray-600">
            Import your organization's data using an Excel or CSV file. Make sure your file includes employee names, titles, and reporting relationships.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {success ? (
              <div className="text-green-600 font-medium mb-2">
                <p className="text-lg">File uploaded successfully!</p>
                <p className="text-sm mt-2">Redirecting to directory...</p>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">
                  {fileName ? `Selected: ${fileName}` : 'Drag and drop your file here'}
                </p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Browse Files'}
                </button>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </div>

          {error && (
            <div className="text-red-500 mt-2">{error}</div>
          )}

          <div className="mt-8 text-left">
            <h3 className="font-medium mb-2">File Requirements:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Excel (.xlsx, .xls) or CSV format</li>
              <li>Required columns: Name, Title, Manager</li>
              <li>Optional columns: Department, Location, Email</li>
              <li>First row should be column headers</li>
            </ul>
          </div>
        </div>

        {/* Template Download */}
        <div className="mt-8">
          <h3 className="font-medium mb-4">Need help getting started?</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Download Template</p>
                <p className="text-sm text-gray-500">Use our pre-formatted Excel template</p>
              </div>
              <button 
                className="text-blue-500 hover:text-blue-600"
                onClick={handleDownloadTemplate}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
