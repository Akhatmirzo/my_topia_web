import React from "react";
import { Outlet } from "react-router-dom";

export default function TableLayouts() {
  return (
    <div>
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
}
