import React from "react";

export default function LanguageSelect({ label, value, onChange, register, errors, name }) {
  const languages = ["None", "JavaScript", "Python", "Java", "PHP", "R", "Go"];

  return (
    <div className="mb-3">
      <label className="d-block text-light fw-bold">{label}</label>
      <select
        className="form-select"
        value={value}
        {...(register && register(name, { required: `${label} is required` }))}
        onChange={(e) => onChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang === "None" ? "" : lang}>
            {lang}
          </option>
        ))}
      </select>
      {errors?.[name] && <small className="text-danger">{errors[name].message}</small>}
    </div>
  );
}