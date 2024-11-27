"use client";

import Modal from "@/components/Modal";
import { createNewFolder } from "@/lib/wings/server_files";
import { FilePlus, FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNew({
  type,
  path,
}: {
  type: "file" | "folder";
  path: string;
}) {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  function newFile() {
    if (type === "file") {
      router.push(`/server/1/files/new/${path}`);
    } else {
      setModalOpen(true);
    }
  }

  async function create() {
    const r = await createNewFolder(
      "4a7b9654-edde-416c-a3fc-dec58199f203",
      path,
      name
    );
    if (r.error) {
      console.error(r.error);
      alert("An error occurred while creating the folder");
    } else {
      setModalOpen(false);
      setName("");
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={newFile}
        className="px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
      >
        {type === "file" ? (
          <FilePlus className="h-5 w-5" />
        ) : (
          <FolderPlus className="h-5 w-5" />
        )}
        {type === "file" ? "New File" : "New Folder"}
      </button>
      <Modal
        title={`New ${type}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={create}
      >
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </Modal>
    </>
  );
}
