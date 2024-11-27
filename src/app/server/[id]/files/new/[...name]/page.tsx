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
  const [name, setName] = useState<string>("");

  useEffect(() => {
    params.then(({ name }) => {
      setName(name ? name.join("/") : "");
    });
  }, [params]);

  return (
    <>
      {name && name.length > 0 && (
        <CodeEditor value="" filename={name.split("/").pop()!} />
      )}
    </>
  );
}
