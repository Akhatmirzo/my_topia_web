import React, { useState } from "react";
import { useGetFoodsQuery } from "../../store/api/foodsApi";
import { Navbar, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { useGetAllCategoriesQuery } from "../../store/api/categoriesApi";
import EmployerCard from "../../components/Card/EmployerCard";
import Loading from "../../components/Loadings/Loading";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const cart = useSelector(state => state.cart)
  const [categoryId, setCategoryId] = useState("");
  const { data, isLoading } = useGetFoodsQuery({ category_id: categoryId });
  const { data: categoryData } = useGetAllCategoriesQuery();

  return (
    <div>
      <Navbar fluid>
        <Navbar title={"navbar_side"} className="p-0 m-0 sm:p-0">
          <Link>
            <img src={images.Maytopia_control} alt="logo" loading="lazy" />
          </Link>
        </Navbar>

        <div className="flex items-center gap-3">
          <div className="max-w-md w-full">
            <Select
              id="countries"
              required
              className="w-full"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={""}>All</option>
              {categoryData?.categories?.length > 0 &&
                categoryData?.categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </div>

          <Link to={`cart`} className="relative w-[50px] h-[50px]">
            <img src={images.Cart} alt="cart" className="relative w-full h-full" />
            <div className="absolute top-[-3px] -right-[5px] w-[22px] h-[22px] bg-[#4E4E4E] text-[12px] rounded-[100%] text-[#fff] flex items-center justify-center">
              {cart?.products?.length || 0}
            </div>
          </Link>
        </div>
      </Navbar>

      <div className="flex flex-wrap justify-center gap-3 py-1">
        {data?.products?.length > 0 &&
          data?.products?.map((food) => (
            <EmployerCard key={food._id} food={food} />
          ))}
      </div>

      {isLoading && <Loading />}
    </div>
  );
}
