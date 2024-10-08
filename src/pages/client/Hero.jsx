import React from "react";
import CategoryCard from "../../components/CategoryCard";
import { useGetAllCategoriesQuery } from "../../store/api/categoriesApi";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loadings/Loading";

export default function Hero() {
  const { table } = useParams();
  const { data, error, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) return <Loading screen />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex flex-col items-center p-[12px_42px]">
        <h2 className="text-[18px] text-[#000] font-[500] ">Table: {table} </h2>
        <div className=" flex flex-col items-start">
          <h3 className=" text-[18px] esm2:text-[16px] text-[#000] font-[500]">
            What’s on your <span className="text-[#FDBF48]">mind?</span>
          </h3>
          <h4 className=" text-[18px] esm2:text-[16px] text-[#000] font-[500] pl-[44px] esm2:pl-[22px]">
            Nimalarni <span className="text-[#FDBF48]">xayol</span> qilyapsiz?
          </h4>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-x-[30px] gap-y-[10px] grid-rows-[auto] pt-[15px] m-[0_10px]">
          {data?.categories?.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
