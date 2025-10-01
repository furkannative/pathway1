'use client';

import { useRouter } from 'next/navigation';

interface Chart {
  id: string;
  name: string;
  updatedAt: string;
  employeeCount: number;
}

export default function RecentCharts() {
  const router = useRouter();
  // Bu kısım daha sonra API'den gelecek
  const recentCharts: Chart[] = [
    {
      id: '1',
      name: 'Main Organization',
      updatedAt: '2024-02-23',
      employeeCount: 150
    },
    {
      id: '2',
      name: 'IT Department',
      updatedAt: '2024-02-22',
      employeeCount: 45
    }
  ];

  if (recentCharts.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent org charts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentCharts.map((chart) => (
          <div
            key={chart.id}
            onClick={() => router.push(`/org-chart/${chart.id}`)}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 cursor-pointer transition-colors"
          >
            <h3 className="font-medium text-gray-900">{chart.name}</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>Last updated: {new Date(chart.updatedAt).toLocaleDateString()}</p>
              <p>{chart.employeeCount} employees</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
