"use client";

import Editor from "@monaco-editor/react";
import { languages, type editor as IEditor } from "monaco-editor";
import { useEffect, useState } from "react";

type Monaco =
  typeof import("e:/Projects/swiftpanel/node_modules/monaco-editor/esm/vs/editor/editor.api");

export default function CodeEditor({
  value,
  filename,
  onChange,
  language,
}: {
  value: string;
  filename: string;
  onChange: (value?: string) => void;
  language?: string;
}) {
  const [editor, setEditor] = useState<IEditor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();

  const handleEditorDidMount = (
    editor: IEditor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    monaco.editor.defineTheme("dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#111827",
      },
    });
    monaco.editor.setTheme("dark");
    const model = monaco.editor.createModel(
      value,
      undefined,
      monaco.Uri.file(filename)
    );
    editor.setModel(model);
    setEditor(editor);
    setMonaco(monaco);
  };

  useEffect(() => {
    if (!editor || !monaco) return;
    monaco.editor.setModelLanguage(editor.getModel()!, language || "plaintext");
  }, [language]);
  return (
    <div className="w-full h-full">
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={value}
        onMount={handleEditorDidMount}
        onChange={onChange}
      />
    </div>
  );
}
