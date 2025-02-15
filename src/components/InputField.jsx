import React from "react";

export default function InputField({ label, name, register, errors, sourceRepo = false }) {
  return (
    <div className="mb-3">
      <label className="d-block text-dark fw-bold">{label}</label>
      <input type="text" className="form-control" {...(register && register(name))} disabled={sourceRepo} />
      {errors?.[name] && <small className="text-danger">{errors[name].message}</small>}
    </div>
  );
}