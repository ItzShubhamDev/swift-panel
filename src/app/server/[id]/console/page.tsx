"use client";

import Terminal from "@/components/server/console/Terminal";
import {
  TerminalIcon,
  Play,
  Square,
  RotateCcw,
  Cpu,
  MemoryStick,
  HardDrive,
  PowerOff,
  Clock,
  ArrowDown,
  ArrowUp,
  ArrowDownUp,
} from "lucide-react";
import StatCard from "@/components/server/console/StatCard";
import { useEffect, useState } from "react";
import { signToken } from "@/lib/wings/jwt";
import Convert from "ansi-to-html";
import { formatBytes, formatDuration } from "@/lib/functions";

export default function Page() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    uptime: 0,
    network_rx: 0,
    network_tx: 0,
  });
  const [token, setToken] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [serverState, setServerState] = useState<
    "running" | "stopping" | "offline" | "starting"
  >("offline");
  const ansi = new Convert();

  useEffect(() => {
    signToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://localhost:8080/api/servers/4a7b9654-edde-416c-a3fc-dec58199f203/ws"
    );
    setWs(ws);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "auth",
          args: [token],
        })
      );
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.event === "console output") {
        for (const line of data.args) {
          setHistory((prev) => [...prev, ansi.toHtml(line)]);
        }
      } else if (data.event === "auth success") {
        ws.send(
          JSON.stringify({
            event: "send logs",
            args: [],
          })
        );
      } else if (data.event === "stats") {
        const {
          cpu_absolute,
          disk_bytes,
          memory_bytes,
          state,
          network,
          uptime,
        } = JSON.parse(data.args[0]);
        console.log(data.args[0]);
        console.log(network);
        setServerState(state);
        setStats({
          cpu: cpu_absolute,
          memory: formatBytes(memory_bytes, "MB"),
          disk: formatBytes(disk_bytes, "MB"),
          uptime: uptime,
          network_rx: network.rx_bytes,
          network_tx: network.tx_bytes,
        });
      } else {
        console.log(data);
      }
    };
    ws.onerror = (e) => {
      console.log(e);
    };
  }, [token]);

  const sendCommand = (command: string) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          event: "send command",
          args: [command],
        })
      );
    }
  };

  const sendState = (state: "start" | "stop" | "restart" | "kill") => {
    if (ws) {
      ws.send(
        JSON.stringify({
          event: "set state",
          args: [state],
        })
      );
    }
  };

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
              {serverState === "offline" ? (
                <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  onClick={() => sendState("start")}
                >
                  <Play className="h-5 w-5" />
                </button>
              ) : (
                <button
                  className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg disabled:opacity-50"
                  disabled={
                    serverState == "starting" || serverState == "stopping"
                  }
                  onClick={() => sendState("stop")}
                >
                  <Square className="h-5 w-5" />
                </button>
              )}
              <button
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                disabled={
                  serverState == "starting" || serverState == "stopping"
                }
                onClick={() => sendState("restart")}
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => sendState("kill")}
              >
                <PowerOff className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex p-2 space-x-2">
          <div className="flex flex-col min-w-80 space-y-2">
            <StatCard
              icon={<Cpu size={40} className="text-orange-600" />}
              title="CPU Usage"
              usage={stats.cpu}
              total={100}
              unit="%"
            />
            <StatCard
              icon={<MemoryStick size={40} className="text-yellow-500" />}
              title="Memory"
              usage={stats.memory}
              total={2048}
              unit="MB"
            />
            <StatCard
              icon={<HardDrive size={40} className="text-blue-500" />}
              title="Disk"
              usage={stats.disk}
              total={5120}
              unit="MB"
            />
            <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 h-24">
              <div className="py-2">
                <Clock size={40} className="text-gray-500" />
              </div>
              <div className="w-full h-full flex flex-col justify-center py-1.5">
                <h3 className="text-gray-400 text-lg flex w-full justify-between items-center">
                  <span>Uptime</span>
                  <span className="text-base">
                    {formatDuration(stats.uptime)}
                  </span>
                </h3>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 h-24">
              <div className="py-2">
                <ArrowDownUp size={40} className="text-green-600" />
              </div>
              <div className="w-full h-full flex flex-col justify-center py-1.5">
                <h3 className="text-gray-400 text-lg flex w-full justify-between items-center">
                  <span>Network</span>
                  <div className="text-base h-12 text-wrap flex flex-col">
                    <span className="flex">
                      {formatBytes(stats.network_rx, "KB")} KB <ArrowDown />/
                    </span>
                    <span className="flex">
                      {formatBytes(stats.network_tx, "KB")} KB <ArrowUp />
                    </span>
                    <br />
                  </div>
                </h3>
              </div>
            </div>
          </div>
          <Terminal history={history} sendCommand={sendCommand} />
        </div>
      </div>
    </div>
  );
}
