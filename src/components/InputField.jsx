import React from "react";

export default function InputField({ label, name, register, errors }) {
  return (
    <div className="connector-options-box">
      <input type="text" className="form-control  options-select" {...(register && register(name))} />
      {errors?.[name] && <small className="text-danger">{errors[name].message}</small>}
    </div>
  );
}