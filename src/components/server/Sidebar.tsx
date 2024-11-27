import {
  Terminal,
  Server,
  HardDrive,
  Network,
  Users,
  Archive,
  Settings,
  Map,
  Database,
  UserCog,
  Box,
  Egg,
  Play,
  Folder,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Item from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="h-8 w-8 text-emerald-400" />
          <span>Swift Panel</span>
        </h1>
      </div>

      <nav className="mt-8">
        <Item
          href="/server/1/console"
          name="Console"
          icon={<Terminal className="h-5 w-5" />}
        />
        <Item
          href="/server/1/files"
          name="Files"
          icon={<Folder className="h-5 w-5" />}
        />
        <Item
          href="/server/1/databases"
          name="Databases"
          icon={<Database className="h-5 w-5" />}
        />
        <Item
          href="/server/1/backups"
          name="Backups"
          icon={<Archive className="h-5 w-5" />}
        />
        <Item
          href="/server/1/network"
          name="Network"
          icon={<Network className="h-5 w-5" />}
        />
        <Item
          href="/server/1/schedules"
          name="Schedules"
          icon={<Calendar className="h-5 w-5" />}
        />
        <Item
          href="/server/1/users"
          name="Users"
          icon={<Users className="h-5 w-5" />}
        />
        <Item
          href="/server/1/startup"
          name="Startup"
          icon={<Play className="h-5 w-5" />}
        />
        <Item
          href="/server/1/settings"
          name="Settings"
          icon={<Settings className="h-5 w-5" />}
        />
        <Item
          href="/server/1/activity"
          name="Activity"
          icon={<Eye className="h-5 w-5" />}
        />
        {/* <Item href="/admin/locations" name="Locations" icon={<Map className="h-5 w-5" />} />
                <Item href="/admin/nodes" name="Nodes" icon={<Database className="h-5 w-5" />} />
                <Item href="/admin/servers" name="Servers" icon={<Server className="h-5 w-5" />} />
                <Item href="/admin/users" name="Users" icon={<UserCog className="h-5 w-5" />} />
                <Item href="/admin/nests" name="Nests" icon={<Box className="h-5 w-5" />} />
                <Item href="/admin/eggs" name="Eggs" icon={<Egg className="h-5 w-5" />} /> */}
      </nav>
    </aside>
  );
}
