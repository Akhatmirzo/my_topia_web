import React from "react";

export default function Skeleton({ width, height }) {
  return (
    <div
      style={{ width: width, height: height }}
      className="w-full h-full overflow-hidden shadow-lg bg-gray-300 animate-pulse"
    ></div>
  );
}
