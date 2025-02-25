import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = ({ code, setCode }) => {
  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
        padding={10}
        style={{ fontFamily: "'Fira Code', monospace", fontSize: "16px" }}
      />
    </div>
  );
};

export default CodeEditor;
