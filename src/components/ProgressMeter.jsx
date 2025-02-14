import React from "react";

export default function ProgressMeter({ progress }) {
  return (
    <div className="w-full bg-gray-600 rounded-full h-6 mt-6 relative">
      <div className="bg-green-400 h-6 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black">{progress}%</span>
    </div>
  );
}