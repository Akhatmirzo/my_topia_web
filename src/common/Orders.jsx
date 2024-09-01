import React, { useEffect } from "react";
import OrderCard from "../components/Card/OrderCard";
import { OrderApi, useGetAllOrdersQuery } from "../store/api/orderApi";
import { useDispatch } from "react-redux";
import { receiveData } from "../socket.io/SocketIo";
import Loading from "../components/Loadings/Loading";

export default function Orders() {
  const { data, isLoading } = useGetAllOrdersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    receiveData("newOrder", (data) => {
      console.log("New Order received", data);

      dispatch(
        OrderApi.util.updateQueryData(
          "getAllOrders",
          undefined,
          (draftOrders) => {
            draftOrders.orders.push(data.newOrder); // Yangi buyurtmani qo'shish
          }
        )
      );
    });

    receiveData("updateOrder", (data) => {
      dispatch(
        OrderApi.util.updateQueryData(
          "getAllOrders",
          undefined,
          (draftOrders) => {
            draftOrders.orders = draftOrders.orders.map((order) => {
              if (order._id === data._id) {
                return data; // Yangilangan order obyektini qaytaradi
              } else {
                return order; // Aks holda, mavjud orderni qaytaradi
              }
            });
          }
        )
      );
    });

    receiveData("reflesh", () => {
      dispatch(OrderApi.util.invalidateTags(["orders"]));
    });
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.orders?.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>

      {isLoading && <Loading />}
    </>
  );
}
