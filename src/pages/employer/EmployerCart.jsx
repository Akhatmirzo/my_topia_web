import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../components/Card/CartCard";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/slices/CartSlice";
import { Link } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import { useCreateOrderMutation } from "../../store/api/orderApi";
import Loading from "../../components/Loadings/Loading";
import { toast } from "react-toastify";
import { Label, Select } from "flowbite-react";
import { useGetTablesQuery } from "../../store/api/tablesApi";

export default function EmployerCart() {
  const dispatch = useDispatch();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { data } = useGetTablesQuery();
  const [createOrder] = useCreateOrderMutation();

  const increment = (id) => {
    dispatch(incrementQuantity(id));
  };

  const decrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCreateOrder = async (order) => {
    if (!table) {
      toast.error("Please select a table");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        ...order,
        table_number: table,
      }).unwrap();

      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const back_nav = () => window.history.back();

  return (
    <div className="flex h-full">
      <div className="relative w-[90px]">
        <Link
          onClick={back_nav}
          className="absolute top-0 left-0 w-[45px] h-[45px] bg-[#fff] flex items-center justify-center rounded-full z-10"
        >
          <MdChevronLeft fontSize={26} />
        </Link>
      </div>

      <div className="flex-grow flex flex-col gap-3 w-full h-full overflow-x-hidden overflow-y-auto">
        {cart?.products?.map((product) => (
          <CartCard
            key={product.itemId}
            cart={product}
            increment={increment}
            decrement={decrement}
            deleteItem={deleteItem}
            role={"employer"}
          />
        ))}

        {cart.products.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl">Your cart is empty</h1>
          </div>
        )}
      </div>

      <div className="w-[500px] h-full bg-slate-800 flex flex-col">
        <div className="w-full h-full p-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your Table" />
            </div>
            <Select id="countries" required onChange={(e) => setTable(e.target.value)}>
              <option>none</option>

              {data?.tables.map((table) => (
                <option value={table.table_number}>{table.table_number}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className=" justify-self-end w-full h-auto bg-[#fff] rounded-[24px_24px_0px_0px] box-shadow p-[0_24px]">
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
      </div>

      {loading ? <Loading /> : ""}
    </div>
  );
}
