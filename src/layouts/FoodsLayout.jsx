import React from "react";
import { Outlet } from "react-router-dom";

export default function FoodsLayout() {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
}
