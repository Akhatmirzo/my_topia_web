import React, { useMemo } from "react";
import FoodCard from "../../components/FoodCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../store/api/productsApi";
import { useGetCategoryByIdQuery } from "../../store/api/categoriesApi";
import { MdChevronLeft } from "react-icons/md";
import { backNav } from "../../utils/helpers";

export default function Foods() {
  const location = useLocation();
  const { category_id } = useParams();
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({ page: 1, pageSize: 10, category_id }) || {};
  const { data: category } = useGetCategoryByIdQuery(category_id) || {};

  const back_nav = useMemo(() => {
    return backNav(location.pathname, 2);
  }, [location]);

  if (error) {
    console.log(error);
    return <div>Error: {error.message || error.data.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full p-[10px_20px]">
        <div className="flex flex-col items-center gap-[18px] relative">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[18px] font-[500] text-[#000] leading-[normal]">
              {category?.category.name}
            </h2>
            <div className="w-[34px] h-[1px] bg-[#FDBF48] m-[5px_0]"></div>
            <p className="text-[14px] font-[400] text-[#000] leading-[18px]">
              Choose your delicious meal!
            </p>
            <p className="text-[14px] font-[400] text-[#000] leading-[18px]">
              O'zingizning mazali taomingizni tanlang!
            </p>
          </div>
          <Link
            to={back_nav}
            className="absolute top-[20px] left-[20px] w-[45px] h-[45px] bg-[#fdbf48] flex items-center justify-center rounded-full z-10"
          >
            <MdChevronLeft fontSize={26} />
          </Link>
          <div className="grid grid-cols-[1fr_1fr] gap-x-[22px] gap-y-[16px] grid-rows-[auto]">
            {products?.products.map((product, index) => (
              <FoodCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
