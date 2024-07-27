import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckConnection() {
  const navigate = useNavigate();

  const reload = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1>Check your internet connection</h1>
      <p>Iltimos MayTopiya WIFI ga ulaning!</p>

      <button
        type="button"
        className="border-2 rounded-lg px-3 py-2"
        onClick={reload}
      >
        Reflesh
      </button>
    </div>
  );
}
