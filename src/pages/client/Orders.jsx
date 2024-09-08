import React, { useEffect } from "react";
import OrderCard from "../../components/Card/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { MdChevronLeft } from "react-icons/md";
import { getUpdateData } from "../../store/slices/OrderSlice";

export default function Orders({ role }) {
  const dispatch = useDispatch();
  const clientOrder = useSelector((state) => state.clientOrder);

  const checkUpdateOrders = (orders) => {
    let ids = [];
    orders.forEach((order) => {
      ids.push(order._id);
    });
    dispatch(getUpdateData(ids));
  };

  useEffect(() => {
    checkUpdateOrders(clientOrder.orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-3">
      <div
        onClick={() => window.history.back()}
        className=" relative top-2 w-[45px] h-[45px] bg-[#fdbf48] flex items-center justify-center rounded-full z-10"
      >
        <MdChevronLeft fontSize={26} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {clientOrder?.orders?.length > 0 &&
          clientOrder?.orders?.map((order) => <OrderCard key={order._id} order={order} role={role} />)}

        {clientOrder?.orders?.length === 0 && (
          <div className="text-center py-10">
            <h1 className="text-lg font-bold text-gray-600">No orders found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
