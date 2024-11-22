import React from 'react';
import { Network as NetworkIcon, Plus, Trash2 } from 'lucide-react';

export default function Page() {
  const allocations = [
    { id: 1, ip: '192.168.1.100', port: 25565, notes: 'Main game port', assigned: true },
    { id: 2, ip: '192.168.1.100', port: 25566, notes: 'Query port', assigned: true },
    { id: 3, ip: '192.168.1.100', port: 25567, notes: '', assigned: false },
    { id: 4, ip: '192.168.1.100', port: 25568, notes: '', assigned: false }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <NetworkIcon className="h-5 w-5 text-emerald-500" />
              Network
            </h2>
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Allocation
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.port}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {allocation.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      allocation.assigned 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {allocation.assigned ? 'Assigned' : 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
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