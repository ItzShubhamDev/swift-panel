"use client";

import dynamic from "next/dynamic";
const Terminal = dynamic(() => import('@/components/server/console/Terminal'), { ssr: false });
import { useState } from 'react';
import { TerminalIcon, Play, Square, RotateCcw } from 'lucide-react';

export default function Page() {
    const [consoleOutput, setConsoleOutput] = useState([
        'Server started on port 25565',
        'Loading world data...',
        'World loaded successfully',
        'Player "Steve" joined the game'
    ]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <TerminalIcon className="h-5 w-5 text-emerald-500" />
                            Console
                        </h2>
                        <div className="flex gap-2">
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Play className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <Square className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <RotateCcw className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-96 p-4">
                    <Terminal data={consoleOutput} />
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a command..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}