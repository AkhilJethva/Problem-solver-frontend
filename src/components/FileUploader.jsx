import { useState } from "react";

const FileUploader = ({ onFileRead }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileRead(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".js,.py,.css,.java,.json,.html,.cpp,.ts,.jsx,.tsx,.cs,.c"
        className="text-sm mb-4 text-gray-400 bg-gray-700 rounded-lg cursor-pointer p-2"
      />
      {fileName && <p className="text-xs text-gray-500 mt-1">Uploaded: {fileName}</p>}
    </div>
  );
};

export default FileUploader;
