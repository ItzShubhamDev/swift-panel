import Editor from "@monaco-editor/react";
import { type editor } from "monaco-editor";

type Monaco =
  typeof import("e:/Projects/swiftpanel/node_modules/monaco-editor/esm/vs/editor/editor.api");

export default function CodeEditor({
  value,
  filename,
}: {
  value: string;
  filename: string;
}) {
  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
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
  };
  return (
    <div className="w-full h-full">
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={value}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
