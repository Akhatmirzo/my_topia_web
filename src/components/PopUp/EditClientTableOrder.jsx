import React, { useMemo } from "react";

export default function EditClientTableOrder({ table, setTable }) {
  const positionStyle = useMemo(() => {
    if (table) {
      if (table.order.length > 0) {
        return { right: 0 };
      } else {
        return { right: "-100%" };
      }
    } else {
      return { right: "-100%" };
    }
  }, [table]);

  return (
    <div
      className="w-full h-screen flex justify-end absolute top-0 -right-[100%] transition-all duration-300"
      style={positionStyle}
      onClick={() => {
        setTable(null);
      }}
    >
      <div
        className="w-1/2 h-full bg-rose-700"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}
