import React from "react";
import { Link } from "react-router-dom";
import staticData from "../store/staticData";

export default function CategoryCard({ category }) {
  const {_id, name, image } = category || {};
  return (
    <Link to={`foods/${_id}`} className="flex flex-col items-center text-center">
      <img
        alt={name}
        src={staticData.SERVER_URL+ "/" + image.path}
        loading="lazy"
        className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class"
      />
      <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
        {name}
      </div>
    </Link>
  );
}
