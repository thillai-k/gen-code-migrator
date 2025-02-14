import React from "react";

export default function InputField({ label, name, register, errors }) {
  return (
    <div className="mb-3">
      <label className="d-block text-light fw-bold">{label}</label>
      <input type="text" className="form-control" {...(register && register(name))} />
      {errors?.[name] && <small className="text-danger">{errors[name].message}</small>}
    </div>
  );
}