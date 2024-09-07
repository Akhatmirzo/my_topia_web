import React, { useEffect, useRef, useState } from "react";
import OrderCard from "../components/Card/OrderCard";
import { useGetAllOrdersQuery } from "../store/api/orderApi";
import Loading from "../components/Loadings/Loading";
import SuperPagination from "../components/Pagination/SuperPagination";
import { uid } from "uid";

export default function Orders({ role }) {
  const ScrollRef = useRef()
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllOrdersQuery({ page: currentPage });

  useEffect(() => {
    ScrollRef?.current.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="h-full flex flex-col">
      <div ref={ScrollRef} className="w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {data?.orders?.map((order) => (
            <OrderCard key={uid()} order={order} role={role} />
          ))}
        </div>
      </div>

      {data?.totalPages > 1 && (
        <div className=" justify-self-end">
          <SuperPagination
            pageSize={data?.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {isLoading && <Loading />}
    </div>
  );
}
