import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import staticData from "../../store/staticData";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/slices/CartSlice";
import { useCreateOrderMutation } from "../../store/api/orderApi";
import Loading from "../../components/Loadings/Loading";
import { toast } from "react-toastify";

const Cart = ({ previousLocation }) => {
  const [loading, setLoading] = useState(false);
  const { table } = useParams();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { error, isError, isLoading, isSuccess }] =
    useCreateOrderMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const increment = (id) => {
    dispatch(incrementQuantity(id));
  };

  const decrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleBackClick = () => {
    if (previousLocation) {
      navigate(previousLocation);
    } else {
      navigate(-1);
    }
  };

  const handleCreateOrder = (order) => {
    createOrder({ ...order, table_number: table });
  };

  return (
    <div className="w-full h-[calc(100vh-70px)]">
      <div className="w-full h-[calc(100vh-270px)] overflow-hidden p-[18px] relative">
        <div className="flex items-start flex-col gap-[24px]">
          {/* Return to back */}
          <div
            onClick={handleBackClick}
            className="flex items-center gap-[18px] cursor-pointer"
          >
            <div className="w-[45px] h-[45px] bg-[#FDBF48] rounded-[100%] flex items-center justify-center">
              <MdChevronLeft fontSize={22} color="#fff" />
            </div>
            <div className="text-[17px] text-[#36B75A] font-[500] leading-[22px]">
              Savat / Cart
            </div>
          </div>
          {/* Products added to cart */}
          <div className="w-full h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden flex flex-col items-start gap-[32px] p-2">
            {cart?.products.map((item) => (
              <div
                key={item.itemId}
                className="w-full flex items-start gap-[20px]"
              >
                <div className="min-w-[136px] h-[117px] rounded-[25px] bg-[#646982]">
                  <img
                    src={staticData.SERVER_URL + "/" + item.image}
                    alt="order-photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex items-start flex-col">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-[18px] text-[#FDBF48] leading-[normal] font-[500]">
                      {item.name}
                    </h2>
                    <div
                      className="cursor-pointer"
                      onClick={() => deleteItem(item.itemId)}
                    >
                      <img src={images.Delete} alt="delete icon" />
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="pt-[22px] text-[20px] text-[#36B75A] font-[400] leading-[normal]">
                      {item.totalPrice} so'm
                    </div>
                    {item?.additions?.length > 0 && (
                      <div className="">
                        <h3 className="text-[18px] text-[#36B75A] font-[400] leading-[normal]">
                          Addition
                        </h3>

                        <ul>
                          {item.additions.map((addition, index) => (
                            <li key={index}>{addition.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="w-[171px] flex items-center justify-between pt-[13px]">
                    <div className="text-[18px] text-[#181C2E] font-[400] leading-[normal]">
                      <span>{item?.options?.name}</span>
                    </div>
                    <div className="flex items-center gap-[19px]">
                      <div
                        className="cursor-pointer"
                        onClick={() => decrement(item.itemId)}
                        data-name="product-delete"
                      >
                        <img src={images.Minus} alt="" />
                      </div>
                      <div className="text-[16px] font-[500] text-[#FDBF48] leading-[normal]">
                        {item.quantity}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => increment(item.itemId)}
                      >
                        <img src={images.Plus} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-[#fff] rounded-[24px_24px_0px_0px] absolute top-auto left-0 bottom-0 box-shadow p-[0_24px]">
        <div className="w-full flex flex-col items-center text-center pt-[30px] pb-[22px]">
          <div className="flex flex-col items-center text-center">
            <div className="text-[18px] font-[600] leading-[24px] text-[#36B75A] uppercase">
              Umumiy:
            </div>
            <div className="text-[34px] font-[500] text-[#FDBF48] leading-[normal]">
              {cart.total} so'm
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCreateOrder(cart)}
            className="text-center bg-[#FDBF48] w-full p-[21px_0] rounded-[12px]"
          >
            <span className="text-[#000] text-[14px] font-[400] leading-[normal] uppercase tracking-[1px]">
              Buyurtma berish
            </span>
          </button>
        </div>
      </div>

      {loading ? <Loading calc={"71px"} /> : ""}
    </div>
  );
};

export default Cart;
