import React from "react";
import { Link, useParams } from "react-router-dom";
import images from "../assets/images";
import { useSelector } from "react-redux";
import { AiOutlineImport } from "react-icons/ai";

const TopNav = () => {
  const { table: tableSL } = useParams();
  const cart = useSelector((state) => state.cart);
  const clientOrder = useSelector((state) => state.clientOrder);

  return (
    <div className="w-full bg-[#fff] p-[0_10px] m-[0_auto] box-shadow-nav">
      <div className="flex items-center justify-between p-[12px_0]">
        <div className="flex items-center gap-[10px]">
          <Link to={tableSL ? "/table/" + tableSL : "/"}>
            <img src={images.Logo} alt="logo" />
          </Link>
          <div className="w-[1px] h-[34px] bg-[#4E4E4E]"></div>
          <div className="flex flex-col items-start">
            <div className="text-[9px] font-[400] text-[#4E4E4E]">
              Xush kelibsiz
            </div>
            <div className="text-[9px] font-[400] text-[#4E4E4E]">Welcome</div>
            <div className="text-[9px] font-[400] text-[#4E4E4E]">
              Добро пожаловать
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-5">
          <Link to={`/table/${tableSL}/cart`} className="relative">
            <img src={images.Cart} alt="cart" className="relative" />
            <div className="absolute top-[-3px] right-0 w-[11px] h-[11px] bg-[#4E4E4E] text-[8px] rounded-[100%] text-[#fff] flex items-center justify-center">
              {cart.products.length || 0}
            </div>
          </Link>
          <Link to={`/orders`} className="relative bg-green-600 p-[5px] rounded-full">
            <AiOutlineImport size={15} color="white" />
            <div className="absolute top-[-3px] right-0 w-[11px] h-[11px] bg-[#4E4E4E] text-[8px] rounded-[100%] text-[#fff] flex items-center justify-center">
              {clientOrder?.orders?.length || 0}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
