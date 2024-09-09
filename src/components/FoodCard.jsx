import React from "react";
import { Link } from "react-router-dom";
import staticData from "../store/staticData";

const FoodCard = ({ product }) => {
  const { _id, name, price, options, images } = product;

  return (
    <Link to={_id} className="relative w-min">
      <div className="relative mx-auto z-10 w-[122px] h-[84px] bg-[#98A8B8] rounded-[15px] overflow-hidden">
        <img
          alt={name}
          src={staticData.SERVER_URL + "/" + images[0].path}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="-mt-[40px]">
        <div className="w-[153px] h-[109px] bg-[#fff] border-[1px] border-[#FDBF48] rounded-[20px] p-[0_12px]">
          <div className="w-full pt-[44px] pb-[10px]">
            <div className="text-[15px] text-[#FDBF48] tracking-[-0.333px]">
              {name}
            </div>
            <div className="flex items-center justify-between pt-[4px]">
              <div className="text-[16px] text-[#36B75A] tracking-[-0.333px] font-[400] leading-[normal]">
                {price && <span>{price} so'm</span>}
                {options.length > 0 && <span>{options[0]?.price} so'm</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
