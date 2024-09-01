import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/slices/CartSlice";
import { useCreateOrderMutation } from "../../store/api/orderApi";
import Loading from "../../components/Loadings/Loading";
import CartCard from "../../components/Card/CartCard";

const Cart = ({ previousLocation }) => {
  const [loading, setLoading] = useState(false);
  const { table } = useParams();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
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

  const handleCreateOrder = async (order) => {
    setLoading(true);
    try {
      await createOrder({ ...order, table_number: table }).unwrap();

      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }
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
          <div className="w-full h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden flex flex-col items-start gap-[32px]">
            {cart?.products.map((item) => (
              <CartCard
                key={item.itemId}
                cart={item}
                increment={increment}
                decrement={decrement}
                deleteItem={deleteItem}
              />
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
            <h2 className="text-[34px] font-[500] text-[#FDBF48] leading-[normal]">
              {cart.total} so'm
            </h2>
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

      {loading ? <Loading /> : ""}
    </div>
  );
};

export default Cart;
