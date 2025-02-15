import React, { useState } from "react";

export default function FileUploader({ onFileUpload }) {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => onFileUpload(e.target.result, file);
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => onFileUpload(e.target.result, file);
      reader.readAsText(file);
    }
  };

  return (
    <div
      className=""
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" className="form-control mb-2 mt-0" accept=".txt,.js,.py,.java,.php,.r,.go" onChange={handleFileUpload} />
      {fileName && <small className="text-black d-block mb-2">Uploaded: {fileName}</small>}
    </div>
  );
}
