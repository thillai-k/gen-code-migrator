import React from "react";

export default function SelectFieldRepository({ label, name, register, options,onChange }) {
  return (
    <div>
      <label className="block text-dark w-bold">{label}</label>
      <select {...register(name)} onChange={onChange} className="form-select">
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}