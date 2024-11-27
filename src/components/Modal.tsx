"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Modal({
  children,
  title,
  open,
  onClose,
  onConfirm,
}: {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <dialog className="fixed inset-0 z-50 bg-black bg-opacity-50" open={open}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button onClick={onClose} className="text-gray-500">
              <X className="h-5 w-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
