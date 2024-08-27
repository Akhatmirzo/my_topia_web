import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { MdChevronLeft } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi";
import { FaMinus, FaPlus } from "react-icons/fa";
import staticData from "../../store/staticData";
import { backNav, checkTotalPriceFn } from "../../utils/helpers";
import { useGetWebPageFoodQuery } from "../../store/api/webPageFoodsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/CartSlice";
import { toast } from "react-toastify";
import { uid } from "uid";
import { Label, Radio } from "flowbite-react";

const FoodDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { food_id } = useParams();
  const [additionItems, setAdditionItems] = useState([]);
  const [option, setOption] = useState();
  const [qty, setQty] = useState(1);
  const [cartPrice, setCartPrice] = useState(0);

  // Get All Products
  const {
    data: product,
    error,
    isLoading,
  } = useGetWebPageFoodQuery({ foodId: food_id }) || {};

  const { _id, name, price, images, characteristics, addition, options } =
    product || {};

  // Add To Cart Function
  const addToCartFromDetail = async () => {
    let totalPrice = 0;
    const newItem = {
      itemId: uid(),
      product_id: _id,
      name,
      totalPrice: 0,
      quantity: qty,
      additions: additionItems,
      image: images[0].path,
    };

    if (price) {
      newItem.price = price;
      totalPrice = checkTotalPriceFn(price, qty, additionItems);
    }

    if (option) {
      newItem.options = option;
      totalPrice += checkTotalPriceFn(option.price, qty, additionItems);
    }

    await dispatch(addToCart({ ...newItem, totalPrice }));

    toast.success("Product added to cart successfully!");
  };

  useEffect(() => {
    setCartPrice(checkTotalPriceFn(price, qty, additionItems, option));
  }, [additionItems, price, product, qty, option]);

  useEffect(() => {
    if (options?.length > 0) setOption(options[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Add food additional
  const addFoodAddition = (addition) => {
    const isAdditionCheck = additionItems.some(
      (additionItem) => additionItem.name === addition.name
    );

    if (isAdditionCheck) {
      setAdditionItems(
        additionItems.filter(
          (additionItem) => additionItem.name !== addition.name
        )
      );
    } else {
      const newAdditionItems = [...additionItems, addition];
      setAdditionItems(newAdditionItems);
    }
  };

  // Food Cart Increment update function
  const incrementFoodQuantity = (id) => {
    // dispatch(incrementQuantity(id));
    setQty(qty + 1);
  };

  // Food Cart Decrement update function
  const decrementFoodQuantity = (id) => {
    // dispatch(decrementQuantity(id));
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // Back Fucntion
  const back_nav = useMemo(() => {
    return backNav(location.pathname);
  }, [location]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-70px)]">
      <div className="w-full relative">
        <div className="w-full h-[320px] relative bg-[#98A8B8] rounded-[0_0_30px_30px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="food-layer"></div>
          <img
            src={staticData.SERVER_URL + "/" + images[0]?.path}
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

      <div className="w-full h-full flex flex-col items-start gap-[19px] p-[0_24px]">
        <div className="w-full flex items-center justify-between pt-[25px] pb-[5px]">
          <div className="text-[22px] text-[#000] font-[500] leading-[normal]">
            {name}
          </div>
          <div className="flex items-center gap-[10px]">
            <HiOutlineStar color="#FDBF48" fontSize={22} />
            <div>4.7</div>
          </div>
        </div>
        {price && (
          <h2 className="text-2xl">
            Price: <span className="font-bold">{price} so'm</span>
          </h2>
        )}
        <div className="flex items-center gap-10">
          {options?.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Radio
                id={`option${index}`}
                name="option"
                defaultChecked={index === 0}
                className=" scale-125"
                onChange={(e) => e.target.checked && setOption(option)}
              />
              <Label
                htmlFor={`option${index}`}
                className="dark:text-black text-xl"
              >
                {option.name}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex items-start justify-between w-full gap-[20px] pb-[22px]">
          <div className="flex flex-col items-start gap-[5px]">
            <div className="text-[14px] text-[#FDBF48] font-[400] leading-[normal]">
              Ingredientlar:
            </div>
            <div>
              {characteristics.map((character, index) => (
                <div
                  key={index}
                  className="text-[13px] text-[#646982] font-[500] leading-[normal]"
                >
                  {character}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-[10px]">
            <div className="flex flex-col items-start gap-[5px]">
              <div className="text-[14px] text-[#FDBF48] font-[400] leading-[normal]">
                Qo’shimcha:
              </div>
              {addition.map((item) => (
                <button
                  key={item.name}
                  type="submit"
                  onClick={() => addFoodAddition(item)}
                  className="p-[3px_8px] bg-[#fff] rounded-[10px] box-shadow flex items-center gap-[5px]"
                  style={
                    additionItems.some(
                      (addition) => addition.name === item.name
                    )
                      ? { backgroundColor: "#FDBF48" }
                      : {}
                  }
                >
                  {/* <img src={imagesAssets.CheeseWedge} alt="" width={30} /> */}
                  <h2>{item.name}:</h2>
                  <span className="">{item.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#fff] rounded-[24px_24px_0px_0px] box-shadow pt-[22px] pb-[20px] justify-self-end">
        <div className="w-full p-[0_24px]">
          <div className="w-full flex items-center justify-between pb-[22px]">
            <div className="text-[28px] text-[#FFBD69] font-[700] leading-[normal]">
              {cartPrice}
            </div>
            <div className="p-[11px_14px] bg-[#FDBF48] flex items-center gap-[20px] rounded-[50px] box-shadow-md">
              <div className="w-[24px] h-[24px] bg-[#fdcc6d] flex items-center justify-center rounded-full cursor-pointer">
                <FaMinus
                  fontSize={12}
                  color="#fff"
                  onClick={() => decrementFoodQuantity()}
                />
              </div>
              <div className="text-[16px] text-[#000] font-[700] leading-[normal] select-none">
                {qty}
              </div>
              <div className="w-[24px] h-[24px] bg-[#fdcc6d] flex items-center justify-center rounded-full cursor-pointer">
                <FaPlus
                  fontSize={12}
                  color="#fff"
                  onClick={() => incrementFoodQuantity()}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              onClick={() => addToCartFromDetail()}
              className="w-full bg-[#FDBF48] p-[11px_54px] rounded-[12px] uppercase"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
