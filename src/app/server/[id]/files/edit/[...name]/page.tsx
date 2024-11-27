"use client";

import { getFile } from "@/lib/wings/server_files";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(
  () => import("@/components/server/files/CodeEditor"),
  { ssr: false }
);

export default function Page({
  params,
}: {
  params: Promise<{ name: string[] }>;
}) {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>();

  useEffect(() => {
    params.then(({ name }) => {
      setName(name ? name.join("/") : "");
    });
  }, [params]);

  useEffect(() => {
    if (!name || name.length == 0) return;
    getFile("4a7b9654-edde-416c-a3fc-dec58199f203", name).then((data) => {
      setContent(data);
    });
  }, [name]);

  const handleChange = (value?: string) => {
    console.log(value);
  };

  return (
    <>
      {name && name.length > 0 && (
        <CodeEditor
          value={content}
          filename={name.split("/").pop()!}
          onChange={handleChange}
        />
      )}
    </>
  );
}
