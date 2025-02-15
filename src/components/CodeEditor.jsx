import React from "react";

export default function CodeEditor({ 
  label, 
  name, 
  isSource, 
  code, 
  setCode, 
  language, 
  zipFileUrl, // ✅ New prop for ZIP file download link
  selectedRepo,
  showDownloadBtn
}) {
  const getLanguageLogo = (lang) => {
    const logos = {
      "AWS EMR Pyspark": "/EMR.svg",
      "AWS Glue Pyspark": "/glue.svg",
      "AWS Sagemaker ML Pyspark": "",
      "Text": "",
      "SQL": "/sql-server.png",
      "Databricks Pyspark": "/databricks.png",
      "Databricks ML Pyspark": "/AmazonSageMaker.jpeg",
    };
    return logos[lang] || "/default.png";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadZip = async () => {
    if (!zipFileUrl) {
      alert("No ZIP file available for download.");
      return;
    }

    try {
      const response = await fetch(`https://code-crafter-api-603657590586.us-central1.run.app${zipFileUrl}`);
      console.log(zipFileUrl);
      if (!response.ok) throw new Error(`Failed to download: ${response.statusText}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "code_files.zip"; // ✅ Default ZIP file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading ZIP file:", error);
      alert("Failed to download the ZIP file.");
    }
  };

  return (
    <div className="code-editor-container">
      {!isSource && selectedRepo  !== "Local Repo" && (
        <button type="button" className="btn btn-primary mt-3 mb-4 w-100" onClick={handleCopy}>
          Copy Code
        </button>
      )}
        {selectedRepo && showDownloadBtn && ( // ✅ Show download button only if ZIP file link exists
        <button type="button" className="btn btn-success mt-3 mb-4 w-100" onClick={handleDownloadZip}>
          Download ZIP
        </button>
      )}
      <label className="d-block text-dark fw-bold mb-2">{label}</label>
      <div className="code-editor-header d-flex align-items-center">
        <img src={getLanguageLogo(language)} alt={language} className="language-logo me-2" />
        <span className="language-name">{language}</span>
      </div>
      <textarea
        className="form-control p-3 mb-2"
        name={name}
        rows="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={!isSource} // ✅ Only allow editing for the source code
        disabled={selectedRepo}
      />

    </div>
  );
}
