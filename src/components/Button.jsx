import React from "react";

export default function Button({ type, className, children }) {
  return (
    <button type={type} className={`btn ${className}`}>
      {children}
    </button>
  );
}
