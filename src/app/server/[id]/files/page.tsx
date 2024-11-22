"use client"

import { useState } from 'react';
import { HardDrive, File, Folder, Upload, Download, Trash2, Plus, FolderPlus } from 'lucide-react';

export default function Page() {
  const [files] = useState([
    { name: 'server.properties', type: 'file', size: '1.2 KB', modified: '2024-03-15 14:30' },
    { name: 'world', type: 'folder', size: '1.8 GB', modified: '2024-03-15 10:15' },
    { name: 'plugins', type: 'folder', size: '166 MB', modified: '2024-03-14 23:45' },
    { name: 'logs', type: 'folder', size: '45 MB', modified: '2024-03-15 15:00' },
    { name: 'banned-players.json', type: 'file', size: '2.4 KB', modified: '2024-03-15 12:20' }
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-emerald-500" />
              File Manager
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </button>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <FolderPlus className="h-4 w-4" />
                New Folder
              </button>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New File
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="font-medium">/home/container/</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {file.type === 'folder' ? (
                        <Folder className="h-5 w-5 text-gray-400" />
                      ) : (
                        <File className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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