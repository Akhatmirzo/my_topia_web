import React from "react";
import OrderCard from "../components/Card/OrderCard";
import { useGetAllOrdersQuery } from "../store/api/orderApi";

export default function Orders() {
  const { data } = useGetAllOrdersQuery();
  console.log(data);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data?.orders?.map((order) => (
        <OrderCard order={order} />
      ))}
    </div>
  );
}
