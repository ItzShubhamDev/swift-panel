"use client";

import { getFile } from "@/lib/wings/server_files";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(
  () => import("@/components/server/files/CodeEditor"),
  { ssr: false }
);
import languages from "@/components/server/files/languages";
import { Language } from "@/lib/types";

export default function Page({
  params,
}: {
  params: Promise<{ name: string[] }>;
}) {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<string>("plaintext");

  const handleChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        {languages.map((lang: Language, i) => (
          <option key={i} value={lang.id}>
            {lang.aliases[0]}
          </option>
        ))}
      </select>
      <CodeEditor
        value=""
        filename=""
        onChange={handleChange}
        language={language}
      />
    </div>
  );
}
