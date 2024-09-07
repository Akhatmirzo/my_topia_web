import React from "react";

export default function PopUpInput({ value, type, placeholder, required, fn }) {
  return (
    <input {...fn} className="w-full h-[35px] text-xl dark:text-white font-mono bg-transparent outline outline-1 outline-gray-400 focus:ring-gray-400" type={type || "text"} placeholder={placeholder} required={required || false} defaultValue={value} />
  );
}
