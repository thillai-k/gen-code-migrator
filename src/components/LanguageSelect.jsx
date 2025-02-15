import React from "react";

export default function LanguageSelect({ label, value, onChange, register, errors, name }) {
  const languages = ["None", "AWS EMR Pyspark",
  "AWS Pyspark",
  "AWS Glue Pyspark",
  "AWS Sagemaker ML Pyspark",
  "Text",
  "SQL",
  "Databricks Pyspark",
  "Databricks ML Pyspark"];

  return (
    <div className="mb-3">
      <label className="d-block text-dark fw-bold">{label}</label>
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