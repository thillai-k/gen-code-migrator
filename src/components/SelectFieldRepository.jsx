import React from "react";

export default function SelectFieldRepository({ label, name, register, options }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select {...register(name)} className="w-full border rounded-md p-2">
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}