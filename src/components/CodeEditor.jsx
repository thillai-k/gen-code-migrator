import React from "react";

export default function CodeEditor({ label, name, isSource, code, setCode, language }) {
  const getLanguageLogo = (lang) => {
    const logos = {
      JavaScript: "/logos/js.png",
      Python: "/logos/python.png",
      Java: "/logos/java.png",
      PHP: "/logos/php.png",
      R: "/logos/r.png",
      Go: "/logos/go.png",
    };
    return logos[lang] || "/logos/default.png";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="code-editor-container">
      <label className="d-block text-dark fw-bold mb-2">{label}</label>
      <div className="code-editor-header d-flex align-items-center">
        <img src={getLanguageLogo(language)} alt={language} className="language-logo me-2" />
        <span className="language-name">{language}</span>
      </div>
      <textarea
        className="form-control bg-dark text-white p-3 mb-2"
        name={name}
        rows="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={!isSource} // Only allow editing for the source code
      />
      {!isSource && (
        <button type="button" className="btn btn-primary mt-2" onClick={handleCopy}>
          Copy Code
        </button>
      )}
    </div>
  );
}
