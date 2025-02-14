import React from "react";

export default function SelectFieldRepository({ label, name, register, options }) {
  return (
    <div className="mb-3">
      <label className="mb-1">{label}</label>
      <select {...register(name)} className="form-select">
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}