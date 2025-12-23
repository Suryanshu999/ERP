import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-5 py-2 rounded-lg font-semibold transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
