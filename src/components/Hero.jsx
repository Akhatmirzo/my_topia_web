import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex flex-col items-center p-[12px_42px]">
        <div className="flex flex-col items-start">
          <div className="text-[18px] text-[#000] font-[500]">
            What’s on your <span className="text-[#FDBF48]">mind?</span>
          </div>
          <div className="text-[18px] text-[#000] font-[500] pl-[44px]">
            Nimalarni <span className="text-[#FDBF48]">xayol</span> qilyapsiz?
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-x-[30px] gap-y-[10px] grid-rows-[auto] pt-[15px] m-[0_10px]">
          <Link to="/burger" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-burger-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Burger
            </div>
          </Link>
          <Link to="/pizza" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-pizza-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Pitsa
            </div>
          </Link>
          <Link to="/doner" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-doner-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Donar
            </div>
          </Link>
          <Link
            to="/chicken"
            className="flex flex-col items-center text-center"
          >
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-chicken-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Tovuqli
            </div>
          </Link>
          <Link
            to="/lunchbox"
            className="flex flex-col items-center text-center"
          >
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-lunchbox-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Lunchbox
            </div>
          </Link>
          <Link to="/drinks" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-drinks-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Ichimliklar
            </div>
          </Link>
          <Link to="/sweets" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-sweets-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Shirinliklar
            </div>
          </Link>
          <Link to="/salats" className="flex flex-col items-center text-center">
            <div className="w-[110px] h-[110px] border-[2px] border-[#FDBF48] rounded-[100%] shadow-class bg-salats-pattern bg-cover bg-center"></div>
            <div className="text-[14px] font-[500] text-[#000] leading-[normal] pt-[5px]">
              Salat
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
