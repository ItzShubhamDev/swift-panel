import Link from "next/link";
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const servers = [
    {
      id: 1,
      name: 'Minecraft SMP',
      status: 'running',
      memory: '2GB / 4GB',
      cpu: '45%',
      storage: '15GB / 50GB',
      uptime: '15d 4h 32m'
    },
    {
      id: 2,
      name: 'Valheim Dedicated',
      status: 'stopped',
      memory: '0GB / 8GB',
      cpu: '0%',
      storage: '25GB / 100GB',
      uptime: '0m'
    },
    {
      id: 3,
      name: 'CS:GO Community',
      status: 'running',
      memory: '6GB / 16GB',
      cpu: '78%',
      storage: '45GB / 100GB',
      uptime: '5d 12h 45m'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Servers</h1>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Server className="h-5 w-5" />
          New Server
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map(server => (
          <Link
            key={server.id}
            href={`/server/${server.id}/console`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${server.status === 'running'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {server.status}
                </span>
              </div>
              <Server className="h-6 w-6 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MemoryStick className="h-4 w-4 mr-2" />
                <span>Memory: {server.memory}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Cpu className="h-4 w-4 mr-2" />
                <span>CPU: {server.cpu}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <HardDrive className="h-4 w-4 mr-2" />
                <span>Storage: {server.storage}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>Uptime: {server.uptime}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">View Console</span>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}