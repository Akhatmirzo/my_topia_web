import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function Loading({ screen }) {
  return (
    <div
      style={screen ? { height: "100vh" } : {}}
      className="w-full h-full absolute top-0 left-0 flex items-center justify-center dark:bg-[#374151] bg-slate-200 z-[99999999]"
    >
      <PuffLoader color="#fff" className="text-white" size={120} />
    </div>
  );
}
