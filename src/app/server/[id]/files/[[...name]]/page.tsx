"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HardDrive,
  Folder,
  Upload,
  Download,
  Trash2,
  Plus,
  FolderPlus,
} from "lucide-react";
import { getFiles } from "@/lib/wings/server_files";
import FileIcon from "@/components/server/files/Icon";
import LastSeen from "@/components/server/files/LastSeen";
import Link from "next/link";
import { FileData, FileObject } from "@/lib/types";
import { fileDataToFileObject } from "@/lib/transformers";
import CreateNew from "@/components/server/files/CreateNew";

export default function Page({
  params,
}: {
  params: Promise<{ name: string[] }>;
}) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [name, setName] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    getFiles("4a7b9654-edde-416c-a3fc-dec58199f203", "/" + name.join("/")).then(
      (data) => {
        const files = data.map((file: FileData) => fileDataToFileObject(file));
        setFiles(files);
      }
    );
  }, [name]);

  useEffect(() => {
    params.then(({ name }) => {
      setName(name ? name : []);
    });
  }, [params]);

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
              <CreateNew type="folder" path={name.join("/")} />
              <CreateNew type="file" path={name.join("/")} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="font-medium">
              / home /<Link href={"/server/1/files"}>container</Link>
              {name.map((n, i) => (
                <Link
                  key={i}
                  href={`/server/1/files/${name.slice(0, i + 1).join("/")}`}
                >
                  {` / ${n}`}
                </Link>
              ))}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {files.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-8 bg-gray-50">
                <div className="col-span-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </div>
                <div className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </div>
              </div>
              <div className="divide-y divide-gray-200 bg-white">
                {files
                  .filter((x) => !x.isFile)
                  .map((dir, index) => (
                    <Link
                      key={index}
                      className="grid grid-cols-8 items-center hover:bg-gray-50 cursor-pointer"
                      href={`${pathname}/${dir.name}`}
                    >
                      <div className="col-span-4 px-6 py-4 flex items-center whitespace-nowrap w-1/2">
                        <Folder className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-900">
                          {dir.name}
                        </span>
                      </div>
                      <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap" />
                      <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <LastSeen date={new Date(dir.modifiedAt)} />
                      </div>
                      <div className="px-6 py-4 flex justify-end gap-2 whitespace-nowrap">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Link>
                  ))}
                {files
                  .filter((x) => x.isFile)
                  .map((file, index) => (
                    <div key={index} className="w-full hover:bg-gray-50">
                      <Link
                        href={
                          file.isEditable()
                            ? `${pathname.replace("files", "files/edit")}/${
                                file.name
                              }`
                            : `#`
                        }
                        className={
                          "grid grid-cols-8 items-center " +
                          `${
                            !file.isEditable()
                              ? "cursor-default pointer-events-none"
                              : ""
                          }`
                        }
                        aria-disabled={!file.isEditable()}
                        tabIndex={!file.isEditable() ? -1 : undefined}
                      >
                        <div className="col-span-4 px-6 py-4 flex items-center whitespace-nowrap w-1/2">
                          <FileIcon filename={file.name} className="h-5 w-5" />
                          <span className="ml-2 text-sm text-gray-900">
                            {file.name}
                          </span>
                        </div>
                        <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatBytesString(file.size)}
                        </div>
                        <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <LastSeen date={new Date(file.modifiedAt)} />
                        </div>
                        <div className="px-6 py-4 flex justify-end gap-2 whitespace-nowrap">
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No files found</div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatBytesString(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  if (bytes < 0) bytes = -bytes;
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  while (bytes >= 1024) {
    i++;
    bytes /= 1024;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}
