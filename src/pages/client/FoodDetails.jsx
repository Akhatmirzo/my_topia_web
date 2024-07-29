import React, { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { MdChevronLeft } from "react-icons/md";
// import { HiOutlineStar } from "react-icons/hi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGetProductQuery } from "../../store/api/productsApi";
import staticData from "../../store/staticData";
import { backNav } from "../../utils/helpers";

const FoodDetails = () => {
  const location = useLocation();
  const [qty, setQty] = useState(0);
  const { food_id } = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductQuery({ productId: food_id }) || {};

  const { _id, name, description, price, images } = useMemo(() => {
    if (product?.success) {
      return product.product;
    } else {
      return {};
    }
  }, [product]);

  const back_nav = useMemo(() => {
    return backNav(location.pathname);
  }, [location]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="w-full relative">
        <div className="w-full h-[320px] relative bg-[#98A8B8] rounded-[0_0_30px_30px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="food-layer"></div>
          <img
            src={staticData.SERVER_URL + "/" + images[0].path}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <Link
          to={back_nav}
          className="absolute top-[20px] left-[20px] w-[45px] h-[45px] bg-[#fff] flex items-center justify-center rounded-full z-10"
        >
          <MdChevronLeft fontSize={26} />
        </Link>
      </div>
      <div className="w-full flex flex-col items-start gap-[19px] p-[0_24px]">
        <div className="w-full flex items-center justify-between pt-[25px] pb-[22px]">
          <div className="text-[22px] text-[#000] font-[500] leading-[normal]">
            {name}
          </div>
          {/* <div className="flex items-center gap-[10px]">
            <HiOutlineStar color="#FDBF48" fontSize={22} />
            <div>4.7</div>
          </div> */}
        </div>
        <div className="w-full">
          <div className="text-[18px] text-[#000] font-[500] leading-[normal]">
            Description
          </div>
          <p>{description}</p>
        </div>
        <div className="flex items-start gap-[20px] pb-[22px]">
          <div className="flex flex-col items-start gap-[5px]">
            <div className="text-[14px] text-[#FDBF48] font-[400] leading-[normal]">
              Ingredientlar:
            </div>
            <div>
              <div className="text-[13px] text-[#646982] font-[500] leading-[normal]">
                Maxsus marinadlangan kotlet
              </div>
              <div className="text-[13px] text-[#646982] font-[500] leading-[normal]">
                Maxsus marinadlangan kotlet
              </div>
              <div className="text-[13px] text-[#646982] font-[500] leading-[normal]">
                Maxsus marinadlangan kotlet
              </div>
              <div className="text-[13px] text-[#646982] font-[500] leading-[normal]">
                Maxsus marinadlangan kotlet
              </div>
              <div className="text-[13px] text-[#646982] font-[500] leading-[normal]">
                Maxsus marinadlangan kotlet
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[10px]">
            <div className="flex flex-col items-start gap-[5px]">
              <div className="text-[14px] text-[#FDBF48] font-[400] leading-[normal]">
                Qo’shimcha:
              </div>
              <button
                type="submit"
                className="p-[3px_8px] bg-[#fff] rounded-[10px] box-shadow flex items-center gap-[5px]"
              >
                <img src={images.CheeseWedge} alt="" width={30} />
                <span className="">3.000</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#fff] rounded-[24px_24px_0px_0px] box-shadow pt-[22px] pb-[20px]">
        <div className="w-full p-[0_24px]">
          <div className="w-full flex items-center justify-between pb-[22px]">
            <div className="text-[28px] text-[#FFBD69] font-[700] leading-[normal]">
              {price}
            </div>
            <div className="p-[11px_14px] bg-[#FDBF48] flex items-center gap-[20px] rounded-[50px] box-shadow-md">
              <div className="w-[24px] h-[24px] bg-[#fdcc6d] flex items-center justify-center rounded-full cursor-pointer">
                <FaMinus
                  fontSize={12}
                  color="#fff"
                  onClick={() => setQty(qty > 0 ? qty - 1 : qty)}
                />
              </div>
              <div className="text-[16px] text-[#000] font-[700] leading-[normal] select-none">
                {qty}
              </div>
              <div className="w-[24px] h-[24px] bg-[#fdcc6d] flex items-center justify-center rounded-full cursor-pointer">
                <FaPlus
                  fontSize={12}
                  color="#fff"
                  onClick={() => setQty(qty + 1)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FDBF48] p-[11px_54px] rounded-[12px] uppercase"
          >
            Buyurtmaga qo’shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
